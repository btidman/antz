'use strict'

var Decider = require("../src/Decider");

describe("Decider", function(){

    var decider;
    
    beforeEach(function() { 
        decider = new Decider(); 
    }); 

    it("should return a move Behavior.", function(){
        spyOn(Math, "random").and.returnValue(0.26);

        var behavior = decider.getNewBehavior();
        
        expect(behavior.type).toEqual("Move");
    });

    it("should return a turn behavior.", function(){
        spyOn(Math, "random").and.returnValue(0.24);

        var behavior = decider.getNewBehavior();

        expect(behavior.type).toEqual("Turn");
    })
});