"use strict";
// DOM Elemente
// Eventlistener
// Fuktionen

// Kontakte-Array
let kontakte = [];

// DOM Elemente
const form = document.getElementById("form");
const firstname = document.getElementById("firstnameId");
const lastname = document.getElementById("lastnameId");
const phone = document.getElementById("phoneId");
const email = document.getElementById("email");
const suche = document.getElementById("suche");
const clear = document.getElementById("clear");

// Eventlistener für Formular
form.addEventListener("submit", function (e) {
  // Form submit unterbinden
  e.preventDefault("submit");

  // Funktionsaufruf, erhält ein Array als Parameter
  // Call pass an array as parameter
  checkInputsNotEmpty([firstname, lastname, phone, email]); // checkInputsNichtLeer()

  // Funktionsaufruf checkLaenge, erhält DOM input Element, min und max Wert
  // Check length of user input. Pass DOM input element, min & max value
  if (
    checkLaenge(firstname, 2, 20) &&
    checkLaenge(lastname, 4, 10) &&
    checkTelefon(phone) &&
    checkEmail(email)
  ) {
    // in das kontakte[] wird ein objekt zugefügt
    // add an object to kontakte[]
    kontakte.push(
      kontaktFactory(firstname.value, lastname.value, phone.value, email.value)
    );

    // Zur Liste zufügen
    // Add to list
    listeAuffuellen("liste", kontakte);

    // In den LS schreiben
    // Write into LS
    toLocalStorage("lsJsonObject", serialize(kontakte));
    // clearText(firstname, lastname, phone, email);
    clearText([firstname, lastname, phone, email]);
  }
});

// Eventlistener fuer Sucheingabe
suche.addEventListener("input", (e) => sucheKontakt(e.target.value));

// Eventlistener fuer clear LS
clear.addEventListener("click", clearLocalStorage);

// Gole daten aus LS
// Get data from LS
const initData = parse(getFromLocalStorage("lsJsonObject"));

// Initialisiere kontake[] mit Daten aus dem LS
// Initialize kontakte[] with LS daat
initKontakte(initData);

// FUNKTIONEN
// FUNCTIONS
function checkInputsNotEmpty(domArray) {
  // console.log(domArray);
  domArray.forEach((input) => {
    // console.log(input);
    if (input.value.trim() === "") {
      // Funktionsaufruf Fehlermeldung
      checkFehler(input, `${getInputName(input)} ist erforderlich`);
    } else {
      // Funktionsaufruf Erfolgreich
      checkOK(input);
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
  formInput.className = "form-input error";
  const small = formInput.querySelector("small");
  small.innerText = message;
}

// Input nicht leer Funktion
// Input not empty Function
function checkOK(input) {
  const formInput = input.parentElement;
  formInput.className = "form-input success";
  // formInput.classList.add('success'); // Füge neuen css-classname zusätzlich zu
}

// Pruefe laenger der User-Eingabe
// Check user input length
function checkLaenge(input, min, max) {
  if (input.value.length < min) {
    // < min checkFehler
    checkFehler(
      input,
      `${getInputName(input)} muss mindestens ${min} Characters lang sein`
    );
    return false;
  } else if (input.value.length > max) {
    // > max checkFehler
    checkFehler(
      input,
      `${getInputName(
        input
      )} darf nicht laenger als ${max} Characters lang sein`
    );
    return false;
  } else {
    // checkOK
    checkOK(input);
    return true;
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
    checkOK(input);
    return true;
  } else {
    // false
    checkFehler(input, "Keine Telefonnr.");
    return false;
  }
}

// Prüfe E-Mailadresse
// Check e-mailadress
function checkEmail(input) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\u0022(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\u0022)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (regex.test(input.value)) {
    checkOK(input);
    return true;
  } else {
    checkFehler(input, "Keine gültige E-Mailadresse");
    return false;
  }
}

// BROWSER & OUTPUT

// Factory function
// Fabrik Funktion

// kontakt Factory
const kontaktFactory = (fname, lname, phone, email) => {
  return {
    firstname: fname,
    lastname: lname,
    phone: phone,
    email: email,
  };
};

// Liste befüllen
// Populate list
function listeAuffuellen(elementId, inputArr) {
  const liste = document.getElementById(elementId);

  // UL-Tag leeren
  // Clear ul-tag
  liste.innerHTML = "";

  inputArr.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <div class="kontakt-info">
                <h4>${item.lastname}</h4>
                <p>${item.firstname}</p>
                <p>${item.phone}</p>
                <p>${item.email}</p>
            </div>
        `;

    liste.appendChild(li);
  });
}

// ANTONIO
// function toLocalStorage(localstorageKey, localstorageValue) {
//     const jsonString = JSON.stringify(localstorageValue);

//     localStorage.setItem(localstorageKey,jsonString);
// }

// Schreibe in den LS
// Write to LS
function toLocalStorage(localstorageKey, localstorageValue) {
  localStorage.setItem(localstorageKey, localstorageValue);
}

// Hole aus LS
// Get from LS
function getFromLocalStorage(localstorageKey) {
  return localStorage.getItem(localstorageKey);
}

// Serialisiere in JSON
// Serialize into JSON
function serialize(data) {
  return JSON.stringify(data);
}

// JSON in JS data
// Parse JSON
function parse(data) {
  return JSON.parse(data);
}

// Initialisiere kontakte[] mit LS Daten & erzeuge HTML-Liste
// Initialize kontakte[] & populate HTML-list
function initKontakte(data) {
  //pürfen ob LS data nicht leer
  if (data != null) {
    //für jedes obj data in kontakte[] push
    data.forEach((obj) => {
      kontakte.push(obj);
    });
    // erzeuge liste
    listeAuffuellen("liste", kontakte);
  }
}

// ALEX Inputs leeren
// ALEX clear input fileds
// function clearText() {
//     document.getElementById('firstnameId').value = '';
//     document.getElementById('lastnameId').value = '';
//     document.getElementById('phoneId').value = '';
//     document.getElementById('email').value = '';
// }

// MARIO 1 Inputs leeren
// MARIO 1 clear input fields
// function clearText(firstname, lastname, phone, email) {
//     firstname.value = '';
//     lastname.value = '';
//     phone.value = '';
//     email.value = '';
// }

// MARIO 2 Inputs leeren
// MARIO 2 clear input fields
function clearText(domArray) {
  domArray.forEach((input) => {
    input.value = "";
  });
}

// SUCH-FUNKTION
/**
 * hole li's
 * itteriere ueber li's
 *      kontrolliere fuer jedes li ob suche == inhalt von li
 *      alle buchstaben in GROSS oder klein
 *      manipuliere entsprechend such resultat css classes
 */
function sucheKontakt(suchValue) {
  const listItems = document.querySelectorAll("li"); // hole li's

  listItems.forEach((eintrag) => {
    // itteriere ueber li's
    if (
      /* kontrolliere fuer jedes li ob suche == inhalt von li */
      eintrag.innerText
        .toLocaleLowerCase()
        .includes(suchValue.toLocaleLowerCase())
    ) {
      eintrag.classList.remove("hide");
    } else {
      eintrag.classList.add("hide");
    }
  });
}

/**
 * Die Methode toLocaleLowerCase() gibt den Wert der Zeichenkette zurück,
 * der entsprechend der lokal-spezifischen Groß-/Kleinschreibung konvertiert wurde.
 * toLocaleLowerCase() hat keinen Einfluss auf den Wert der Zeichenkette selbst.
 * In den meisten Fällen führt dies zum gleichen Ergebnis wie toLowerCase(), aber für einige Sprachumgebungen,
 * wie z.B. Türkisch, deren Groß-/Kleinschreibung nicht den Standard-Groß-/Kleinschreibungszuordnungen in Unicode folgt,
 * kann es ein anderes Ergebnis geben.
 */

// Clear LocalStorage
function clearLocalStorage() {
  localStorage.clear();
  location.reload();
}
