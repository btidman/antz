
function Detector(ant){

    this.ant = ant;
}


Detector.prototype.detectCloseCells = function(){
    
    var maxY = this.ant.cells.length;
    var cellsToAdd = [];
    var x = this.ant.x;
    var y = this.ant.y;

    if(y - 1 >= 0){
        this.addCellsFromRowBelow(x, y, cellsToAdd);
    }

    this.addCellsOnLeftAndRight(x,y,cellsToAdd);

    if(y + 1 < maxY){
        this.addCellsFromRowAbove(x,y,cellsToAdd);
    }

    return this.filterUndefinedCells(cellsToAdd);
}

Detector.prototype.addCellsOnLeftAndRight = function(x,y,cellsToAdd){
    cellsToAdd.push(this.ant.cells[y][x - 1]);
    cellsToAdd.push(this.ant.cells[y][x + 1]);
}

Detector.prototype.addCellsFromRowBelow = function(x, y, cellsToAdd){
    cellsToAdd.push(this.ant.cells[y - 1][x - 1]);
    cellsToAdd.push(this.ant.cells[y - 1][x]);
    cellsToAdd.push(this.ant.cells[y - 1][x + 1]);    
}

Detector.prototype.addCellsFromRowAbove = function(x, y, cellsToAdd){
    cellsToAdd.push(this.ant.cells[y + 1][x - 1]);
    cellsToAdd.push(this.ant.cells[y + 1][x]);
    cellsToAdd.push(this.ant.cells[y + 1][x + 1]); 
}

Detector.prototype.detectCells = function(){
    
    var maxY = this.ant.cells.length;
    var cellsToAdd = [];
    var x = this.ant.x;
    var y = this.ant.y;

    if(y - 2 >= 0){
        cellsToAdd.push(this.ant.cells[y - 2][x - 2]);
        cellsToAdd.push(this.ant.cells[y - 2][x - 1]);
        cellsToAdd.push(this.ant.cells[y - 2][x]);
        cellsToAdd.push(this.ant.cells[y - 2][x + 1]);
        cellsToAdd.push(this.ant.cells[y - 2][x + 2]);
    }
    if(y - 1 >= 0){
        cellsToAdd.push(this.ant.cells[y - 1][x - 2]);
        this.addCellsFromRowBelow(x, y, cellsToAdd);
        cellsToAdd.push(this.ant.cells[y - 1][x + 2]);
    }

    cellsToAdd.push(this.ant.cells[y][x - 2]);
    this.addCellsOnLeftAndRight(x,y,cellsToAdd);
    cellsToAdd.push(this.ant.cells[y][x + 2]);

    if(y + 1 < maxY){
        cellsToAdd.push(this.ant.cells[y + 1][x - 2]);
        this.addCellsFromRowAbove(x,y,cellsToAdd);
        cellsToAdd.push(this.ant.cells[y + 1][x + 2]);
    }
    if(y + 2 < maxY){
        cellsToAdd.push(this.ant.cells[y + 2][x - 2]);
        cellsToAdd.push(this.ant.cells[y + 2][x - 1]);
        cellsToAdd.push(this.ant.cells[y + 2][x]);
        cellsToAdd.push(this.ant.cells[y + 2][x + 1]);
        cellsToAdd.push(this.ant.cells[y + 2][x + 2]);
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
        result.push(this.ant.cells[y - 1][x - 2]);
        result.push(this.ant.cells[y - 1][x - 1]);
        result.push(this.ant.cells[y - 1][x]);
        result.push(this.ant.cells[y - 1][x + 1]);
        result.push(this.ant.cells[y - 1][x + 2]);
    }
    if(y - 2 >= 0){
        result.push(this.ant.cells[y - 2][x - 2]);
        result.push(this.ant.cells[y - 2][x - 1]);
        result.push(this.ant.cells[y - 2][x]);
        result.push(this.ant.cells[y - 2][x + 1]);
        result.push(this.ant.cells[y - 2][x + 2]);
    }

    return result;
}

Detector.prototype.detectCellsSouthOfLocation = function(){
    var result = [];
    var maxY = this.ant.cells.length;
    var x = this.ant.x;
    var y = this.ant.y;

    if(y + 1 < maxY){
        result.push(this.ant.cells[y + 1][x - 2]);
        result.push(this.ant.cells[y + 1][x - 1]);
        result.push(this.ant.cells[y + 1][x]);
        result.push(this.ant.cells[y + 1][x + 1]);
        result.push(this.ant.cells[y + 1][x + 2]);
    }
    if(y + 2  < maxY){
        result.push(this.ant.cells[y + 2][x - 2]);
        result.push(this.ant.cells[y + 2][x - 1]);
        result.push(this.ant.cells[y + 2][x]);
        result.push(this.ant.cells[y + 2][x + 1]);
        result.push(this.ant.cells[y + 2][x + 2]);
    }
    return result;
}

Detector.prototype.detectCellsEastOfLocation = function(){
    var result = [];
    var maxY = this.ant.cells.length;
    var x = this.ant.x;
    var y = this.ant.y;

    if(y - 2 >= 0){
        result.push(this.ant.cells[y - 2][x + 1]);
        result.push(this.ant.cells[y - 2][x + 2]);
    }

    if(y - 1 >= 0){
        result.push(this.ant.cells[y - 1][x + 1]);
        result.push(this.ant.cells[y - 1][x + 2]);
    }

    result.push(this.ant.cells[y][x + 1]);
    result.push(this.ant.cells[y][x + 2]);
    
    if(y + 1 < maxY){
        result.push(this.ant.cells[y + 1][x + 1]);
        result.push(this.ant.cells[y + 1][x + 2]);
    }
    if(y + 2 < maxY){
        result.push(this.ant.cells[y + 2][x + 1]);
        result.push(this.ant.cells[y + 2][x + 2]);
    }

    return result;
}

Detector.prototype.detectCellsWestOfLocation = function(){
    var result = [];
    var maxY = this.ant.cells.length;
    var x = this.ant.x;
    var y = this.ant.y;

    if(y - 2 >= 0){
        result.push(this.ant.cells[y - 2][x - 1]);
        result.push(this.ant.cells[y - 2][x - 2]);
    }

    if(y - 1 >= 0){
        result.push(this.ant.cells[y - 1][x - 1]);
        result.push(this.ant.cells[y - 1][x - 2]);
    }

    result.push(this.ant.cells[y][x - 1]);
    result.push(this.ant.cells[y][x - 2]);
    
    if(y + 1 < maxY){
        result.push(this.ant.cells[y + 1][x - 1]);
        result.push(this.ant.cells[y + 1][x - 2]);
    }
    if(y + 2 < maxY){
        result.push(this.ant.cells[y + 2][x - 1]);
        result.push(this.ant.cells[y + 2][x - 2]);
    }

    return result;
}

Detector.prototype.pickNextCell = function(cellsToPickFrom){
    var highestValue = -1;
    var indexToMoveTo = -1;
    var lastCell = this.ant.trail[this.ant.trail.length-2];
    var ignoreTrail = false;

    for(var x = 0; x < cellsToPickFrom.length; x++){

        var randomWeight = Math.random();
        var randomChanceToNotConsiderPheromone = Math.random();
        
        if(randomChanceToNotConsiderPheromone < .95 && cellsToPickFrom[x].pheromone){
            var toAdd = cellsToPickFrom[x].pheromone;

            if(this.ant.trail.indexOf(cellsToPickFrom[x]) != -1){
                toAdd = toAdd/5;
            }

            randomWeight += toAdd;
        }

        if(randomWeight > highestValue && 
            cellsToPickFrom[x] != lastCell){
            
            highestValue = randomWeight;
            indexToMoveTo = x;
        }
    }

    if(indexToMoveTo == -1){
        for(var x = 0; x < cellsToPickFrom.length; x++){

            var randomWeight = Math.random();
            
            if(randomWeight > highestValue){
                highestValue = randomWeight;
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

Detector.prototype.detectAndRemoveLoops = function(){
    var newTrail = [];
    for(var x = 0; x < this.ant.trail.length; x++){
        var nextCell = this.ant.trail[x];
        if(newTrail.indexOf(nextCell) == -1){
            newTrail.push(nextCell);  
        }else{ 
            while(newTrail[newTrail.length - 1] != nextCell){
                newTrail.pop();
            }
        }
    }
    this.ant.trail = newTrail;
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Detector;
}