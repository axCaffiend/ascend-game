// For GSAP and other JS effects used throughout the story

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