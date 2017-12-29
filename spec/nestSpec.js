
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

    it("should set up the nest correctly", function(){

        expect(nest.cell).toEqual(cell);
        expect(nest.cell.nest).toEqual(nest);
        expect(nest.container).toEqual(container);
        expect(nest.allCells).toEqual(allCells);
    });

    it("should be able to add ants", function(){
        spyOn(nest, "updateText");
        nest.addAnt();
        expect(nest.ants.length).toEqual(1);
        expect(nest.ants[0].x).toEqual(cell.x);
        expect(nest.ants[0].y).toEqual(cell.y);
        expect(nest.updateText).toHaveBeenCalled();
    });

    it("should store dropped food", function(){
        spyOn(nest, "updateText");
        nest.addFood(10);
        expect(nest.food).toEqual(10);
        expect(nest.updateText).toHaveBeenCalled();
    });

    it("should add an ant when 100 food is reached", function(){
        spyOn(nest, "addAnt");
        nest.addFood(100);
        expect(nest.addAnt).toHaveBeenCalled();
    });

    it("should reduce food by 100 (min 0) when addAnt is called", function(){
        nest.addFood(50);
        nest.addAnt();
        expect(nest.food).toEqual(0);
    });

    it("should remove dead ants from the collection when filterDeadAntz is called", function(){

        spyOn(nest, "updateText");
        nest.addAnt();
        var antCount = nest.ants.length;
        nest.ants[0].death();
        nest.filterDeadAntz();
        expect(nest.ants.length).toEqual(antCount - 1);
        expect(nest.updateText).toHaveBeenCalled();
    });

    it("should update the text displayed on the screen", function(){

        nest.updateText();
        expect(nest.basicText.text).toEqual("Antz: " + nest.ants.length + "  Foodz: " + nest.food);
        
        nest.addFood(90);
        nest.updateText();
        expect(nest.basicText.text).toEqual("Antz: " + nest.ants.length + "  Foodz: " + nest.food);

        nest.addAnt();
        nest.updateText();
        expect(nest.basicText.text).toEqual("Antz: " + nest.ants.length + "  Foodz: " + nest.food);

        nest.ants[0].death();
        nest.filterDeadAntz();
        nest.updateText();
        expect(nest.basicText.text).toEqual("Antz: " + nest.ants.length + "  Foodz: " + nest.food);
    });
});