'use strict'


var AntHelper = require("../test_helpers/antHelper.js");
var MoveBehavior = require("../src/moveBehavior.js");

describe("Ant", function(){

    var ant;
    var container;
    var cells = [];
    var helper = new AntHelper();
    window.ANT_TEXTURE = PIXI.Texture.fromImage('../ant.png');
    window.evaporationSpeed = 5000;
    window.antSpeed = 500;
    
    beforeEach(function(){
        ant = helper.createTestAntOnNest();
        
        container = ant.container;
        cells = ant.cells;
    });

    it("should start with 0 steps back towards nest", function(){
        expect(ant.stepsTowardNest).toEqual(0);
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

    it("should be able to retrieve the surronding cells", function(){
        spyOn(ant.detector, "detectCells").and.returnValue([cells[1][0], cells[1][1]]);
        ant.detectCells();
        expect(ant.detector.detectCells).toHaveBeenCalled();
        expect(ant.surroundingCells).toContain(cells[1][0]);
        expect(ant.surroundingCells).toContain(cells[1][1]);
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

    it("should store the starting cell to the trail.", function(){

        expect(ant.trail[0].x).toEqual(1);
        expect(ant.trail[0].y).toEqual(2);
    });    

    it("should die when death is called", function(){
        
        spyOn(container, "removeChild");
        spyOn(ant.nest, "filterDeadAntz");
        ant.death();
        expect(ant.status).toEqual("death");
        expect(container.removeChild).toHaveBeenCalledWith(ant.sprite);
        expect(ant.nest.filterDeadAntz).toHaveBeenCalledWith();
        
    });


    it("should have a reference to it's nest", function(){
        expect(this.nest).not.toBeNull;
    });
});