
function Cell(x, y){
    this.x = x;
    this.y = y;
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Cell;
}