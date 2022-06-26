


window.addEventListener("DOMContentLoaded", (event) => {
    const persons = document.querySelectorAll(".person");
    const selectedName = document.querySelector("#selectedName");
    const dutySlots = document.querySelectorAll(".dutySlot");
    const prowlSlots = document.querySelectorAll(".prowlSlot");
    const check = document.querySelector("#check");
    const deleter = document.querySelector("#deleter");
    const deleteAll = document.querySelector("#deleteAll");
    const menuButton = document.querySelector("#menuButton");
    const sideBar = document.querySelector("aside");
    const done = document.querySelector("#done");


    const colors = ["#ff595e","#ffca3a","#8ac926","#1982c4","#6a4c93", "#6f1d1b", "#2c6e49", "#001d3d", "#b38d97"]

    let selectedNameData = "";
    let personList = [];

    //show and hide sidebar menu
    menuButton.addEventListener("click", () => {
        if (sideBar.style.display == "none") {
            sideBar.style.display = "block"
        } else {
            sideBar.style.display = "none"
        }

    })

    //give each person a unique color 
    for (let i=0; i<persons.length; i++){
        persons[i].style.backgroundColor = colors[i];
    }

    //listeners to change the selectedNameData
    for (let i=0; i<persons.length; i++) {
        personList.push(persons[i].innerHTML);
        persons[i].addEventListener("click", (evt) => {
            selectedName.innerHTML = persons[i].innerHTML;
            selectedNameData = persons[i].innerHTML;
        })
    }
    deleter.addEventListener("click", () => {
        selectedNameData = "deleter";
    })

    //clear table
    deleteAll.addEventListener("click", () => {
        if (window.confirm("Delete everything?")){
            for (dutySlot of dutySlots) {
                dutySlot.innerHTML = "";
                dutySlot.className = "dutySlot"
                dutySlot.style.backgroundColor = "rgb(75, 75, 75)";
            }
        }

    })

    //listener to update dutyTable based on selectedNameData
    for (let j=0; j<dutySlots.length; j++) {
        dutySlots[j].addEventListener("click", (e) => {
            if (selectedNameData == "deleter") {
                dutySlots[j].innerHTML = "";
                dutySlots[j].className = "dutySlot"
                dutySlots[j].style.backgroundColor = "rgb(75, 75, 75)"
            } else if (!dutySlots[j].innerHTML || dutySlots[j].innerHTML!=selectedNameData) { //if the cell is  empty OR is the cell data different from selected
                dutySlots[j].innerHTML = selectedNameData;
                let trimmedName = selectedNameData.replace(/\s/g, "");
                dutySlots[j].className = "dutySlot " + trimmedName;
                persons.forEach((person) => {
                    if (person.innerHTML == selectedNameData) {
                        dutySlots[j].style.backgroundColor = person.style.backgroundColor;
                    }
                })
            }

        })
    }

    //listener to update prowlTable on click
    for (let j=0; j<prowlSlots.length; j++) {
        prowlSlots[j].addEventListener("click", () => {
            if (selectedNameData == "deleter") {
                prowlSlots[j].innerHTML = "";
                prowlSlots[j].style.backgroundColor = "rgb(30, 30, 30)"
            } else if (!prowlSlots[j].innerHTML || prowlSlots[j].innerHTML!=selectedNameData) { //if the cell is  empty OR is the cell data different from selected
                prowlSlots[j].innerHTML = selectedNameData;
            }
        })
    }

    //Calculate total number of shifts and safety breaches (jointed shifts, >12 hours in one day)
    check.addEventListener("click", (event) => {


        //clear out all colors and shift counts before running check
        for (dutySlot of dutySlots) {
            dutySlot.style.backgroundColor = "rgb(75, 75, 75)";
        }


        //calculate total no. of shifts
        for (let person of persons){
            let personSlots = document.querySelectorAll(`.${person.innerHTML.replace(/\s/g,"")}`);    
            person.nextElementSibling.innerHTML = personSlots.length;
        }
        
        //Create 2D array, 1st dimension is list of names, 2nd dimension is array of nodes
        let personSlots = []; 
        for (let i=0; i<persons.length; i++){
            personSlots[i] = document.querySelectorAll(`.${persons[i].innerHTML.replace(/\s/g,"")}`);

        }

        //person doing duty with himself
        for (let j=0; j<personSlots.length; j++){
            for (let k=0; k<personSlots[j].length ; k++) {
                if (personSlots[j][k].nextElementSibling){
                    if (personSlots[j][k].innerHTML == personSlots[j][k].nextElementSibling.innerHTML) {
                        personSlots[j][k].style.backgroundColor = "#ff006e";
                        personSlots[j][k].nextElementSibling.style.backgroundColor = "#ff006e";
    
                    }
                }
            }
        }

        console.log(personSlots);


        //person doing consecutive duty
        for (let j=0; j<personSlots.length; j++) {
            for (let k=0; k<personSlots[j].length; k++) {
                if (personSlots[j][k].parentElement.nextElementSibling){
                    if (personSlots[j][k].innerHTML == personSlots[j][k].parentElement.nextElementSibling.children[0].innerHTML)
                    {
                        personSlots[j][k].style.backgroundColor = "#fb5607";
                        personSlots[j][k].parentElement.nextElementSibling.children[0].style.backgroundColor = "#fb5607";
                    } else if (personSlots[j][k].innerHTML == personSlots[j][k].parentElement.nextElementSibling.children[1].innerHTML){
                        personSlots[j][k].style.backgroundColor = "#fb5607";
                        personSlots[j][k].parentElement.nextElementSibling.children[1].style.backgroundColor = "#fb5607";
                        console.log(personSlots[j][k].parentElement.nextElementSibling.children[1]);
                    }
                }
            }
        }

        //person doing more than 12 hours in any 24 hour window


    })

    done.addEventListener("click", () => {
        for (let i=0; i<dutySlots.length; i++) {
            persons.forEach((person) => {
                if (person.innerHTML == dutySlots[i].innerHTML) {
                    dutySlots[i].style.backgroundColor = person.style.backgroundColor;
                }
            })
        }
    })

})