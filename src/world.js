var Cell = require("./cell.js");
var Ant = require("./ant.js");
var Nest = require("./nest.js");

function World(width, height){
    this.width = width;
    this.height = height;
    this.background = 0xFFFFFF;

    this.renderer = PIXI.autoDetectRenderer(this.width*10, this.height*10,{backgroundColor : this.background});
    this.stage = new PIXI.Container();
    this.container = new PIXI.Container();
    this.stage.addChild(this.container);
    
    this.ants = [];
    this.cells = [];
    this.nest = null;

    for(row = 0; row < this.height; row++){
        this.cells.push([]);
        for (col  = 0; col < this.width; col++){
            var cell = new Cell(col, row, this.container);
            this.cells[row].push(cell);
        }
    }
}


World.prototype.draw = function (){
    //Add the canvas to the HTML document
    document.body.appendChild(this.renderer.view);
}

World.prototype.addNest = function(x,y){
    var newNest = new Nest(this.cells[y][x], this.cells, this.container);
    this.nest = newNest;
}

World.prototype.addAnt = function(){
    
    if(this.nest){
        this.nest.addAnt();
    }
}

World.prototype.addFood = function(x, y, amountOfFood){
    var cell = this.cells[y][x];
    cell.addFood(amountOfFood);
}

World.prototype.advance = function(){
    for(row = 0; row < this.height; row++){
        for (col = 0; col < this.width; col++){
            this.cells[row][col].advance();
        }
    }
}



// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = World;
}
