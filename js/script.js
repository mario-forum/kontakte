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
    // Form submit unterbinden
    e.preventDefault('submit');

    // Funktionsaufruf, erhält ein Array als Parameter
    // Call pass an array as parameter
    checkInputsNotEmpty([firstname, lastname, phone, email]) // checkInputsNichtLeer()
});

// FUNKTIONEN
// FUNCTIONS
function checkInputsNotEmpty(domArray) {
    // console.log(domArray);
    domArray.forEach( (input) => {
        // console.log(input.value);
        if (input.value.trim() === "") {
            // Funktionsaufruf Fehlermeldung
            checkFehler(input, `${getInputName(input)} ist erforderlich`);
        } else {
            // Funktionsaufruf Erfolgreich
            checkOK(input)
        }
    });
}

// Gibt die ID des Input-Elements zurück
// Returns id of input element
function getInputName(input) {
    return input.id;
}

// Input leer Funktion
// Input empty
function checkFehler(input, message) {
    const formInput = input.parentElement;
    formInput.className = 'form-input error';
    const small = document.querySelector('small');
    small.innerText = message;
}

// Input nicht leer Funktion
// Input not empty Function
function checkOK(input) {
    const formInput = input.parentElement;
    formInput.className = 'form-input success'
    // formInput.classList.add('success'); // Füge neuen css-classname zusätzlich zu
}