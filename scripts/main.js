"use strict";

//  ENTRY POINT FOR BUTTON ARRAYS
let keysObj1 = {
    arr : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m",":)", "."],
    switcher : "ABC"
} 

let keysObj2 = {
    arr : ["+", "&times;", "&div;", "=", "%", "_", "&euro;", "&pound;", "&yen;", "&cent;","!", "@", "#", "$", "/", "^", "&", "*", "(", ")", "`", "~", "\\", "|", "<", ">", "{", "}", "[", "]", "-", "'", "\"", ":", ";", ",", "?", ";D", "."],
    switcher : "Sym"
} 

let keyboardApp = () => {

    const input = document.getElementsByClassName("input")[0].childNodes[1];

    // KEYBOARD LAYOUT BUILDER
    const keyboardLayout = document.createElement("div");

    keyboardLayout.style.position = "fixed";
    keyboardLayout.style.display = "flex";
    keyboardLayout.style.justifyContent = "space-evenly";
    keyboardLayout.style.width = "100%";
    keyboardLayout.style.height = "40vh";
    keyboardLayout.style.minHeight = "15.75rem";
    keyboardLayout.style.bottom = "-100vh";
    keyboardLayout.style.left = "0";
    keyboardLayout.style.background = "rgba(241, 241, 241, 1.0)";
    keyboardLayout.style.boxShadow = "0px -3px 10px rgb(206, 205, 205)";
    keyboardLayout.style.transition = "0.4s ease-in-out all";
    keyboardLayout.style.fontSize = "1.1rem";

    let app = document.getElementsByClassName("app")[0];
    app.appendChild(keyboardLayout);


    // KEYBOARD DISPLAYER
    let keyboardDisplayer = (input, keyboardLayout) => {
        input.addEventListener("click", (ev) => {
            keyboardLayout.style.bottom = "0";
            window.location.hash = "jumpToInput";
            document.getElementById("jumpToInput").focus();
            document.childNodes[1].style.overflowY = "auto";
            ev.stopPropagation();
        }, false);
        
        keyboardLayout.addEventListener("click", (ev) => {
            document.getElementById("jumpToInput").focus();
            document.childNodes[1].style.overflowY = "auto";
            ev.stopPropagation();
        }, false);
        
        window.addEventListener("click", () => {
            window.location.hash = "jumpToTheTop";
            keyboardLayout.style.bottom = "-100vh";
            setTimeout(() => document.childNodes[1].style.overflowY = "hidden", 500);
            ;
        });
    }
    
    keyboardDisplayer(input, keyboardLayout);


    // KEYBOARD BUILDER
    let keyboardBuilder = (keyboardArr1, keyboardArr2, switcher1 = "ABC", switcher2 = "Sym", defDsply1 = "flex", defDsply2 = "none") => {
    
        // KEYS CONTAINER BUILDER
        let keysContainer1 = document.createElement("div");
        keysContainer1.classList.add("keysContainer1");
        keysContainer1.style.display = defDsply1;
        keysContainer1.style.flexFlow = "row wrap";
        keysContainer1.style.justifyContent = "center";
        keysContainer1.style.alignItems = "center";
        keyboardLayout.appendChild(keysContainer1);

        let keysContainer2 = document.createElement("div");
        keysContainer2.classList.add("keysContainer2");
        keysContainer2.style.display = defDsply2;
        keysContainer2.style.flexFlow = "row wrap";
        keysContainer2.style.justifyContent = "center";
        keysContainer2.style.alignItems = "center";
        keyboardLayout.appendChild(keysContainer2);

        // SPECIAL BUTTONS INJECTOR
        let btnInjector = (array) => {
            
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
                    let btn = document.querySelectorAll(".keysContainer1 button");
                    let indicatorBtn = document.querySelector(".fa-arrow-alt-up div");
                    
                    for(let i = 0; i < btn.length; i++) {
                        if (/[a-zA-Z]/.test(btn[i].innerText) && btn[i].innerText != switcher2) {
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
        
            const keyboardSwitch = {
                value: null,
                style: {
                    width: "13%"
                },
                class: {
                    0: "",
                    1: ""
                },
                operator: () => {
                    let switcherBtn = document.getElementById("switcherBtn");

                    switch (keysContainer1.style.display) {
                        case "none":
                            keysContainer1.style.display ="flex"
                            keysContainer2.style.display = "none";
                            break;
                        case "flex":
                            keysContainer1.style.display ="none"
                            keysContainer2.style.display = "flex";
                            break;
                    }
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

            array.push(lineBreak);
            array.splice(array.length - 2, 0, spaceBar);
            array.splice(array.length - 4, 0, keyboardSwitch);
            array.splice(array.length - 5, 0, backSpace);
            array.splice(array.length - 13, 0, capsLock);

        };

        btnInjector(keyboardArr1);
        btnInjector(keyboardArr2);

        // BUTTON BUILDER
        let btnBuilder = (array, keysContainer) => {
            array.forEach(item => {
    
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
                    case (typeof(item) === "string") :
                        newBtn.innerHTML = item;
                        keysContainer.appendChild(newBtn);
                
                        newBtn.addEventListener("click", function() {
                            input.value += this.innerText;
                        });
                        break;
        
                    // displaying buttons with special application and calling their functions on click event
                    default :
                        keysContainer.appendChild(newBtn);
    
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
                            indicatorBtn.style.transition = "0.15s ease-in all";
    
                            newBtn.appendChild(indicatorBtn);
                        }
    
                        if (item.value == null) {
                            switch (true) {
                                case (array === keysObj1.arr) :
                                    newBtn.innerHTML = switcher2;
                                    break;
                                case (array === keysObj2.arr) :
                                    newBtn.innerHTML = switcher1;
                                    break;
                            }
                        }
        
                        newBtn.addEventListener("click", item.operator);
                        break;
                }
            });
        };

        btnBuilder(keyboardArr1, keysContainer1);
        btnBuilder(keyboardArr2, keysContainer2);
    };
    
    keyboardBuilder(keysObj1.arr, keysObj2.arr, keysObj1.switcher, keysObj2.switcher);
    
};

window.addEventListener("load", keyboardApp);
