
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

Detector.prototype.detectFrontCells = function(){
    
    var cellsToAdd = [];

    if(this.ant.direction == 0){
        cellsToAdd = this.detectCellsNorthOfLocation();
    }
    else if(this.ant.direction == 1){
        cellsToAdd = this.detectCellsEastOfLocation();
    }
    else if(this.ant.direction == 2){
        cellsToAdd = this.detectCellsSouthOfLocation();
    }
    else if(this.ant.direction == 3){
        cellsToAdd = this.detectCellsWestOfLocation();
    }

    return this.filterUndefinedCells(cellsToAdd);
}

Detector.prototype.detectCellsNorthOfLocation = function(){
    var result = [];
    var x = this.ant.x;
    var y = this.ant.y;
    
    if(y - 1 >= 0){
        result.push(this.ant.cells[y - 1][x - 1]);
        result.push(this.ant.cells[y - 1][x]);
        result.push(this.ant.cells[y - 1][x + 1]);
    }
    result.push(this.ant.cells[y][x + 1]);
    result.push(this.ant.cells[y][x - 1]);

    return result;
}

Detector.prototype.detectCellsSouthOfLocation = function(){
    var result = [];
    var maxY = this.ant.cells.length;
    var x = this.ant.x;
    var y = this.ant.y;

    if(y + 1 < maxY){
        result.push(this.ant.cells[y + 1][x - 1]);
        result.push(this.ant.cells[y + 1][x]);
        result.push(this.ant.cells[y + 1][x + 1]);
    }
    result.push(this.ant.cells[y][x + 1]);
    result.push(this.ant.cells[y][x - 1]);

    return result;
}

Detector.prototype.detectCellsEastOfLocation = function(){
    var result = [];
    var maxY = this.ant.cells.length;
    var x = this.ant.x;
    var y = this.ant.y;

    if(y - 1 >= 0){
        result.push(this.ant.cells[y - 1][x + 1]);
        result.push(this.ant.cells[y - 1][x]);
    }

    result.push(this.ant.cells[y][x + 1]);
    
    if(y + 1 < maxY){
        result.push(this.ant.cells[y + 1][x + 1]);
        result.push(this.ant.cells[y + 1][x]);
    }

    return result;
}

Detector.prototype.detectCellsWestOfLocation = function(){
    var result = [];
    var maxY = this.ant.cells.length;
    var x = this.ant.x;
    var y = this.ant.y;

    if(y - 1 >= 0){
        result.push(this.ant.cells[y - 1][x - 1]);
        result.push(this.ant.cells[y - 1][x]);
    }

    result.push(this.ant.cells[y][x - 1]);
    
    if(y + 1 < maxY){
        result.push(this.ant.cells[y + 1][x - 1]);
        result.push(this.ant.cells[y + 1][x]);
    }

    return result;
}

Detector.prototype.pickNextCell = function(cellsToPickFrom){
    var highestValue = -1;
    var indexToMoveTo = -1;
    var lastCell = this.ant.trail[this.ant.trail.length-2];
    var ignoreTrail = false;

    for(var x = 0; x < cellsToPickFrom.length; x++){

        var randomValue = Math.random();
        var randomValue2 = Math.random();
        
        if(randomValue2 < .95 && cellsToPickFrom[x].pheromone){
            var toAdd = cellsToPickFrom[x].pheromone;

            if(this.ant.trail.indexOf(cellsToPickFrom[x]) != -1){
                toAdd = toAdd/1.6;
            }

            randomValue += toAdd;
        }

        if(randomValue > highestValue && 
            cellsToPickFrom[x] != lastCell){
            
            highestValue = randomValue;
            indexToMoveTo = x;
        }
    }

    if(indexToMoveTo == -1){
        for(var x = 0; x < cellsToPickFrom.length; x++){

            var randomValue = Math.random();
            
            if(randomValue > highestValue){
                highestValue = randomValue;
                indexToMoveTo = x;
            }
        }
    }

    return cellsToPickFrom[indexToMoveTo];
}

Detector.prototype.hasPheromoneInFront = function(){
    var cellsToConsider = this.detectFrontCells();
    return this.hasPheromoneInCells(cellsToConsider);
}

Detector.prototype.hasPheromoneNearby = function(){
    var cellsToConsider = this.ant.surroundingCells; 
    return this.hasPheromoneInCells(cellsToConsider);
}

Detector.prototype.hasPheromoneInCells = function(cellsToConsider){
    var result = false;
    for(var x = 0; x < cellsToConsider.length; x++){
        if(cellsToConsider[x].pheromone > 0){
            result = true;
        }
    }

    return result;
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Detector;
}