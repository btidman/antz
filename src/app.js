var PIXI = require('pixi.js');
var TWEEN = require('tween.js');
var World = require("./world.js");


window.ANT_TEXTURE = PIXI.Texture.fromImage('../ant.png');
window.FOOD_TEXTURE = PIXI.Texture.fromImage('../food.png');
window.NEST_TEXTURE = PIXI.Texture.fromImage('../nest.png');
window.PHEROMONE_TEXTURE = PIXI.Texture.fromImage('../pheromone.png');

window.appSpeed = 10;
window.showPheromone = true;

window.evaporationSpeed = 5000/window.appSpeed;
window.antSpeed = 50/window.appSpeed;


var world = new World(300,300);
window.world = world;
world.draw();

function gameLoop(){
    window.evaporationSpeed = 5000/window.appSpeed;
    window.antSpeed = 50/window.appSpeed;
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

window.setupAndStart = function setupAndStart(){
    world.addNest(30,30);
    //world.addFood(30,30, 1000);
    world.addFood(200,200,1000);
    for(var x = 0; x<50; x++ ){ world.addAnt()}
}
