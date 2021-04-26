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

class OrderItem {
    constructor(item, aditionals) {
        this.item = item;
        this.aditionals = aditionals;
    }
    addAditional(aditional) {
        this.aditionals.push(aditional)
    }

    removeAditional(aditional) {
        this.aditionals.splice(this.aditionals.indexOf(aditional), 1);
    }

    calculatePrice() {
        let totalPrice = menu[this.item].price;
        this.aditionals.forEach(aditional => {
            totalPrice += menu[aditional].price
        })
        return totalPrice;
    }

    calculateCalories() {
        let totalCalorie = menu[this.item].calories;
        this.aditionals.forEach(aditional => {
            totalCalorie += menu[aditional].calories
        })
        return totalCalorie;
    }
}

const bigMack = new OrderItem('smallMac', ['cheese']);
bigMack.addAditional('mayonnaise');
bigMack.removeAditional('mayonnaise');
console.log(bigMack.calculatePrice());
console.log(bigMack.calculateCalories());