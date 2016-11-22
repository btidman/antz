'use strict'

var Detector = require("../src/detector");
var Cell = require("../src/cell");
var AntHelper = require("../test_helpers/antHelper");

describe("Detector for ant", function(){

    var detector;
    
    var antHelper = new AntHelper();
    var ant; 
    var container = new PIXI.Container();
    window.FOOD_TEXTURE = PIXI.Texture.fromImage('../cell.png');
    
    beforeEach(function(){
        
        ant = antHelper.createTestAnt();
        
        detector = new Detector(ant);
    });

    it("should know what cells are in front of ant based on a direction", function(){
        var result = detector.detectFrontCells();
        expect(result).toContain(ant.cells[1][0]);
        expect(result).toContain(ant.cells[1][1]);

        ant.direction = Direction.East;
        result = detector.detectFrontCells();
        expect(result.length).toEqual(0);
        
        ant.direction = Direction.South;
        result = detector.detectFrontCells();
        expect(result.length).toEqual(0);
        
        ant.direction = Direction.West;
        result = detector.detectFrontCells();
        expect(result).toContain(ant.cells[1][0]);
        expect(result).toContain(ant.cells[2][0]);
    });

    it("can remove undefined from a collection of cells", function(){
        var newCell = new Cell(5,5, container);
        var cellsToAdd = [newCell, undefined];
        var result = detector.filterUndefinedCells(cellsToAdd);
        expect(result).toContain(newCell);
        expect(result).not.toContain(undefined);
    });

    it("should be able to detect what cells are north", function(){
        var result = detector.detectCellsNorthOfLocation(1,2);

        expect(result).toContain(ant.cells[1][0]);
        expect(result).toContain(ant.cells[1][1]);
        expect(result.length).toEqual(3);
    });

    it("should be able to detect what cells are east", function(){
        var result = detector.detectCellsEastOfLocation(1,2);

        expect(result.length).toEqual(2);
        expect(result).toContain(undefined);
    });

    it("should be able to detect what cells are west", function(){
        var result = detector.detectCellsWestOfLocation(1,2);

        expect(result.length).toEqual(2);
        expect(result).toContain(ant.cells[1][0]);
        expect(result).toContain(ant.cells[2][0]);
    });

    it("should be able to detect what cells are south", function(){
        var result = detector.detectCellsSouthOfLocation(1,2);

        expect(result.length).toEqual(0);
    });
});