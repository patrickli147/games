function MysetTimeout(callback, delay, arg) {
    var setTimeoutId, start, remaining = delay;

    pause = function () {
        window.clearTimeout(setTimeoutId);
        remaining -= new Date() - start;
        controller.remaining = remaining;
    };

    play = function () {
        start = new Date();
        window.clearTimeout(setTimeoutId);
        setTimeoutId= window.setTimeout(callback, remaining, arg);
    };

    clear = function() {
        window.clearTimeout(setTimeoutId);
    }

    var controller = {};
    controller.play = play;
    controller.pause = pause;
    controller.clear = clear;
    controller.remaining = remaining;
    controller.delay = delay;
    play();
    return controller;
}

function MysetInterval(callback, delay, arg) {
   var controllers = [];
    function callbackInterval() {
        callback(arg);
        var timer2 = MysetTimeout(callbackInterval,delay, arg);
        controllers.push(timer2);
    }
    var timer1 = MysetTimeout(callbackInterval,delay,arg);
    controllers.push(timer1);
    return controllers;
}