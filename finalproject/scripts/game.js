function selectCell() {
    chooseCell(this);
}

//set up playing field
window.onload = function showTable() {
    document.getElementById("table").innerHTML="";
    for(let r=0; r<15; r++) {
        row = table.insertRow(r);
        for(let c=0; c<20; c++) {
            cell = row.insertCell(c);
            //function activated when a cell is clicked
            cell.addEventListener("click", selectCell);
            // //creating bomb attribute
            // let bomb = document.createAttribute("bomb");
            // //set value of bomb attribute
            // bomb.value="safe";
            //add bomb attribute to cell
            cell.setAttribute("bomb","safe");
            console.log(cell.getAttribute("bomb"));
        }
    }
    insertBombs();
}

//allocate bombs to cells randomly
function insertBombs() {
    for (let i=0; i<50; i++) {
        var row = Math.floor(Math.random() * 15);
        var col = Math.floor(Math.random() * 20);
        var cell = table.rows[row].cells[col];
        console.log(cell);
            if(cell.getAttribute("bomb")==="safe") {
                cell.setAttribute("bomb","explode");
                cell.innerHTML="X";
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
            }
        }
    }
}


//when cell is clicked
function chooseCell(select) {
    select.className="changecolor";
        let r = select.parentNode.rowIndex;
        let c = select.cellIndex;
        console.log(r);
        console.log(c); 
    if (select.getAttribute("bomb") === "safe") {
        //show number of bombs around the cell
        if (r-1 >= 0 && r+1 < 15 && c-1 >= 0 && c+1 < 20) {
            var count = 0
            //top
            if(table.rows[r-1].cells[c].innerHTML === "X") {
                count += 1;
            } //bottom
            if(table.rows[r+1].cells[c].innerHTML === "X") {
                count += 1;
            } //left
            if(table.rows[r].cells[c-1].innerHTML === "X") {
                count += 1;
            } //right
            if(table.rows[r].cells[c+1].innerHTML === "X") {
                count += 1;
            } //bottom left
            if(table.rows[r+1].cells[c-1].innerHTML === "X") {
                count += 1;
            } //bottom right
            if(table.rows[r+1].cells[c+1].innerHTML === "X") {
                count += 1;
            } //top left
            if(table.rows[r-1].cells[c-1].innerHTML === "X") {
                count += 1;
            } //top right
            if(table.rows[r-1].cells[c+1].innerHTML === "X") {
                count += 1;
            }
            table.rows[r].cells[c].innerHTML = count;
        } //code for left column of playing field
        if (r-1 >= 0 && r+1 < 15 && c-1 == -1 && c+1 < 20) {
            var count = 0
            //top
            if(table.rows[r-1].cells[c].innerHTML === "X") {
                count += 1;
            } //bottom
            if(table.rows[r+1].cells[c].innerHTML === "X") {
                count += 1;
            } //right
            if(table.rows[r].cells[c+1].innerHTML === "X") {
                count += 1;
            } //bottom right
            if(table.rows[r+1].cells[c+1].innerHTML === "X") {
                count += 1;
            } //top right
            if(table.rows[r-1].cells[c+1].innerHTML === "X") {
                count += 1;
            }
            table.rows[r].cells[c].innerHTML = count;
        } //code for right column of playing field
        if (r-1 >= 0 && r+1 < 15 && c-1 >= 0 && c+1 == 20) {
            var count = 0
            //top
            if(table.rows[r-1].cells[c].innerHTML === "X") {
                count += 1;
            } //bottom
            if(table.rows[r+1].cells[c].innerHTML === "X") {
                count += 1;
            } //left
            if(table.rows[r].cells[c-1].innerHTML === "X") {
                count += 1;
            } //bottom left
            if(table.rows[r+1].cells[c-1].innerHTML === "X") {
                count += 1;
            } //top left
            if(table.rows[r-1].cells[c-1].innerHTML === "X") {
                count += 1;
            }
            table.rows[r].cells[c].innerHTML = count;
        } //code for top row of playing field
        if (r-1 == -1 && r+1 < 15 && c-1 >= 0 && c+1 < 20) {
            var count = 0
            //bottom
            if(table.rows[r+1].cells[c].innerHTML === "X") {
                count += 1;
            } //left
            if(table.rows[r].cells[c-1].innerHTML === "X") {
                count += 1;
            } //right
            if(table.rows[r].cells[c+1].innerHTML === "X") {
                count += 1;
            } //bottom left
            if(table.rows[r+1].cells[c-1].innerHTML === "X") {
                count += 1;
            } //bottom right
            if(table.rows[r+1].cells[c+1].innerHTML === "X") {
                count += 1;
            }
            table.rows[r].cells[c].innerHTML = count;
        } //code for bottom row of playing field
        if (r-1 >= 0 && r+1 == 15 && c-1 >= 0 && c+1 < 20) {
            var count = 0
            //top
            if(table.rows[r-1].cells[c].innerHTML === "X") {
                count += 1;
            } //left
            if(table.rows[r].cells[c-1].innerHTML === "X") {
                count += 1;
            } //right
            if(table.rows[r].cells[c+1].innerHTML === "X") {
                count += 1;
            } //top left
            if(table.rows[r-1].cells[c-1].innerHTML === "X") {
                count += 1;
            } //top right
            if(table.rows[r-1].cells[c+1].innerHTML === "X") {
                count += 1;
            }
            table.rows[r].cells[c].innerHTML = count;
        } //hardcode for top left of playing field
        if (r-1 == -1 && c-1 == -1) {
            var count = 0
            //bottom
            if(table.rows[r+1].cells[c].innerHTML === "X") {
                count += 1;
            } //right
            if(table.rows[r].cells[c+1].innerHTML === "X") {
                count += 1;
            } //bottom right
            if(table.rows[r+1].cells[c+1].innerHTML === "X") {
                count += 1;
            }
            table.rows[r].cells[c].innerHTML = count;
        } //hardcode for top right of playing field
        if (r-1 == -1 && c+1 == 20) {
            var count = 0
            //bottom
            if(table.rows[r+1].cells[c].innerHTML === "X") {
                count += 1;
            } //left
            if(table.rows[r].cells[c-1].innerHTML === "X") {
                count += 1;
            } //bottom left
            if(table.rows[r+1].cells[c-1].innerHTML === "X") {
                count += 1;
            }
            table.rows[r].cells[c].innerHTML = count;
        } //hardcode for bottom left of playing field
        if (r+1 == 15 && c-1 == -1) {
            var count = 0
            //top
            if(table.rows[r-1].cells[c].innerHTML === "X") {
                count += 1;
            } //right
            if(table.rows[r].cells[c+1].innerHTML === "X") {
                count += 1;
            } //top right
            if(table.rows[r-1].cells[c+1].innerHTML === "X") {
                count += 1;
            }
            table.rows[r].cells[c].innerHTML = count;
        } //hardcode for bottom right of playing field
        if (r+1 == 15 && c+1 == 20) {
            var count = 0
            //top
            if(table.rows[r-1].cells[c].innerHTML === "X") {
                count += 1;
            } //left
            if(table.rows[r].cells[c-1].innerHTML === "X") {
                count += 1;
            } //top left
            if(table.rows[r-1].cells[c-1].innerHTML === "X") {
                count += 1;
            }
            table.rows[r].cells[c].innerHTML = count;
        }
    } else {
        showBombLocation();
        setTimeout(function (){
             window.alert("CHIKABOOM! Sorry " + localStorage.getItem("saveName") + ", you lost. Try harder next time!");
        },10)
        for (let r=0; r<15; r++) {
            for (let c=0; c<20; c++) {
                let cell = table.rows[r].cells[c];
                cell.removeEventListener("click", selectCell);
            }
        }
    }
    reveal()
}

function reveal() {
    if (table.rows[r].cells[c].innerHTML === 0) {
        //reveal cell till there is no 0
    }
}
