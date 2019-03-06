const Library = {
    'a': '01000001',
    'b': '01000010',
    'c': '01000011',
    'd': '01000100',
    'e': '01000101',
    'f': '01000110',
    'g': '01000111',
    'h': '01001000',
    'i': '01001001',
    'j': '01001010',
    'k': '01001011',
    'l': '01001100',
    'm': '01101101',
    'n': '01101110',
    'o': '01101111',
    'p': '01110000',
    'q': '01110001',
    'r': '01110010',
    's': '01110011',
    't': '01110100',
    'u': '01110101',
    'v': '01110110',
    'w': '01110111',
    'x': '01111000',
    'y': '01111001',
    'z': '01111010',
    '1': '00110001',
    '2': '00110010',
    '3': '00110011',
    '4': '00110100',
    '5': '00110101',
    '6': '00110110',
    '7': '00110111',
    '8': '00111000',
    '9': '00111001',
    '0': '00110000',
    '.': '00101110',
    ',': '00101100',
    '?': '00111111',
    '@': '01000000',
    ' ': '/',
    '+':'00101011',
    '-':'00101101',
    '*':'00101010',
    '$':'00100100',
    '&':'00100110',
    '#':'00100011',
    '%':'00100101',
    '(':'00101000',
    ')':'00101001',
    '/':'00101111',
};

let Input = document.getElementById("English");

let Output = document.getElementById("Binary");


Input.addEventListener("input", function (e) {
    let Translation = Input.value;
    Translation = Translation.toLowerCase();
    Translation = Translation.split("");
    for (let i = 0; i < Translation.length; i++) {
        Translation[i] = Library[Translation[i]];
    }
    Translation = Translation.join(" ");
    console.log(Translation);
    Output.innerHTML = Translation;

});



