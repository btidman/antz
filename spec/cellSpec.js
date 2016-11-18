'use strict'

var Cell = require("../src/cell");
var Nest = require("../src/nest");

describe("Cell", function(){

    var cell;
    var container = new PIXI.Container();
    window.FOOD_TEXTURE = PIXI.Texture.fromImage('../food.png');
    window.NEST_TEXTURE = PIXI.Texture.fromImage('../nest.png');
    
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
});