// ... your code...
// let ul = document.querySelector('ul');
// enumerableLis(ul);

// function enumerableLis(ul) {
//     let lis = ul.querySelectorAll('li');
//     for (let li of lis) {
//         console.log(li.firstChild.textContent.trim() + ' : ' + li.querySelectorAll('li').length);
//     }
// }

// setting style for a single link
let links = document.querySelectorAll('a');
for (let link of links) {
    let href = link.href && link.getAttribute('href');
    if (href.includes('://') && !href.includes('http://internal.com'))
        link.style.color = 'orange';
}

function makeList() {
    let lis = [];
    
    while (true) {
        let content = prompt('input the content of item', 'content');
        if (!content) break;
        let li = content && document.createElement('li');
        li && li.append(content);
        li && lis.push(li);
    }
    if (lis.length === 0)
        return;
    let ul = document.createElement('ul');
    lis.length > 0 && ul.append(...lis);
    ul.children && document.body.prepend(ul);

}

// let data = {
//     "Fish": {
//         "trout": {},
//         "salmon": {}
//     },

//     "Tree": {
//         "Huge": {
//             "sequoia": {},
//             "oak": {}
//         },
//         "Flowering": {
//             "redbud": {},
//             "magnolia": {}
//         }
//     }
// };

// let container = document.createElement('div');
// createTree(container, data);
// document.body.prepend(container);

function createTree(container, data) {
    let ul = document.createElement('ul');
    for (let prop in data) {
        let li = document.createElement('li');
        li.textContent = prop;
        ul.append(li);
        typeof data[prop] === 'object' && createTree(li, data[prop]);
    }
    container.append(ul);
}

function showDescendants(tree) {
    let lis = tree.querySelectorAll('li');
    for (let li of lis) {
        if (li.querySelectorAll('li').length === 0)
            continue;
        li.firstChild.data += `[${li.querySelectorAll('li').length}]`;
    }
}
// Insert the HTML in the list
// ul.firstElementChild.insertAdjacentHTML('afterEnd', '<li>2</li><li>3</li>');

class SortableTable {
    constructor(table) {
        this.table = table;
    }
    sort() {
        let rows = Array.from(this.table.rows).slice(1).sort((a,b)=>a.cells[0].innerHTML > b.cells[0].innerHTML ? 1 : -1);
        this.table.tBodies[0].append(...rows);
    }
}
