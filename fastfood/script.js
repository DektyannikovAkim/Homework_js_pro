'use strict'

const menu = [{
        position: "bigMac",
        calories: 40,
        price: 100,
    },
    {
        position: "smallMac",
        calories: 20,
        price: 50,
    },
    {
        position: "cheese",
        calories: 20,
        price: 10,
    },
    {
        position: "salad",
        calories: 5,
        price: 20,
    },
    {
        position: "potatoes",
        calories: 10,
        price: 15,
    },
    {
        position: "seasoning",
        calories: 0,
        price: 15,
    },
    {
        position: "mayonnaise",
        calories: 5,
        price: 20,
    },
];


class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = [stuffing];
    }

    addSauce(sauce) {
        this.stuffing.push(sauce);
    }

    removeSauce(sauce) {
        this.stuffing.splice(this.stuffing.indexOf(sauce), 1);
    }

    calculatePrice() {
        let totalPrice = 0;
        totalPrice += menu.find(positionItem => positionItem.position === this.size).price;
        this.stuffing.forEach(position => {
            totalPrice += menu.find(positionItem => positionItem.position === position).price;
        });

        return totalPrice;
    }

    calculateCalories() {
        let totalCalorie = 0;
        totalCalorie += menu.find(positionItem => positionItem.position === this.size).calories;
        this.stuffing.forEach(position => {
            totalCalorie += menu.find(positionItem => positionItem.position === position).calories;
        });

        return totalCalorie;
    }
}

const bigMack = new Hamburger('smallMac', 'cheese');
bigMack.addSauce('mayonnaise');
bigMack.removeSauce('mayonnaise');
console.log(bigMack.calculatePrice());
console.log(bigMack.calculateCalories());