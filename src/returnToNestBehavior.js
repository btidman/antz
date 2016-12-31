function ReturnToNestBehavior(ant){
    this.type = "Return_To_Nest";
    this.ant = ant;
}

ReturnToNestBehavior.prototype.doBehavior = function(){
    var nextCell = this.ant.trail.pop();
    this.ant.moveToCell(nextCell);
    if(this.ant.trail.length <= 1){
        this.ant.returnToNest = false;
    }
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = ReturnToNestBehavior;
}
