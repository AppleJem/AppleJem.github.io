let columns = document.querySelectorAll('.column');
let indicator = document.querySelector('#indicator');
let winner = document.querySelector('#winner');

let counter = 0;
let color = ['red', 'blue', 'red','rgb(0, 115, 255)'];
let letters = ['a','b','c','d','e','f','g'];
let numbers = ['one','two','tre','for','fve','six'];
let dotCount = 0;

for (let i=0; i<columns.length;i++){
    columns[i].addEventListener('click', function (){
        for (child of columns[i].children){
            if (child.innerHTML == ""){
                child.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z"/></svg>'
                child.firstChild.setAttribute('class', color[counter%2]);
                indicator.style.backgroundColor = color[counter%2+2];
                let position = child.getAttribute('class').slice(-6);
                position = position.replaceAll(' ','.');
                checkUp(position, -1, true);
                checkUR(position, -1, true);
                checkRight(position, -1, true);
                checkDR(position, -1, true);
                counter++;
                break;
            }
        }
    })
}


function win (position){
    let color = document.querySelector(position).firstChild.getAttribute('class');
    winner.style.backgroundColor = color;
    winner.style.color='white';
    columns = null;
}


function checkUp(position,reversed=-1,newDirection=false){ //position is the class that determins the dot's position (eg. '.a.one')
    let letter = position.substring(1,2);
    let number = position.substring(3);
    let oneUp = '.'+letter+'.'+numbers[numbers.indexOf(number)+1];
    if (newDirection || reversed==0) dotCount=0;
    if (document.querySelector(oneUp)!=null && 
    document.querySelector(oneUp).innerHTML == document.querySelector(position).innerHTML &&
    document.querySelector(position).innerHTML!="") {
        console.log(position + " and " + oneUp + " is the same!");
        dotCount++
        if (dotCount==3) {
            console.log('someone won')
            win(position);
            return true;
        }
        if (reversed==-1) {
            checkUp(oneUp,-1);
        } else {
            reversed++
            checkUp(oneUp,reversed);
        }
    } else if (reversed==-1){
        checkDown(position,0,false);
    } else {
        console.log("They ain't the same!")
    }
}


function checkDown(position,reversed=-1,newDirection=false){ //position is the class that determins the dot's position (eg. '.a.one')
    let letter = position.substring(1,2);
    let number = position.substring(3);
    let oneDown = '.'+letter+'.'+numbers[numbers.indexOf(number)-1];
    if (newDirection || reversed==0) dotCount=0;
    if (document.querySelector(oneDown)!=null && 
    document.querySelector(oneDown).innerHTML == document.querySelector(position).innerHTML &&
    document.querySelector(position).innerHTML!="") {
        console.log(position + " and " + oneDown + " is the same!");
        dotCount++
        if (dotCount==3) {
            console.log('someone won')
            win(position);
            return true;
        }
        if (reversed==-1) {
            checkDown(oneDown,-1);
        } else {
            reversed++
            checkDown(oneDown,reversed);
        }
    } else if (!reversed==-1){
        checkUp(position,0,false);
    } else {
        console.log("They ain't the same!")
    }
}

function checkRight(position,reversed=-1,newDirection=false){ //position is the class that determins the dot's position (eg. '.a.one')
    let letter = position.substring(1,2);
    let number = position.substring(3);
    let oneRight = '.'+letters[letters.indexOf(letter)+1]+'.'+number;
    if (newDirection || reversed==0) dotCount=0;
    if (document.querySelector(oneRight)!=null && 
    document.querySelector(oneRight).innerHTML == document.querySelector(position).innerHTML &&
    document.querySelector(position).innerHTML!="") {
        console.log(position + " and " + oneRight + " is the same!");
        dotCount++
        if (dotCount==3) {
            console.log('someone won')
            win(position);
            return true;
        }
        if (reversed==-1) {
            checkRight(oneRight,-1);
        } else {
            reversed++
            checkRight(oneRight,reversed);
        }
    } else if (reversed==-1){
        checkLeft(position,0,false);
    } else {
        console.log("They ain't the same!")
    }
}


function checkLeft(position,reversed=-1,newDirection=false){ //position is the class that determins the dot's position (eg. '.a.one')
    let letter = position.substring(1,2);
    let number = position.substring(3);
    let oneLeft = '.'+letters[letters.indexOf(letter)-1]+'.'+number;
    if (newDirection || reversed==0) dotCount=0;
    if (document.querySelector(oneLeft)!=null && 
    document.querySelector(oneLeft).innerHTML == document.querySelector(position).innerHTML &&
    document.querySelector(position).innerHTML!="") {
        console.log(position + " and " + oneLeft + " is the same!");
        dotCount++
        if (dotCount==3) {
            console.log('someone won')
            win(position);
            return true;
        }
        if (reversed==-1) {
            checkLeft(oneLeft,-1);
        } else {
            reversed++
            checkLeft(oneLeft,reversed);
        }
    } else if (reversed==-1){
        checkRight(position,0,false);
    } else {
        console.log("They ain't the same!")
    }
}



function checkUR(position,reversed=-1,newDirection=false){ //position is the class that determins the dot's position (eg. '.a.one')
    let letter = position.substring(1,2);
    let number = position.substring(3);
    let oneUR = '.'+letters[letters.indexOf(letter)+1]+'.'+numbers[numbers.indexOf(number)+1];
    if (newDirection || reversed==0) dotCount=0;
    if (document.querySelector(oneUR)!=null && 
    document.querySelector(oneUR).innerHTML == document.querySelector(position).innerHTML &&
    document.querySelector(position).innerHTML!="") {
        console.log(position + " and " + oneUR + " is the same!");
        dotCount++
        if (dotCount==3) {
            console.log('someone won')
            win(position);
            return true;
        }
        if (reversed==-1) {
            checkUR(oneUR,-1);
        } else {
            reversed++
            checkUR(oneUR,reversed);
        }
    } else if (reversed==-1){
        checkDL(position,0,false);
    } else {
        console.log("They ain't the same!")
    }
}

function checkDL(position,reversed=-1,newDirection=false){ //position is the class that determins the dot's position (eg. '.a.one')
    let letter = position.substring(1,2);
    let number = position.substring(3);
    let oneDL = '.'+letters[letters.indexOf(letter)-1]+'.'+numbers[numbers.indexOf(number)-1];
    if (newDirection || reversed==0) dotCount=0;
    if (document.querySelector(oneDL)!=null && 
    document.querySelector(oneDL).innerHTML == document.querySelector(position).innerHTML &&
    document.querySelector(position).innerHTML!="") {
        console.log(position + " and " + oneDL + " is the same!");
        dotCount++
        if (dotCount==3) {
            console.log('someone won')
            win(position);
            return true;
        }
        if (reversed==-1) {
            checkDL(oneDL,-1);
        } else {
            reversed++
            checkDL(oneDL,reversed);
        }
    } else if (reversed==-1){
        checkUR(position,0,false);
    } else {
        console.log("They ain't the same!")
    }
}


function checkDR(position,reversed=-1,newDirection=false){ //position is the class that determins the dot's position (eg. '.a.one')
    let letter = position.substring(1,2);
    let number = position.substring(3);
    let oneDR = '.'+letters[letters.indexOf(letter)+1]+'.'+numbers[numbers.indexOf(number)-1];
    if (newDirection || reversed==0) dotCount=0;
    if (document.querySelector(oneDR)!=null && 
    document.querySelector(oneDR).innerHTML == document.querySelector(position).innerHTML &&
    document.querySelector(position).innerHTML!="") {
        console.log(position + " and " + oneDR + " is the same!");
        dotCount++
        if (dotCount==3) {
            console.log('someone won')
            win(position);
            return true;
        }
        if (reversed==-1) {
            checkDR(oneDR,-1);
        } else {
            reversed++
            checkDR(oneDR,reversed);
        }
    } else if (reversed==-1){
        checkUL(position,0,false);
    } else {
        console.log("They ain't the same!")
    }
}

function checkUL(position,reversed=-1,newDirection=false){ //position is the class that determins the dot's position (eg. '.a.one')
    let letter = position.substring(1,2);
    let number = position.substring(3);
    let oneUL = '.'+letters[letters.indexOf(letter)-1]+'.'+numbers[numbers.indexOf(number)+1];
    if (newDirection || reversed==0) dotCount=0;
    if (document.querySelector(oneUL)!=null && 
    document.querySelector(oneUL).innerHTML == document.querySelector(position).innerHTML &&
    document.querySelector(position).innerHTML!="") {
        console.log(position + " and " + oneUL + " is the same!");
        dotCount++
        if (dotCount==3) {
            console.log('someone won')
            win(position);
            return true;
        }
        if (reversed==-1) {
            checkUL(oneUL,-1);
        } else {
            reversed++
            checkUL(oneUL,reversed);
        }
    } else if (reversed==-1){
        checkDR(position,0,false);
    } else {
        console.log("They ain't the same!")
    }
}