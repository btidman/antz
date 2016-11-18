
function Cell(x, y, container){
    this.x = x;
    this.y = y;
    this.food = 0;
    this.container = container;

    this.sprite = new PIXI.Sprite(FOOD_TEXTURE);
    this.sprite.x = (10 * this.x);
    this.sprite.y = (10 * this.y);
    this.sprite.renderable = false;
    this.container.addChild(this.sprite);
}

Cell.prototype.addFood = function(amountOfFood){
    this.food = amountOfFood;
    if(this.food > 0){
        this.sprite.renderable = true;
    }
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Cell;
}