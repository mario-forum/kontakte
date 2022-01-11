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
  
    // Funktionsaufruf checkLaenge, erhält DOM input Element, min und max Wert
    // Check length of user input. Pass DOM input element, min & max value
    checkLaenge(firstname, 2, 20);
    checkLaenge(lastname, 4, 10);
    checkTelefon(phone);
});

// FUNKTIONEN
// FUNCTIONS
function checkInputsNotEmpty(domArray) {
    // console.log(domArray);
    domArray.forEach( (input) => {
        // console.log(input);
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
    console.log(input.name);
    return input.name;
}

// Input leer Funktion
// Input empty
function checkFehler(input, message) {
    const formInput = input.parentElement;
    formInput.className = 'form-input error';
    const small = formInput.querySelector('small');
    small.innerText = message;
}

// Input nicht leer Funktion
// Input not empty Function
function checkOK(input) {
    const formInput = input.parentElement;
    formInput.className = 'form-input success'
    // formInput.classList.add('success'); // Füge neuen css-classname zusätzlich zu
}

// Pruefe laenger der User-Eingabe
// Check user input length
function checkLaenge(input, min, max) {    
    if (input.value.length < min) { // < min checkFehler
        checkFehler(input, `${getInputName(input)} muss mindestens ${min} Characters lang sein`);        
    } else if (input.value.length > max) { // > max checkFehler        
        checkFehler(input, `${getInputName(input)} darf nicht laenger als ${max} Characters lang sein`);
    } else { // checkOK   
         checkOK(input);        
    }
}

// Prüfe Telefonnr.
// Check phone no.
function checkTelefon(input) {
    // regex
    const regex = /\(?\+\(?49\)?[ ()]?([- ()]?\d[- ()]?){10}/g;

    // if regex
    if (regex.test(input.value)) {
        // true
        checkOK(input)
    } else {
        // false 
        checkFehler(input, 'Keine Telefonnr.')
    }
   
    // Hausaufgabe: regex für e-mailadressen suchen & testen
}