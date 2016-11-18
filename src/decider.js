
'use strict'
var MoveBehavior = require("./moveBehavior");
var TurnBehavior = require("./turnBehavior");

function Decider(){

}

Decider.prototype.getNewBehavior = function(ant){

    var result = null;

    var randomValue = Math.random();

    if(randomValue < 0.25){
        return new TurnBehavior(ant);
    }
    else {
        return new MoveBehavior(ant);
    }
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Decider;
}