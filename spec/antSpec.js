'use strict'

describe("Ant", function(){

    var ant;
    var container;
    var cells = [];
    beforeEach(function(){
        container = new PIXI.Container();
        spyOn(container, "addChild");
        cells = [];
        cells.push([new Cell(0,0), new Cell(1,0)]);
        cells.push([new Cell(0,1), new Cell(1,1)]);
        cells.push([new Cell(0,2), new Cell(1,2)]);
        
        ant = new Ant(1,2,cells,container);
    });

    it("should have a location of 1X2", function(){
        expect(ant.x).toEqual(1);
        expect(ant.y).toEqual(2);
        expect(ant.sprite.x).toEqual(11);
        expect(ant.sprite.y).toEqual(22);
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
        expect(ant.direction).toEqual(0);
    });

    it("should rotate the sprite based on the direction of the ant", function(){

        expect(ant.sprite.rotation).toEqual(0);
        ant.direction = 1;
        ant.updateSpriteRotation();
        expect(ant.sprite.rotation).toEqual((3.14/2));
        ant.direction = 2;
        ant.updateSpriteRotation();
        expect(ant.sprite.rotation).toEqual((3.14));
        ant.direction = 3;
        ant.updateSpriteRotation();
        expect(ant.sprite.rotation).toEqual((3.14 * 1.5));
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

    it("should update sprite x and y when moving to a new cell", function(){
        ant.moveToCell(cells[1][0]);
        expect(ant.sprite.x).toEqual(0);
        expect(ant.sprite.y).toEqual(11);
    });

    it("should update sprite rotation when it turns", function(){
        ant.turn(1);
        expect(ant.sprite.rotation).toEqual(3.14/2);
        expect(ant.direction).toEqual(1);
    })
});