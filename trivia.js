

let btnWrong=document.querySelectorAll('.btn-wrong');
let btnCorrect = document.querySelector('.btn-correct');
let feedback1=document.querySelector('#feedback1');
let feedback2=document.querySelector('#feedback2');
let anniversary = document.querySelector('#anniversary');
let anniversarySubmit = document.querySelector('#anniversarySubmit');
let tries = document.querySelector('#tries');
let counter=3;


anniversarySubmit.addEventListener('click',(e)=>{
    checkAns(anniversary.value);
})

anniversary.addEventListener('keydown',(e)=>{
    if (e.key=="Enter"){
        feedback2.innerText = e.key +" | " + e.keyCode;
        console.log(e);
        checkAns(anniversary.value);
    }

})

function checkAns (ans){
    if (ans=='22102021' && ans !=''){
        feedback2.classList.add('text-success');
        feedback2.innerText='Correct!';
        anniversary.setAttribute('disabled','');
        anniversarySubmit.setAttribute('disabled','');
            
    } else {
        feedback2.classList.add('text-danger');
        feedback2.innerText='Wrong!';
        counter--;
        tries.innerText=counter;
        if (counter<=0){
            anniversary.setAttribute('disabled','');
            anniversarySubmit.setAttribute('disabled','');
        }
    }
}

btnCorrect.addEventListener('click', ()=>{
    feedback1.classList.add('text-success');
    feedback1.innerText='Correct!';
    disableQ1();
    
})

for (btn of btnWrong){
    btn.addEventListener('click', ()=>{
        feedback1.classList.add('text-danger')
        feedback1.innerText='Wrong!';
        disableQ1();
    })
}


function disableQ1 () {
    btnCorrect.setAttribute('disabled','');
    for (btn of btnWrong){
        btn.setAttribute('disabled','');
    }
}