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

    it("should know the max trail length.", function(){
        expect(moveBehavior.maxTrailLength).toEqual((ant.cells.length * ant.cells[0].length));
    });

    it("should not try and move if there are no cells available to move to", function(){
        spyOn(ant, "moveToCell");
        spyOn(ant.detector, "pickNextLandMark").and.returnValue(undefined);
        ant.surroundingCells = [];
        moveBehavior.doBehavior();
        expect(ant.moveToCell).not.toHaveBeenCalled();
    });


    it("should have a type of Move", function(){
        expect(moveBehavior.type).toEqual("Move");
    });

    it("should store the trail of cells that it moved to.", function(){

        spyOn(Math, "random").and.returnValue(0);
        spyOn(ant.detector, "detectFrontCells").and.returnValue(ant.surroundingCells);
        spyOn(ant.detector, "findClosestToLandmark").and.returnValue(ant.cells[0][0]);
        
        spyOn(ant, "moveToCell");
        
        moveBehavior.doBehavior();

        expect(ant.trail[1].x).toEqual(0);
        expect(ant.trail[1].y).toEqual(0);
    });

    it("should eliminate loops in stored trail that it has moved over.", function(){
        ant.detectCells();
        var frontCells = ant.surroundingCells;
        spyOn(ant.detector, "detectFrontCells").and.returnValue(frontCells);
        spyOn(ant.detector, "pickNextLandMark").and.returnValues(ant.cells[1][0], ant.cells[0][0], ant.cells[1][1], ant.cells[2][1]);
        spyOn(ant.detector, "findClosestToLandmark").and.returnValues(ant.cells[1][0], ant.cells[0][0], ant.cells[1][1], ant.cells[2][1]);
        

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
    
    it("should pick a landmark cell to move towards.", function(){
        var fakeFrontCells = [ant.cells[1][0]];
        spyOn(ant.detector, "detectFrontCells").and.returnValue(fakeFrontCells);
        spyOn(ant.detector, "pickNextLandMark");
        moveBehavior.doBehavior();
        expect(ant.detector.pickNextLandMark).toHaveBeenCalledWith(fakeFrontCells);
    });

    it("should pick a cell that is closest to landmark.", function(){
        var fakeFrontCells = [ant.cells[1][0], ant.cells[1][1]];
        spyOn(ant.detector, "detectFrontCells").and.returnValue(fakeFrontCells);
        spyOn(ant.detector, "pickNextLandMark").and.returnValue(ant.cells[1][0]);
        var surroundingCells = [ant.cells[1][1], ant.cells[2][0]];
        spyOn(ant.detector, "detectCloseCells").and.returnValue(surroundingCells);
        spyOn(ant.detector, "findClosestToLandmark").and.returnValue(ant.cells[1][1]);
        moveBehavior.doBehavior();
        expect(ant.detector.findClosestToLandmark).toHaveBeenCalledWith(ant.cells[1][0], surroundingCells);
    });

    it("should mark the ant as return to nest if the trail is too long.", function(){
        for(var x = 0; x < 6; x++){
            ant.trail.push(new Cell());
        }

        moveBehavior.doBehavior();

        expect(ant.returnToNest).toEqual(true);
    });
});