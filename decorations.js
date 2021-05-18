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



// Валидация формы обратной связи

let form = document.querySelector('.feedback');

if (form) {
    const regExpForName = /^[a-zа-я']+$/iu;
    const regExpForNumb = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i;
    const regExpForMail = /^([a-z0-9_\.-]{1,16})@([a-z0-9_\.-]+)\.([a-zрф\.]{2,6})$/iu;
    const regExpForAppeal = /^[a-zа-я'0-9_-]+$/iu;

    let arrInput = [document.querySelector('.name'), document.querySelector('.numb'), document.querySelector('.mail'), document.querySelector('.appeal')];
    let arrRegExp = [regExpForName, regExpForNumb, regExpForMail, regExpForAppeal];

    form.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('send')) {

            for (let i = 0; i < arrInput.length; i++) {
                if (!arrRegExp[i].test(arrInput[i].value)) {
                    arrInput[i].classList.add('incorrect');
                    event.preventDefault();
                } else arrInput[i].classList.remove('incorrect');
            }
        }
    })
}