
var Ant = require("./ant.js");

function Nest(cell, allCells, container){
    this.cell = cell;
    cell.addNest(this);
    this.allCells = allCells;
    this.container = container;
    this.ants = [];
}

Nest.prototype.addAnt = function(){
    var ant = new Ant(this.cell.x,this.cell.y,this.allCells, this.container);
    this.ants.push(ant);
    ant.advance();
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Nest;
}