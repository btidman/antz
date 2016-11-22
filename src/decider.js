
'use strict'
var MoveBehavior = require("./moveBehavior");
var TurnBehavior = require("./turnBehavior");
var GetFoodBehavior = require("./getFoodBehavior");

function Decider(){

}

Decider.prototype.getNewBehavior = function(ant){

    var result = null;

    var randomValue = Math.random();
    var hasFoodInFront = false;

    for(var x = 0; x < ant.frontCells.length; x++){
        if(ant.frontCells[x].food > 0){
            hasFoodInFront = true;
        }
    }

    if(hasFoodInFront){
        return new GetFoodBehavior(ant);
    }else{
        if(randomValue < 0.25){
            return new TurnBehavior(ant);
        }
        else {
            return new MoveBehavior(ant);
        }
    }
}


// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Decider;
}