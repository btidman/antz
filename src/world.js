var Cell = require("./cell.js");
var Ant = require("./ant.js");

function World(width, height){
    this.width = width;
    this.height = height;
    this.background = 'FFFFFF';

    this.renderer = PIXI.autoDetectRenderer(this.width*10, this.height*10,{backgroundColor : 0xFFFFFF});
    this.stage = new PIXI.Container();
    this.container = new PIXI.Container();
    this.stage.addChild(this.container);
    
    this.ants = [];
    this.cells = [];

    for(row = 0; row < this.height; row++){
        this.cells.push([]);
        for (col  = 0; col < this.width; col++){
            var cell = new Cell(col, row);
            this.cells[row].push(cell);
        }
    }
}

World.prototype.draw = function (){
    //Add the canvas to the HTML document
    document.body.appendChild(this.renderer.view);
}

World.prototype.addAnt = function(x, y){
    var ant = new Ant(x,y,this.cells, this.container);
    this.ants.push(ant);
    ant.advance();
}

World.prototype.addFood = function(x, y, amountOfFood){
    var cell = this.cells[y][x];
    cell.addFood(amountOfFood);
}


// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = World;
}
