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

    it("should turn left if the random number if less than .5", function(){
        spyOn(Math, "random").and.returnValue(0.49);
        spyOn(ant, "turnLeft");
        
        turnBehavior.doBehavior();

        expect(Math.random).toHaveBeenCalled();
        expect(ant.turnLeft).toHaveBeenCalledWith();
    });

    it("should turn right if the random number is .5 or more", function(){
        spyOn(Math, "random").and.returnValue(0.5);
        spyOn(ant, "turnRight");
        
        turnBehavior.doBehavior();

        expect(Math.random).toHaveBeenCalled();
        expect(ant.turnRight).toHaveBeenCalledWith();
    });

    it("should have a type of Move", function(){
        expect(turnBehavior.type).toEqual("Turn");
    });
});