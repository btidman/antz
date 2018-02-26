
function Cell(x, y, container){
    this.x = x;
    this.y = y;
    this.food = 0;
    this.container = container;
    this.pheromone = 0;
    this.isObsticle = false;

    this.sprite = null; 
}

Cell.prototype.addFood = function(amountOfFood){
    this.food += amountOfFood;
    if(this.food > 0){
        this.container.removeChild(this.sprite);
        this.sprite = new PIXI.Sprite(FOOD_TEXTURE);
        this.sprite.x = (10 * this.x);
        this.sprite.y = (10 * this.y);
        this.sprite.renderable = true;
        this.container.addChild(this.sprite);
    }else {
        this.container.removeChild(this.sprite);
    }
}

Cell.prototype.addNest = function(nest){
    this.nest = nest;
    this.container.removeChild(this.sprite);
    this.sprite = new PIXI.Sprite(NEST_TEXTURE);
    this.sprite.x = (10 * this.x);
    this.sprite.y = (10 * this.y);
    this.sprite.renderable = true;
    
    this.container.addChild(this.sprite);
}

Cell.prototype.addPheromone = function(pheromoneAmount){
    if(pheromoneAmount > 4){
        pheromoneAmount = 4;
    }

    if(!this.nest && !this.food){
        
        this.pheromone += pheromoneAmount;
        if(this.pheromone > 4){
           this.pheromone = 4;
        }
        
        if(window.showPheromone){
            if(!this.sprite || this.sprite.texture != PHEROMONE_TEXTURE){
                this.container.removeChild(this.sprite);
                this.sprite = new PIXI.Sprite(PHEROMONE_TEXTURE);
            
                this.sprite.x = (10 * this.x);
                this.sprite.y = (10 * this.y);
            }
            this.sprite.renderable = true;
            var alpha = +(this.pheromone/4).toFixed(2);
            if(alpha >= 1){
                alpha = .99
            }
            this.sprite.alpha = alpha;
            
            if(this.container.children.indexOf(this.sprite) == -1){
                this.container.addChildAt(this.sprite, 0);
            }
        }
    }
}

Cell.prototype.advance = function(){
    if(this.pheromone > 0){
        this.pheromone = +(this.pheromone - .1).toFixed(2);
        if(this.pheromone < 0){
            this.pheromone = 0;
        }
        if(window.showPheromone){
            var alpha = +(this.pheromone/4).toFixed(2);
            if(alpha >= 1){
                alpha = .99
            }
            this.sprite.alpha = alpha;
        }
    }
    else if(this.sprite && this.container.children.indexOf(this.sprite) != -1 && this.sprite.texture === PHEROMONE_TEXTURE){
        this.container.removeChild(this.sprite);
        
    }
}

Cell.prototype.addObsticle = function(){
    this.isObsticle = true;

    this.container.removeChild(this.sprite);
    this.sprite = new PIXI.Sprite(OBSTICLE_TEXTURE);
    this.sprite.x = (10 * this.x);
    this.sprite.y = (10 * this.y);
    this.sprite.renderable = true;
    this.container.addChild(this.sprite);
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Cell;
}