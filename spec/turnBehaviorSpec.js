
var TurnBehavior = require("../src/turnBehavior");
var AntHelper = require("../test_helpers/antHelper");

describe("turn behavior.", function(){

    var turnBehavior;
    var antHelper = new AntHelper();
    var ant;

    beforeEach(function(){
        
        ant = antHelper.createTestAnt(ant);
        spyOn(ant, "advance");
        turnBehavior = new TurnBehavior(ant);
    });

    it("should have a type of 'Turn'", function(){
        expect(turnBehavior.type).toEqual("Turn");
    });

    it("should have a reference to the ant", function(){
        expect(turnBehavior.ant).toEqual(ant);
    });

    it("should randomly turn right", function(){
        spyOn(ant, "turnRight");
        spyOn(Math, "random").and.returnValue(.49);
        turnBehavior.doBehavior();
        expect(ant.turnRight).toHaveBeenCalled();
    });

    it("should randomly turn left", function(){
        spyOn(ant, "turnLeft");
        spyOn(Math, "random").and.returnValue(.50);
        turnBehavior.doBehavior();
        expect(ant.turnLeft).toHaveBeenCalled();
    });
});