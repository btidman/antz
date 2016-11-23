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

    it("should know what cells are around the ant", function(){
        var result = detector.detectCells();
        expect(result).toContain(ant.cells[1][0]);
        expect(result).toContain(ant.cells[1][1]);
        expect(result).toContain(ant.cells[2][0]);

        ant.moveToCell(ant.cells[1][0]);

        var result = detector.detectCells();
        expect(result).toContain(ant.cells[0][0]);
        expect(result).toContain(ant.cells[0][1]);
        expect(result).toContain(ant.cells[1][1]);
        expect(result).toContain(ant.cells[2][0]);
        expect(result).toContain(ant.cells[2][1]);
    });

    it("can remove undefined from a collection of cells", function(){
        var newCell = new Cell(5,5, container);
        var cellsToAdd = [newCell, undefined];
        var result = detector.filterUndefinedCells(cellsToAdd);
        expect(result).toContain(newCell);
        expect(result).not.toContain(undefined);
    });

    
});