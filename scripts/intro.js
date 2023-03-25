
//redirecting to the game page after player has entered name and clicked on the button
function buttonClicked() {
    var typedName = document.getElementById("name").value;
    //saving typedName in local storage
    localStorage.setItem("saveName", typedName);
    //if no username input, don't proceed to instructions
    if(typedName == ""){
        window.alert("Please enter your name.");
    } else {
        window.location.href = "indexinstructions.html";
    }    
}
    
//retrive player's name
window.onload = function playerNameUpdate() {
    document.getElementById("welcome").innerHTML = "Hello " + localStorage.getItem("saveName") + ", Welcome to Space Defuser!";
}

//proceed to game
function playGame() {
    window.location.href = "indexgame.html";
}
