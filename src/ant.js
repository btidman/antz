function Ant(x, y, cells, container){
    this.x = x;
    this.y = y;
    this.direction = Direction.North;
    this.cells = cells;
    this.container = container;
    var texture = PIXI.Texture.fromImage('../ant.png');
    
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.x = 11 * this.x;
    this.sprite.y = 11 * this.y;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.rotation = 0;
    this.container.addChild(this.sprite);
    this.frontCells = [];
    this.detector = new Detector(cells);
    this.decider = new Decider();
}

Ant.prototype.turn = function(newDirection){

    this.direction = newDirection;
    this.updateSpriteRotation();
}

Ant.prototype.updateSpriteRotation = function(){
    if(this.direction == Direction.North){
        this.sprite.rotation = 0;
    }
    else if(this.direction == Direction.East){
        this.sprite.rotation = (3.14/2);
    }
    else if(this.direction == Direction.South){
        this.sprite.rotation = 3.14;
    }
    else if(this.direction == Direction.West){
        this.sprite.rotation = (3.14 * 1.5);
    }
}

Ant.prototype.detectFrontCells = function(){
    
    this.frontCells = this.detector.detectFrontCells(this.x, this.y, this.direction);
}

Ant.prototype.moveToCell = function(cell){
    this.x = cell.x;
    this.y = cell.y;
    this.sprite.x = (10 * this.x) + 5;
    this.sprite.y = (10 * this.y) + 5;
}

Ant.prototype.advance = function(){

    this.detectFrontCells();
    var behavior = this.decider.getNewBehavior(this);
    behavior.doBehavior();
}