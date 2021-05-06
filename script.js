'use strict'

const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class ProductsList {
    constructor() {
        this.products = [];
        this._getProducts()
            .then(data => {
                this.products = [...data];
                this.render()
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json()
                .catch(error => {
                    console.log(error);
                })
            )
    }

    render() {
        let productsList = document.querySelector('.products-list');

        this.products.forEach(product => {
            const productItem = new ProductItem(product.id_product, product.product_name, product.price, product.img);
            productsList.insertAdjacentHTML('beforeend', productItem.render());
        });
        this.addItemToCart(productsList);
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

    addItemToCart() {
        let btnList = document.querySelectorAll('.product-buy');
        let cartContentList = document.querySelector('.cart-content');

        btnList.forEach(btn => {
            btn.addEventListener('click', () => {
                let foundItem = this.products.find(product => product.id_product === +btn.id);
                let cartItemList = document.querySelectorAll(".cart-item");
                let cartFoundItem = cartList.products.find(cartItem => cartItem.id_product === +btn.id);

                if (cartItemList.length !== 0 && cartFoundItem) {

                    cartItemList.forEach(cartItem => {
                        if (cartItem.id === btn.id) {

                            let inputList = document.querySelectorAll('.number-of-goods');
                            let productFinde = cartList.products.find(product => product.id_product === +btn.id);

                            productFinde.quantity += 1;
                            for (let elem of inputList) {
                                if (elem.id === btn.id) {
                                    elem.value = productFinde.quantity;
                                }
                            }
                        }
                    })
                } else {
                    let figureList = document.querySelectorAll('.cart-item');
                    for (let figure of figureList) {
                        figure.parentNode.removeChild(figure);;
                    }
                    const cartItem = new CartItem(foundItem.id_product, foundItem.product_name, foundItem.price, foundItem.img, foundItem.quantity = 1);
                    cartList.products.push(cartItem);
                    cartList.render();
                }

            })
        })
    }
}

class ProductItem {
    constructor(id, title, price, img) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        let { id, title, price, img = "img/product-1.png" } = this;

        return `<figure class="products-item">
    <img src="${img}" alt="Фото товара">
    <figcaption class="item-info">
    <h3>${title}</h3>
    <span class="red">${price} &#8381</span>
    <button class="product-buy" type="button" id='${id}'>Купить</button>
    </figcaption></figure>`
    }
}

const list = new ProductsList;
list.render();

class CartList {
    constructor() {
        this.products = [];
        this._getProducts()
            .then(data => {
                this.products = [...data.contents];
                this.render()
            });
    }
    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json()
                .catch(error => {
                    console.log(error);
                })
            )
    }

    removeProducts(idBtn, inptList, figureList) {

        let productFinde = this.products.find(product => product.id_product === +idBtn);

        if (productFinde.quantity !== 1) {
            productFinde.quantity -= 1;
            for (let elem of inptList) {
                if (elem.id === idBtn) {
                    elem.value = productFinde.quantity;
                }
            }
        } else {
            this.products.splice(this.products.indexOf(productFinde), 1);
            for (let figure of figureList) {
                if (figure.id === idBtn) {
                    figure.parentNode.removeChild(figure);;
                }
            }
        }
    }

    addProducts(idBtn, inptList) {

        let productFinde = this.products.find(product => product.id_product === +idBtn);

        productFinde.quantity += 1
        for (let elem of inptList) {
            if (elem.id === idBtn) {
                elem.value = productFinde.quantity;
            }
        }
    }

    render() {

        let cartList = document.querySelector('.cart-content');

        this.products.forEach(product => {
            const cartItem = new CartItem(product.id_product, product.product_name, product.price, product.img, product.quantity);
            cartList.insertAdjacentHTML('beforeend', cartItem.render());
        });

        this.showMessage(cartList);
        this.addProduct(cartList);

    }

    showMessage(cartList) {
        let cartText = document.querySelector('.no-product-in-cart');

        if (document.querySelector('.cart-item') && cartText) {
            cartList.removeChild(cartText);
        } else if (!document.querySelector('.cart-item') && !cartText) {
            cartList.insertAdjacentHTML('beforeend', '<span class="no-product-in-cart">У Вас пока что нет товаров в корзине</span>');
        }
    }

    addProduct(cartList) {
        let buttonCartList = document.querySelectorAll('.count-buttons__button');
        let inputList = document.querySelectorAll('.number-of-goods');
        let figureList = document.querySelectorAll('.cart-item');

        buttonCartList.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList[1] === "remove-product") {
                    this.removeProducts(btn.id, inputList, figureList);
                    this.showMessage(cartList);
                } else if (btn.classList[1] === "add-product") {
                    this.addProducts(btn.id, inputList);
                }
            })
        })
    }
}

class CartItem {
    constructor(id, title, price, img, quantity) {
        this.id_product = id;
        this.product_name = title;
        this.price = price;
        this.img = img;
        this.quantity = quantity;
    }
    render() {
        let { id_product, product_name, price, img = "img/product-1.png", quantity = 1 } = this;
        return `<figure class="cart-item" id="${id_product}">
        <img src="${img}" alt="Фото товара">
        <figcaption class="cart-item-info">
            <div class="wrapper-for-info">
                <h3>${product_name}</h3>
                <span class="red">${price} &#8381</span>
            </div>
            <div class="wrapper-for-count-buttons">
                <button class="count-buttons__button remove-product" id="${id_product}"></button>
                <input class="number-of-goods" type="text" value="${quantity}" id="${id_product}" readonly>
                <button class="count-buttons__button add-product" id="${id_product}"></button>
            </div>
        </figcaption>
    </figure>`
    }
}

const cartList = new CartList;
cartList.render();

// запуск лоадера

window.addEventListener('load', function() {
    loader();
})