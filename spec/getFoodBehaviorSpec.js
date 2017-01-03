
var GetFoodBehavior = require("../src/getFoodBehavior");
var AntHelper = require("../test_helpers/antHelper");

describe("Get food behavior.", function(){

    var getFoodBehavior;
    var antHelper = new AntHelper();
    var ant;

    beforeEach(function(){
        
        ant = antHelper.createTestAnt(ant);
        spyOn(ant, "advance");
        getFoodBehavior = new GetFoodBehavior(ant);
    });

    it("should have a type of 'Get_Food'", function(){
        expect(getFoodBehavior.type).toEqual("Get_Food");
    });

    it("should have a reference to the ant", function(){
        expect(getFoodBehavior.ant).toEqual(ant);
    });

    it("should store food on the ant", function(){

        getFoodBehavior.doBehavior();
        expect(ant.hasFood).toEqual(true);
    });

    it("should record the length of the trail on the ant.", function(){
        ant.trail.push(ant.cells[1][1]);
        getFoodBehavior.doBehavior();
        expect(ant.trailLength).toEqual(2);
    });
});