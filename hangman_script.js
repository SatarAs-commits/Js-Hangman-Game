'use strict';

const keyboard = document.getElementById('keyboard');
const charDisplay = document.getElementById('word-display');
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const word = "Spiderman".toUpperCase();
let underlineWordArray = JSON.parse(localStorage.getItem('savedProgress')) || '_'.repeat(word.length).split('');
charDisplay.innerText = underlineWordArray.join(' ');

let incorrectLetters = [];

const drawSteps = [drawPfosten, drawPfostenHorizontal, drawPfostenSchreag, drawSeil, drawHead, drawBody, drawArms, drawLegs];

let mistakes = parseInt(localStorage.getItem('savedMistakes')) || 0;
for (let i = 0; i < mistakes; i++) {
    drawSteps[i];
}

const keys = JSON.parse(localStorage.getItem("keys")) || [];

// Tastatur Erzeugung
const table = document.createElement("table");
keyboard.appendChild(table);

let aktuelleZeile;
letters.split("").forEach((letter, index) => {
    if(index % 9 === 0){
        aktuelleZeile = document.createElement('tr');
        table.appendChild(aktuelleZeile);
    }
    const td = document.createElement('td');

    const btn = document.createElement("button");
    // btn.textContent = letter;
    btn.innerText = letter;

    if (keys.includes(letter)) {
        btn.disabled = true;
    }

    td.appendChild(btn);
    aktuelleZeile.appendChild(td);
})

// Buchstaben anzeige auf display.
keyboard.addEventListener('click', (e) => {
    // Wenn der Nutzer den Element 'Button' geklickt hat, passiert folgendes:
    if(e.target.tagName === 'BUTTON'){
        const geklickterBuchstabe = e.target.innerText;
        e.target.disabled = true;
        // charDisplay.innerText += geklickterBuchstabe;
        solutionWord(geklickterBuchstabe);
        console.log(`Geklickter Buchstabe, ${geklickterBuchstabe}`)
        keys.push(geklickterBuchstabe);
        localStorage.setItem('keys', JSON.stringify(keys));
    }
})

// Prüfung der Buchstabe im Wort 
function solutionWord(geklickterBuchstabe) {
    if(word.includes(geklickterBuchstabe)){
        for (let i = 0; i < word.length; i++) {
            if(word[i] === geklickterBuchstabe){
                underlineWordArray[i] = geklickterBuchstabe;
            }
        }
        localStorage.setItem('savedProgress', JSON.stringify(underlineWordArray));
    }else{
        if(mistakes < drawSteps.length){
            drawSteps[mistakes]();
            mistakes++;
            localStorage.setItem('savedMistakes', mistakes);
        }
        if(!incorrectLetters.includes(geklickterBuchstabe)){
            incorrectLetters.push(geklickterBuchstabe);
            document.getElementById('incorrectGuesses').innerText = `Incorrect guesses: ${mistakes}/8`;
        }
        if(mistakes === drawSteps.length){
            alert("Game over! Das Wort war: " + word);
        }
    }
    charDisplay.innerText = underlineWordArray.join(' ');
}

// Tastatur phyisch
function handleKeyboardInput(e){
    const letter = e.key.toUpperCase();
    const buttons = document.querySelectorAll('#keyboard button');

    buttons.forEach(button => {
        if(button.textContent === letter && !button.disabled){
            button.click();
        }
    })
}
window.addEventListener('keydown', handleKeyboardInput);

const canvas = document.getElementById('canvasElement');
const context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 300;
context.lineWidth = 4;

function drawGround(){
    context.beginPath();
    context.moveTo(10, 280);
    context.lineTo(280, 280);
    context.stroke();
}
drawGround();

function drawPfosten(){
    context.beginPath();
    context.moveTo(60, 280);
    context.lineTo(60, 20);
    context.stroke();
}
// drawPfosten();

function drawPfostenHorizontal(){
    context.beginPath();
    context.moveTo(60, 20);
    context.lineTo(200,20);
    context.stroke();
}
// drawPfostenHorizontal();

function drawPfostenSchreag(){
    context.beginPath();
    context.moveTo(60, 70);
    context.lineTo(110, 20);
    context.stroke();
}
// drawPfostenSchreag();

function drawSeil(){
    context.beginPath();
    context.moveTo(200, 20);
    context.lineTo(200, 50);
    context.stroke();
}
// drawSeil();
// Kopf
function drawHead() {
    context.beginPath();
    context.moveTo(175, 50);

    context.lineTo(225, 50);
    context.lineTo(225, 90);
    context.lineTo(175, 90);
    context.lineTo(175, 48);
    
    context.stroke();
}
// drawHead();

function drawBody(){
    context.beginPath();

    context.moveTo(200, 90); // Unter dem Kopf
    context.lineTo(200, 160); // Bis zur Hüfte
    context.stroke();
}
// drawBody();

function drawArms(){
    context.beginPath();

    context.moveTo(200, 120);
    context.lineTo(240, 90);

    context.moveTo(200, 120);
    context.lineTo(160, 90);

    context.stroke();
}
// drawArms();

function drawLegs(){
    context.beginPath();

    context.moveTo(200, 160);
    context.lineTo(150, 260);

    context.moveTo(200, 160);
    context.lineTo(250, 260);
    context.stroke();
}
// drawLegs();
