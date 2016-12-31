'use strict'

var AntHelper = require("../test_helpers/antHelper");
var MoveBehavior = require("../src/moveBehavior");
var Cell = require("../src/cell");

describe("Move Behavior", function(){

    var moveBehavior;
    var ant;
    var helper = new AntHelper();

    beforeEach(function() { 
        ant = helper.createTestAnt();
        ant.detectCells();
        moveBehavior = new MoveBehavior(ant); 
    }); 

    it("should not try and move if there are no cells available to move to", function(){
        spyOn(ant, "moveToCell");
        spyOn(ant.detector, "pickNextCell").and.returnValue(undefined);
        ant.surroundingCells = [];
        moveBehavior.doBehavior();
        expect(ant.moveToCell).not.toHaveBeenCalled();
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
        spyOn(ant.detector, "detectFrontCells");
        spyOn(ant.detector, "pickNextCell").and.returnValues(ant.cells[1][0], ant.cells[0][0], ant.cells[1][1], ant.cells[2][1]);
        
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
    
    it("should detect cells in front of it.", function(){
        spyOn(ant.detector, "detectFrontCells");
        spyOn(ant.detector, "pickNextCell").and.returnValue(undefined);
        moveBehavior.doBehavior();
        expect(ant.detector.detectFrontCells).toHaveBeenCalled();
    });

    it("should pick a to move to.", function(){
        spyOn(ant.detector, "pickNextCell");
        spyOn(ant.detector, "detectFrontCells").and.returnValues(ant.surroundingCells);
        moveBehavior.doBehavior();
        expect(ant.detector.pickNextCell).toHaveBeenCalledWith(ant.surroundingCells);
    });

    it("should mark the cell as return to nest if the trail is too long.", function(){
        for(var x = 0; x < 6; x++){
            ant.trail.push(new Cell());
        }

        moveBehavior.doBehavior();

        expect(ant.returnToNest).toEqual(true);
    });
});