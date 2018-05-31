/* eslint-disable no-console */
;(function () {

    function Character(options) {
        let charName = options.charName || 'Character';
        let charRace = options.charRace || 'human';
        let charClass = options.charClass || 'Warrior';
        let charAge = options.charAge || 29;
        let charColor = options.charColor || 'bronze';
        let charHealth = options.charHealth || 100;
        let charWeapon = options.charWeapon || {
            weaponName: 'Long Sword',
            weaponDamage: 5
        };

        this.getClass = () => charClass;
        this.getRace = () => charRace;
        this.getName = () => charName;
        this.getAge = () => charAge;
        this.getColor = () => charColor;
        this.getHealth = () => charHealth;
        this.getWeapon = () => charWeapon;

        this.setWeapon = (newWeapon) => { charWeapon = newWeapon; };

        this.sayHi = function () {
            console.log('I\'m a ' + charName + '!');
        };
        // как сделать, чтобы сохранялось свойство charHealth после выполнения метода. т.е. при вызове obj.getHealth()
        // значение с уроном.
        this.toAttack = function (obj) {
            console.log(charName + ' attack ' + obj.getName() + ' with his ' + charWeapon.weaponName);

            function getDamage() {
                console.log('damage is ' + charWeapon.weaponDamage);
                return console.log(obj.getName() + ' have the ' + (obj.getHealth() - charWeapon.weaponDamage) + ' hp now!');
            }
            return getDamage();
        };
    }

    let conan = new Character({
        charName: 'Conan',
        charClass: 'Barbarian',
        charAge: 29,
        charWeapon: {
            weaponName: 'Two-Handed Sword',
            weaponDamage: 10
        }
    });

    let orc = new Character({
        charRace: 'orc',
        charName: 'Rog\'ork',
        charAge: 38,
        charColor: 'green',
        charWeapon: {
            weaponName: 'War Hammer',
            weaponDamage: 15
        }
    });

}());