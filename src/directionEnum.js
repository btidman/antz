Direction = {
    North : 0,
    East : 1,
    South : 2,
    West: 3
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Direction;
}