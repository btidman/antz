function ReturnFoodToNestBehavior(ant){
    this.type = "Return_Food";
    this.ant = ant;
}

ReturnFoodToNestBehavior.prototype.doBehavior = function(){
    this.ant.moveToCell(this.ant.trail.pop());
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = ReturnFoodToNestBehavior;
}
