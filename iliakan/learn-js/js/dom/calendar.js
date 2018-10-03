'use strict';

class Calendar {
    constructor({year, month}) {
        this.date = new Date(`${year} ${month}`);
        this.month = month;
    }

    _getMonthName(month) {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month];
    }

    getElem() {
        if (!this._elem)
            this._elem = document.createElement('div');
        this._render();
        return this._elem;
    }

    _render() {
        this._elem.innerHTML = `
                    <table>
                        <caption>${this.date.getFullYear()} ${this._getMonthName(this.date.getMonth())}</caption>
                        <thead>
                            <tr>
                                <th data-day='1'>MO</th>
                                <th data-day='2'>TU</th>
                                <th data-day='3'>WE</th>
                                <th data-day='4'>TH</th>
                                <th data-day='5'>FR</th>
                                <th data-day='6'>SA</th>
                                <th data-day='0'>SU</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>`;

        let table = this._elem.querySelector('table');
        while (true) {
            let week = document.createElement('tr');
            let weekday = null;
            let delta = null;
            // a finite increment
            for (let day of table.rows[0].cells) {
                if (this.date.getDay() !== +day.dataset.day) {
                    weekday = `<td></td>`;
                    delta = 0;
                } else {
                    this.date.getMonth() === this.month ? weekday = `<td></td>` : weekday = `<td>${this.date.getDate()}</td>`;
                    delta = 1;
                }
                week.insertAdjacentHTML('beforeEnd', weekday);

                this.date.setDate(this.date.getDate() + delta);
            }
            table.tBodies[0].append(week);
            if (this.date.getMonth() === this.month || this.date.getMonth() === 0 && this.month === 12)
                break;
        }
    }
    accentHolidays() {
        let table = this._elem.querySelector('table');
        for (let row of table.rows) {
            row.cells[5].innerHTML && (row.cells[5].style.border = '1px solid red');
            row.cells[6].innerHTML && (row.cells[6].style.border = '1px solid red');
        }
        return this;
    }
    accentToday() {
        let date = new Date();
        let table = this._elem.querySelector('table');
        if (this.month === date.getMonth() + 1) {
            for (let row of table.rows) {
                for (let cell of row.cells) {
                    +cell.innerHTML === date.getDate() && (cell.style.border = '3px solid red');
                }
            }
        }
        return this;
    }
    /*
    * @array of strings birthDays: ['YYYY MM DD',]
    */
    accentBirthdays(birthDays) {
        for (let day of birthDays) {
            let date = new Date(day);
            let table = this._elem.querySelector('table');
            if (this.month === date.getMonth() + 1) {
                for (let row of table.rows) {
                    for (let cell of row.cells) {
                        +cell.innerHTML === date.getDate() && (cell.style.border = '3px solid green');
                    }
                }
            }
        }
        return this;
    }
}
