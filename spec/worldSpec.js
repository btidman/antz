'use strict'


describe("World", function(){

    var world;
    beforeEach(function() { world = new World(100, 1000); }); 

    it("should have a width of 100 and a height of 1000", function(){
        expect(world.width).toEqual(100);
        expect(world.height).toEqual(1000);
    });

    it("should have a background color of FFFFFF", function(){
        expect(world.background).toEqual('FFFFFF');
    });

    it("should set up and hold reference to a pixi stage.", function(){
        expect(world.renderer).toBeDefined();
        expect(world.renderer.backgroundColor).toEqual(16777215);
        expect(world.renderer.width).toEqual(1000);
        expect(world.renderer.height).toEqual(10000);
        expect(world.stage).toBeDefined();
        expect(world.container).toBeDefined();
    });

    it("should draw the world on the page", function(){
        spyOn(document.body, "appendChild");
        world.draw();
        expect(document.body.appendChild).toHaveBeenCalledWith(world.renderer.view);
    });

    it("should have a collection of cells that comprise every location in the world", function(){
        for(var x = 0; x < 100; x++){
            for(var y = 0; y < 1000; y++){
                expect(world.cells[y][x].x).toEqual(x);
                expect(world.cells[y][x].y).toEqual(y);
            }
        }
    });

    it("should be able to add an ant.", function(){
        world.addAnt(1,2);
        expect(world.ants[0].x).toEqual(1);
        expect(world.ants[0].y).toEqual(2);
    });
});