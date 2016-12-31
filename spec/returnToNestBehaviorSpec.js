
var ReturnToNestBehavior = require("../src/returnToNestBehavior");
var AntHelper = require("../test_helpers/antHelper");

describe("Return food to nest behavior.", function(){

    var returnToNestBehavior;
    var antHelper = new AntHelper();
    var ant;

    beforeEach(function(){
        
        ant = antHelper.createTestAnt(ant);
        returnToNestBehavior = new ReturnToNestBehavior(ant);
    });

    it("should have a type of 'Return_To_Nest'", function(){
        expect(returnToNestBehavior.type).toEqual("Return_To_Nest");
    });

    it("should have a reference to the ant", function(){
        expect(returnToNestBehavior.ant).toEqual(ant);
    });

    it("should move back towards nest.", function(){

        ant.trail.push(ant.cells[1][1]);
        
        spyOn(ant, "moveToCell");

        expect(ant.trail.length).toEqual(2);

        returnToNestBehavior.doBehavior();

        expect(ant.moveToCell).toHaveBeenCalledWith(ant.cells[1][1]);
        expect(ant.trail.length).toEqual(1);
        expect(ant.trail).toContain(ant.cells[2][1]);
    });

    it("should change ant's return to nest flag to false when it gets back to nest.", function(){
        ant.trail.push(ant.cells[1][1]);
        returnToNestBehavior.doBehavior();
        expect(ant.returnToNest).toEqual(false);
    });
});