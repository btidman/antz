function DropFoodBehavior(ant){
    this.ant = ant;
    this.type = "Drop_Food";
}

DropFoodBehavior.prototype.doBehavior = function(){

    this.ant.hasFood = false;
    this.ant.trail.push(this.ant.cells[this.ant.y][this.ant.x]);
    this.ant.cells[this.ant.y][this.ant.x].nest.addFood(10);
    this.ant.stepsTowardNest = 0;
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = DropFoodBehavior;
}
