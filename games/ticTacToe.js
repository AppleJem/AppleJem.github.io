let grids = document.querySelectorAll('.grid');
let counter = 0;
let winner = document.querySelector('#winner');

function isFull(){
    let count=0;
    for (grid of grids){
        if (grid.innerHTML!=''){
            count++;
        }
    }
    if (count==9){
        return true;
    } else {
        return false;
    }
}

for (grid of grids){
    grid.addEventListener('click',function checkResult(){
        if (counter%2==0 && this.innerHTML==''){
            this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/><path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/></svg>'
            this.classList.add('x');
            counter++;
            if (checkWin()){
                winner.innerText = "Player 1 wins!";
                winner = null;
                return;
            }
            if (isFull()){
                winner.innerText = "Draw!";
            }
        } else if (this.innerHTML=='') {
            this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/></svg>'
            this.classList.add('o');
            counter++;
            if (checkWin()){
                winner.innerText = "Player 2 wins!";
                winner = null;
                return;
            }
            if (isFull()){
                winner.innerText = "Draw!";
            }
        }
    }) 
}


function checkWin(){
    for (let i=0; i<7;i+=3) {
        if (grids[i].getAttribute('class')==grids[i+1].getAttribute('class') &&
        grids[i+1].getAttribute('class')==grids[i+2].getAttribute('class') &&
        grids[i].innerHTML!="") {
            return true;
        }
    }
    for (let i=0;i<3;i++){
        if (grids[i].getAttribute('class')==grids[i+3].getAttribute('class') &&
        grids[i+3].getAttribute('class')==grids[i+6].getAttribute('class') &&
        grids[i].innerHTML!="") {
            return true;
        }
    }
    if (grids[0].getAttribute('class')==grids[4].getAttribute('class') &&
    grids[4].getAttribute('class')==grids[8].getAttribute('class') &&
    grids[0].innerHTML!="") {
        return true;
    } else if (grids[2].getAttribute('class')==grids[4].getAttribute('class') &&
    grids[4].getAttribute('class')==grids[6].getAttribute('class') &&
    grids[2].innerHTML!="") {
        return true;
    }
    return false;
}
