
//redirecting to the game page after player has entered name and clicked on the button
function buttonClicked() {
    var typedName = document.getElementById("name").value;
    //saving typedName in local storage
    localStorage.setItem("saveName", typedName);
    //if no username input, don't proceed to instructions
    if(typedName == ""){
        window.alert("Please enter your name.");
    } else {
        window.location.href = "indexchoosemode.html";
    }    
}

//proceed to competitive instructions
function buttonCompetitive() {
    window.location.href = "indexcompetitiveinstructions.html";
}

//proceed to leisure instructions
function buttonLeisure() {
    window.location.href = "indexleisureinstructions.html";
}
    
//retrive player's name in instructions
window.onload = function playerNameUpdate() {
    document.getElementById("welcome").innerHTML = "Hello " + localStorage.getItem("saveName") + ", Welcome to Space Defuser!";
}

//proceed to competitive game
function playCompetitiveGame() {
    window.location.href = "indexcompetitivegame.html";
}

//proceed to leisure game
function playLeisureGame() {
    window.location.href = "indexleisuregame.html";
}
