var Ant = require("../src/ant");
var Cell = require("../src/cell");

function AntHelper(){

    return this;
}

AntHelper.prototype.createTestAnt = function(){
    var container = new PIXI.Container();

    spyOn(container, "addChild");
    
    cells = [];
    cells.push([new Cell(0,0, container), new Cell(1,0, container)]);
    cells.push([new Cell(0,1, container), new Cell(1,1, container)]);
    cells.push([new Cell(0,2, container), new Cell(1,2, container)]);

    ant = new Ant(1,2,cells,container);

    return ant;
}

module.exports = AntHelper;
