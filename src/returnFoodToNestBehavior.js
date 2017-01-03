var Decider = require("./decider");

function ReturnFoodToNestBehavior(ant){
    this.type = "Return_Food";
    this.ant = ant;
}

ReturnFoodToNestBehavior.prototype.doBehavior = function(){
    var nextCell = this.ant.trail.pop();
    var pheromone = this.ant.decider.getPheromoneAmountFromTrailLength(this.ant);
    nextCell.addPheromone(pheromone);
    this.ant.moveToCell(nextCell);
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = ReturnFoodToNestBehavior;
}
