

function ArrayShuffler(){
}

ArrayShuffler.prototype.shuffleArray = function(arrayToShuffle){
    var count = arrayToShuffle.length,
        randomnumber,
        temp;
    while( count ){
        randomnumber = Math.random() * count-- | 0;
        temp = arrayToShuffle[count];
        arrayToShuffle[count] = arrayToShuffle[randomnumber];
        arrayToShuffle[randomnumber] = temp
    }
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = ArrayShuffler;
}