var Direction = require("./directionEnum");
var Detector = require("./detector");
var Decider = require("./decider");
var TWEEN = require('tween.js');

function Ant(x, y, cells, container){
    this.x = x;
    this.y = y;
    this.direction = Direction.North;
    this.cells = cells;
    this.container = container;
    var texture = PIXI.Texture.fromImage('../ant.png');
    
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.x = (10 * this.x) + 5;
    this.sprite.y = (10 * this.y) + 5;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.rotation = 0;
    this.container.addChild(this.sprite);
    this.frontCells = [];
    this.detector = new Detector(cells);
    this.decider = new Decider();
    this.tempX = 0;
    this.tempY = 0;
    this.tempRotation = 0;
}

Ant.prototype.turn = function(newDirection){

    this.direction = newDirection;
    this.updateSpriteRotation();
}

Ant.prototype.updateSpriteRotation = function(){
    var newRotation = 0;

    if(this.direction == Direction.North){
        newRotation = 0;
    }
    else if(this.direction == Direction.East){
        newRotation = (3.14/2);
    }
    else if(this.direction == Direction.South){
        newRotation = 3.14;
    }
    else if(this.direction == Direction.West){
        newRotation = (3.14 * 1.5);
    }

    var tween = new TWEEN.Tween(this);
    tween.to({ tempRotation: newRotation}, 500);
    tween.onUpdate(function() {
        this.sprite.rotation = this.tempRotation;
    });
    tween.start();
}

Ant.prototype.detectFrontCells = function(){
    
    this.frontCells = this.detector.detectFrontCells(this.x, this.y, this.direction);
}

Ant.prototype.moveToCell = function(cell){
    this.x = cell.x;
    this.y = cell.y;

    //this stuff is untested.
    var newX = (10 * this.x) + 5;
    var newY = (10 * this.y) + 5;
    this.tempX = this.sprite.x;
    this.tempY = this.sprite.y;

    var tween = new TWEEN.Tween(this);
    tween.to({ tempX: newX, tempY: newY}, 500);
    tween.onUpdate(function() {
        this.sprite.x = this.tempX;
        this.sprite.y = this.tempY;
    });
    tween.start();
}

Ant.prototype.advance = function(){

    this.detectFrontCells();
    var behavior = this.decider.getNewBehavior(this);
    behavior.doBehavior();
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Ant;
}