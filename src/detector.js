
function Detector(ant){

    this.ant = ant;
}

Detector.prototype.detectFrontCells = function(){
    
    var cellsToAdd = [];

    if(this.ant.direction == Direction.North){
        cellsToAdd = this.detectCellsNorthOfLocation(this.ant.x, this.ant.y);
    }
    else if(this.ant.direction == Direction.East){
        cellsToAdd = this.detectCellsEastOfLocation(this.ant.x, this.ant.y);
    }
    else if(this.ant.direction == Direction.South){
        cellsToAdd = this.detectCellsSouthOfLocation(this.ant.x, this.ant.y);
    }
    else if(this.ant.direction == Direction.West){
        cellsToAdd = this.detectCellsWestOfLocation(this.ant.x, this.ant.y);
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

Detector.prototype.detectCellsNorthOfLocation = function(x,y){
    var result = [];
    
    if(y - 1 >= 0){
        result.push(this.ant.cells[y - 1][x - 1]);
        result.push(this.ant.cells[y - 1][x]);
        result.push(this.ant.cells[y - 1][x + 1]);
    }

    return result;
}

Detector.prototype.detectCellsSouthOfLocation = function(x,y){
    var result = [];
    var maxY = this.ant.cells.length;
    
    if(y + 1 < maxY){
        result.push(this.ant.cells[y + 1][x - 1]);
        result.push(this.ant.cells[y + 1][x]);
        result.push(this.ant.cells[y + 1][x + 1]);
    }

    return result;
}

Detector.prototype.detectCellsEastOfLocation = function(x,y){
    var result = [];
    var maxY = this.ant.cells.length;

    if(y - 1 >= 0){
        result.push(this.ant.cells[y - 1][x + 1]);
    }

    result.push(this.ant.cells[y][x + 1]);
    
    if(y + 1 < maxY){
        result.push(this.ant.cells[y + 1][x + 1]);
    }

    return result;
}

Detector.prototype.detectCellsWestOfLocation = function(x,y){
    var result = [];
    var maxY = this.ant.cells.length;

    if(y - 1 >= 0){
        result.push(this.ant.cells[y - 1][x - 1]);
    }

    result.push(this.ant.cells[y][x - 1]);
    
    if(y + 1 < maxY){
        result.push(this.ant.cells[y + 1][x - 1]);
    }

    return result;
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Detector;
}