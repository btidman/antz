function MoveBehavior(ant){
    this.ant = ant;
    this.type = "Move";
    this.maxTrailLength = (this.ant.cells.length * this.ant.cells[0].length);
}

MoveBehavior.prototype.doBehavior = function(){

    //var frontCells = this.ant.detector.detectFrontCells();

    var nextCell = this.ant.detector.pickNextCell(this.ant.surroundingCells);

    if(nextCell){
        this.ant.moveToCell(nextCell);

        if(this.ant.trail.indexOf(nextCell) == -1){
            this.ant.trail.push(nextCell);  
        }else{ 
            while(this.ant.trail[this.ant.trail.length - 1] != nextCell){
                this.ant.trail.pop();
            }
        }


        if(this.ant.trail.length >= this.maxTrailLength){
            this.ant.returnToNest = true;
        }
    }
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = MoveBehavior;
}
