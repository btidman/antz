
var Ant = require("./ant.js");

function Nest(cell, allCells, container){
    this.cell = cell;
    cell.addNest(this);
    this.allCells = allCells;
    this.container = container;
    this.ants = [];
    this.food = 0;


    this.basicText = new PIXI.Text("Foodz: 0");
    this.basicText.x = 120;
    this.basicText.y = 10;
    
    this.container.addChild(this.basicText);
}

Nest.prototype.addAnt = function(){
    var ant = new Ant(this.cell.x,this.cell.y,this.allCells, this.container);
    this.ants.push(ant);
    ant.advance();
}

Nest.prototype.addFood = function(foodAdded){
    this.food += foodAdded;
    this.basicText.text = "Foodz: " + this.food;
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Nest;
}