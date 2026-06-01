let screen= document.getElementById("screen");
function addValue(value){
    screen.value+=value;
}

// History Array
let historyList = [];

// Update calculate function
function calculate(){

    try{
        let expression = screen.value;
        let result = eval(expression);

        // Save History
        historyList.push(expression + " = " + result);

        screen.value = result;
    }
    catch{
        screen.value = "Error";
    }
}

function showHistory(){
    if(historyList.length===0){
        alert("no history");
    }else{
        alert(historyList.join("/n"));
    }
}

function clearScreen(){
    screen.value="";
}

// Backspace
function backspace(){
    screen.value = screen.value.slice(0,-1);
}

// Square Root
function squareRoot(){
    screen.value = Math.sqrt(eval(screen.value));
}

// Show History
function showHistory(){

    let historyBox = document.getElementById("history");

    historyBox.innerHTML = "<h3>History</h3>";

    historyList.forEach(item => {
        historyBox.innerHTML += `<p>${item}</p>`;
    });
}