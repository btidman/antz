function MoveBehavior(ant){
    this.ant = ant;
    this.type = "Move";
}

MoveBehavior.prototype.doBehavior = function(){

    if(this.ant.frontCells.length > 0){
        var randomIndex = Math.floor((Math.random() * this.ant.frontCells.length));
        var cell = this.ant.frontCells[randomIndex];
        this.ant.moveToCell(cell);
        this.ant.trail.push(cell);  
    }
    else
    {
        this.ant.advance();
    }
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = MoveBehavior;
}
