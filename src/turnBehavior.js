function TurnBehavior(ant){
    this.ant = ant;
    this.type = "Turn";
}

TurnBehavior.prototype.doBehavior = function(){
    var randomValue = Math.random();
    var newDirection = -1;
    
    if(randomValue >= 0.5){
        this.ant.turnRight();
    }
    else
    {
        this.ant.turnLeft();
    }
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = TurnBehavior;
}
