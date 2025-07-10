// For GSAP and other JS effects used throughout the story

setup.updateBgEffects = function () {
    const bgEffectsArr = variables().bgEffects;
    console.log("Updating $bgEffects : " + bgEffectsArr.toString());
    // Kill all GSAP animations (freezes CSS properties as they were)
    gsap.killTweensOf("body");
    // Reset background to black
    document.querySelector("body").style.background = "#000";
    // Load background effects from story variable $bgEffects
    if (bgEffectsArr.length > 0) {
        for(const fx of bgEffectsArr) {
            console.log("--- Calling bgEffectFuncs." + fx);
            bgEffectFuncs[fx].apply(this);
        }
    } else {
        console.log("$bgEffects empty");
    }
}

function updateBgEffects () {
    const bgEffectsArr = variables().bgEffects;
    console.log("$bgEffects : " + bgEffectsArr.toString());
    for(const fx of bgEffectsArr) {
        console.log("--- Calling bgEffectFuncs." + fx);
        bgEffectFuncs[fx].apply(this);
    }
}

// ======================================================
// Page Background Effects
// - Define effect function in bgEffectFuncs object
// - Add function name to $bgEffects story variable (an array) to use
// ======================================================
const bgEffectFuncs = {
    // Slow pulse effect from dark green to black. Used for ritual passages.
    pulseFX : function () {
        console.log("--- pulseFX running");
        let fillColour = getComputedStyle(document.documentElement).getPropertyValue('--game-screen-dark-green');
    
        gsap.fromTo("body",
            {
                backgroundColor: "black"
            },
            {
                backgroundColor: fillColour,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "none"
            }
        )
    },
    // Death_Consumed, fade in red bg.
    deathConsumedFX : function () {
        console.log("--- deathConsumedFX running");
        let fillColour = getComputedStyle(document.documentElement).getPropertyValue('--gameover-red');
        gsap.fromTo("body",
            {
                background: `radial-gradient(circle,rgba(0, 0, 0, 1) 0%, rgba(0,0,0,1) 100%)`
            },
            {
                background: `radial-gradient(circle,rgba(0, 0, 0, 1) 0%, ${fillColour} 100%)`,
                duration: 5
            }
        )

        gsap.to(".macro-timed-insert",
            {
                filter: "blur(3px)",
                duration: 5
            }
        )
    }
    
}




// ======================================================
// Element specific effects - add selectors to each effect
// ======================================================

function textBreatheFX () {
    console.log("breatheFX running");

    // LIST OF SELECTORS TO APPLY TO
    // Passage links
    const dreamSeqLink = 'a[data-passage="Dream Sequence"]';

    gsap.fromTo(dreamSeqLink, 
        {
            letterSpacing: 0,
        },
        {
        letterSpacing: '0.75rem',
        duration: 3,
        repeat: -1,
        yoyo: true,
        easing: "none"
    })
}