"use strict";

/*********************************************************
For fast and easy integration of this keyboard into your project, 
you should only change the following after reading each one's comment:

- keysObj1.arr 
    This is your main keyboard characters. Change the items 
    as you see fit as long as the total number of them is standard (38 or 39).

    Standard buttons with function (caps lock, back space, keyboard switcher, space & line break), 
    will be injected automatically. So there is no need include them in the array.

    You cannot comment it out or leave it empty.

- keysObj1.switcher
    This string will be displayed as a keyboard switcher button when you 
    have more than one keyboard.
    
    You may change its value, comment it out or leave it empty.

- keysObj2.arr 
    This is your second keyboard characters. Change the items 
    as you see fit as long as the total number of them is standard (38 or 39).

    Standard buttons with function (caps lock, back space, keyboard switcher, space & line break), 
    will be injected automatically. So there is no need include them in the array.

    You may comment it out if you don't need a second keyboard. 

- keysObj2.switcher
    This string will be displayed as a keyboard switcher button when you 
    have more than one keyboard.
    
    You may change its value, comment it out or leave it empty.
*********************************************************/
 
let keysObj1 = {
 
    arr : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m",":)", "."],
    switcher : "ABC", 
    stringifier : () => {
        
    },
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
    let keyboardBuilder = (keyboardArr1, switcher1 = "", keyboardArr2 = null, switcher2 = "", defDsply1 = "flex", defDsply2 = "none") => {
    
        // KEYS CONTAINER BUILDER
        let keysContainer1 = document.createElement("div");
        keysContainer1.classList.add("keysContainer1");
        keysContainer1.style.display = defDsply1;
        keysContainer1.style.flexFlow = "row wrap";
        keysContainer1.style.justifyContent = "center";
        keysContainer1.style.alignItems = "center";
        keyboardLayout.appendChild(keysContainer1);

        let keysContainer2 = document.createElement("div");
        if (keyboardArr2 !== null) {
            keysContainer2.classList.add("keysContainer2");
            keysContainer2.style.display = defDsply2;
            keysContainer2.style.flexFlow = "row wrap";
            keysContainer2.style.justifyContent = "center";
            keysContainer2.style.alignItems = "center";
            keyboardLayout.appendChild(keysContainer2);
        }

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

                    let capsLockBtn = document.getElementsByClassName("fa-arrow-alt-up")[1];

                    if (keyboardArr2 !== null) {
                        switch (keysContainer1.style.display) {
                            case "none":
                                keysContainer1.style.display ="flex"
                                keysContainer2.style.display = "none";
                                break;
                            case "flex":
                                keysContainer1.style.display ="none"
                                keysContainer2.style.display = "flex";
                                capsLockBtn.style.color = "rgba(220, 220, 220, 1)";
                                capsLockBtn.style.cursor = "not-allowed";
                                capsLockBtn.disabled = true;                        
                                break;
                        }
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
        if (keyboardArr2 !== null) {
            btnInjector(keyboardArr2);
        }

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
    
                        // switch btn
                        if (item.value == null) {
                            
                            switch (true) {
                                case (keyboardArr2 !== null) :
                                    switch (true) {
                                        case (array === keysObj1.arr) :
                                            newBtn.innerHTML = switcher2;               
                                            break;
                                        case (array === keysObj2.arr) :
                                            newBtn.innerHTML = switcher1;
                                            break;
                                    }
                                    break;
                                default :
                                    newBtn.classList.add("fal", "fa-toggle-off");
                                    newBtn.style.color = "rgba(220, 220, 220, 1)";
                                    newBtn.style.cursor = "not-allowed";   
                                    break;
                            }
                        }
        
                        newBtn.addEventListener("click", item.operator);
                        break;
                }
            });
        };

        btnBuilder(keyboardArr1, keysContainer1);
        if (keyboardArr2 !== null) {
            btnBuilder(keyboardArr2, keysContainer2);
        }
    };


    // ALARM FUNCTION WHEN THE KEYBOARD IS NOT WORKING PROPERLY
    let alarm = () => {
        const alarmPageBg = document.createElement("div")
        const alarmPage = document.createElement("div");
        const body = document.getElementsByTagName("body")[0];

        alarmPageBg.classList.add("alarmPageBg");
        alarmPageBg.style.position = "absolute";
        alarmPageBg.style.zIndex = "100";
        alarmPageBg.style.display = "flex";
        alarmPageBg.style.justifyContent = "center";
        alarmPageBg.style.alignItems = "center";
        alarmPageBg.style.width = "100vw";
        alarmPageBg.style.height = "100vh";
        alarmPageBg.style.background = "white";
        alarmPageBg.style.top = "0";
        alarmPageBg.style.left = "-150vw";
        alarmPageBg.style.transition = "0.2s ease-in-out all";
    
        alarmPage.style.display = "flex";
        alarmPage.style.justifyContent = "center";
        alarmPage.style.alignItems = "center";
        alarmPage.style.flexFlow = "column wrap";
        alarmPage.style.background = "rgba(241, 241, 241, 0.7)";
        alarmPage.style.boxShadow = "0px -3px 10px rgb(209, 209, 209)";
        alarmPage.style.width = "80%";
        alarmPage.style.height = "65%";
        alarmPage.style.overflowX = "hidden";
        alarmPage.style.padding = "2.5rem";
        alarmPage.style.fontFamily = "Helvetica";


        alarmPageBg.appendChild(alarmPage);
        body.appendChild(alarmPageBg);

        alarmPage.innerHTML = 
        `<p>The keyboard won't work properly, because one or some of these rules have not been followed:</p><br><br>
        <p>You cannot comment out <b>keyObj1.arr</b>.</p><br>
        <p>The length of both <b>keyObj1.arr</b> & <b>keyObj1.arr</b> must be either <b>38</b> or <b>39</b>.</p>
        <br><br>
        <button id="alarmBtn">Close</button>`;

        let btn = document.getElementById("alarmBtn");
        btn.style.border = "0.2rem solid rgba(0, 0, 0, 0.2)";
        btn.style.background = "none";
        btn.style.outline = "none";
        btn.style.padding = "0.3rem 0.5rem";
        btn.style.cursor = "pointer"

        btn.addEventListener("click", () => {
            alarmPageBg.style.left = "-150vw";
        });
    };

    // PASSING THE ARGUMENTS TO THE KEYBOARD APP.
    if (
        keysObj1.hasOwnProperty("arr") !== true
        || /38|39/.test(keysObj1.arr.length) !== true
        || (keysObj2.hasOwnProperty("arr") === true && /38|39/.test(keysObj2.arr.length) !== true)
        ) 
    {
        alarm();
        input.addEventListener("click", () => {
            document.getElementsByClassName("alarmPageBg")[0].style.left = "0";
        });
    }

    if (
        keysObj1.hasOwnProperty("arr")
        && /38|39/.test(keysObj1.arr.length) 
        && ((keysObj2.hasOwnProperty("arr") === true && /38|39/.test(keysObj2.arr.length)) || keysObj2.hasOwnProperty("arr") !== true)
        ) 
    {
        keyboardBuilder(keysObj1.arr, keysObj1.switcher, keysObj2.arr, keysObj2.switcher);
    }
         


};

window.addEventListener("load", keyboardApp);
