
var Nest = require("../src/nest.js");
var Cell = require("../src/cell.js");

describe("Nest", function(){

    var nest;
    var cell;
    var allCells;

    var container = new PIXI.Container();
    window.FOOD_TEXTURE = PIXI.Texture.fromImage('../food.png');
    

    beforeEach(function(){
        cell = new Cell(0, 0, container);
        allCells = [[cell]];
        nest = new Nest(cell, allCells, container);
        
    });

    it("should have a cell that represents it's location", function(){

        expect(nest.cell).toEqual(cell);
    });

    it("should have a cell that knows it has a nest on it", function(){
        expect(nest.cell.nest).toEqual(nest);
    });

    it("should have a container", function(){
        expect(nest.container).toEqual(container);
    });

    it("should have the collection of all cells", function(){
        expect(nest.allCells).toEqual(allCells);
    });

    it("should be able to add ants", function(){
        nest.addAnt();
        expect(nest.ants.length).toEqual(1);
        expect(nest.ants[0].x).toEqual(cell.x);
        expect(nest.ants[0].y).toEqual(cell.y);
    });
});