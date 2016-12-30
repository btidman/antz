function TurnBehavior(ant){
    this.ant = ant;
    this.type = "Turn";
}

TurnBehavior.prototype.doBehavior = function(){
    var randomValue = Math.random();
    if(randomValue >= .50){
        this.ant.turnLeft();
    }else{
        this.ant.turnRight();
    }
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = TurnBehavior;
}
