
function Cell(x, y){
    this.x = x;
    this.y = y;
    this.food = 0;
}

Cell.prototype.addFood = function(amountOfFood){
    this.food = amountOfFood;
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Cell;
}