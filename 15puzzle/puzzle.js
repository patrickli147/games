started = false;

window.onload = function() {
    //alert("cool");
    //var puzzleBox = document.getElementById("puzzle-box");
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 16; i ++) {
        var temp = document.createElement("div");
        temp.id = "picture" + i;
        temp.className = "small-pictures";
        temp.nodevalue = i;
        //console.log(temp.nodevalue); 
        temp.addEventListener("click", change);
        frag.appendChild(temp);
    }
    document.getElementById("puzzle-box").appendChild(frag);
    var cheater = document.getElementById("cheat");
    cheater.addEventListener("click", cheat);
    var restart = document.getElementById("restart");
    restart.addEventListener("click", reset);
    var origin = document.getElementById("origin");
    origin.addEventListener("click", show);
    //reset();
}

function change() {
    var pictures = document.getElementsByClassName("small-pictures");
    var theId = this.id;
    var nodevalue = this.nodevalue;
    //console.log(nodevalue);

    for (var i = 0; i < pictures.length; i ++) {
        if (pictures[i].nodevalue == nodevalue + 1 || pictures[i].nodevalue == nodevalue - 1
            || pictures[i].nodevalue == nodevalue + 4 || pictures[i].nodevalue == nodevalue - 4) {
                if (pictures[i].id == "picture15") {
                    var temp = theId;
                    theId = pictures[i].id;
                    pictures[i].id = temp;
                    break;
                }
            }
    }
    this.id = theId;
    document.getElementById("flag").value = "";
    finish();
}

function reset() {
    //console.log("reset");
    if (started = false) {
        started = true;
    }
    numbers = [];
    while (true) {
        numbers = [];
        for (var i = 0; i < 15; i ++) {
            var preceeded = false;
            var temp = Math.floor(Math.random() * 15);
            for (var k = 0; k < numbers.length; k ++) {
                if (temp == numbers[k]) {
                    preceeded = true;
                    //console.log("pre");
                    break;
                }
            }
            if (! preceeded)
                numbers[i] = temp;
            if (preceeded) {
                i --;
            }
        }

        if (canSolve(numbers)) {
            //console.log("yes");
            break;
        }
    }
    /*
    for (var n = 0; n < numbers.length; n ++)
        console.log(numbers[n]);
    */
    //canSolve();

    var pictures = document.getElementsByClassName("small-pictures");
    for (var j = 0; j < 15; j ++) {
        pictures[j].id = "picture" + numbers[j];
    }
    pictures[15].id = "picture15";

    document.getElementById("flag").value = "";
}

function finish() {
    var pictures = document.getElementsByClassName("small-pictures");
    var finished = true;
    for (var i = 0; i < pictures.length; i ++) {
        var theId;
        if (i >= 10) {
            theId = pictures[i].id.substring(pictures[i].id.length - 2, pictures[i].length);
        }
        else var theId = pictures[i].id.substring(pictures[i].id.length - 1, pictures[i].length);
        //console.log(theId);
        if (theId != pictures[i].nodevalue) {
            finished = false;
        }
    }

    if (finished) {
        document.getElementById("flag").value = "已拼好";
    }
}

function canSolve(numbers) {
    var num = 0;
    var fullNumbers = [];
    for (var i = 0; i < numbers.length; i ++) {
        fullNumbers[i] = numbers[i];
    }
    fullNumbers[numbers.length] = 15;
    
    for (var j = 0; j < fullNumbers.length; j ++) {
        for (var k = j + 1; k < fullNumbers.length; k ++) {
            if (fullNumbers[j] > fullNumbers[k]) {
                num ++;
            }
        }
    }

    if (num % 2 === 0) {
        return true;
    }
    else return false;
}

function cheat() {
    //console.log("cool");
    document.getElementById("flag").value = "";
    var pictures = document.getElementsByClassName("small-pictures");
    for (var i = 0; i < 14; i ++) {
        pictures[i].id = "picture" + i;
    }
    pictures[14].id = "picture15";
    pictures[15].id = "picture14";
}

function show(){
    try {
        var img1 = document.getElementById("ori-img");
        img1.id = "ori-img1";
    }catch(exception) {
        try {
            var img2 = document.getElementById("ori-img1");
            img2.id = "ori-img";
        }catch(exception) {
            
        }
    }
}
