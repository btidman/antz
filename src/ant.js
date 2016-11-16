function Ant(x, y, cells, container){
    this.x = x;
    this.y = y;
    this.direction = 0;
    this.cells = cells;
    this.container = container;
    var texture = PIXI.Texture.fromImage('../ant.png');
    
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.x = 11 * this.x;
    this.sprite.y = 11 * this.y;
    this.sprite.rotation = 0;
    this.container.addChild(this.sprite);
    this.frontCells = [];
    this.detector = new Detector(cells);
}

Ant.prototype.updateSpriteRotation = function(){
    if(this.direction == 0){
        this.sprite.rotation = 0;
    }
    else if(this.direction == 1){
        this.sprite.rotation = (3.14/2);
    }
    else if(this.direction == 2){
        this.sprite.rotation = 3.14;
    }
    else if(this.direction == 3){
        this.sprite.rotation = (3.14 * 1.5);
    }
}

Ant.prototype.detectFrontCells = function(){
    
    this.frontCells = this.detector.detectFrontCells(this.x, this.y, this.direction);
}
