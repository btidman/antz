
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
    
    if(ant.hasFood && ant.cells[ant.y][ant.x].nest){
        return new DropFoodBehavior(ant);
    }else if(ant.hasFood){
        return new ReturnFoodToNestBehavior(ant);
    }else if(ant.detector.isFoodNearby()){
        return new GetFoodBehavior(ant);
    }else if(ant.returnToNest){
        return new ReturnToNestBehavior(ant);
    }else if(ant.detector.hasPheromoneNearby()){
        if(ant.detector.isBestCellInFront()){
            return new MoveBehavior(ant);
        }else{
            return new TurnBehavior(ant);
        }
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