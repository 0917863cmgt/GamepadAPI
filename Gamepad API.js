var hasGP = false;
var repGP;

window.addEventListener('load', initGP);

function canGame() {
    return "getGamepads" in navigator;
}

function reportOnGamepad() {
    var gp = navigator.getGamepads()[0];
    //var axes1 = navigator.getGamepads()[0].axes[1];
    var html = "";
    html += "id: "+gp.id+"<br/>";

    for(var i=0;i<gp.buttons.length;i++) {
        html+= "Button "+(i+1)+": ";
        if(gp.buttons[i].pressed) html+= " pressed";
        html+= "<br/>";
    }

    for(var i=0;i<gp.axes.length; i+=2) {
        html+= "Stick "+(Math.ceil(i/2)+1)+": "+gp.axes[i]+","+gp.axes[i+1]+"<br/>";
    }


    switch (gp.buttons[7].pressed){
        case true:
            console.log("rij naar achteren");
            break;

        case false:
            console.log("stop 1");
            break;
    }

    switch (gp.buttons[8].pressed){
        case true:
            console.log("rij naar voren");
            break;

        case false:
            console.log("stop 2");
            break;
    }

    switch (gp.axes[1]){
        case -1:
            console.log("links");
            break;

        case 1:
            console.log("rechts");
            break;
    }

    document.getElementById("gamepadDisplay").html(html);
}

function initGP() {

    if(canGame()) {

        var prompt = "To begin using your gamepad, connect it and press any button!";
        var promptEl = document.getElementById("gamepadPrompt")
        promptEl.text(prompt);

        window.addEventListener('gamepadconnected', onGamepadConnected);
        window.addEventListener('gamepaddisconnected', onGamepadDisconnected);
        
        function onGamepadConnected() {
            
            hasGP = true;
            promptEl.html("Gamepad connected!");
            console.log("connection event");
            repGP = window.setInterval(reportOnGamepad,100);
        }


       function onGamepadDisconnected() {
           
            console.log("disconnection event");
            promptEl.text(prompt);
            window.clearInterval(repGP);
        }

        var checkGP = window.setInterval(function() {
            
            console.log('checkGP');
            if(navigator.getGamepads()[0]) {
                
                if(!hasGP) window.trigger("gamepadconnected");
                window.clearInterval(checkGP);
            }
        }, 500);
    }
}
