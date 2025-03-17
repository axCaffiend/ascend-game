// Import GSAP in Promise object so game scripts don't start before GSAP is loaded.
importScripts([
    "https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js",

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

    // Use on :passagedisplay event to wait until .box is loaded in DOM to execute GSAP scripts.
    $(document).on(':passagedisplay', function(e) {

        gsap.fromTo(".box", 
            { 
            y: 20,
            duration: 1.5,
            repeat: -1,
            yoyo: true
        },
        {
            y: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true
        }

    );
    })
})
.catch(function(err) {
    console.log("*** GSAP loading failed ***")
});

// Hides default UIBar and reclaims space with stow.
UIBar.hide().stow();

