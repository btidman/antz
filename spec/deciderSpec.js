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
        ant.detectFrontCells();
    }); 

    it("should return a move Behavior.", function(){
        spyOn(Math, "random").and.returnValue(0.26);

        var behavior = decider.getNewBehavior(ant);
        
        expect(behavior.type).toEqual("Move");
    });

    it("should return a turn behavior.", function(){
        spyOn(Math, "random").and.returnValue(0.24);

        var behavior = decider.getNewBehavior(ant);

        expect(behavior.type).toEqual("Turn");
    });

    it("should return the pick up food behavior when food is in front of the ant.", function(){
        
        ant.frontCells[0].food = 100;

        var behavior = decider.getNewBehavior(ant);

        expect(behavior.type).toEqual("Get_Food");
    });

    it("should return to nest if the ant has food.", function(){
        ant.hasFood = true;
        var behavior = decider.getNewBehavior(ant);
        
        expect(behavior.type).toEqual("Return_Food");
    });
});