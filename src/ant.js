var Direction = require("./directionEnum");
var Detector = require("./detector");
var Decider = require("./decider");
var TWEEN = require('tween.js');

function Ant(x, y, cells, nest, container){
    this.x = x;
    this.y = y;
    this.nest = nest;
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
    this.rotate90 = Math.PI/2;
    this.tween = new TWEEN.Tween(this);
    this.stepsTowardNest = 0;
    this.status = "alive";
    this.steps = 0;
}

Ant.prototype.turnRight = function(newDirection){

    this.direction++; 
    if(this.direction > 3){
        this.direction = 0;
    }

    this.tweenRotation(this.sprite.rotation + this.rotate90);
}

Ant.prototype.turnLeft = function(){

    this.direction--;
    if(this.direction < 0){
        this.direction = 3;
    }

    this.tweenRotation(this.sprite.rotation - this.rotate90);
}

Ant.prototype.tweenRotation = function(newRotation){
    
    this.sprite.rotation = newRotation;
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
        if(ant.status === "alive"){
            ant.advance();
        }
        else{
            console.log("dead");
        }
    }, antSpeed, this);
}

Ant.prototype.death = function(){
    this.status = "death";
    this.container.removeChild(this.sprite);
    this.nest.ants = this.nest.ants.filter(function(ant){
        return ant.status === "alive";
    });
}


// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Ant;
}