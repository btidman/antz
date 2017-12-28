
var GetFoodBehavior = require("../src/getFoodBehavior");
var AntHelper = require("../test_helpers/antHelper");

describe("Get food behavior.", function(){

    var getFoodBehavior;
    var antHelper = new AntHelper();
    var ant;

    beforeEach(function(){
        
        ant = antHelper.createTestAnt(ant);
        ant.detectCells();
        
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

    it("should remove food from the cell", function(){
        var foodCell = ant.cells[2][0];
        foodCell.addFood(100);
        expect(foodCell.food).toEqual(100);
        
        getFoodBehavior.doBehavior();
        expect(foodCell.food).toEqual(90);
    });

    it("should detect and remove loops from trail.", function(){
        spyOn(ant.detector, "detectAndRemoveLoops");
        getFoodBehavior.doBehavior();
        expect(ant.detector.detectAndRemoveLoops).toHaveBeenCalled();
    });
});