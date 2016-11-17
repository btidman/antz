var PIXI = require('pixi.js');
var TWEEN = require('tween.js');
var World = require("./world.js");

var world = new World(100,200);
window.world = world;

world.draw();

function gameLoop(){

    world.advance();
    setTimeout(gameLoop, 500); 
}

gameLoop();

//var lastLoop = new Date;
    
animate();
function animate () {
    
    // var thisLoop = new Date;
    // var fps = 1000 / (thisLoop - lastLoop);
    // lastLoop = thisLoop;
    // console.log(fps);
    // render the root container
    requestAnimationFrame( animate );
    TWEEN.update();
    world.renderer.render(world.stage);
    
    
}

