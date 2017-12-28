function GetFoodBehavior(ant){
    this.type = "Get_Food";
    this.ant = ant;
}

GetFoodBehavior.prototype.doBehavior = function(){
    this.ant.hasFood = true;
    
    for(var x = 0; x < this.ant.surroundingCells.length; x++){
        var cells = this.ant.surroundingCells;
        if(cells[x].food > 0){
            cells[x].addFood(-10);
        }
    }
    this.ant.detector.detectAndRemoveLoops();
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = GetFoodBehavior;
}
