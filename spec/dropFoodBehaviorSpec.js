'use strict'

var AntHelper = require("../test_helpers/antHelper");
var DropFoodBehavior = require("../src/dropFoodBehavior");

describe("Drop Food Behavior", function(){

    var dropFoodBehavior;
    var ant;
    var helper = new AntHelper();

    beforeEach(function() { 
        ant = helper.createTestAnt();
        ant.trail = [];
        ant.detectCells();
        dropFoodBehavior = new DropFoodBehavior(ant); 
    }); 

    it("should have a type of Drop_Food", function(){
        expect(dropFoodBehavior.type).toEqual("Drop_Food");
    });   

    it("should remove the food from the ant when do behavior is called", function(){
        dropFoodBehavior.doBehavior();
        expect(ant.hasFood).toEqual(false);
    });

    it("should put the nest cell back into the path.", function(){
        dropFoodBehavior.doBehavior();
        var currentCell = ant.trail[0];
        expect(currentCell.x).toEqual(ant.x);
        expect(currentCell.y).toEqual(ant.y);

    });
});