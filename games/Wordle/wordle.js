const enterWordButton = document.querySelector("#enter-word-button")
const guessButton = document.querySelector("#guess-button");
const guessTextbox= document.querySelector("#guess-textbox");
const letters= document.querySelectorAll(".letter");
const alertMessage = document.querySelector("#alert-message");

let word;
let guess;
let failed = false;
let rowCounter = 1;

window.addEventListener("DOMContentLoaded", main);

function main (e) {
    enterWordButton.addEventListener("click", enterWord);
    guessButton.addEventListener("click", checkGuess);

}

function enterWord (e) {
    word = window.prompt("Enter the 5 letter word to guess", "").toUpperCase();
    while (word.length != 5) {
        word = window.prompt("Please enter a 5 letter word", "").toUpperCase();
    } 
    enterWordButton.innerHTML = "Done";
    enterWordButton.setAttribute("disabled", true);
}

function checkGuess(e) {
    guess = guessTextbox.value.toUpperCase();
    console.log(guess);
    console.log(`The word is ${word}`)

    if (!word) {
        alertMessage.textContent= "Please provide a word first";
        return;
    }


    if (guess.length == 5) { //Check for input and make sure it's 5 letters
        checkLetters(rowCounter);
        /* for (let i=0; i<guess.length; i++) {
            let char = guess[i];
            let currentLetter = letters[(rowCounter - 1) * 5 + i] //this formula selects the correct span element
            currentLetter.innerHTML = char;
            if (char == word[i]) {
                currentLetter.style.backgroundColor = "#2d8022";
            } else if (word.search(char) >=0) {
                currentLetter.style.backgroundColor = "#7b8022";
            } else {
                currentLetter.style.backgroundColor = "black";
                document.querySelector(`#${char.toLowerCase()}`).style.backgroundColor="black"
            }
        } */
        rowCounter += 1;
        guessTextbox.value="";
    } else {
        alertMessage.textContent = "Please enter a 5-letter word"
        guessTextbox.value = "";
    }

    if (guess == word){
        alertMessage.textContent = "You got it!";
        vanishOthers();

    } else if (rowCounter>=7) {
        alertMessage.textContent = `The word is: ${word}!`
    }
}

function vanishEl (index, delay) {
    return new Promise (function (resolve,reject) {
        setTimeout(function() {
            letters[index].style.opacity = "0";
            resolve();
        }, delay)
    })
}

async function vanishOthers () {
    for (let i=0; i<(rowCounter-2)*5; i++) {
        await vanishEl(i,70);
    }
    for (let i=29; i>(rowCounter-1)*5-1; i--) {
        await vanishEl(i,70);
    }
}

function changeColor (el, bg, delay) {
    return new Promise (function(res, rej) {
        setTimeout(function () {
            el.style.backgroundColor = bg;
            res();
        },delay);
    })
}

async function checkLetters(tempRowCount) {
    for (let i=0; i<guess.length; i++) {
        let char = guess[i];
        let currentLetter = letters[(tempRowCount - 1) * 5 + i] //this formula selects the correct span element
        setTimeout(()=>{
            currentLetter.innerHTML = char;
        },300)

        if (char == word[i]) {
            await changeColor(currentLetter, "#2d8022", 300);
            // currentLetter.style.backgroundColor = "#2d8022";
        } else if (word.search(char) >=0) {
            await changeColor(currentLetter, "#7b8022", 300);
            // currentLetter.style.backgroundColor = "#7b8022";
        } else {
            await changeColor(currentLetter, "black", 300);
            // currentLetter.style.backgroundColor = "black";
            document.querySelector(`#${char.toLowerCase()}`).style.backgroundColor="black"
        }
    } 
}

