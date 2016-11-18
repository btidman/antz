var PIXI = require('pixi.js');
var TWEEN = require('tween.js');
var World = require("./world.js");


window.ANT_TEXTURE = PIXI.Texture.fromImage('../ant.png');
window.FOOD_TEXTURE = PIXI.Texture.fromImage('../food.png');
window.NEST_TEXTURE = PIXI.Texture.fromImage('../nest.png');

var world = new World(100,100);
window.world = world;


world.draw();
    
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

