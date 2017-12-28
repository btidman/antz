var ArrayShuffler = require("./arrayShuffler");
var Direction = require("./directionEnum");


function Detector(ant){

    this.ant = ant;
    this.shuffler = new ArrayShuffler();
    this.sightRange = 5;
}


Detector.prototype.detectCloseCells = function(){
    
    var cellsToAdd = [];
    var x = this.ant.x;
    var y = this.ant.y;

    this.addCellsFromAbove(x, y, cellsToAdd, 1);
    this.addCellsOnLeftAndRight(x,y,cellsToAdd, 1);
    this.addCellsFromBelow(x,y,cellsToAdd, 1);
    
    return this.filterUndefinedCells(cellsToAdd);
}

Detector.prototype.addCellsOnLeftAndRight = function(x,y,cellsToAdd, range){
    

    for(var toAdd = range; toAdd > 0; toAdd--){
        cellsToAdd.push(this.ant.cells[y][x + toAdd]);
    }

    for(var toSubtract = range; toSubtract > 0; toSubtract--){
        cellsToAdd.push(this.ant.cells[y][x - toSubtract]);
    }
    
}

Detector.prototype.addCellsFromAbove = function(x, y, cellsToAdd, range){

    for(var yToAdd = range; yToAdd > 0; yToAdd --){
        if(y - yToAdd >= 0){
            for(var toAdd = range; toAdd > 0; toAdd--){
                cellsToAdd.push(this.ant.cells[y - yToAdd][x + toAdd]);
            }

            for(var toSubtract = range; toSubtract > 0; toSubtract--){
                cellsToAdd.push(this.ant.cells[y - yToAdd][x - toSubtract]);
            }
            cellsToAdd.push(this.ant.cells[y - yToAdd][x]);
        }
    }
}

Detector.prototype.addCellsFromBelow = function(x, y, cellsToAdd, range){
    var maxY = this.ant.cells.length;

    for(var yToAdd = range; yToAdd > 0; yToAdd --){
        if(y + yToAdd < maxY){
            for(var toAdd = range; toAdd > 0; toAdd--){
                cellsToAdd.push(this.ant.cells[y + yToAdd][x + toAdd]);
            }

            for(var toSubtract = range; toSubtract > 0; toSubtract--){
                cellsToAdd.push(this.ant.cells[y + yToAdd][x - toSubtract]);
            }
            cellsToAdd.push(this.ant.cells[y + yToAdd][x]);
        }
    }
}

Detector.prototype.detectCells = function(){
    
    var cellsToAdd = [];
    var x = this.ant.x;
    var y = this.ant.y;

    this.addCellsFromAbove(x, y, cellsToAdd, this.sightRange);
    this.addCellsOnLeftAndRight(x,y,cellsToAdd, this.sightRange);
    this.addCellsFromBelow(x,y,cellsToAdd, this.sightRange);


    return this.filterUndefinedCells(cellsToAdd);
}

Detector.prototype.filterUndefinedCells = function(newCells){

    var result = [];

    for(var x = 0; x < newCells.length; x++){
        if(newCells[x]){
            result.push(newCells[x]);
        }
    }

    this.shuffler.shuffleArray(result);

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
    
    this.addCellsFromAbove(x, y, result, this.sightRange);

    return result;
}

Detector.prototype.detectCellsSouthOfLocation = function(){
    var result = [];
    var x = this.ant.x;
    var y = this.ant.y;

    this.addCellsFromBelow(x,y,result, this.sightRange);

    return result;
}

Detector.prototype.detectCellsEastOfLocation = function(){
    var result = [];
    var maxY = this.ant.cells.length;
    var x = this.ant.x;
    var y = this.ant.y;

    for(var toAddY = this.sightRange; toAddY >= 0; toAddY--){
        if(y + toAddY < maxY){
            for(var toAdd = this.sightRange; toAdd > 0; toAdd--){
                result.push(this.ant.cells[y + toAddY][x + toAdd]);
            }
        }
    }

    for(var toSubtractY = this.sightRange; toSubtractY > 0; toSubtractY--){
        if(y - toSubtractY >= 0){
            for(var toAdd = this.sightRange; toAdd > 0; toAdd--){
                result.push(this.ant.cells[y -toSubtractY][x + toAdd]);
            }
        }
    }

    return result;
}

Detector.prototype.detectCellsWestOfLocation = function(){
    var result = [];
    var maxY = this.ant.cells.length;
    var x = this.ant.x;
    var y = this.ant.y;

    for(var toAddY = this.sightRange; toAddY >= 0; toAddY--){
        if(y + toAddY < maxY){
            for(var toAdd = this.sightRange; toAdd > 0; toAdd--){
                result.push(this.ant.cells[y + toAddY][x - toAdd]);
            }
        }
    }

    for(var toSubtractY = this.sightRange; toSubtractY > 0; toSubtractY--){
        if(y - toSubtractY >= 0){
            for(var toAdd = this.sightRange; toAdd > 0; toAdd--){
                result.push(this.ant.cells[y -toSubtractY][x - toAdd]);
            }
        }
    }

    return result;
}

Detector.prototype.findClosestToLandmark = function(landmarkCell, cellsToPickFrom){
    var bestDistance = 100000;
    var result = null;
    for(var index = 0; index < cellsToPickFrom.length; index++){
        var xDistance = Math.abs(cellsToPickFrom[index].x - landmarkCell.x);
        var yDistance = Math.abs(cellsToPickFrom[index].y - landmarkCell.y);
        var tempTotal = xDistance + yDistance;
        if(tempTotal < bestDistance){
            bestDistance = tempTotal;
            result = cellsToPickFrom[index];
        }
    }
    
    return result;
}

Detector.prototype.pickNextLandMark = function(cellsToPickFrom){
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

Detector.prototype.findBestCell = function(){
    var backCells = this.detectBackCells();
    var bestCell = this.ant.surroundingCells[0];
    var bestCellPheromone = -1;
    for(var x = 0; x < this.ant.surroundingCells.length; x++){
        var pheromoneForCell = this.ant.surroundingCells[x].pheromone;

        if(backCells.indexOf(this.ant.surroundingCells[x]) >=0){
            pheromoneForCell = pheromoneForCell/1.1;
        }
        
        if(this.ant.trail.indexOf(this.ant.surroundingCells[x]) >= 0){
            pheromoneForCell = pheromoneForCell/5;
        }

        if(pheromoneForCell > bestCellPheromone){
            bestCell = this.ant.surroundingCells[x];
            bestCellPheromone = pheromoneForCell;
        }
    }

    return bestCell;
}

Detector.prototype.isBestCellInFront = function(){
    var frontCells = this.detectFrontCells();
    var result = false;
    var bestCell = this.findBestCell();
    
    if(frontCells.indexOf(bestCell) >= 0){
        result = true;
    }

    return result;
} 

Detector.prototype.isFoodNearby = function(){
    var hasFoodNextToIt = false;
    var closeCells = this.detectCloseCells();
    for(var x = 0; x < closeCells.length; x++){
        if(closeCells[x].food > 0){
            hasFoodNextToIt = true;
        }
    }
    return hasFoodNextToIt;
}

Detector.prototype.detectBackCells = function(){
    var frontCells = this.detectFrontCells();
    var backCells = [];

    for(var x = 0; x < this.ant.surroundingCells.length; x++){
        if(frontCells.indexOf(this.ant.surroundingCells[x]) === -1){
            backCells.push(this.ant.surroundingCells[x]);
        }
    }

    return backCells;
}

Detector.prototype.getOppositeDirection = function(){
    if(ant.direction == Direction.North){
        return Direction.South;
    }
    else if(ant.direction == Direction.East){
        return Direction.West;
    }
    else if(ant.direction == Direction.South){
        return Direction.North;
    }
    else if(ant.direction == Direction.West){
        return Direction.East;
    }
    return null;
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Detector;
}