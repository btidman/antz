
var Ant = require("./ant.js");

function Nest(cell, allCells, container){
    this.cell = cell;
    cell.addNest(this);
    this.allCells = allCells;
    this.container = container;
    this.ants = [];
    this.food = 0;

    this.basicText = new PIXI.Text("Antz: 0  Foodz: 0");
    this.basicText.x = 10;
    this.basicText.y = 10;
    
    this.container.addChild(this.basicText);
}

Nest.prototype.addAnt = function(){
    var ant = new Ant(this.cell.x,this.cell.y, this.allCells,this, this.container);
    this.ants.push(ant);
    this.food -= 100;
    if(this.food < 0){
        this.food = 0;
    }
    this.updateText();
    ant.advance();
}

Nest.prototype.addFood = function(foodAdded){
    this.food += foodAdded;

    if(this.food >= 100){
        this.addAnt();
    }
    this.updateText();
}

Nest.prototype.filterDeadAntz = function(){
    this.ants = this.ants.filter(function(ant){
        return ant.status === "alive";
    });

    this.updateText();
}

Nest.prototype.updateText = function(){
    this.basicText.text = "Antz: " + this.ants.length + "  Foodz: " + this.food;
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Nest;
}