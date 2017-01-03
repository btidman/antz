
var ReturnFoodToNestBehavior = require("../src/returnFoodToNestBehavior");
var Decider = require("../src/decider");
var AntHelper = require("../test_helpers/antHelper");

describe("Return food to nest behavior.", function(){

    var returnFoodToNestBehavior;
    var antHelper = new AntHelper();
    var ant;

    beforeEach(function(){
        
        ant = antHelper.createTestAnt(ant);
        returnFoodToNestBehavior = new ReturnFoodToNestBehavior(ant);
    });

    it("should have a type of 'Return_Food'", function(){
        expect(returnFoodToNestBehavior.type).toEqual("Return_Food");
    });

    it("should have a reference to the ant", function(){
        expect(returnFoodToNestBehavior.ant).toEqual(ant);
    });

    it("should move back towards nest.", function(){

        ant.trail.push(ant.cells[1][1]);
        
        spyOn(ant, "moveToCell");

        expect(ant.trail.length).toEqual(2);

        returnFoodToNestBehavior.doBehavior();

        expect(ant.moveToCell).toHaveBeenCalledWith(ant.cells[1][1]);
        expect(ant.trail.length).toEqual(1);
        expect(ant.trail).toContain(ant.cells[2][1]);
    });

    it("should drop pheromone every time it moves to back down the trail.", function(){
        
        spyOn(ant.decider, "getPheromoneAmountFromTrailLength").and.returnValue(2);
        spyOn(cells[2][1], "addPheromone");
        returnFoodToNestBehavior.doBehavior();
        expect(cells[2][1].addPheromone).toHaveBeenCalledWith(2);
    });
});