let text = document.getElementById("text");
let displacement = document.getElementById("displacement");
displacement.addEventListener("keyup", function (e) {
    if (e.which == 13 || e.keyCode == 13) {
        Encode(text.value, parseInt(displacement.value));
    }
});
document.getElementById("encodeButton").addEventListener("click", () => Encode(text.value, parseInt(displacement.value)));
let resetButton = document.getElementById("resetButton").addEventListener("click", ResetValues);
let copyButton = document.getElementById("copyButton").addEventListener("click", CopyText);

function Encode(text, displacement) {
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    text = text.toUpperCase();
    let encodedText = '';
    for (let i = 0; i < text.length; i++) {
        displacement = (displacement + letters.length) % letters.length;
        let position = letters.indexOf(text[i]);
        encodedText += letters[(position + displacement) % letters.length];
    }
    document.getElementById("encodedText").value = encodedText;
    document.getElementById("copiedMessage").style.visibility = "hidden";
}

function ResetValues() {
    text.value = "";
    displacement.value = "";
    document.getElementById("copiedMessage").style.visibility = "hidden";    
}

function CopyText() {
    let copyText = document.getElementById("encodedText");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
    //alert("Copied the text: " + copyText.value);
    document.getElementById("copiedMessage").style.visibility = "visible";
}