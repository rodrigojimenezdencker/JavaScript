let text = document.getElementById("text");
let displacement = document.getElementById("displacement");
displacement.addEventListener("keyup", function (e) {
    if (e.which == 13 || e.keyCode == 13) {
        Encode(text.value, parseInt(displacement.value));
    }
});
text.addEventListener("keyup", () => UpdateValues(EncodeCesar(text.value, parseInt(displacement.value == "" ? 0 : displacement.value)), "encodedText"));
displacement.addEventListener("keyup", () => UpdateValues(EncodeCesar(text.value, parseInt(displacement.value == "" ? 0 : displacement.value)), "encodedText"));
let resetButton = document.getElementById("resetButton").addEventListener("click", ResetValues);
let copyButton = document.getElementById("copyButton").addEventListener("click", CopyText);

function EncodeCesar(text, displacement) {
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    text = text.toUpperCase();
    let encodedText = '';
    for (let i = 0; i < text.length; i++) {
        displacement = (displacement + letters.length) % letters.length;
        let position = letters.indexOf(text[i]);
        encodedText += letters[(position + displacement) % letters.length];
    }
    return encodedText;
}

function UpdateValues(text, id) {
    document.getElementById(id).value = text;
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