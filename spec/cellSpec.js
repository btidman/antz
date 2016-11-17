'use strict'

var Cell = require("../src/cell");

describe("Cell", function(){

    var cell;
    beforeEach(function() { cell = new Cell(1, 2); }); 

    it("should have a location of 1X2", function(){
        expect(cell.x).toEqual(1);
        expect(cell.y).toEqual(2);
    });
});