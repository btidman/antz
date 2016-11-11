function Ant(x, y, container){
    this.x = x;
    this.y = y;
    this.container = container;
    var texture = PIXI.Texture.fromImage('../ant.png');
    
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.x = 11 * this.x;
    this.sprite.y = 11 * this.y;
    this.container.addChild(this.sprite);
}