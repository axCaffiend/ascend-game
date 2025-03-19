function boxHover () {

    
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
}