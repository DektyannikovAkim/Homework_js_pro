'use strict'

const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const productsCont = document.querySelector('.products-list');
class ProductsList {
    constructor() {
        this.products = [];
        this._getProducts()
            .then(data => {
                this.products.push(...data);
                // this.applyDiscount(['Ноутбук', 'Мышка'], 10);
                this.render(data);
                // console.log(this.sumOfProducts());
            });
        this.addClickHandler();
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json()).catch(error => {
                console.log(error);
                return [];
            })
    }

    render(products) {
        productsCont.textContent = '';
        products.forEach(product => {
            productsCont.insertAdjacentHTML('beforeend', this.renderProductItem(product));
        });
    }

    renderProductItem(product) {
        let { id_product, product_name, price, img = "img/product-1.png" } = product;

        return `<figure class="products-item">
                    <img src="${img}" alt="Фото товара">
                    <figcaption class="item-info">
                        <h3>${product_name}</h3>
                        <span class="red">${price} &#8381</span>
                        <button class="product-buy" type="button" data-id='${id_product}'>Купить</button>
                    </figcaption>
                </figure>`
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

    addClickHandler() {


        productsCont.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('product-buy')) {
                const id = +target.dataset.id;
                let product = this.products.find(product => product.id_product === id);
                cartList.addProductFromList(product);
            }
        })
    }

    searchProducts(searchQuery) {
        this.products = [];
        searchQuery = searchQuery.toLowerCase()
        this._getProducts().then(data => {
            data.forEach(item => {
                if (item.product_name.toLowerCase().includes(searchQuery)) {
                    this.products.push(item);
                }
            })
            this.render(this.products);
        });
    }
}

const list = new ProductsList();

class CartList {
    constructor() {
        this.products = [];
        this._getProducts()
            .then(data => {
                this.products.push(...data.contents);
                this.render(data.contents);
                this.addProductHandlers();
            });
    }
    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json()).catch(error => {
                console.log(error);
                return {
                    contents: []
                };
            })
    }

    render(products) {
        products.forEach(this.renderItem);
        this.checkEmptyMessage();
    }

    renderItem(item) {
        let { id_product, product_name, price, img = "img/product-1.png", quantity } = item;
        document.querySelector('.cart-content').insertAdjacentHTML('beforeend', `<figure class="cart-item" data-id="${id_product}">
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
    </figure>`)
    }

    checkEmptyMessage() {
        let cartText = document.querySelector('.no-product-in-cart');

        cartText.hidden = !!this.products.length;
    }

    addProductHandlers() {


        let cartList = document.querySelector('.cart-content');

        cartList.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('remove-product')) {
                this.removeProduct(+target.dataset.id);
            } else if (target.classList.contains('add-product')) {
                this.addProduct(+target.dataset.id);
            }
        })
    }

    removeProduct(id) {
        let elem = document.querySelector(`.cart-item[data-id="${id}"]`);
        let input = elem.querySelector('input.number-of-goods')
        let product = this.products.find(p => p.id_product == id);
        if (product.quantity > 1) {
            input.value = product.quantity -= 1
        } else {
            this.products.splice(this.products.indexOf(product), 1);
            elem.remove();
            this.checkEmptyMessage();
        }
    }

    addProduct(id) {
        let input = document.querySelector(`.cart-item[data-id="${id}"] input.number-of-goods`);
        let productFinde = this.products.find(product => product.id_product == id);

        input.value = productFinde.quantity += 1;
    }

    addProductFromList(product) {
        let productInCart = this.products.find(p => p.id_product === product.id_product);
        if (!productInCart) {
            productInCart = {...product, quantity: 1 };
            this.products.push(productInCart);
            this.renderItem(productInCart);
            this.checkEmptyMessage();
        } else {
            this.addProduct(productInCart.id_product);
        }
    }
}

const cartList = new CartList();

const search = document.querySelector('.search');
search.addEventListener('submit', (ev) => {
    ev.preventDefault();
    console.log(ev.target.querySelector('.search-text').value)
    list.searchProducts(ev.target.querySelector('.search-text').value);
})