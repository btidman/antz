var Ant = require("../src/ant");
var Cell = require("../src/cell");
var Nest = require("../src/nest");

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

AntHelper.prototype.createTestAntOnNest = function(){
    var container = new PIXI.Container();

    spyOn(container, "addChild");
    
    cells = [];
    var nestCell = new Cell(1,2, container);
    
    cells.push([new Cell(0,0, container), new Cell(1,0, container)]);
    cells.push([new Cell(0,1, container), new Cell(1,1, container)]);
    cells.push([new Cell(0,2, container), nestCell]);
    
    nestCell.addNest(new Nest(nestCell, cells, container));

    ant = new Ant(1,2,cells,container);

    return ant;
}


AntHelper.prototype.createTestAntInBigWorld = function(){
    var container = new PIXI.Container();

    spyOn(container, "addChild");
    
    cells = [];
    cells.push([new Cell(0,0, container), new Cell(1,0, container), new Cell(2,0, container), new Cell(3,0, container)]);
    cells.push([new Cell(0,1, container), new Cell(1,1, container), new Cell(2,1, container), new Cell(3,1, container)]);
    cells.push([new Cell(0,2, container), new Cell(1,2, container), new Cell(2,1, container), new Cell(3,1, container)]);
    cells.push([new Cell(0,3, container), new Cell(1,3, container), new Cell(2,3, container), new Cell(3,3, container)]);

    ant = new Ant(3,3,cells,container);

    return ant;
}

module.exports = AntHelper;
