var Ant = require("../src/ant");
var Cell = require("../src/cell");

function AntHelper(){

    return this;
}

AntHelper.prototype.createTestAnt = function(){
    var container = new PIXI.Container();

    spyOn(container, "addChild");
    
    cells = [];
    cells.push([new Cell(0,0), new Cell(1,0)]);
    cells.push([new Cell(0,1), new Cell(1,1)]);
    cells.push([new Cell(0,2), new Cell(1,2)]);

    ant = new Ant(1,2,cells,container);

    return ant;
}

module.exports = AntHelper;
