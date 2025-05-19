// TEST MACRO
// First simple custom macro made for learning how Sugarcube's Macro API works, used Chapel's Message macro code as reference (also in /src)
// Macro : <<mytestmacro>>OUTPUT_TEXT_HERE<</mytestmacro>>
// Output : <p>OUTPUT_TEXT_HERE</p>

// NOTES:
/*
    '$' before variable names - copied from Message macro. Doesn't do anything, but seems to show that either a JQuery reference is used, or that the variable holds a DOM element?

    <jQuery>.wiki(TEXT_OR_CODE) - 'wikifies' content, meaning converts content into HTML and/or code then executes it. Needed for adding payload content to output.
    Answered on Reddit: https://www.reddit.com/r/twinegames/comments/isqyue/comment/g5bjl4d/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
*/

console.log("*** myTestMacro is running ***")
Macro.add('mytestmacro', {
    tags: null,
    handler : function () {
        console.log("myTestMacro - adding handler function");
        // Create p element to add to DOM
        const $content = $(document.createElement("p"));

        // this.payload
        // An array of contents between the macro tags
        const txt = this.payload[0].contents;
        console.log("mytestmacro txt:" + txt);
        console.log($content);

        // Add txt text to $
        // .wiki() Sugarcube method
        const $outputPara = $content.wiki(txt);
        $outputPara.appendTo(this.output);
    }
})
