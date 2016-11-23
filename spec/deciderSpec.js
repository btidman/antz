'use strict'

var Decider = require("../src/Decider");
var AntHelper = require("../test_helpers/antHelper");

describe("Decider", function(){

    var decider;
    var ant;
    var antHelper = new AntHelper();
    
    beforeEach(function() { 
        decider = new Decider(); 
        ant = antHelper.createTestAnt();
        ant.detectCells();
    }); 

    it("should return a move Behavior.", function(){
        spyOn(Math, "random").and.returnValue(0.26);

        var behavior = decider.getNewBehavior(ant);
        
        expect(behavior.type).toEqual("Move");
    });

    it("should return the pick up food behavior when food is in front of the ant.", function(){
        
        ant.surroundingCells[0].food = 100;

        var behavior = decider.getNewBehavior(ant);

        expect(behavior.type).toEqual("Get_Food");
    });

    it("should return to nest if the ant has food.", function(){
        ant.hasFood = true;
        var behavior = decider.getNewBehavior(ant);
        
        expect(behavior.type).toEqual("Return_Food");
    });
});