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
    
    this.sprite = new PIXI.Sprite(ANT_TEXTURE);
    this.sprite.x = (10 * this.x) + 5;
    this.sprite.y = (10 * this.y) + 5;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.rotation = 0;
    this.container.addChild(this.sprite);
    this.surroundingCells = [];
    this.trail = [cells[y][x]];
    this.detector = new Detector(this);
    this.decider = new Decider();
    this.tempX = 0;
    this.tempY = 0;
    this.tempRotation = 0;
    this.rotate90 = 1.5708;
    this.tween = new TWEEN.Tween(this);
}

Ant.prototype.turnRight = function(newDirection){

    var newDirection = this.direction + 1;
    if(newDirection > 3){
        newDirection = 0;
    }

    this.direction = newDirection;

    this.tweenRotation(this.sprite.rotation + this.rotate90);
}

Ant.prototype.turnLeft = function(newDirection){

    var newDirection = this.direction - 1;
    if(newDirection < 0){
        newDirection = 3;
    }

    this.direction = newDirection;

    this.tweenRotation(this.sprite.rotation - this.rotate90);
}

Ant.prototype.tweenRotation = function(newRotation){
    
    this.tween.to({ tempRotation: newRotation}, antSpeed);
    this.tween.onUpdate(function() {
        this.sprite.rotation = this.tempRotation;
    });
    this.tween.start();
}


Ant.prototype.detectCells = function(){
    
    this.surroundingCells = this.detector.detectCells();
}

Ant.prototype.moveToCell = function(cell){
    this.x = cell.x;
    this.y = cell.y;  

    //this stuff is untested.
    var newX = (10 * this.x) + 5;
    var newY = (10 * this.y) + 5;
    this.tempX = this.sprite.x;
    this.tempY = this.sprite.y;

    this.tween.to({ tempX: newX, tempY: newY}, antSpeed);
    this.tween.onUpdate(function() {
        this.sprite.x = this.tempX;
        this.sprite.y = this.tempY;
    });
    this.tween.start();
}

Ant.prototype.advance = function(){

    this.detectCells();
    var behavior = this.decider.getNewBehavior(this);
    behavior.doBehavior();

    setTimeout(function(ant) {
        ant.advance();
    }, antSpeed, this);
}



// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Ant;
}