function MoveBehavior(ant){
    this.ant = ant;
    this.type = "Move";
}

MoveBehavior.prototype.doBehavior = function(){

    var highestValue = -1;
    var indexToMoveTo = -1;
    var lastCell = this.ant.trail[this.ant.trail.length-2];

    for(var x = 0; x < this.ant.surroundingCells.length; x++){
        var randomValue = Math.random();
        randomValue += (this.ant.surroundingCells[x].pheromone / 10);
        
        if(randomValue > highestValue && lastCell != this.ant.surroundingCells[x]){
            highestValue = randomValue;
            indexToMoveTo = x;
        }
    }

    if(indexToMoveTo >= 0){
        var cell = this.ant.surroundingCells[indexToMoveTo];
        this.ant.moveToCell(cell);

        if(this.ant.trail.indexOf(cell) == -1){
            this.ant.trail.push(cell);  
        }else{ 
            while(this.ant.trail[this.ant.trail.length - 1] != cell){
                this.ant.trail.pop();
            }
        }
    }
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = MoveBehavior;
}
