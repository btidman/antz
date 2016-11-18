'use strict'

var AntHelper = require("../test_helpers/antHelper");
var MoveBehavior = require("../src/moveBehavior");

describe("Move Behavior", function(){

    var moveBehavior;
    var ant;
    var helper = new AntHelper();

    beforeEach(function() { 
        ant = helper.createTestAnt();
        ant.detectFrontCells();
        moveBehavior = new MoveBehavior(ant); 
    }); 

    it("should move to a random front cell when do Behavior is called.", function(){
        var frontCells = ant.frontCells;
        spyOn(Math, "random").and.returnValue(0);
        spyOn(ant, "moveToCell");
        
        moveBehavior.doBehavior();
        
        expect(Math.random).toHaveBeenCalled();
        expect(ant.moveToCell).toHaveBeenCalledWith(frontCells[0]);
    });

    it("should not try and move if there are no cells available to move to", function(){
        spyOn(ant, "moveToCell");
        spyOn(ant, "advance");
        ant.frontCells = [];
        moveBehavior.doBehavior();
        expect(ant.moveToCell).not.toHaveBeenCalled();
        expect(ant.advance).toHaveBeenCalled();
    });

    it("should have a type of Move", function(){
        expect(moveBehavior.type).toEqual("Move");
    });
});