function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    }
    else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

function init() {
    if (!document.getElementById) {
        return false;
    }
    if (!document.createEvent) {
        return false;
    }
    var startButton = document.getElementById("start");
    startButton.addEventListener("click", start);
    
}

function start() {
    var currentNodeValue = this.lastChild.nodeValue;
    if (currentNodeValue == "start") {
        var scoreInput = document.getElementById("score");
        scoreInput.setAttribute("value", "0");
        if (this.getAttribute("creatingState")) {
            clearInterval(this.getAttribute("creatingState"));
            this.setAttribute("creatingState", false);
        }
        var levelController = document.getElementById("level-controller");
        var speed = parseInt(levelController.value);
        var creatingBlocks = setInterval("createBlocks()", speed * 100);
        this.setAttribute("creatingState", creatingBlocks);
        //console.log("Type of creatingState: "+ typeof this.getAttribute("creatingState")); => string
        //this.removeEventListener("click", start); //prevent to start multi games
        this.lastChild.nodeValue = "restart";
    }
    else {
        var map = document.getElementById("map");
        while (map.lastChild) {

            map.removeChild(map.lastChild);
        }
        this.lastChild.nodeValue = "start";
        this.addEventListener("click", start);
        this.click();
    }
    var pauseButton = document.getElementById("pause");
    pauseButton.addEventListener("click", pause);
    pauseButton.style.display = "inline";
    pauseButton.lastChild.nodeValue = "pause";
}

function countDown() {

}

function createBlocks() {
    var map = document.getElementById("map");
    var newBlcok = document.createElement("Button");
    map.appendChild(newBlcok);
    var currentDate = new Date();
    var newId = parseInt(currentDate.getSeconds().toString());
    newBlcok.setAttribute("id", newId);
    console.log("create id : " + newId);
    var positiionDecider = Math.floor(Math.random() * 3);
    var newClassName;
    if (positiionDecider == 0) {
        newClassName = "blocks";
    }
    else if (positiionDecider == 1) {
        newClassName = "blocks middle";
    }
    else {
        newClassName = "blocks right";
    }
    newBlcok.setAttribute("class", newClassName);
    newBlcok.style.left = "0px";
    newBlcok.style.top = "0px";
    /*
    var vanishListener = (function() { //使用匿名函数当观察者
        vanish(newId);
    });    
    newBlcok.setAttribute("vanishListener", vanishListener);
    console.log("Lifx " + typeof newBlcok.getAttribute("vanishListener")); // changed into a string
    */
    newBlcok.addEventListener("click", function(){
        if (newBlcok.getAttribute("gameState") == "paused") {
            this.removeEventListener("click", arguments.callee);
            return;
        }
        vanish(newId);
    });
    //newBlcok.setAttribute("vanishListener", listener());
    move(newBlcok.getAttribute("id"));
}

function vanish(id) {
    console.log("vanishing id" + id);
    var currentBlock = document.getElementById(id);
    clearTimeout(currentBlock.getAttribute("movingState"));
    var parent = currentBlock.parentNode;
    parent.removeChild(currentBlock);
    //currentBlock.setAttribute("class", "vanish");
    console.log("vanishing " + currentBlock.style.top);
    var scoreInput = document.getElementById("score");
    var currentScore = parseInt(scoreInput.getAttribute("value"));
    currentScore ++;
    scoreInput.setAttribute("value", currentScore);
}

function move(id) {
    //console.log("moving");
    //console.log("currentBlock:" + id);
    var currentBlock = document.getElementById(id);
    var ypos = parseInt(currentBlock.style.top);
    if (ypos < 600) {
        ypos += 2;
    }
    else {
        end(id);
        return;
    }
    currentBlock.style.top = ypos + "px";
    var levelController = document.getElementById("level-controller");
    //console.log("value is" + levelController.value + ", nodeValue is " + levelController.nodeValue);
    var speed = parseInt(levelController.value);
    var moving = setTimeout(move, speed, id);
    currentBlock.setAttribute("movingState", moving);
}

function end(id) {
    //var brokenBlock = document.getElementById("id");
    /* 
    var oldClassName = brokenBlock.getAttribute("class");
    var brokenClassName = "broken";
    if (oldClassName.lastIndexOf("middle") != -1) {
        brokenClassName += " middle";
    } 
    if (oldClassName.lastIndexOf("right") != -1) {
        brokenClassName += " right";
    }
    */
    var pauseButton = document.getElementById("pause");
    pauseButton.removeEventListener("click", pause);
    pauseButton.style.display = "none";
    pauseButton.lastChild.nodeValue = "pause";
    console.log("ending id: " + id);
    pause();
    changeColor(id);
    //showResult();
}

function changeColor(id) {
    //console.log("changing color");
    var currentBlock = document.getElementById(id);
    var currentClassName = currentBlock.getAttribute("class");
    //console.log("currentClassName: " + currentClassName);
    var newClassName = "";
    if (currentClassName.lastIndexOf("block") != -1) {
        newClassName += "broken";
    }
    else {
        newClassName += "blocks"
    }
    if (currentClassName.lastIndexOf("middle") != -1) {
            newClassName += " middle";
    }
    if (currentClassName.lastIndexOf("right") != -1) {
        newClassName += " right";
    }
    currentBlock.left = "0px"; // remember to set cause it is position:absolute
    currentBlock.setAttribute("class", newClassName);
    //console.log("new className: " + newClassName);
    setTimeout(changeColor, 500, id);
}

function pause() {
    var blocks = document.getElementsByClassName("blocks");
    var startButton = document.getElementById("start");
    var pauseButton = document.getElementById("pause");
    var currentNodeValue = pauseButton.lastChild.nodeValue;
    if (currentNodeValue == "pause") {
        for (var i = 0; i < blocks.length; i ++) {
            if (typeof blocks[i].getAttribute("movingState") != undefined) {
                clearTimeout(blocks[i].getAttribute("movingState"));
            }
            blocks[i].setAttribute("gameState", "paused"); // set to helpRemoveEventListener
        }
        clearInterval(startButton.getAttribute("creatingState"));
        pauseButton.lastChild.nodeValue = "resume";
    }
    else {
        for (var i = 0; i < blocks.length; i ++) {
            if (typeof blocks[i].getAttribute("movingState") != undefined) {
                var moving = setTimeout(move, 10, blocks[i].getAttribute("id"));
                blocks[i].setAttribute("movingState", moving);
            }
            blocks[i].setAttribute("gameState", "playing");
        }
        var creatingBlocks = setInterval("createBlocks()", 2000);
        startButton.setAttribute("creatingState", creatingBlocks);
        pauseButton.lastChild.nodeValue = "pause";
    }
}

addLoadEvent(init);