'use strict'


var AntHelper = require("../test_helpers/antHelper.js");
var MoveBehavior = require("../src/moveBehavior.js");

describe("Ant", function(){

    var ant;
    var container;
    var cells = [];
    var helper = new AntHelper();
    
    beforeEach(function(){
        ant = helper.createTestAnt();
        container = ant.container;
        cells = ant.cells;
    });

    it("should have a location of 1X2", function(){
        expect(ant.x).toEqual(1);
        expect(ant.y).toEqual(2);
        expect(ant.sprite.x).toEqual(15);
        expect(ant.sprite.y).toEqual(25);
    });

    it("should have a container", function(){
        expect(ant.container).toEqual(container);
    });

    it("should have a sprite", function(){
        
        expect(ant.sprite).toBeDefined();
        expect(ant.sprite.anchor.x).toEqual(0.5);
        expect(ant.sprite.anchor.y).toEqual(0.5);
    });

    it("should add the sprite to the container", function(){
        expect(ant.container.addChild).toHaveBeenCalledWith(ant.sprite);
    });

    it("should know about the cells in the world", function(){
        expect(ant.cells).toEqual(cells);
    });

    it("should have a default direction of north", function(){
        expect(ant.direction).toEqual(Direction.North);
    });

    it("should have a default detector", function(){
        expect(ant.detector).toBeDefined();
    });

    it("should be able to retrieve the front cells", function(){
        spyOn(ant.detector, "detectFrontCells").and.returnValue([cells[1][0], cells[1][1]]);
        ant.detectFrontCells();
        expect(ant.detector.detectFrontCells).toHaveBeenCalledWith(ant.x, ant.y, ant.direction);
        expect(ant.frontCells).toContain(cells[1][0]);
        expect(ant.frontCells).toContain(cells[1][1]);
    });

    it("should update x and y when moving to a new cell", function(){
        ant.moveToCell(cells[1][0]);
        expect(ant.x).toEqual(0);
        expect(ant.y).toEqual(1);
    });

    it("should update direction when it turns right", function(){
        ant.turnRight();
        expect(ant.direction).toEqual(Direction.East);
    });

    it("should update direction when it turns left", function(){
        ant.turnLeft();
        expect(ant.direction).toEqual(Direction.West);
    });

    it("should do a Behavior when advance is called.", function(){

        var moveBehavior = new MoveBehavior(ant);

        spyOn(ant.decider, "getNewBehavior").and.returnValue(moveBehavior);
        spyOn(moveBehavior, "doBehavior");

        ant.advance();

        expect(moveBehavior.doBehavior).toHaveBeenCalled();
    });
});