

var world = new World(100,200);

world.draw();

function gameLoop(){

    world.advance();
    animate();
    setTimeout(gameLoop, 50); 
}

gameLoop();

//var lastLoop = new Date;
    

function animate () {
    // var thisLoop = new Date;
    // var fps = 1000 / (thisLoop - lastLoop);
    // lastLoop = thisLoop;
    // console.log(fps);
    // render the root container
    world.renderer.render(world.stage);
    //requestAnimationFrame( animate );
}