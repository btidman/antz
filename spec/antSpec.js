'use strict'

describe("Ant", function(){

    var ant;
    var container;
    beforeEach(function(){
        container = new PIXI.Container();
        spyOn(container, "addChild");
        ant = new Ant(1,2,container);
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
    });

    it("should add the sprite to the container", function(){
        
        expect(ant.container.addChild).toHaveBeenCalledWith(ant.sprite);
    });
});