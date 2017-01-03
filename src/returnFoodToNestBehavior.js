var Decider = require("./decider");

function ReturnFoodToNestBehavior(ant){
    this.type = "Return_Food";
    this.ant = ant;
}

ReturnFoodToNestBehavior.prototype.doBehavior = function(){
    var nextCell = this.ant.trail.pop();
    //var pheromone = this.ant.decider.getPheromoneAmountFromTrailLength(this.ant);
    var pheromone = 4 - Math.log10(this.ant.stepsTowardNest);

    nextCell.addPheromone(pheromone);
    for(var x = 0; x < this.ant.surroundingCells.length; x++){
        this.ant.surroundingCells[x].addPheromone(pheromone/2);
    }
    this.ant.stepsTowardNest++;
    
    
    this.ant.moveToCell(nextCell);
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = ReturnFoodToNestBehavior;
}
