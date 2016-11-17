'use strict'

describe("Decider", function(){

    var decider;
    
    beforeEach(function() { 
        decider = new Decider(); 
    }); 

    it("should return a move Behavior.", function(){
        var behavior = decider.getNewBehavior();
        
        expect(behavior instanceof MoveBehavior).toEqual(true);
    });
});