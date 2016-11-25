function MoveBehavior(ant){
    this.ant = ant;
    this.type = "Move";
}

MoveBehavior.prototype.doBehavior = function(){

    if(this.ant.surroundingCells.length > 0){
        var randomIndex = Math.floor((Math.random() * this.ant.surroundingCells.length));
        var cell = this.ant.surroundingCells[randomIndex];
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
