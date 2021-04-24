'use strict'

const getRandomNumber = () => Math.round(Math.random() * (100 - 1) + 1);

class ProductsList {
    constructor() {
        this.products = [];
    }
    fetchProducts() {
        this.products = [{ id: 1, title: 'Shirt', price: 150, img: `https://picsum.photos/seed/${getRandomNumber()}/260/280` },
            { id: 2, title: 'Socks', price: 50, img: `https://picsum.photos/seed/${getRandomNumber()}/260/280` },
            { id: 3, title: 'Jacket', price: 350, img: `https://picsum.photos/seed/${getRandomNumber()}/260/280` },
            { id: 4, title: 'Shoes', price: 250 }
        ]
    }
    render() {
        let productsList = document.querySelector('.products-list');
        this.products.forEach(product => {
            const productItem = new ProductItem(product.title, product.price, product.img);
            productsList.insertAdjacentHTML('beforeend', productItem.render());
        });
    }
    sumOfProducts() {
        let summ = 0;
        this.products.forEach(product => {
            summ += product.price;
        })
        return summ;
    }
    applyDiscount(arrayTitle, discnt) {
        arrayTitle.forEach(title => {
            let priceProduct = this.products.find(product => product.title === title).price;
            this.products.find(product => product.title === title).price = priceProduct - (priceProduct * (discnt / 100));
        });
    }
}

class ProductItem {
    constructor(title, price, img) {
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        let { title, price, img = "img/product-1.png" } = this;
        return `<figure class="products-item">
    <img src="${img}" alt="Фото товара">
    <figcaption class="item-info">
    <h3>${title}</h3>
    <span class="red">${price}$</span>
    <button class="product-buy" type="button">Купить</button>
    </figcaption></figure>`
    }
}

const list = new ProductsList;
list.fetchProducts();
list.applyDiscount(['Socks', 'Jacket'], 10);
list.render();
console.log(list.sumOfProducts());

class Cart {
    constructor() {

        }
        // Необходимо добавить методы для удаления товара,
        // а также добавления еще одного экземпляра товара (управление количеством товара).
        // Метод для возвращения удаленного товара из корзины.
}

class CartItem {
    constructor() {

    }
}