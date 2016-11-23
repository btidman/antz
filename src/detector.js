
function Detector(ant){

    this.ant = ant;
}

Detector.prototype.detectCells = function(){
    
    var maxY = this.ant.cells.length;
    var cellsToAdd = [];
    var x = this.ant.x;
    var y = this.ant.y;


    if(y - 1 >= 0){
        cellsToAdd.push(this.ant.cells[y - 1][x - 1]);
        cellsToAdd.push(this.ant.cells[y - 1][x]);
        cellsToAdd.push(this.ant.cells[y - 1][x + 1]);
    }

    cellsToAdd.push(this.ant.cells[y][x - 1]);
    cellsToAdd.push(this.ant.cells[y][x + 1]);

    if(y + 1 < maxY){
        cellsToAdd.push(this.ant.cells[y + 1][x - 1]);
        cellsToAdd.push(this.ant.cells[y + 1][x]);
        cellsToAdd.push(this.ant.cells[y + 1][x + 1]);
    }

    return this.filterUndefinedCells(cellsToAdd);
}

Detector.prototype.filterUndefinedCells = function(newCells){

    var result = [];

    for(var x = 0; x < newCells.length; x++){
        if(newCells[x]){
            result.push(newCells[x]);
        }
    }

    return result;
}


// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Detector;
}