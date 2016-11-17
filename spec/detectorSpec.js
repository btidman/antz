'use strict'

var Detector = require("../src/detector");
var Cell = require("../src/cell");

describe("Detector for ant", function(){

    var detector;
    var cells;
    beforeEach(function(){
        
        cells = [];
        
        cells.push([new Cell(0,0), new Cell(1,0)]);
        cells.push([new Cell(0,1), new Cell(1,1)]);
        cells.push([new Cell(0,2), new Cell(1,2)]);
        
        detector = new Detector(cells);
    });

    it("should know what cells are in front of a location based on a direction", function(){
        var result = detector.detectFrontCells(1,2,Direction.North);
        expect(result).toContain(cells[1][0]);
        expect(result).toContain(cells[1][1]);

        result = detector.detectFrontCells(1,2,Direction.East);
        expect(result.length).toEqual(0);
        
        result = detector.detectFrontCells(1,2,Direction.South);
        expect(result.length).toEqual(0);
        
        result = detector.detectFrontCells(1,2,Direction.West);
        expect(result).toContain(cells[1][0]);
        expect(result).toContain(cells[2][0]);
    });

    it("can remove undefined from a collection of cells", function(){
        var newCell = new Cell(5,5);
        var cellsToAdd = [newCell, undefined];
        var result = detector.filterUndefinedCells(cellsToAdd);
        expect(result).toContain(newCell);
        expect(result).not.toContain(undefined);
    });

    it("should be able to detect what cells are north", function(){
        var result = detector.detectCellsNorthOfLocation(1,2);

        expect(result).toContain(cells[1][0]);
        expect(result).toContain(cells[1][1]);
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
        expect(result).toContain(cells[1][0]);
        expect(result).toContain(cells[2][0]);
    });

    it("should be able to detect what cells are south", function(){
        var result = detector.detectCellsSouthOfLocation(1,2);

        expect(result.length).toEqual(0);
    });
});