'use strict'

const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class ProductsList {
    constructor() {
        this.products = [];
        this._getProducts()
            .then(data => {
                this.products = data;
                // this.applyDiscount(['Ноутбук', 'Мышка'], 10);
                this.render();
                this.addItemToCart();
                // console.log(this.sumOfProducts());
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json()
                .catch(error => {
                    console.log(error);
                    return data === undefined;
                })
            )
    }

    render() {
        let productsList = document.querySelector('.products-list');

        this.products.forEach(product => {
            const productItem = new ProductItem(product);
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

            let findProduct = this.products.find(product => product.product_name === title);

            findProduct.price = findProduct.price - (findProduct.price * (discnt / 100));
        });
    }

    addItemToCart() {
        const productsCont = document.querySelector('.products-list');

        productsCont.addEventListener('click', (event) => {
            let btn = event.path[0];

            if (btn.classList[0] === 'product-buy') {

                let foundItem = this.products.find(product => product.id_product === +btn.dataset.id);
                let cartItemList = document.querySelectorAll('.cart-item');
                let cartFoundItem = cartList.products.find(cartItem => cartItem.id_product === +btn.dataset.id);

                if (cartItemList.length !== 0 && cartFoundItem) {

                    cartItemList.forEach(cartItem => {
                        if (cartItem.dataset.id === btn.dataset.id) {

                            let productFinde = cartList.products.find(product => product.id_product === +btn.dataset.id);
                            let input = cartItem.querySelector('.number-of-goods');

                            productFinde.quantity += 1;
                            input.value = productFinde.quantity;
                        }
                    })
                } else {

                    for (let cartItem of cartItemList) {
                        cartItem.remove();
                    }

                    if (!foundItem.quantity) {
                        foundItem.quantity = 1;
                    }

                    cartList.products.push(foundItem);
                    cartList.render();
                }
            }
        })
    }
}
class ProductItem {
    constructor(product) {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.img = product.img;
    }
    render() {
        let { id, title, price, img = "img/product-1.png" } = this;

        return `<figure class="products-item">
    <img src="${img}" alt="Фото товара">
    <figcaption class="item-info">
    <h3>${title}</h3>
    <span class="red">${price} &#8381</span>
    <button class="product-buy" type="button" data-id='${id}'>Купить</button>
    </figcaption></figure>`
    }
}

const list = new ProductsList();
list.render();

class CartList {
    constructor() {
        this.products = [];
        this._getProducts()
            .then(data => {
                this.products = data.contents;
                this.render();
                this.addProduct();
            });
    }
    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json()
                .catch(error => {
                    console.log(error);
                    return data === undefined;
                })
            )
    }

    render() {

        let cartCont = document.querySelector('.cart-content');

        this.products.forEach(product => {
            const cartItem = new CartItem(product);
            cartCont.insertAdjacentHTML('beforeend', cartItem.render());
        });

        this.showMessage(cartCont);

    }

    showMessage(cartList) {
        let cartText = document.querySelector('.no-product-in-cart');

        if (document.querySelector('.cart-item') && cartText) {

            cartList.removeChild(cartText);

        } else if (!document.querySelector('.cart-item') && !cartText) {
            cartList.insertAdjacentHTML('beforeend', '<span class="no-product-in-cart">У Вас пока что нет товаров в корзине</span>');
        }
    }

    addProduct() {


        let cartList = document.querySelector('.cart-content');

        cartList.addEventListener('click', (event) => {

            let btn = event.path[0];
            let input = btn.parentNode.querySelector('.number-of-goods');

            if (btn.classList[1] === "remove-product") {

                this.removeProducts(btn.dataset.id, input);
                this.showMessage(cartList);

            } else if (btn.classList[1] === "add-product") {

                this.addProducts(btn.dataset.id, input);
            }
        })
    }

    removeProducts(idBtn, input) {

        let figureList = document.querySelectorAll('.cart-item');
        let productFinde = this.products.find(product => product.id_product === +idBtn);

        if (productFinde.quantity !== 1) {

            productFinde.quantity -= 1;

            input.value = productFinde.quantity;

        } else {

            this.products.splice(this.products.indexOf(productFinde), 1);


            for (let figure of figureList) {
                if (figure.dataset.id === idBtn) {
                    figure.remove();
                }
            }
        }
    }

    addProducts(idBtn, input) {

        let productFinde = this.products.find(product => product.id_product === +idBtn);

        productFinde.quantity += 1;

        input.value = productFinde.quantity;

    }
}

class CartItem {
    constructor(product) {
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.img = product.img;
        this.quantity = product.quantity;
    }
    render() {
        let { id_product, product_name, price, img = "img/product-1.png", quantity } = this;
        return `<figure class="cart-item" data-id="${id_product}">
        <img src="${img}" alt="Фото товара">
        <figcaption class="cart-item-info">
            <div class="wrapper-for-info">
                <h3>${product_name}</h3>
                <span class="red">${price} &#8381</span>
            </div>
            <div class="wrapper-for-count-buttons">
                <button class="count-buttons__button remove-product" data-id="${id_product}"></button>
                <input class="number-of-goods" type="text" value="${quantity}" data-id="${id_product}" readonly>
                <button class="count-buttons__button add-product" data-id="${id_product}"></button>
            </div>
        </figcaption>
    </figure>`
    }
}

const cartList = new CartList();
cartList.render();

// запуск лоадера

window.addEventListener('load', function() {
    loader();
})