var Cell = require("./cell.js");
var Ant = require("./ant.js");
var Nest = require("./nest.js");
var Detector = require("./detector.js");

function World(width, height){
    this.width = width;
    this.height = height;
    this.background = 0xFFFFFF;

    this.renderer = PIXI.autoDetectRenderer(this.width*10, this.height*10,{backgroundColor : this.background});
    this.stage = new PIXI.Container();
    this.container = new PIXI.Container();
    this.stage.addChild(this.container);
    this.stage.world = this;
    
    this.ants = [];
    this.cells = [];
    this.nest = null;

    this.stage.interactive = true;
    this.stage.hitArea = new PIXI.Rectangle(0, 0, this.renderer.width, this.renderer.height );

    this.stage.on('pointermove', function(data){
        
        if(data.data.originalEvent.buttons === 1){
            this.world.addObsticleAtCords(data.data.global.x/10, data.data.global.y/10);
        }
    });


    for(row = 0; row < this.height; row++){
        this.cells.push([]);
        for (col  = 0; col < this.width; col++){
            var cell = new Cell(col, row, this.container);
            this.cells[row].push(cell);
        }
    }
}

World.prototype.addObsticleAtCords = function(x, y){
    x = Math.round(x);
    Y = Math.round(y);
    this.cells[y+1][x+1].addObsticle();
    this.cells[y+1][x].addObsticle();
    this.cells[y+1][x-1].addObsticle();

    this.cells[y][x+1].addObsticle();
    this.cells[y][x].addObsticle();
    this.cells[y][x-1].addObsticle();

    this.cells[y-1][x+1].addObsticle();
    this.cells[y-1][x].addObsticle();
    this.cells[y-1][x-1].addObsticle();
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
