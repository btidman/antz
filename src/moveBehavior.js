function MoveBehavior(ant){
    this.ant = ant;
    this.type = "Move";
    this.maxTrailLength = (this.ant.cells.length * this.ant.cells[0].length);
}

MoveBehavior.prototype.doBehavior = function(){

    var frontCells = this.ant.detector.detectFrontCells();

    var landmarkCell = this.ant.detector.pickNextLandMark(frontCells);
    
    if(landmarkCell){
        var closeCells = this.ant.detector.detectCloseCells();
        var cellToMoveTo = this.ant.detector.findClosestToLandmark(landmarkCell, closeCells);

        this.ant.moveToCell(cellToMoveTo);

        if(this.ant.trail.indexOf(cellToMoveTo) == -1){
            this.ant.trail.push(cellToMoveTo);  
        }
        // else{
        //     while(this.ant.trail[this.ant.trail.length - 1] != cellToMoveTo){
        //         this.ant.trail.pop();
        //     }
        // }
        else if(cellToMoveTo.pheromone === 0){ 
            while(this.ant.trail[this.ant.trail.length - 1] != cellToMoveTo){
                this.ant.trail.pop();
            }
        }else{
            this.ant.trail.push(cellToMoveTo); 
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
