'use strict'

var Decider = require("../src/Decider");

describe("Decider", function(){

    var decider;
    
    beforeEach(function() { 
        decider = new Decider(); 
    }); 

    it("should return a move Behavior.", function(){
        var behavior = decider.getNewBehavior();
        
        expect(behavior.type).toEqual("Move");
    });
});