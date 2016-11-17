'use strict'

var AntHelper = require("../test_helpers/antHelper");
var TurnBehavior = require("../src/turnBehavior");

describe("Turn Behavior", function(){

    var turnBehavior;
    var ant;
    var helper = new AntHelper();

    beforeEach(function() { 
        ant = helper.createTestAnt();
        ant.detectFrontCells();
        turnBehavior = new TurnBehavior(ant); 
    }); 

    it("should turn to a random direction when do Behavior is called.", function(){
        spyOn(Math, "random").and.returnValue(.5);
        spyOn(ant, "turn");
        
        turnBehavior.doBehavior();
        
        expect(Math.random).toHaveBeenCalled();
        expect(ant.turn).toHaveBeenCalledWith(2);
    });

    it("should keep trying to turn if the same direction comes up as the ant is facing.", function(){
        spyOn(Math, "random").and.returnValues(0, .5);
        spyOn(ant, "turn");
        
        turnBehavior.doBehavior();
        
        expect(Math.random).toHaveBeenCalled();
        expect(ant.turn).toHaveBeenCalledWith(2);
    });

    it("should have a type of Move", function(){
        expect(turnBehavior.type).toEqual("Turn");
    });
});