'use strict'

var AntHelper = require("../test_helpers/antHelper");
var MoveBehavior = require("../src/moveBehavior");

describe("Move Behavior", function(){

    var moveBehavior;
    var ant;
    var helper = new AntHelper();

    beforeEach(function() { 
        ant = helper.createTestAnt();
        ant.detectCells();
        moveBehavior = new MoveBehavior(ant); 
    }); 

    it("should move to a random front cell when do Behavior is called.", function(){
        var surroundingCells = ant.surroundingCells;
        spyOn(Math, "random").and.returnValue(.99,0);
        spyOn(ant, "moveToCell");
        
        moveBehavior.doBehavior();
        
        expect(Math.random).toHaveBeenCalled();
        expect(ant.moveToCell).toHaveBeenCalledWith(surroundingCells[0]);
    });

    it("should not try and move if there are no cells available to move to", function(){
        spyOn(ant, "moveToCell");
        spyOn(ant, "advance");
        ant.surroundingCells = [];
        moveBehavior.doBehavior();
        expect(ant.moveToCell).not.toHaveBeenCalled();
    });

    it("should be more likely to move to a cell that has pheromone on it", function(){
        ant.cells[1][1].addPheromone(10);
        spyOn(Math, "random").and.returnValues(0, 0, 0);
        moveBehavior.doBehavior();

        expect(ant.trail[1].x).toEqual(1);
        expect(ant.trail[1].y).toEqual(1);
    });

    it("should have a type of Move", function(){
        expect(moveBehavior.type).toEqual("Move");
    });

    it("should store the trail of cells that it moved to.", function(){

        spyOn(Math, "random").and.returnValue(0);
        spyOn(ant, "moveToCell");
        
        moveBehavior.doBehavior();

        expect(ant.trail[1].x).toEqual(0);
        expect(ant.trail[1].y).toEqual(1);
    });

    it("should eliminate loops in stored trail that it has moved over.", function(){
        spyOn(Math, "random").and.returnValues(.99, 0, 0,
                                               .99,0,0,0,0,
                                               0,0,.99,
                                               0,0,0,0,.99);
        
        moveBehavior.doBehavior();
        ant.detectCells();
        moveBehavior.doBehavior();
        ant.detectCells();
        moveBehavior.doBehavior();
        ant.detectCells();
        moveBehavior.doBehavior();

        expect(ant.trail.length).toEqual(1);
        expect(ant.trail[0].x).toEqual(1);
        expect(ant.trail[0].y).toEqual(2);
    });

    it("should not move to the cell it just came from.", function(){
        spyOn(Math, "random").and.returnValues(0, 0, 0,
                                                0, 0, 0, 0, .99);
        moveBehavior.doBehavior();
        ant.detectCells();
        moveBehavior.doBehavior();

        expect(ant.trail.length).toEqual(3);
        expect(ant.trail[2].x).toEqual(0);
        expect(ant.trail[2].y).toEqual(0);
    });
});