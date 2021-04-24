'use strict'

const menu = {
    bigMac: { calories: 40, price: 100 },
    cheese: { calories: 20, price: 10 },
    mayonnaise: { calories: 5, price: 20 },
    potatoes: { calories: 10, price: 15 },
    salad: { calories: 5, price: 20 },
    seasoning: { calories: 0, price: 15 },
    smallMac: { calories: 20, price: 50 }
}

class Order {
    constructor(items) {
        this.items = items;
    }

    addItem(item) {
        this.items.push(item)
    }

    removeItem(item) {
        this.items.splice(this.items.indexOf(item), 1);
    }

    calculatePrice() {
        let totalPrice = 0;
        this.items.forEach(item => {
            totalPrice += menu[item].price
        })
        return totalPrice;
        //или одной строкой через reduce (не очень люблю эту функцию, не очень легко читается)
        //this.items.reduce((price, item) => price + menu[item].price, 0)
    }

    calculateCalories() {
        let totalCalorie = 0;
        this.items.forEach(item => {
            totalCalorie += menu[item].calories
        })

        return totalCalorie;
    }
}

const bigMack = new Order(['smallMac', 'cheese']);
bigMack.addItem('mayonnaise');
bigMack.removeItem('mayonnaise');
console.log(bigMack.calculatePrice());
console.log(bigMack.calculateCalories());
