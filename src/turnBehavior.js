function TurnBehavior(ant){
    this.ant = ant;
    this.type = "Turn";
}

TurnBehavior.prototype.doBehavior = function(){
    var randomDirection = 0;
    
    do{
        randomDirection = Math.floor((Math.random() * 4));
    }while( randomDirection == this.ant.direction);

    this.ant.turn(randomDirection);
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = TurnBehavior;
}
