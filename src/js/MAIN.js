// NOTE: Tweego compiles all files in src directory into a single HTML file in project root, so JS module imports/exports don't work. HOWEVER functions can just be referenced as they would if they were all in the same JS file. (e.g. boxHover() below)
    // Solution: 

// Import GSAP in Promise object so game scripts don't start before GSAP is loaded.
importScripts([
    "https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js",
    "https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/TextPlugin.min.js"

]).then(function() {
    console.log("*** GSAP Loaded ***");
    $(document).on(':passagerender', function (ev) {
        /* Log details about the current moment. */
        console.group('Details about the current moment');
        console.log('buffer:', ev.detail.content);
        console.log('passage name:', ev.detail.passage.name);
        console.log('passage tags:', ev.detail.passage.tags);
        console.groupEnd();
    });

    // Register Plugins
    gsap.registerPlugin(TextPlugin)

    // Trigger animations after :passagedisplay event to wait until elements have loaded in DOM.
    $(document).on(':passagedisplay', function(e) {

        // *** PUT ALL ANIMATION FUNCTIONS HERE ***

        // Function in boxHover.js
        boxHover();
        dreamSequence();
        textBreatheFX();

    })
})
.catch(function(err) {
    console.log("*** GSAP loading failed ***")
});

// Hides default UIBar and reclaims space with stow
// ** ADD .hide() WHEN DONE
UIBar.stow();

