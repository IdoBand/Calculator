const developer = {
    name:"Ido Band",
    version: "0.0.0",
    desciption:"This calculator should help you do math, math is math"
};

let buttons1 = Array.from(document.getElementsByTagName("button"));

// func requested on part I sec. 9 
function developerDetails() {
    alert("Developer's Name: Ido band \nVesion: 0.0.0 \ndescription: math is math");
};

// func requested on part I sec. 10
function displayButtonInfo(id) {
    // alert(id);
};
// #################################### part II


let onOffButtons = Array.from(document.getElementsByClassName("on-off"))

function darkMode() {
    let bodyElement = document.body;

    if (bodyElement.className === '') {
        bodyElement.classList.add("dark");
    }
    else {
        bodyElement.classList.remove("dark");
    }
};

function scientificOn() {
    const element = document.getElementById("scientific");
    let btn = document.getElementById("scientific-mode")
    if (element.style.display === "none") {
        element.style.display = "block";
        // btn.style.backgroundColor = "orange"
    }
};

function basicOn() {
    const element = document.getElementById("scientific");
    if (element.style.display = "block") {
        element.style.display = "none";

    }

};


function historyOnOff() {
    const element = document.getElementById("operations-log");
    if (element.style.display === "none") {
        element.style.display = "block";
    }
    else {
        element.style.display = "none";
    }
};


// attempt to make a 'gloabl' function for all on / off buttons



// onOffButtons.map(button => {
//     button.addEventListener('click', (e) => {
//         let clickedItemID = e.target.id;

//         if (clickedItemID === 'dark-mode') {
//             darkMode();
//         }
//         else {
//             onOff(e);
//         }

//     });
// });

// function OnOff(e) {
//     const element = e;
//     console.log(`e.id: ${e.target.id}`);
//     if (element.style.display === "none") {
//         element.style.display = "block";
//     }
//     else {
//         element.style.display = "none";
//     }
// };
