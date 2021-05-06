'use strict'

// лоадер

function loader() {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function() {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);
}

// модальное окно

let cart = document.querySelector('#modal');
let modalOpen = document.querySelector('#opnCart');
let modalclose = document.querySelector('.close-cart-list');
modalOpen.addEventListener('click', () => {
    cart.style.display = "block";
});

modalclose.addEventListener('click', () => {
    cart.style.display = "none";
})

window.onclick = (event) => {
    if (event.target == cart) {
        cart.style.display = "none";
    }
}