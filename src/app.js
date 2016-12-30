var PIXI = require('pixi.js');
var TWEEN = require('tween.js');
var World = require("./world.js");


window.ANT_TEXTURE = PIXI.Texture.fromImage('../ant.png');
window.FOOD_TEXTURE = PIXI.Texture.fromImage('../food.png');
window.NEST_TEXTURE = PIXI.Texture.fromImage('../nest.png');
window.PHEROMONE_TEXTURE = PIXI.Texture.fromImage('../pheromone.png');

window.evaporationSpeed = 100;
window.antSpeed = 10;


var world = new World(200,200);
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

world.addNest(100,100);
world.addFood(50,50, 1000);
world.addFood(150,150,1000);
for(var x = 0; x<100; x++ ){ world.addAnt()}
