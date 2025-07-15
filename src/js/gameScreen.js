// ===== GAME SCREEN LOAD =====
// - Contains all logic for any game screen (i.e. Ritual story passages)
// - Only runs on passages tagged 'game-screen' (defined in MAIN.js)

function gameScreenLoad () {
    console.log("*** gameScreenLoad running ***")

    // ====== Get page elements ======
    const userControl = document.querySelector(".passage[data-tags*='game-screen'] .control");
    const displayBox = document.querySelector(".passage[data-tags*='game-screen'] .display");
    const outputBoxTitle = document.querySelector(".passage[data-tags*='game-screen'] .display .output-title");
    const outputBox = document.querySelector(".passage[data-tags*='game-screen'] .display .output");
    const messageDisplay = document.querySelector(".passage[data-tags*='game-screen'] .display .message");
    const enterBtn = document.querySelector(".passage[data-tags*='game-screen'] .enter-btn");

    // Create output <div> for displaying userInput in Output box 
    const runeOutput1 = outputBox.appendChild(document.createElement("div"));
    runeOutput1.classList.add("rune-output-1");

    // ===== userInput: Array =====
    // Current userControl input
    let userInput = [];

    // ===== answerRune =====
    // Stores setup.RUNE.rune_name to check against userInput
    // Checked when enterBtn is pressed
    // Is set by Ritual (level) functions
    let answerRune;

    let checkUserInputStatus = null;

    // ===== Set up userControl elements =====
    enterBtn.addEventListener("click", checkUserInput);
    userControl.addEventListener("input", updateUserControl);

    // Start Ritual for current passage
    startRitual();

    // ============================================//
    //             FUNCTIONS                       //
    // ============================================//
    
    
    // ==========  RITUALS  ========================
    
    // ===== BEACON RITUAL =====
    // Handles logic for Ritual_Beacon story passage.
    function runBeaconRitual() {
        console.log("=== BEACON RITUAL RUNNING ===");
        let beaconRunning = true;
        let beaconProgress = 0;
        answerRune = setup.RUNES.beacon;

        console.log("checkUserInputStatus: " + checkUserInputStatus);

        enterBtn.addEventListener("click", stage1);

        for(let i=0; i <5; i++) {
            console.log(i);
            const displayBoxGlow = document.createElement("div");
            displayBoxGlow.classList.add("display-box-glow");
            displayBox.appendChild(displayBoxGlow);
        }

        // === MAIN LOGIC FOR RITUAL ===
        function stage1 () {
            if (checkUserInputStatus == true) {
                console.log("beaconProgress +1");
                beaconProgress++;
                console.log("beaconProgress: " + beaconProgress + "\/3");
                updateMessage();
                
                if (beaconProgress >= 3) {
                    enterBtn.removeEventListener("click",stage1);
                    updateMessage();
                    console.log("=== BEACON END ===");

                    // ---- COMPLETION ANIMATION + TRANSITION TO Beacon-Success PASSAGE -----
                    setTimeout(addDisplayBoxGlow, 2000);
                }
            } else if (checkUserInputStatus == false) {
                console.log("beaconProgress: " + beaconProgress + "/3");
                updateMessage();
            } else {
                console.log("stage1 blank")
                messageDisplay.textContent = "Enter a rune."
            }
        }

        function updateMessage () {
            messageDisplay.textContent = `Progress: ${beaconProgress} /3`
        }

        // ---- RITUAL SUCCESS ANIMATION SEQUENCE ---
        // Runs animation final sequence, fading out output display, adding glow effects
        // Forces transition to Beacon-Success passage
        function addDisplayBoxGlow() {
            const displayBoxGlow = document.querySelectorAll(".display-box-glow");

            gsap.set(displayBoxGlow, {
                position: "absolute",
                zIndex: "-1",
                border: "solid 0.1rem var(--game-screen-green",
                borderRadius: "0",

                filter: "blur(0.1rem)",
                width: "100%",
                height: "100%",
                }
            )
            
            const scaleGlow = gsap.to(displayBoxGlow,
                {   stagger: {
                    each: 0.5,
                    repeat: -1,
                    ease: "circ.inOut",
                    filter: "blur(0.5rem)",
                    yoyo: true
                },
                    scale: 1.25,
                    borderRadius: "50%",
                    duration: 1,
                }
            )
            
            const slowRotate = gsap.to(displayBoxGlow, {
                stagger: {
                    each: 2,
                    repeat: -1,
                    ease: "none"
                },
                    rotation: "+=360deg",
                    duration: 5
                })
                
                const expand = gsap.to(displayBoxGlow, {
                    scale: 3,
                    overwrite: "auto",
                    ease: "power.inOut",
                    duration: 7,
                    // END OF RITUAL - forwards to Beacon-Success passage
                    onComplete: () => {
                        console.log("expand finished")
                        endBeaconRitual();
                    }
                })

                const fadeOutput = gsap.to([outputBox, outputBoxTitle, messageDisplay], {
                    opacity: 0,
                    duration: 1
                })

                const morphdisplayBox = gsap.to(displayBox, {
                    border: "solid 3px #fff",
                    borderRadius: "50%",
                    duration: 6
                })

            const timeline = gsap.timeline();
            timeline.add(scaleGlow, 0);
            timeline.add(slowRotate, 0);
            timeline.add(morphdisplayBox, 1);
            timeline.add(fadeOutput, 1.5);
            timeline.add(expand, 3);
            timeline.play();
        }

        function endBeaconRitual () {
            console.log("moving to beacon success");
            $.wiki("<<goto 'Beacon-Success'>>");
        }
    }
    


    // ==========  PERSISTENT  ========================

    // START RITUAL: returns nothing
    // Runs Ritual (level) function according to current story passage.
    function startRitual() {
        switch(passage()) {
            case "Ritual_Beacon":
                console.log("--- Check Ritual: Beacon")
                runBeaconRitual();
        }
    }


    // CHECK USER INPUT: sets checkUserInputStatus
    // Checks rune from userInput (from userControl)
    // Sets checkUserInputStatus when enterBtn is clicked
    // No Rune Entered : array is full of empty strings or whitespace, undefined or null.
        // Rune Correct : matches value of answerRune;
        // Rune Incorrect: doesn't match value of answerRune
        // answerRune is set in Ritual (level) functions
    // Clears input and runs updateUserControl.
    function checkUserInput() {
        console.group("*** checkUserInput running ***");
        console.log("userInput: " + userInput + typeof(userInput));
        console.log("answerRune: " + answerRune + typeof(answerRune));

        if (userInput == null || userInput == undefined || userInput.every(isBlankArray)) {
            checkUserInputStatus = null;
            console.log("--- NO RUNE ENTERED");
        } else if (answerRune.equals(userInput)) {
            checkUserInputStatus = true;
            console.log("--- RUNE CORRECT");
        } else {
            checkUserInputStatus = false;
            console.log("--- RUNE INCORRECT");
        }
        console.log("checkUserInputStatus: " + checkUserInputStatus);
        console.groupEnd();

        function isBlankArray (value) {
            return (value == "" || value == " ")
        }

        for (const child of userControl.children) {
            child.value =''
            updateUserControl();
        }
    }


    
    // ===== UPDATE USER CONTROL ====
    // Updates userInput array on userControl input, and overwrites userInput characters from userControl if not matching are detected
    function updateUserControl(e) {
        // Reset
        // console.log(e.target.name + e.data);
        userInput = [];

        // Add values from text inputs to userInput array
        // If input is empty, convert to a whitespace
        for (const child of userControl.children) {
            if (child.value)
                userInput.push(child.value);
            else {
                userInput.push(" ");
            }
        }
        // First checks whether character divs have been added to runeOutput1 container by checking for child nodes
        if (runeOutput1.hasChildNodes()) {
            // console.log("has child nodes")
            // console.log(runeOutput1.childNodes);
            //runeOutput1 already has character tiles added (i.e. user input has occurred since page load)
            const runeOutput1Arr = [...runeOutput1.childNodes];
            // console.log("runeOutput1 converted to an array");
            // console.log(runeOutput1Arr);

            const currentDisplay = runeOutput1Arr.map(function (i) {
                // console.log("map function - adding text content")
                console.log(i.firstChild.textContent);
                return i.firstChild.textContent;
            })

            console.log("Current display values array");
            console.log(currentDisplay);

            // Check that userInput array is same length as currentDisplay array
            if (userInput.length === currentDisplay.length) {
                console.log("userInput and currentDisplay length is same.")

                // Iterate with length of userInput array
                for (let i = 0; i < userInput.length; i++) {

                    // Compare values at same index in both arrays, if it's different then update the character
                    if (userInput[i] !== currentDisplay[i]) {
                        console.log("*** Change detected ***");
                        console.log(`User input ${userInput[i]} \n Current Display ${currentDisplay[i]}`)

                        runeOutput1.children[i].querySelector(".char").textContent = userInput[i];

                    } else {
                        // If not - log no change message
                        console.log("No change")
                        console.log(`User input ${userInput[i]} \n Current Display ${currentDisplay[i]}`)
                    }
                }

            } else {
                console.log("userInput and currentDisplay not same length...")
            }

        /* 
        No child nodes on runeOutput1 - creates character tiles 
        Structure: (<div class="box">
        <span class="char">INPUT_CHARACTER</span>
        </div>)
        INPUT_CHARACTER is added for each userInput text input.
        */
        } else {
            console.log("No child nodes - creating new");
            for (const i in userInput) {
                // Create elements and add classes
                const box = document.createElement("div");
                box.classList.add("box");
                const char = document.createElement("span");
                char.classList.add("char");
                box.appendChild(char);
                runeOutput1.appendChild(box);

                // Update from userInput
                console.log(userInput[i]);
                char.textContent = userInput[i];
            }
        }
    }
    


    // ====== AUTOFOCUS USERCONTROL FIELDS =====
    // COPIED CODE - adjusted from:
    // https://stackoverflow.com/questions/15595652/focus-next-input-once-reaching-maxlength-value
    // Automatically focus next or previous input in user control on input
    userControl.addEventListener("keyup", (e) => {
        let target = e.target;
        let maxLength = parseInt(target.attributes["maxlength"].value, 10);
        let myLength = target.value.length;
        if (myLength >= maxLength) {
            let next = target;
            while (next = next.nextElementSibling) {
                if (next == null)
                    break;
                if (next.tagName.toLowerCase() === "input") {
                    next.focus();
                    break;
                }
            }
        }
        // Move to previous field if empty (user pressed backspace)
        else if (myLength === 0) {
            let previous = target;
            while (previous = previous.previousElementSibling) {
                if (previous == null)
                    break;
                if (previous.tagName.toLowerCase() === "input") {
                    previous.focus();
                    break;
                }
            }
        }
    })

}