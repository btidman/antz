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
        detector.sightRange = 2;
        ant.surroundingCells = [ant.cells[0][0], ant.cells[0][1], ant.cells[1][0], ant.cells[1][1], ant.cells[2][0]];
    });

    it("should have a sight range of 2", function(){
        expect(detector.sightRange).toEqual(2);
    });

    it("should know what cells are immediatly close to it", function(){
        var result = detector.detectCloseCells();
        expect(result).toContain(ant.cells[1][0]);
        expect(result).toContain(ant.cells[1][1]);
        expect(result).toContain(ant.cells[2][0]);

        ant.moveToCell(ant.cells[1][0]);

        var result = detector.detectCloseCells();
        expect(result).toContain(ant.cells[0][0]);
        expect(result).toContain(ant.cells[0][1]);
        expect(result).toContain(ant.cells[1][1]);
        expect(result).toContain(ant.cells[2][0]);
        expect(result).toContain(ant.cells[2][1]);
    });

    it("should know what cells are around the ant", function(){
        ant = antHelper.createTestAntInBigWorld();
        detector = new Detector(ant);

        var result = detector.detectCells();
        expect(result).toContain(ant.cells[1][1]);
        expect(result).toContain(ant.cells[1][2]);
        expect(result).toContain(ant.cells[1][3]);
        expect(result).toContain(ant.cells[2][1]);
        expect(result).toContain(ant.cells[2][2]);
        expect(result).toContain(ant.cells[2][3]);
        expect(result).toContain(ant.cells[3][1]);
        expect(result).toContain(ant.cells[3][2]);

        ant.moveToCell(ant.cells[0][0]);

        var result = detector.detectCells();
        expect(result).toContain(ant.cells[0][1]);
        expect(result).toContain(ant.cells[0][2]);
        expect(result).toContain(ant.cells[1][0]);
        expect(result).toContain(ant.cells[1][1]);
        expect(result).toContain(ant.cells[1][2]);
        expect(result).toContain(ant.cells[2][0]);
        expect(result).toContain(ant.cells[2][1]);
        expect(result).toContain(ant.cells[2][2]);
    });

    it("can remove undefined from a collection of cells", function(){
        var newCell = new Cell(5,5, container);
        var cellsToAdd = [newCell, undefined];
        var result = detector.filterCells(cellsToAdd);
        expect(result).toContain(newCell);
        expect(result).not.toContain(undefined);
    });

    it("can remove obsticles from a collection of cells", function(){
        var newCell = new Cell(5,5, container);
        var newCellObsticle = new Cell(5,6, container);
        newCellObsticle.addObsticle();
        var cellsToAdd = [newCell, newCellObsticle];
        var result = detector.filterCells(cellsToAdd);
        expect(result).toContain(newCell);
        expect(result).not.toContain(newCellObsticle);
    });

    it("should shuffle the results when removing undefined cells", function(){
        var newCell = new Cell(5,5, container);
        var cellsToAdd = [newCell, undefined];
        spyOn(detector.shuffler, "shuffleArray")
        
        var result = detector.filterCells(cellsToAdd);

        expect(detector.shuffler.shuffleArray).toHaveBeenCalledWith(result);
    });
    
    it("can pick a random front cell.", function(){
        spyOn(Math, "random").and.returnValue(.99,0);
        
        var actualCell = detector.pickNextLandMark(ant.surroundingCells);
        
        expect(Math.random).toHaveBeenCalled();
        expect(actualCell).toEqual(ant.surroundingCells[0]);
    });


    it("should be more likely to pick a cell that has pheromone on it", function(){
        ant.cells[1][1].addPheromone(10);
        spyOn(Math, "random").and.returnValue(0);
        
        var actualCell = detector.pickNextLandMark(ant.surroundingCells);

        expect(actualCell.x).toEqual(1);
        expect(actualCell.y).toEqual(1);
    });

    it("should pick the cell that is closest to the landmark.", function(){
        ant = antHelper.createTestAntInBigWorld();
        var landmark = ant.cells[1][1];
        var expected = ant.cells[2][2];
        
        var cells = ant.detector.detectCloseCells();
        var actual = detector.findClosestToLandmark(landmark, cells);
        expect(actual).toEqual(expected);
    });

    it("should be more likely to pick a cell that has pheromone on it that's not in the trail", function(){
        ant.cells[2][1].addPheromone(15);
        ant.cells[1][0].addPheromone(10);
        ant.cells[1][1].addPheromone(10);
        ant.cells[0][1].addPheromone(10);
        
        ant.trail.push(ant.cells[1][0])
        ant.trail.push(ant.cells[0][1]);

        spyOn(Math, "random").and.returnValue(.1);
        
        var actualCell = detector.pickNextLandMark(ant.surroundingCells);

        expect(actualCell.x).toEqual(1);
        expect(actualCell.y).toEqual(1);
    });

    it("should occasionally not consider the pheromone in order to generate some new paths", function(){
        ant.cells[1][0].addPheromone(8);
        
        spyOn(Math, "random").and.returnValues(0, 0, 
                                                0, 0,
                                                0, .96,
                                                .1, 0,
                                                0, 0);
        
        
        var actualCell = detector.pickNextLandMark(ant.surroundingCells);

        expect(actualCell.x).toEqual(1);
        expect(actualCell.y).toEqual(1);
    });
    
    
    it("should not pick a cell the ant just came from.", function(){
        spyOn(Math, "random").and.returnValues(0, 0, 
                                                0, 0, 
                                                0, 0,
                                                0, 0,
                                                .99,0);
        
        ant.moveToCell(ant.cells[1][0]);
        ant.trail.push(ant.cells[1][0]);
        
        var actualCell = detector.pickNextLandMark(ant.surroundingCells);

        expect(actualCell.x).not.toEqual(2);
        expect(actualCell.y).not.toEqual(1);
    });

    it("should not pick a cell from the trail if there is pheromone nearby.", function(){
        
        ant.cells[0][0].addPheromone(10);
        ant.moveToCell(ant.cells[1][0]);
        ant.trail.push(ant.cells[1][0]);
        ant.moveToCell(ant.cells[1][1]);
        ant.trail.push(ant.cells[1][1]);
        
        spyOn(Math, "random").and.returnValues(0, 0, 0, 0, .99);
        var actualCell = detector.pickNextLandMark(ant.surroundingCells);

        expect(actualCell.x).toEqual(0);
        expect(actualCell.y).toEqual(0);
    });

    it("should detect when there is pheromone in front of the ant", function(){
        ant.cells[1][1].addPheromone(10);
        var actual = detector.hasPheromoneInFront();
        expect(actual).toEqual(true);
    });

    it("should detect when there is no pheromone in front of the ant", function(){
        
        var actual = detector.hasPheromoneInFront();
        expect(actual).toEqual(false);
    });

    it("should detect when there is pheromone anywhere around the ant.", function(){
        ant.cells[1][1].addPheromone(10);
        ant.detectCells();
        var actual = detector.hasPheromoneNearby();
        expect(actual).toEqual(true);
    });

    it("should detect when there is no pheromone anywhere around the ant.", function(){
        ant.detectCells();
        var actual = detector.hasPheromoneNearby();
        expect(actual).toEqual(false);
    });


    it("should know what cells are in front of an ant.", function(){
        var result = detector.detectFrontCells();
        expect(result).toContain(ant.cells[1][0]);
        expect(result).toContain(ant.cells[1][1]);
        expect(result).toContain(ant.cells[0][0]);
        expect(result).toContain(ant.cells[0][1]);
        expect(result.length).toEqual(4);

        ant.turnRight();
        result = detector.detectFrontCells();
        expect(result.length).toEqual(0);
        
        ant.turnRight();
        result = detector.detectFrontCells();
        expect(result.length).toEqual(0);
        
        ant.turnRight();
        result = detector.detectFrontCells();
        expect(result.length).toEqual(3);
        expect(result).toContain(ant.cells[0][0]);
        expect(result).toContain(ant.cells[1][0]);
        expect(result).toContain(ant.cells[2][0]);
    });

    it("should be able to detect what cells are north", function(){
        var result = detector.detectCellsNorthOfLocation();

        expect(result).toContain(ant.cells[1][0]);
        expect(result).toContain(ant.cells[1][1]);
        expect(result).toContain(ant.cells[0][0]);
        expect(result).toContain(ant.cells[0][1]);
        expect(result).toContain(undefined);
        expect(result.length).toEqual(10);
    });

    it("should be able to detect what cells are east", function(){
        ant.moveToCell(ant.cells[1][0]);
        var result = detector.detectCellsEastOfLocation();
        
        expect(result.length).toEqual(6);
        expect(result).toContain(ant.cells[0][1]);
        expect(result).toContain(ant.cells[1][1]);
        expect(result).toContain(ant.cells[2][1]);
        expect(result).toContain(undefined);
    });

    it("should be able to detect what cells are west", function(){
        ant.moveToCell(ant.cells[1][1]);
        var result = detector.detectCellsWestOfLocation();

        expect(result.length).toEqual(6);
        expect(result).toContain(cells[1][0]);
        expect(result).toContain(cells[2][0]);
        expect(result).toContain(cells[0][0]);
        expect(result).toContain(undefined);
    });

    it("should be able to detect what cells are south", function(){
        ant.moveToCell(ant.cells[0][1]);
        var result = detector.detectCellsSouthOfLocation();
        expect(result).toContain(undefined);
        expect(result).toContain(cells[2][0]);
        expect(result).toContain(cells[2][1]);
        expect(result).toContain(cells[1][0]);
        expect(result).toContain(cells[1][1]);
        expect(result.length).toEqual(10);
    });

    it("should detect and remove lops in trail", function(){
        
        ant.trail.push(ant.cells[2][0]);
        ant.trail.push(ant.cells[1][0]);
        ant.trail.push(ant.cells[1][1]);
        ant.trail.push(ant.cells[2][1]);
        detector.detectAndRemoveLoops();
        expect(ant.trail.length).toEqual(1);
        expect(ant.trail).toContain(ant.cells[2][1]);
    });

    it("should detect the best nearby cell with pheromone on it.", function(){

        ant.cells[0][0].addPheromone(3);
        var bestCell = detector.findBestCell();
        expect(bestCell).toEqual(ant.cells[0][0]);
    });

    it("should value cells in the opposite direction of ant slightly less than those in front of it.", function(){
        ant.cells[0][0].addPheromone(2.9);
        ant.cells[1][0].addPheromone(3);
        ant.cells[1][1].addPheromone(3);
        ant.cells[2][0].addPheromone(3);
        ant.cells[2][1].addPheromone(3);
        ant.moveToCell(ant.cells[1][1]);
        ant.detectCells();
        var bestCell = detector.findBestCell();
        expect(bestCell).toEqual(ant.cells[0][0]);
    });

    it("should devaulue cells already in the ants trail when detecting the best nearby cell with pheromone on it.", function(){

        ant.cells[0][0].addPheromone(3);
        ant.cells[1][1].addPheromone(.61);
        ant.trail.push(ant.cells[0][0]);
        var bestCell = detector.findBestCell();
        expect(bestCell).toEqual(ant.cells[1][1]);
    });

    it("should return true when the best cell is in front.", function(){
        ant.cells[0][0].addPheromone(1.5);
        
        var actual = detector.isBestCellInFront();
        expect(actual).toEqual(true);
    });

    it("should return false when the best cell is not in front.", function(){
        ant.cells[0][0].addPheromone(1.5);
        ant.turnRight();
        var actual = detector.isBestCellInFront();
        expect(actual).toEqual(false);
    });

    it("should return true when there is food near it.", function(){
        ant.cells[1][1].addFood(1000);
        var actual = detector.isFoodNearby();
        expect(actual).toEqual(true);
    });

    it("should return false when there is not food near it.", function(){
        ant.cells[0][0].addFood(1000);
        var actual = detector.isFoodNearby();
        expect(actual).toEqual(false);
    });

    it("should know what direction is opposite of the current direction of ant.", function(){
        var actual = detector.getOppositeDirection();
        expect(actual).toEqual(Direction.South);
        
        ant.turnRight();
        actual = detector.getOppositeDirection();
        expect(actual).toEqual(Direction.West);

        ant.turnRight();
        actual = detector.getOppositeDirection();
        expect(actual).toEqual(Direction.North);

        ant.turnRight();
        actual = detector.getOppositeDirection();
        expect(actual).toEqual(Direction.East);
    });

    it("should know what cells are behind it.", function(){
        ant.moveToCell(ant.cells[1][1]);
        ant.detectCells();
        var actual = detector.detectBackCells();

        expect(actual.length).toEqual(3);
        expect(actual).toContain(ant.cells[1][0]);
        expect(actual).toContain(ant.cells[2][0]);
        expect(actual).toContain(ant.cells[2][1]);

    });
});