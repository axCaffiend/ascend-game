// ===== GAME SCREEN LOAD =====
// - Contains all logic for any game screen (i.e. Ritual story passages)
// - Only runs on passages tagged 'game-screen' (defined in MAIN.js)

function gameScreenLoad () {
    console.log("*** gameScreenLoad running ***")

    // ====== Get page elements ======
    const userControl = document.querySelector(".passage[data-tags*='game-screen'] .control");
    const outputDisplay = document.querySelector(".passage[data-tags*='game-screen'] .display");
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

    // ===== Set up userControl elements =====
    enterBtn.addEventListener("click", checkUserInput);
    userControl.addEventListener("input", updateUserControl)

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
        let attempts = 0;
        answerRune = setup.RUNES.beacon;
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


    // CHECK USER INPUT: returns bool
    // Check userInput matches answerRune when enterBtn clicked
    // answerRune is set in Ritual (level) functions
    function checkUserInput() {
        console.log("*** checkUserInput running ***");
        console.log("userInput: " + userInput + typeof([...userInput]));
        console.log("answerRune: " + answerRune + typeof([...answerRune]));
        console.log(answerRune.equals(userInput));

        if (answerRune.equals(userInput)) {
            return true;
        } else {
            return false;
        }
    }


    
    // ===== UPDATE USER CONTROL ====
    // Updates userInput array on userControl input, and overwrites userInput characters from userControl if not matching are detected
    function updateUserControl(e) {
        // Reset
        console.log(e.target.name + e.data);
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