function DropFoodBehavior(ant){
    this.ant = ant;
    this.type = "Drop_Food";
}

DropFoodBehavior.prototype.doBehavior = function(){

    this.ant.hasFood = false;
    this.ant.trail.push(this.ant.cells[this.ant.y][this.ant.x]);
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = DropFoodBehavior;
}
