'use strict'
// DOM Elemente
// Eventlistener
// Fuktionen

// Kontakte-Array
let kontakte = [];

// DOM Elemente
const form = document.getElementById('form');
const firstname = document.getElementById('firstnameId');
const lastname = document.getElementById('lastnameId');
const phone = document.getElementById('phoneId');
const email = document.getElementById('email');

// Eventlistener für Formular
form.addEventListener('submit', function (e) {
    e.preventDefault('submit');
    console.log(e);
});