'use strict'

var Cell = require("../src/cell");

describe("Cell", function(){

    var cell;
    var container = new PIXI.Container();
    window.FOOD_TEXTURE = PIXI.Texture.fromImage('../cell.png');
    
    beforeEach(function() { cell = new Cell(1, 2, container); }); 

    it("should have a location of 1X2", function(){
        expect(cell.x).toEqual(1);
        expect(cell.y).toEqual(2);
        expect(cell.sprite.renderable).toEqual(false);
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
});