'use strict'

describe("Ant", function(){

    var ant;
    beforeEach(function(){
        ant = new Ant(1,2);
    });

    it("should have a location of 1X2", function(){
        expect(ant.x).toEqual(1);
        expect(ant.y).toEqual(2);
    })
});