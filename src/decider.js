
'use strict'
var MoveBehavior = require("./moveBehavior");

function Decider(){

}

Decider.prototype.getNewBehavior = function(ant){

    return new MoveBehavior(ant);
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Decider;
}