function dreamSequence () {
    console.log("dream.js running");
    if(passage()==="Dream Sequence") {
        console.log("dream sequence passage");

        const tl = gsap.timeline({
            delay: 1,
            defaults: {
                duration: 0.5,
                ease: 'steps(1)'
            },
            repeat: -1
        })
        
        tl.to(".dream-img", {backgroundImage: 'url(img/dream-sequence/frame_001.png)'});
        tl.to(".dream-img", {backgroundImage: 'url(img/dream-sequence/frame_002.png)'});
        tl.to(".dream-img", {backgroundImage: 'url(img/dream-sequence/frame_003.png)'});
        tl.to(".dream-img", {backgroundImage: 'url(img/dream-sequence/frame_004.png)'});
        tl.to(".dream-img", {backgroundImage: 'url(img/dream-sequence/frame_005.png)'});
        tl.to(".dream-img", {backgroundImage: 'url(img/dream-sequence/frame_006.png)'});
        tl.to(".dream-img", {backgroundImage: 'url(img/dream-sequence/frame_007.png)'});
        tl.to(".dream-img", {backgroundImage: 'url(img/dream-sequence/frame_008.png)'});
        tl.to(".dream-img", {backgroundImage: 'url(img/dream-sequence/frame_009.png)'});
        tl.to(".dream-img", {backgroundImage: 'url(img/dream-sequence/frame_010.png)', duration: 2});
    }


}