const rootPath = "/texts/";
let fileNames = ["equipamiento.txt", "libros.txt", "lugares.txt", "materiales.txt", "seres_vivos.txt"];
let textLines = [];
let numLines;

textLines = readFiles();
numLines = textLines.length;

const numLinesInput = document.getElementById("numLines");
numLinesInput.placeholder = "Max: " + textLines.length;
numLinesInput.max = textLines.length;

const placeholderDiv = document.getElementById("selected-lines");

function readFiles() {
    let textLines = [];

    fileNames.forEach((file) => {
        fullPath = rootPath.concat(file);
        let archive = new XMLHttpRequest();

        archive.open("GET", fullPath, false);
        archive.onreadystatechange = () => {
            if (archive.readyState === 4 && archive.status === 200) {
                let archiveLines = archive.responseText.split("\n");
                textLines = textLines.concat(archiveLines);
            }
        }
        archive.send()
    });
    return textLines;
}

function putTextLines() {
    let randomParagraphs = [];
    let numLines = numLinesInput.value;
    textLines = readFiles();

    for (let i = 0; i < numLines; i++) {
        let indexRandomLine = getRandomIntInclusive(0, textLines.length - 1);

        randomParagraphs.push(textLines[indexRandomLine]);
        textLines.splice(indexRandomLine, 1);
    }

    // Restart div content and add new random selected lines
    placeholderDiv.innerHTML = "";
    randomParagraphs.forEach(element => {
        placeholderDiv.innerHTML += "<p>" + element + "</p>";
    });
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
