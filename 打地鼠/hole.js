started = false;
var mouses;
var mouse;
counter = 31;
score = 0;
caught = false;
level = 1000;
//gap = 1;

function set() {
    //alert("show");
    var holes = document.getElementById("holes");
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 6; i ++) {
        for (var j = 0; j < 10; j ++) {
            var mole = document.createElement("button");
            //mole.type = "radio";
            mole.className = "before";
            frag.appendChild(mole);
        }
        var newLine = document.createElement("br");
        frag.appendChild(newLine);
    }
    holes.appendChild(frag);
    start();
}

function start() {
    started = true;
    document.getElementById("controler").onmousedown = function() {begin()};
    document.getElementById("easy").onclick = function() {easy()};
    document.getElementById("medium").onclick = function() {medium()};
    document.getElementById("tough").onclick = function() {tough()};
    ace();
}

function easy() {
    level = 2000;
}

function medium() {
    level = 1000;
}

function tough() {
    level = 500;
}

//window.onload = function() {ace()};

function ace() {
    //alert("ace");
    setTimeout("sub()", 1000);
}

function sub() {
    counter --;
    if (counter > 0) {
        ace();
        document.getElementById("time").value = counter;
    }
}

function begin() {
    //document.getElementById("show").value = "begin" + counter;
    //alert("b")
    //started = true;
    //document.getElementById("time").value = counter;
    if (counter > 0) {
        //alert("mek");
        make();
        //document.getElementById("controler").onmousedown = function() {end()};
    }
   // if (started) {
        //document.getElementById("show").value = "yi zhi";
        //document.getElementById("controler").onmousedown = function() {end()};
    //}
    if (started) {
        document.getElementById("controler").onmousedown = function() {stop()};
    }
    if (!started) {
        document.getElementById("controler").onmousedown = function() {restart()};
        started = true;
    }
}

function stop() {
    started = false;
    //alert("end");
    counter = 1;
    document.getElementById("game").value = "Game Over";
}

function next() {
    //counter -= gap;
    if (counter >= 0)
        document.getElementById("time").value = counter;
    if (counter > 0) {
        make();
    }
    else {
        document.getElementById("game").value = "Game Over";
        //document.getElementById("time").value = counter;
        started = false;
        begin();
    }
}

function make() {
    var num = Math.floor(Math.random() * 60);
    mouses = document.getElementsByClassName("before");
    //mouses[num].type = "button";
    mouses[num].className = "to-hit";
    mouse = document.getElementsByClassName("to-hit");
    mouse[0].setAttribute("onclick", "die()");
    setTimeout("live()", level);
}

function die() {
    //alert("lll");
    score ++;
    document.getElementById("score").value = score;
    try{
        mouse[0].removeAttribute("onclick");
    }
    catch(exception) {

    }
    mouse[0].className = "before";
    caught = true;
}

function live() {
    if (!caught) {
        score --;
        document.getElementById("score").value = score;
        try{
            mouse[0].removeAttribute("onclick");
        }
        catch(exception) {
        
        }
        mouse[0].className = "before";
    }
    caught = false;
    next();
}

function end() {
    started = false;
    //alert("end");
    document.getElementById("game").value = "Game Over";
    counter = 0;
    document.getElementById("time").value = counter;
    document.getElementById("stop-start").onclick = function() {restart()};
}

function restart() {
    counter = 30;
    document.getElementById("time").value = counter;
    score = 0;
    document.getElementById("score").value = score;
    document.getElementById("game").value = "";
    begin();
    ace();
}






