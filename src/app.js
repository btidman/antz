var PIXI = require('pixi.js');
var TWEEN = require('tween.js');
var World = require("./world.js");


window.ANT_TEXTURE = PIXI.Texture.fromImage('../ant.png');
window.FOOD_TEXTURE = PIXI.Texture.fromImage('../food.png');
window.NEST_TEXTURE = PIXI.Texture.fromImage('../nest.png');
window.PHEROMONE_TEXTURE = PIXI.Texture.fromImage('../pheromone.png');

window.evaporationSpeed = 500;
window.antSpeed = 50;


var world = new World(100,100);
window.world = world;
world.draw();

function gameLoop(){

    world.advance();
    setTimeout(gameLoop, evaporationSpeed); 
}

gameLoop();

    
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

