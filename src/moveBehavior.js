function MoveBehavior(ant){
    this.ant = ant;
    this.type = "Move";
}

MoveBehavior.prototype.doBehavior = function(){

    if(this.ant.frontCells.length > 0){
        var randomIndex = Math.floor((Math.random() * this.ant.frontCells.length));
        this.ant.moveToCell(this.ant.frontCells[randomIndex]);
    }
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = MoveBehavior;
}
