
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
        
        spyOn(Math, "log10").and.returnValue(.5);
        spyOn(cells[2][1], "addPheromone");
        returnFoodToNestBehavior.doBehavior();
        expect(cells[2][1].addPheromone).toHaveBeenCalledWith(3.5);
    });

    // it("should drop pheromone on surronding cells every time it moves to back down the trail.", function(){
        
    //     spyOn(Math, "log10").and.returnValue(0);
    //     spyOn(cells[2][1], "addPheromone");
    //     spyOn(cells[2][0], "addPheromone");
    //     spyOn(cells[1][1], "addPheromone");
    //     spyOn(cells[1][0], "addPheromone");
    //     spyOn(ant.detector, "detectCloseCells").and.returnValue([cells[2][0], cells[1][0], cells[1][1]]);
        
    //     returnFoodToNestBehavior.doBehavior();
    //     expect(cells[2][1].addPheromone).toHaveBeenCalledWith(4);
    //     expect(cells[2][0].addPheromone).toHaveBeenCalledWith(2);
    //     expect(cells[1][0].addPheromone).toHaveBeenCalledWith(2);
    //     expect(cells[1][1].addPheromone).toHaveBeenCalledWith(2);
    // });

    it("should record how many steps it's taken back to the nest.", function(){
        returnFoodToNestBehavior.doBehavior();
        expect(ant.stepsTowardNest).toEqual(1);
    });
});