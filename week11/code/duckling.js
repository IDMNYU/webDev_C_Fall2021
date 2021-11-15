console.log("theMessage is here! (the javascript is here)")

const theButton = document.getElementById("firstButton");
let theBody = document.querySelector("body");
let thePara = document.querySelector("p");
// console.log(thePara)

theButton.addEventListener('click', makeDo);

function makeDo(){
    console.log("You clicked the button!");
    theBody.style.backgroundColor = "green";
    theBody.style.color = "white"
    thePara.textContent = "you presesed the button!"
    
}