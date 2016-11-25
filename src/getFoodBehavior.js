function GetFoodBehavior(ant){
    this.type = "Get_Food";
    this.ant = ant;
}

GetFoodBehavior.prototype.doBehavior = function(){
    this.ant.hasFood = true;
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = GetFoodBehavior;
}
