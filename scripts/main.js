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
    let keybordBuilder = () => {;
        // button objects with special functions
        const capsLock = {
            value: "",
            style: {
                width: "13%"
            },
            class: {
                0: "fal",
                1: "fa-arrow-alt-up",
            },
            operator: () => {
                let btn = document.querySelectorAll(".words button");
                let indicatorBtn = document.querySelector(".fa-arrow-alt-up div");
                
                for(let i = 0; i < btn.length; i++) {
                    if ((/[a-z]/.test(btn[i].innerText) || /[A-Z]/.test(btn[i].innerText)) && btn[i].innerText !== "Sym") {
                        let isLowerCase = true;
                    
                        if (/[a-z]/.test(btn[i].innerHTML)) {
                            btn[i].innerText = btn[i].innerText.toUpperCase();
                            indicatorBtn.style.background = " rgb(16, 230, 16)";
                            isLowerCase = false;
                        }
    
                        if (isLowerCase) {
                            indicatorBtn.style.background = "rgba(218, 218, 218, 0.6)";
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

                let txtVal = input.value;
                let updateVal = `${txtVal.slice(0, input.selectionStart - 1)}${txtVal.slice(input.selectionStart)}`;
                input.value = updateVal;
                
                //create a function that removes everything witch is highlighted
                //input.selectionStart = 1;
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
            newBtn.style.position = "relative";
    
            // setting the behavior of each button based on its type and functionality.
            switch (true) {
    
                // adding character to textarea for normal buttons (words & numbers & symbols) 
                case (typeof(item) === "string" || typeof(item) === "number") :
                    newBtn.innerHTML = item;
                    words.appendChild(newBtn);
            
                    newBtn.addEventListener("click", function() {
                        const txt = this.innerText;
                        input.value += txt;
                    });
                    break;
    
                // displaying buttons with special application and calling their functions on click event
                default :
                    words.appendChild(newBtn);

                    if (item.style.width !== "") {
                        newBtn.style.width = item.style.width;
                    }
    
                    if (item.class[0] !== "" && item.class[1] !== "") {
                        newBtn.classList.add(item.class[0], item.class[1]);
                    }
    
                    //for capsLock btn indicator light 
                    if  (/fa-arrow-alt-up/.test(newBtn.className)) {
                        let indicatorBtn = document.createElement("div");
                        indicatorBtn.style.position = "absolute";
                        indicatorBtn.style.top = "15%";
                        indicatorBtn.style.right = "10%";
                        indicatorBtn.style.borderRadius = "100%";
                        indicatorBtn.style.background = "rgba(218, 218, 218, 0.6)";
                        indicatorBtn.style.width = "0.525rem";
                        indicatorBtn.style.height = "0.525rem";
                        indicatorBtn.style.transition = "0.2s ease-in all";

                        newBtn.appendChild(indicatorBtn);
                    }

                    if (item.value !== "") {
                        newBtn.innerHTML = item.value;
                    }
    
                    newBtn.addEventListener("click", item.operator);
                    break;
            }
        });
    };

    keybordBuilder();
    console.log(document.querySelector(".fa-arrow-alt-up").childNodes);
};

keyboardApp();