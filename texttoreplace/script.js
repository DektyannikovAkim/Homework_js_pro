'use strict'

let text = document.querySelector('p');
const regexp = /\B'/g;

console.log(text.textContent);

text.textContent = text.textContent.replace(regexp, '"');