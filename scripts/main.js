"use strict";

// hiding/uhiding the keyboard
const input = document.getElementsByClassName("input")[0].childNodes[1];
const keyboard = document.getElementsByClassName("keyboard")[0];

input.addEventListener("click", (ev) => {
    keyboard.style.bottom = "0";
    window.location.hash = "jumpToInput";
    // to prevent bubbling up to parent element for hiding the keyboard
    ev.stopPropagation();
}, false);

keyboard.addEventListener("click", (ev) => {
    // to prevent bubbling up to parent element for hiding the keyboard
    ev.stopPropagation();
}, false);

window.addEventListener("click", () => {
    window.location.hash = "jumpToTheTop";
    keyboard.style.bottom = "-100vh";
});


// append with one key
// create one key