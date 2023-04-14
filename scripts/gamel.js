function selectCell() {
    chooseCell(this);
}

function rightClickCell() {
    plantFlag(this);
}

//set up playing field
window.onload = function showTable() {
    document.getElementById("table").innerHTML="";
    for(let r=0; r<15; r++) {
        row = table.insertRow(r);
        for(let c=0; c<20; c++) {
            cell = row.insertCell(c);
            cell.className="black";
            //function activated when a cell is clicked
            cell.addEventListener("click", selectCell);
            //function activated when a cell is right-clicked
            cell.addEventListener('contextmenu', rightClickCell);
            //add bomb attribute to cell
            cell.setAttribute("bomb","safe");
            // console.log(cell.getAttribute("bomb"));
            //add open attribute to cell
            cell.setAttribute("open","false");
        }
    }
    insertBombs();
    startTimer();
    musicControl();
}


//allocate bombs to cells randomly
function insertBombs() {
    for (let i=0; i<50; i++) {
        let row = Math.floor(Math.random() * 15);
        let col = Math.floor(Math.random() * 20);
        let cell = table.rows[row].cells[col];
        // console.log(cell);
            if(cell.getAttribute("bomb")==="safe") {
                cell.setAttribute("bomb","explode");
                //cell.innerHTML="X";
            } else {
                --i;
            }
    }
}

//revealing bomb locations
function showBombLocation() {
    for (let r=0; r<15; r++) {
        for (let c=0; c<20; c++) {
            let cell = table.rows[r].cells[c];
            if (cell.getAttribute("bomb") === "explode") {
                cell.className = "explosive";
                cell.innerHTML = "💣";
            }
        }
    }
}

//show all cells
function showCells() {
    for (let r=0; r<15; r++) {
        for (let c=0; c<20; c++) {
            let cell = table.rows[r].cells[c];
            if (cell.getAttribute("open") === "false" && cell.getAttribute("bombs") !== "explode") {
                chooseCell(cell);
            }
        }
    }
}

var countflag = 0;
var flagCorrect = 0;
//right click to demarcate potential "bombs"
function plantFlag(select) {
    if (select.innerHTML === "" && countflag < 50){
        select.innerHTML = "⚠️";
        select.setAttribute("open", "true");
        countflag += 1;
        document.getElementById("count").innerHTML = "Bomb Count: " + countflag;
        //count correct bomb location
        if(select.getAttribute("bomb") === "explode") {
            flagCorrect += 1;
            // console.log(flagCorrect);
        }
        //check if player won
        if(flagCorrect === 50) {
            showCells();
            setTimeout(function(){
                window.alert("Congrats " + localStorage.getItem("saveName") + ", you saved the Universe in " + time + "s! Proud of you buddy!");
            },10);
            musicPlaying = true;
            musicControl();
            document.getElementById("music").removeAttribute("onclick");
            stopTimer();
            for (let r=0; r<15; r++) {
                for (let c=0; c<20; c++) {
                    let cell = table.rows[r].cells[c];
                    cell.removeEventListener("click", selectCell);
                    cell.removeEventListener('contextmenu', rightClickCell);
                }
            }
        }
    } 
    else if (select.innerHTML === "⚠️" && flagCorrect !== 50) {
        select.innerHTML = "";
        select.setAttribute("open", "false");
        countflag -= 1;
        document.getElementById("count").innerHTML = "Bomb Count: " + countflag;
        if(select.getAttribute("bomb") === "explode") {
            flagCorrect -= 1;
            // console.log(flagCorrect);
        }
    }  
}

//when cell is clicked
function chooseCell(select) {
    //if cell has been clicked then dont click again
    if (select.getAttribute("open") === "true"){
        return;
    } else {
        select.setAttribute("open","true");
    }
     select.className="changecolor";
        let r = select.parentNode.rowIndex;
        let c = select.cellIndex;
        // console.log(r);
        // console.log(c);        
    if (select.getAttribute("bomb") === "safe") {
        //show number of bombs around the cell
        if (r-1 >= 0 && r+1 < 15 && c-1 >= 0 && c+1 < 20) {
            let count = 0
            //top
            if(table.rows[r-1].cells[c].getAttribute("bomb") === "explode") {
                count += 1;
            } //bottom
            if(table.rows[r+1].cells[c].getAttribute("bomb") === "explode") {
                count += 1;
            } //left
            if(table.rows[r].cells[c-1].getAttribute("bomb") === "explode") {
                count += 1;
            } //right
            if(table.rows[r].cells[c+1].getAttribute("bomb") === "explode") {
                count += 1;
            } //bottom left
            if(table.rows[r+1].cells[c-1].getAttribute("bomb") === "explode") {
                count += 1;
            } //bottom right
            if(table.rows[r+1].cells[c+1].getAttribute("bomb") === "explode") {
                count += 1;
            } //top left
            if(table.rows[r-1].cells[c-1].getAttribute("bomb") === "explode") {
                count += 1;
            } //top right
            if(table.rows[r-1].cells[c+1].getAttribute("bomb") === "explode") {
                count += 1;
            }
            table.rows[r].cells[c].innerHTML = count;
        } //code for left column of playing field
        if (r-1 >= 0 && r+1 < 15 && c-1 == -1 && c+1 < 20) {
            let count = 0
            //top
            if(table.rows[r-1].cells[c].getAttribute("bomb") === "explode") {
                count += 1;
            } //bottom
            if(table.rows[r+1].cells[c].getAttribute("bomb") === "explode") {
                count += 1;
            } //right
            if(table.rows[r].cells[c+1].getAttribute("bomb") === "explode") {
                count += 1;
            } //bottom right
            if(table.rows[r+1].cells[c+1].getAttribute("bomb") === "explode") {
                count += 1;
            } //top right
            if(table.rows[r-1].cells[c+1].getAttribute("bomb") === "explode") {
                count += 1;
            }
            table.rows[r].cells[c].innerHTML = count;
        } //code for right column of playing field
        if (r-1 >= 0 && r+1 < 15 && c-1 >= 0 && c+1 == 20) {
            let count = 0
            //top
            if(table.rows[r-1].cells[c].getAttribute("bomb") === "explode") {
                count += 1;
            } //bottom
            if(table.rows[r+1].cells[c].getAttribute("bomb") === "explode") {
                count += 1;
            } //left
            if(table.rows[r].cells[c-1].getAttribute("bomb") === "explode") {
                count += 1;
            } //bottom left
            if(table.rows[r+1].cells[c-1].getAttribute("bomb") === "explode") {
                count += 1;
            } //top left
            if(table.rows[r-1].cells[c-1].getAttribute("bomb") === "explode") {
                count += 1;
            }
            table.rows[r].cells[c].innerHTML = count;
        } //code for top row of playing field
        if (r-1 == -1 && r+1 < 15 && c-1 >= 0 && c+1 < 20) {
            let count = 0
            //bottom
            if(table.rows[r+1].cells[c].getAttribute("bomb") === "explode") {
                count += 1;
            } //left
            if(table.rows[r].cells[c-1].getAttribute("bomb") === "explode") {
                count += 1;
            } //right
            if(table.rows[r].cells[c+1].getAttribute("bomb") === "explode") {
                count += 1;
            } //bottom left
            if(table.rows[r+1].cells[c-1].getAttribute("bomb") === "explode") {
                count += 1;
            } //bottom right
            if(table.rows[r+1].cells[c+1].getAttribute("bomb") === "explode") {
                count += 1;
            }
            table.rows[r].cells[c].innerHTML = count;
        } //code for bottom row of playing field
        if (r-1 >= 0 && r+1 == 15 && c-1 >= 0 && c+1 < 20) {
            let count = 0
            //top
            if(table.rows[r-1].cells[c].getAttribute("bomb") === "explode") {
                count += 1;
            } //left
            if(table.rows[r].cells[c-1].getAttribute("bomb") === "explode") {
                count += 1;
            } //right
            if(table.rows[r].cells[c+1].getAttribute("bomb") === "explode") {
                count += 1;
            } //top left
            if(table.rows[r-1].cells[c-1].getAttribute("bomb") === "explode") {
                count += 1;
            } //top right
            if(table.rows[r-1].cells[c+1].getAttribute("bomb") === "explode") {
                count += 1;
            }
            table.rows[r].cells[c].innerHTML = count;
        } //hardcode for top left of playing field
        if (r-1 == -1 && c-1 == -1) {
            let count = 0
            //bottom
            if(table.rows[r+1].cells[c].getAttribute("bomb") === "explode") {
                count += 1;
            } //right
            if(table.rows[r].cells[c+1].getAttribute("bomb") === "explode") {
                count += 1;
            } //bottom right
            if(table.rows[r+1].cells[c+1].getAttribute("bomb") === "explode") {
                count += 1;
            }
            table.rows[r].cells[c].innerHTML = count;
        } //hardcode for top right of playing field
        if (r-1 == -1 && c+1 == 20) {
            let count = 0
            //bottom
            if(table.rows[r+1].cells[c].getAttribute("bomb") === "explode") {
                count += 1;
            } //left
            if(table.rows[r].cells[c-1].getAttribute("bomb") === "explode") {
                count += 1;
            } //bottom left
            if(table.rows[r+1].cells[c-1].getAttribute("bomb") === "explode") {
                count += 1;
            }
            table.rows[r].cells[c].innerHTML = count;
        } //hardcode for bottom left of playing field
        if (r+1 == 15 && c-1 == -1) {
            let count = 0
            //top
            if(table.rows[r-1].cells[c].getAttribute("bomb") === "explode") {
                count += 1;
            } //right
            if(table.rows[r].cells[c+1].getAttribute("bomb") === "explode") {
                count += 1;
            } //top right
            if(table.rows[r-1].cells[c+1].getAttribute("bomb") === "explode") {
                count += 1;
            }
            table.rows[r].cells[c].innerHTML = count;
        } //hardcode for bottom right of playing field
        if (r+1 == 15 && c+1 == 20) {
            let count = 0
            //top
            if(table.rows[r-1].cells[c].getAttribute("bomb") === "explode") {
                count += 1;
            } //left
            if(table.rows[r].cells[c-1].getAttribute("bomb") === "explode") {
                count += 1;
            } //top left
            if(table.rows[r-1].cells[c-1].getAttribute("bomb") === "explode") {
                count += 1;
            }
            table.rows[r].cells[c].innerHTML = count;
        }
    } else {
        showBombLocation();
        //showCells();
        setTimeout(function (){
             window.alert("CHIKABOOM! Sorry " + localStorage.getItem("saveName") + ", you lost. Try harder next time!");
        },10);
        stopTimer();
        musicPlaying = true;
        musicControl();
        document.getElementById("music").removeAttribute("onclick");
        for (let r=0; r<15; r++) {
            for (let c=0; c<20; c++) {
                let cell = table.rows[r].cells[c];
                cell.removeEventListener("click", selectCell);
                cell.removeEventListener('contextmenu', rightClickCell);
            }
        }
    }
    if (table.rows[r].cells[c].innerHTML == 0) {
        //reveal bombs numbers around cell that has 0 bomb
        if (r-1 >= 0 && r+1 < 15 && c-1 >= 0 && c+1 < 20){
            //top
            chooseCell(table.rows[r-1].cells[c]);
            //bottom
            chooseCell(table.rows[r+1].cells[c]);
            //left
            chooseCell(table.rows[r].cells[c-1]);
            //right
            chooseCell(table.rows[r].cells[c+1]);
            //top right
            chooseCell(table.rows[r-1].cells[c+1]);
            //top left
            chooseCell(table.rows[r-1].cells[c-1]);
            //bottom right
            chooseCell(table.rows[r+1].cells[c+1]);
            //bottom left
            chooseCell(table.rows[r+1].cells[c-1]);
        } //left column of playing field 
        if ((r-1 >= 0 && r+1 < 15 && c-1 == -1 && c+1 < 20)) {
            //top
            chooseCell(table.rows[r-1].cells[c]);
            //bottom
            chooseCell(table.rows[r+1].cells[c]);
            //right
            chooseCell(table.rows[r].cells[c+1]);
            //top right
            chooseCell(table.rows[r-1].cells[c+1]);
            //bottom right
            chooseCell(table.rows[r+1].cells[c+1]);
        } //code for right column of playing field
        if (r-1 >= 0 && r+1 < 15 && c-1 >= 0 && c+1 == 20) {
            //top
            chooseCell(table.rows[r-1].cells[c]);
            //bottom
            chooseCell(table.rows[r+1].cells[c]);
            //left
            chooseCell(table.rows[r].cells[c-1]);
            //top left
            chooseCell(table.rows[r-1].cells[c-1]);
            //bottom left
            chooseCell(table.rows[r+1].cells[c-1]);
        } //code for top row of playing field
        if (r-1 == -1 && r+1 < 15 && c-1 >= 0 && c+1 < 20) {
            //bottom
            chooseCell(table.rows[r+1].cells[c]);
            //left
            chooseCell(table.rows[r].cells[c-1]);
            //right
            chooseCell(table.rows[r].cells[c+1]);
            //bottom right
            chooseCell(table.rows[r+1].cells[c+1]);
            //bottom left
            chooseCell(table.rows[r+1].cells[c-1]);
        } //code for bottom row of playing field
        if (r-1 >= 0 && r+1 == 15 && c-1 >= 0 && c+1 < 20) {
            //top
            chooseCell(table.rows[r-1].cells[c]);
            //left
            chooseCell(table.rows[r].cells[c-1]);
            //right
            chooseCell(table.rows[r].cells[c+1]);
            //top right
            chooseCell(table.rows[r-1].cells[c+1]);
            //top left
            chooseCell(table.rows[r-1].cells[c-1]);
        } //hardcode for top left of playing field
        if (r-1 == -1 && c-1 == -1) {
            //bottom
            chooseCell(table.rows[r+1].cells[c]);
            //right
            chooseCell(table.rows[r].cells[c+1]);
            //bottom right
            chooseCell(table.rows[r+1].cells[c+1]);
        } //hardcode for top right of playing field
        if (r-1 == -1 && c+1 == 20) {
            //bottom
            chooseCell(table.rows[r+1].cells[c]);
            //left
            chooseCell(table.rows[r].cells[c-1]);
            //bottom left
            chooseCell(table.rows[r+1].cells[c-1]);
        } //hardcode for bottom left of playing field
        if (r+1 == 15 && c-1 == -1) {
            //top
            chooseCell(table.rows[r-1].cells[c]);
            //right
            chooseCell(table.rows[r].cells[c+1]);
            //top right
            chooseCell(table.rows[r-1].cells[c+1]);
        } //hardcode for bottom right of playing field
        if (r+1 == 15 && c+1 == 20) {
            //top
            chooseCell(table.rows[r-1].cells[c]);
            //left
            chooseCell(table.rows[r].cells[c-1]);
            //top left
            chooseCell(table.rows[r-1].cells[c-1]);
        }
    }
}

//Set timer
var time = -1;

function startTimer() {
    time += 001;
    document.getElementById("timer").innerHTML= "Timer: "+ time + "s";
}
var Countup = setInterval(startTimer,1000);

//stop timer
function stopTimer() {
    clearInterval(Countup);
    return time;
}

//restart game
function restartGame() {
    window.location.reload();
}

//creating boolean to track state of music
var musicPlaying = false;

//play or pause music
function musicControl() {
    //muted="muted"
    if (musicPlaying === false) {
        document.getElementById("gameMusic").play();
        musicPlaying = true;
    } else {
        document.getElementById("gameMusic").pause();
        musicPlaying = false;
    }
   //console.log(musicPlaying);
}

//rocket follow cursor
document.addEventListener('mousemove',function(e) {
    let rocket= document.getElementById("character");
    let left= e.offsetX;
    let top= e.offsetY;
    rocket.style.left = e.pageX + 45 + 'px';
    rocket.style.top = e.pageY + 45 + 'px';
})
    
//proceed to competitive instructions
function buttonCompetitive() {
    window.location.href = "indexcompetitiveinstructions.html";
}
