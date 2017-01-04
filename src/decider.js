
'use strict'
var MoveBehavior = require("./moveBehavior");
var GetFoodBehavior = require("./getFoodBehavior");
var ReturnFoodToNestBehavior = require("./returnFoodToNestBehavior");
var DropFoodBehavior = require("./dropFoodBehavior");
var TurnBehavior = require("./turnBehavior");
var ReturnToNestBehavior = require("./returnToNestBehavior");

function Decider(){

}

Decider.prototype.getNewBehavior = function(ant){

    var result = null;

    var randomValue = Math.random();
    var hasFoodNextToIt = false;

    if(ant.hasFood){
        if(ant.cells[ant.y][ant.x].nest){
            return new DropFoodBehavior(ant);
        }
        else{
            return new ReturnFoodToNestBehavior(ant);
        }
    }

    for(var x = 0; x < ant.surroundingCells.length; x++){
        if(ant.surroundingCells[x].food > 0){
            hasFoodNextToIt = true;
        }
    }

    if(hasFoodNextToIt){
        return new GetFoodBehavior(ant);
    }else if(ant.returnToNest){
        return new ReturnToNestBehavior(ant);
    }else if(ant.detector.hasPheromoneInFront()){
        return new MoveBehavior(ant);
    }else if(ant.detector.hasPheromoneNearby()){
        return new TurnBehavior(ant);
    }else if(randomValue < .25){
        return new TurnBehavior(ant);
    }
    else{
        return new MoveBehavior(ant);
    }
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Decider;
}