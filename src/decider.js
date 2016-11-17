
'use strict'

function Decider(){

    return this;
}

Decider.prototype.getNewBehavior = function(ant){

    return new MoveBehavior(ant);
}

