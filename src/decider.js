
'use strict'
var MoveBehavior = require("./moveBehavior");
var GetFoodBehavior = require("./getFoodBehavior");
var ReturnFoodToNestBehavior = require("./returnFoodToNestBehavior");

function Decider(){

}

Decider.prototype.getNewBehavior = function(ant){

    var result = null;

    var randomValue = Math.random();
    var hasFoodInFront = false;

    if(ant.hasFood){
        
        return new ReturnFoodToNestBehavior(ant);
    }

    for(var x = 0; x < ant.surroundingCells.length; x++){
        if(ant.surroundingCells[x].food > 0){
            hasFoodInFront = true;
        }
    }

    if(hasFoodInFront){
        return new GetFoodBehavior(ant);
    }else{
        return new MoveBehavior(ant);
    }
}


// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Decider;
}