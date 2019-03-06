
const Library = {
    'a': '.-',
    'b': '-...',
    'c': '-.-.',
    'd': '-..',
    'e': '.',
    'f': '..-.',
    'g': '--.',
    'h': '....',
    'i': '..',
    'j': '.---',
    'k': '-.-',
    'l': '.-..',
    'm': '--',
    'n': '-.',
    'o': '---',
    'p': '.--.',
    'q': '--.-',
    'r': '.-.',
    's': '...',
    't': '-',
    'u': '..-',
    'v': '...-',
    'w': '.--',
    'x': '-..-',
    'y': '-.--',
    'z': '--..',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9':'----.',
    '0': '-----',
    '.': '.-.-.-',
    ',': '--..--',
    '?': '..--..',
    '@': '.--.-.',
    ' ': '|',

};


let Input = document.getElementById("English");

let Output = document.getElementById("MorseCode");


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


