'use strict'

// лоадер

function loader() {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function() {
        document.querySelector('.preloader').style.display = "none";
        document.body.classList.remove('loaded_hiding');
    }, 500);
}

window.addEventListener('load', function() {
    loader();
});

// модальное окно

let cart = document.querySelector('#modal');

if (cart) {
    let modalOpen = document.querySelector('#opnCart');
    let modalclose = document.querySelector('.close-cart-list');
    modalOpen.addEventListener('click', () => {
        cart.style.display = "block";
    });

    modalclose.addEventListener('click', () => {
        cart.style.display = "none";
    })
}