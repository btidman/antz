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

    it("should return a move behavior when pheromone is in front.", function(){
        spyOn(ant.detector, "hasPheromoneNearby").and.returnValue(true);

        var behavior = decider.getNewBehavior(ant);
        
        expect(behavior.type).toEqual("Move");
    });

    it("should return a random move Behavior.", function(){
        spyOn(Math, "random").and.returnValue(0.25);

        var behavior = decider.getNewBehavior(ant);
        
        expect(behavior.type).toEqual("Move");
    });

    it("should return a random turn behavior.", function(){
        spyOn(Math, "random").and.returnValue(0.24);

        var behavior = decider.getNewBehavior(ant);
        
        expect(behavior.type).toEqual("Turn");
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

    it("should drop food if it has food and is on nest", function(){
        ant = antHelper.createTestAnt()
        ant.cells[ant.y][ant.x].nest = "Pretend this is a nest object";
        ant.hasFood = true;
        var behavior = decider.getNewBehavior(ant);
        
        expect(behavior.type).toEqual("Drop_Food");
    });

    it("should decide to return to the nest if it's trail is too long", function(){
        ant.returnToNest = true;
        var behavior = decider.getNewBehavior(ant);
        expect(behavior.type).toEqual("Return_To_Nest");
    });

});