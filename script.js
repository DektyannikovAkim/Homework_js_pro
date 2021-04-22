'use strict'

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title = "товар отсутствует", price = "цена еще не известна") =>
    `<figure class="goods-item"><img src="#" alt="#"><figcaption class="item-info">
    <h3>${title}</h3><span>${price}</span></figcaption></figure>`;

const renderGoodsList = (list) => {
    let goodsList = document.querySelector('.goods-list');
    goodsList.innerHTML = list.map(item => renderGoodsItem(item.title, item.price)).join('');
}

renderGoodsList(goods);