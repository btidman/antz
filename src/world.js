function World(width, height){
    this.width = width;
    this.height = height;
    this.background = 'FFFFFF';

    this.renderer = PIXI.autoDetectRenderer(this.width*10, this.height*10,{backgroundColor : 0xFFFFFF});
    this.stage = new PIXI.Container();
    this.container = new PIXI.Container();
    this.stage.addChild(this.container);
    
    this.cells = [];

    for(row = 0; row < this.height; row++){
        this.cells.push([]);
        for (col  = 0; col < this.width; col++){
            var cell = 0;
            this.cells[row].push(cell);
        }
    }
}

World.prototype.draw = function (){
    //Add the canvas to the HTML document
    document.body.appendChild(this.renderer.view);
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = InputReader;
}