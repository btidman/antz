
function Detector(cells){

    this.cells = cells;

    return this;
}

Detector.prototype.detectFrontCells = function(x, y, direction){
    
    var cellsToAdd = [];

    if(direction == Direction.North){
        cellsToAdd = this.detectCellsNorthOfLocation(x, y);
    }
    else if(direction == Direction.East){
        cellsToAdd = this.detectCellsEastOfLocation(x, y);
    }
    else if(direction == Direction.South){
        cellsToAdd = this.detectCellsSouthOfLocation(x, y);
    }
    else if(direction == Direction.West){
        cellsToAdd = this.detectCellsWestOfLocation(x, y);
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
        result.push(this.cells[y - 1][x - 1]);
        result.push(this.cells[y - 1][x]);
        result.push(this.cells[y - 1][x + 1]);
    }

    return result;
}

Detector.prototype.detectCellsSouthOfLocation = function(x,y){
    var result = [];
    var maxY = this.cells.length;
    if(y + 1 < maxY){
        result.push(this.cells[y + 1][x - 1]);
        result.push(this.cells[y + 1][x]);
        result.push(this.cells[y + 1][x + 1]);
    }

    return result;
}

Detector.prototype.detectCellsEastOfLocation = function(x,y){
    var result = [];
    var maxY = this.cells.length;

    if(y - 1 >= 0){
        result.push(this.cells[y - 1][x + 1]);
    }

    result.push(this.cells[y][x + 1]);
    
    if(y + 1 < maxY){
        result.push(this.cells[y + 1][x + 1]);
    }

    return result;
}

Detector.prototype.detectCellsWestOfLocation = function(x,y){
    var result = [];
    var maxY = this.cells.length;

    if(y - 1 >= 0){
        result.push(this.cells[y - 1][x - 1]);
    }

    result.push(this.cells[y][x - 1]);
    
    if(y + 1 < maxY){
        result.push(this.cells[y + 1][x - 1]);
    }

    return result;
}