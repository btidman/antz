'use strict'

var Cell = require("../src/cell");
var Nest = require("../src/nest");

describe("Cell", function(){

    var cell;
    var container = new PIXI.Container();
    window.FOOD_TEXTURE = PIXI.Texture.fromImage('../food.png');
    window.NEST_TEXTURE = PIXI.Texture.fromImage('../nest.png');
    window.PHEROMONE_TEXTURE = PIXI.Texture.fromImage('../pheromone.png');
    
    beforeEach(function() { cell = new Cell(0, 0, container); }); 

    it("should have a location of 0X0", function(){
        expect(cell.x).toEqual(0);
        expect(cell.y).toEqual(0);
        expect(cell.sprite).toEqual(null);
    });

    it("should add food", function(){
        cell.addFood(1000);
        expect(cell.food).toEqual(1000);
    });

    it("should have a container", function(){
        expect(cell.container).toEqual(container);
    });

    it("should show it's food sprite if it has food.", function(){
        cell.addFood(1000);
        expect(cell.sprite.renderable).toEqual(true);
    });

    it("should add a nest", function(){
        var allCells = [[cell]];
        var nest = new Nest(cell, allCells, container);

        cell.addNest(nest);
        
        expect(cell.nest).toEqual(nest);
        expect(cell.sprite.renderable).toEqual(true);
        expect(cell.sprite.texture).toEqual(NEST_TEXTURE);

    });

    it("should have pheromone added to the cell.", function(){
        cell.addPheromone(2);
        expect(cell.pheromone).toEqual(2);
    });

    it("should lose pheromone as time advances.", function(){
        cell.addPheromone(4);
        
        expect(cell.sprite.alpha).toEqual(.99);
        cell.advance();
        cell.advance();
        expect(cell.pheromone).toEqual(3.8);
        expect(cell.sprite.alpha).toEqual(.95);
    });

    it("should not have pheromone less than 0 as time advances", function(){
        cell.addPheromone(0);
        cell.advance();
        expect(cell.pheromone).toEqual(0);
    });

    it("should show if it has pheromone.", function(){
        cell.addPheromone(50);
        expect(cell.sprite.renderable).toEqual(true);
        expect(cell.sprite.texture).toEqual(PHEROMONE_TEXTURE);
    });

    it("should remove sprites for other textures when pheromone is added.", function(){
        spyOn(container, "removeChild");
        cell.addPheromone(50);
        expect(container.removeChild).toHaveBeenCalled();
    });

    it("should not remove sprites for pheromone when pheromone is added.", function(){
        cell.addPheromone(50);
        spyOn(container, "removeChild");
        cell.addPheromone(50);
        expect(container.removeChild).not.toHaveBeenCalled();
    });

    it("should not re-add the pheromone sprite every time add pheromone is called", function(){
        cell.addPheromone(50);
        spyOn(container, "addChildAt");
        cell.addPheromone(50);
        expect(container.addChildAt).not.toHaveBeenCalled();
    });

    it("should not show pheromone anymore when there is none left.", function(){
        cell.addPheromone(.1);
        expect(cell.sprite.renderable).toEqual(true);
        expect(cell.sprite.texture).toEqual(PHEROMONE_TEXTURE);
        spyOn(container, "removeChild");
        cell.advance();
        cell.advance();
        expect(container.removeChild).toHaveBeenCalledWith(cell.sprite);
    });

    it("should not be able to add more than 4 pheromone", function(){
        cell.addPheromone(4);
        cell.addPheromone(1);
        expect(cell.pheromone).toEqual(4);
    });

    it("should be able to add pheromone on top of the pheromone already there.", function(){
        cell.addPheromone(1);
        cell.addPheromone(1);
        expect(cell.pheromone).toEqual(2);
    });

    it("the trail should be more opaque when it's lighter", function(){
        cell.addPheromone(1);
        expect(cell.sprite.alpha).toEqual(.25);
    });
    
    it("the trail should be not opaque when it's heavier", function(){
        cell.addPheromone(3);
        cell.addPheromone(.99);
        expect(cell.sprite.alpha).toEqual(.99);
    });

    it("should not remove other sprites if there is no pheromone", function(){
        var allCells = [[cell]];
        var nest = new Nest(cell, allCells, container);

        cell.addNest(nest);
        
        expect(cell.nest).toEqual(nest);
        expect(cell.sprite.renderable).toEqual(true);
        expect(cell.sprite.texture).toEqual(NEST_TEXTURE);
        spyOn(container, "removeChild");

        cell.advance();

        expect(container.removeChild).not.toHaveBeenCalledWith(cell.sprite);
    });

    it("should not show pheromone if this cell is a nest.", function(){
        var pretendNest = "pretend this is a nest";
        cell.addNest(pretendNest)
        cell.addPheromone(1);
        expect(cell.pheromone).toEqual(0);
        expect(cell.sprite.texture).toEqual(NEST_TEXTURE);
    });

    it("should only be able to add a maximum of 4 pheromone at a time", function(){
        cell.addPheromone(5);
        expect(cell.pheromone).toEqual(4);
    });

    it("should not have negative pheromone as time advances.", function(){
        cell.addPheromone(0.01);
        expect(cell.pheromone).toEqual(0.01);
        cell.advance();
        expect(cell.pheromone).toEqual(0);
    });

    it("should not add pheromone to food or nest.", function(){
        cell.addFood(1000);
        cell.addPheromone(4);
        expect(cell.pheromone).toEqual(0);
        expect(cell.sprite.texture).toEqual(FOOD_TEXTURE);
    });
});