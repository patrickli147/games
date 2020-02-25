lastInput = "0";
wrong = false;
leftB = 0;
rightB = 0;

function isNumber(a) {
    if (a >= "0" && a <= "9") return true;
    else return false;
}

function isMinus(a) {
    if (a == "-") return true;
    else return false;
}

function isBracket(a) {
    if (a == "(" || a == ")") return true;
    else return false;
}

function isLeftB(a) {
    if (a == "(")  {
        return true;
    }
    else return false;
}

function isRightB(a) {
    if (a == ")") {
        return true;
    }
    else return false;
}

function wrongInput() {
    alert("莫乱整要的不！！！");
    //clearAll();
    wrong = false;
}

function isOperator(a) {
    if (a == "+" || a == "-" || a == "*" || a == "/") return true;
    else return false;
}

function isLetter(a) {
    if (a == "y") {
        return true;
    }

    else return false;
}

function clickAt(a) {
    //document.write("/");

    var kkk = document.getElementById("expression").value;
    if (kkk.substring(kkk.length - 1, kkk.length) == "y" || kkk.substring(kkk.length - 1, kkk.length) == "N") {
        wrongInput();
        clearAll();
        return;
    }

    if ((lastInput == "*" || lastInput == "/") && a == "-") {

    }
    else if (!isNumber(lastInput) && !isNumber(a) && !isLeftB(a) && !isBracket(lastInput)) {
        backspace();
        lastInput = a;
        var n = document.getElementById("expression").value;
        if (n.substring(n.length - 1, n.length) != "*" && n.substring(n.length - 1, n.length) != "/")
            document.getElementById("expression").value += lastInput;
        if (isLeftB(a)) {
            leftB ++;
        }
        if (isRightB(a)) {
            rightB ++;
        }
        return;
    }

    if (lastInput == "(" && (a == "*" || a == "/")) {
        wrongInput();
        return;
    }

    if (lastInput == ")" && a == ".") {
        wrongInput();
        return;
    }

    if (isMinus(lastInput) && !isMinus(a) && !isNumber(a) && !isLeftB(a) && a != "+") {
        wrongInput();
        return;
    }

    if (!isNumber(lastInput) && !isBracket(lastInput) && isRightB(a)) {
        wrongInput();
        return;
    }

    if (isLeftB(lastInput) && isRightB(a)) {
        wrongInput();
        return;
    }

    if (isRightB(lastInput) && isLeftB(a)) {
        wrongInput();
        return;
    }

    if (isNumber(lastInput) && isLeftB(a)) {
        var x = document.getElementById("expression").value;
        if (x != "0") {
            wrongInput();
            return;
        }
    }

    if (lastInput == "." && !isNumber(a)) {
        wrongInput();
        return;
    }

    if (isLeftB(a)) {
        leftB ++;
    }
    if (isRightB(a)) {
        rightB ++;
    }

    var x = document.getElementById("expression").value;
    if (x.length == 16) {
        alert("no more input");
        return;
    }
    a = String(a);
    lastInput = a;
    if (x == "0" && (isNumber(a) || isLeftB(a))) x = a;
    else x += a;
    document.getElementById("expression").value = x;
}

function compute() {
    //document.write("/");
    var test = document.getElementById("expression").value;
    if (isOperator(test.charAt(test.length - 1))) {
        wrongInput();
        return;
    }
    
    for (var i = 0; i < test.length; i ++) {
        var nextDot = false;
        var mis = true;
        if (test.charAt(i) == ".") {
            for (var j = i + 1; j < test.length; j ++) {
                if (test.charAt(j) == ".") {
                    nextDot = true;
                    break;
                }
            }

            if (nextDot) {
                for (var k = i + 1; test.charAt(k) != "."; k ++) {
                    if (!isNumber(test.charAt(k))) {
                        mis = false;
                    }
                }

                if (mis) {
                    wrongInput();
                    return;
                }
                else break;
            }

            else break;
        }
    }

    if (leftB != rightB) {
        wrongInput();
        return;
    }

    out = eval(document.getElementById("expression").value);
    out = String(out);
    if (out.length > 10 && out >= 10000000000) {
        //document.write("/");
        var count = 0;
        while (out > 10) {
            out /= 10;
            count ++;
        }
        out = String(out);
        if (out.length > 10) {
            out = out.substring(0,9);
        }
        count = String(count);
        out = out + "e" + count;
        document.getElementById("expression").value = out;
        rightB = 0;
        leftB = 0;
        lastInput = "0";
    }

    out = String(out);
        if (out.length > 16) {
            out = out.substring(0,15);
        }

    document.getElementById("expression").value = out;
    rightB = 0;
    leftB = 0;
    lastInput = "0";
}

function clearAll() {
    document.getElementById("expression").value = "0";
    leftB = 0;
    rightB = 0;
    lastInput = "0";
}

function backspace() {
    var x = document.getElementById("expression").value;

    var lei = x.substring(x.length - 1, x.length);
    if (lei == "(") {
        leftB --;
    }

    if (lei == ")") {
        rightB --;
    }

    if (x == "0") return;
    var l = x.length;
    if (l == 1) x = "0";
    else x = x.substring(0, l - 1);
    document.getElementById("expression").value = x;
    lastInput = x.substring(x.length-1, x.length);
}


