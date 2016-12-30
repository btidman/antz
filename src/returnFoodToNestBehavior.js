function ReturnFoodToNestBehavior(ant){
    this.type = "Return_Food";
    this.ant = ant;
}

ReturnFoodToNestBehavior.prototype.doBehavior = function(){
    var nextCell = this.ant.trail.pop();
    nextCell.addPheromone(20);
    this.ant.moveToCell(nextCell);
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = ReturnFoodToNestBehavior;
}
