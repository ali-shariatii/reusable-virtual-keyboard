"use strict";


let keyboardApp = () => {

    const input = document.getElementsByClassName("input")[0].childNodes[1];
    const keyboard = document.getElementsByClassName("keyboard")[0];
    const words = keyboard.childNodes[1];

    // KEYBOARD DISPLAYER
    let keyboardDisplayer = (input, keyboard) => {
        input.addEventListener("click", (ev) => {
            keyboard.style.bottom = "0";
            window.location.hash = "jumpToInput";
            document.getElementById("jumpToInput").focus();
            document.childNodes[1].style.overflowY = "auto";
            ev.stopPropagation();
        }, false);
        
        keyboard.addEventListener("click", (ev) => {
            document.getElementById("jumpToInput").focus();
            document.childNodes[1].style.overflowY = "auto";
            ev.stopPropagation();
        }, false);
        
        window.addEventListener("click", () => {
            window.location.hash = "jumpToTheTop";
            keyboard.style.bottom = "-100vh";
            setTimeout(() => document.childNodes[1].style.overflowY = "hidden", 1000);
            ;
        });
    }
    
    keyboardDisplayer(input, keyboard);

    // KEYBOARD BUILDER
    let keybordBuilder = () => {
        // button objects with special functions
        const capsLock = {
            value: "",
            style: {
                width: "13%"
            },
            class: {
                0: "fal",
                1: "fa-arrow-alt-up"
            },
            operator: () => {
                let btn = document.querySelectorAll(".words button");
    
                for(let i = 0; i < btn.length; i++) {
                    if ((/[a-z]/.test(btn[i].innerHTML) || /[A-Z]/.test(btn[i].innerHTML)) && btn[i].innerHTML !== "Sym") {
                        let isLowerCase = true;
    
                        if (/[a-z]/.test(btn[i].innerHTML)) {
                            btn[i].innerText = btn[i].innerText.toUpperCase();
                            isLowerCase = false;
                        }
    
                        if (isLowerCase) {
                            btn[i].innerText = btn[i].innerText.toLowerCase();
                        }
                    }
                }
            } 
        }
    
        const backSpace = {
            value: "",
            style: {
                width: "13%"
            },
            class: {
                0: "fal",
                1: "fa-backspace"
            },
            operator: () => {
                //create a funciton that removes everything witch is highlighted
                const txt = input.value.slice(0, input.value.lastIndexOf(input.value.charAt(input.value.length - 1)));
                let txtNode = document.createTextNode(txt).nodeValue;
                input.value = txtNode;
            }     
        }
    
        const symbol = {
            value: "Sym",
            style: {
                width: "13%"
            },
            class: {
                0: "",
                1: ""
            },
            operator: () => {
                
            }   
        }
    
        const spaceBar = {
            value: "",
            style: {
                width: "48%"
            },
            class: {
                0: "fal",
                1: "fa-horizontal-rule"
            },
            operator: () => {
                input.value += ` `;
            } 
        }
    
        const lineBreak = {
            value: "",
    
            style: {
                width: "13%"
            },
    
            class: {
                0: "fal",
                1: "fa-arrow-alt-left"
            },
            operator: () => {
                input.value += `\n`;

            } 
        }
    
        // button entries for main keyboard ('words' class)
        let mainKeyboardArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", capsLock, "z", "x", "c", "v", "b", "n", "m", backSpace, symbol, "@", spaceBar, ".", lineBreak];
    
        // button entries for symbol keyboard ('symbols' class)

        // button builder
        mainKeyboardArr.forEach(item => {
    
            let newBtn = document.createElement("button");
    
            newBtn.style.display = "inline-flex";
            newBtn.style.justifyContent = "center";
            newBtn.style.alignItems = "center";
            newBtn.style.verticalAlign = "middle";
            newBtn.style.width = "8%";
            newBtn.style.height = "6vh";
            newBtn.style.minHeight = "2.8125rem";
            newBtn.style.margin = "0 1%";
            newBtn.style.padding = "0";
            newBtn.style.border = "none";
            newBtn.style.borderRadius = "0.5rem";
            newBtn.style.background = "rgba(255, 255, 255, 0.4)";
            newBtn.style.cursor = "pointer";
            newBtn.style.transition = "0.3s linear all";
            newBtn.style.outline = "none";
    
            // setting the behavior of each button based on its type and functionality.
            switch (true) {
    
                // adding character to textarea for normal buttons (words & numbers & symbols) 
                case (typeof(item) === "string" || typeof(item) === "number") :
                    newBtn.innerHTML = item;
                    words.appendChild(newBtn);
            
                    newBtn.addEventListener("click", function() {
                        const txt = this.innerText;
                        let txtNode = document.createTextNode(txt).nodeValue;
                        input.value += txtNode;
                    });
                    break;
    
                // displaying buttons with special application and calling their functions on click event
                default :
                    if (item.style.width !== "") {
                        newBtn.style.width = item.style.width;
                    }
    
                    if (item.class[0] !== "" && item.class[1] !== "") {
                        newBtn.classList.add(item.class[0], item.class[1]);
                    }
    
                    if (item.value !== "") {
                        newBtn.innerHTML = item.value;
                    }
    
                    words.appendChild(newBtn);
                    newBtn.addEventListener("click", item.operator);
                    break;
            }
        });
    };

    keybordBuilder();
};

keyboardApp();