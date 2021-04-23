'use strict'

const getRandomNumber = () => Math.round(Math.random() * (100 - 1) + 1);

const products = [
    { title: 'Shirt', price: 150, img: `https://picsum.photos/seed/${getRandomNumber()}/260/280` },
    { title: 'Socks', price: 50, img: `https://picsum.photos/seed/${getRandomNumber()}/260/280` },
    { title: 'Jacket', price: 350, img: `https://picsum.photos/seed/${getRandomNumber()}/260/280` },
    { title: 'Shoes', price: 250, img: `https://picsum.photos/seed/${getRandomNumber()}/260/280` },
];

const renderProductItem = (product) =>
    `<figure class="products-item">
    <img src="${product.img}" alt="Фото товара">
    <figcaption class="item-info">
    <h3>${product.title}</h3>
    <span class="red">${product.price}$</span>
    <button class="product-buy" type="button">Купить</button>
    </figcaption></figure>`;

const renderProductList = (list) => {
    let productsList = document.querySelector('.products-list');
    productsList.innerHTML = list.map(productItem => renderProductItem(productItem)).join('');
}

renderProductList(products);