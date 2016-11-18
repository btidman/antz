'use strict'

var World = require("../src/world");

describe("World", function(){

    var world;
    window.FOOD_TEXTURE = PIXI.Texture.fromImage('../cell.png');
    beforeEach(function() { world = new World(3, 4); }); 

    it("should have a width of 3 and a height of 4", function(){
        expect(world.width).toEqual(3);
        expect(world.height).toEqual(4);
    });

    it("should have a background color of FFFFFF", function(){
        expect(world.background).toEqual('FFFFFF');
    });

    it("should set up and hold reference to a pixi stage.", function(){
        expect(world.renderer).toBeDefined();
        expect(world.renderer.backgroundColor).toEqual(16777215);
        expect(world.renderer.width).toEqual(30);
        expect(world.renderer.height).toEqual(40);
        expect(world.stage).toBeDefined();
        expect(world.container).toBeDefined();
    });

    it("should draw the world on the page", function(){
        spyOn(document.body, "appendChild");
        world.draw();
        expect(document.body.appendChild).toHaveBeenCalledWith(world.renderer.view);
    });

    it("should have a collection of cells that comprise every location in the world", function(){
        for(var x = 0; x < 3; x++){
            for(var y = 0; y < 4; y++){
                expect(world.cells[y][x].x).toEqual(x);
                expect(world.cells[y][x].y).toEqual(y);
            }
        }
    });

    it("should be able to add an ant.", function(){
        
        world.addAnt(1,2);
        expect(world.ants.length).toEqual(1);
    });

    it("should be able to add food.", function(){
        var cell = world.cells[1][0];
        spyOn(cell, "addFood");
        world.addFood(0,1,1000);
        expect(cell.addFood).toHaveBeenCalledWith(1000);
    });
    
});