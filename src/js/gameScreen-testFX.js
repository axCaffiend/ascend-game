function pulseFX () {
    console.log("--- pulseFX running")
    let testColor = getComputedStyle(document.documentElement).getPropertyValue('--test-color');

    gsap.fromTo("#game-screen-fx",
        {
            backgroundColor: testColor
        },
        {
            backgroundColor: "black",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "none"
        }
    )
}