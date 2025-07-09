// NOTE: Tweego compiles all files in src directory into a single HTML file in project root, so JS module imports/exports don't work. HOWEVER functions can just be referenced as they would if they were all in the same JS file, since all JS is present in separate <script> tags in final index.html file. (e.g. boxHover() below)

// Import GSAP in Promise object so game scripts don't start before GSAP is loaded.
importScripts([
    "https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js",
    "https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/TextPlugin.min.js"

]).then(function() {
    console.log("*** GSAP Loaded ***");

    // Register Plugins
    gsap.registerPlugin(TextPlugin);

    // Trigger animations after :passagedisplay event to wait until elements have loaded in DOM.
    $(document).on(':passagedisplay', function(e) {

        // *** PUT ALL ANIMATION FUNCTIONS HERE ***

        // Function in boxHover.js
        boxHover();
        dreamSequence();
        // In global-effects.js
        textBreatheFX();
        setup.updateBgEffects();
        
        // LOAD GAME SCREEN JAVASCRIPT ON PASSAGES TAGGED WITH 'game-screen'
        // Uses passage tags since Game Screen content is included in 
        if (e.detail.passage.tags.includes("game-screen")) {
            console.log("!! Current Passage = Game Screen");
            gameScreenLoad();
        }
        
    })
})
.catch(function(err) {
    console.log("*** GSAP loading failed ***")
});

// === Config Options ===
Config.addVisitedLinkClass = true;
// Do not type on previously visited passages
Config.macros.typeVisitedPassages = false;

// Wraps Passage content in .passage-body div before PassageHeader and PassageFooter are added to rendered passage. Excluding special passages, widget passages and tagged subPassages (only included in other passages).
Config.passages.onProcess = function (p) {
    if (p.title == "StoryTitle" || p.title == "StoryData" || p.title == "StoryInit" ||p.title == "PassageHeader" || p.title == "PassageFooter" || p.title =="StoryMenu" || p.tags.includes("widget")|| p.tags.includes("subPassage")) {
        return p.text;
    }
    p.text = "<div class='passage-body'>" + p.text + "</div>";
    return p.text;
}

// Hides default UIBar and reclaims space with stow
// ** ADD .hide() WHEN DONE
UIBar.stow();


// ----- ADD GLOBAL METHOD ARRAY.EQUALS(ANOTHER_ARRAY) -----
// Adds .equals method to all Array prototypes - so can call on any array.
// COPIED From: https://stackoverflow.com/a/14853974
// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;
    // if the argument is the same array, we can be sure the contents are same as well
    if(array === this)
        return true;
    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});
// ----- END COPIED CODE : Array.equals method. -----