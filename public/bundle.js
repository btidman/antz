/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var World = __webpack_require__(1);

	var world = new World(100,200);
	window.world = world;

	world.draw();

	function gameLoop(){

	    world.advance();
	    animate();
	    setTimeout(gameLoop, 50); 
	}

	gameLoop();

	//var lastLoop = new Date;
	    

	function animate () {
	    // var thisLoop = new Date;
	    // var fps = 1000 / (thisLoop - lastLoop);
	    // lastLoop = thisLoop;
	    // console.log(fps);
	    // render the root container
	    world.renderer.render(world.stage);
	    //requestAnimationFrame( animate );
	}



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var Cell = __webpack_require__(2);
	var Ant = __webpack_require__(4);

	function World(width, height){
	    this.width = width;
	    this.height = height;
	    this.background = 'FFFFFF';

	    this.renderer = PIXI.autoDetectRenderer(this.width*10, this.height*10,{backgroundColor : 0xFFFFFF});
	    this.stage = new PIXI.Container();
	    this.container = new PIXI.Container();
	    this.stage.addChild(this.container);
	    
	    this.ants = [];
	    this.cells = [];

	    for(row = 0; row < this.height; row++){
	        this.cells.push([]);
	        for (col  = 0; col < this.width; col++){
	            var cell = new Cell(col, row);
	            this.cells[row].push(cell);
	        }
	    }
	}

	World.prototype.draw = function (){
	    //Add the canvas to the HTML document
	    document.body.appendChild(this.renderer.view);
	}

	World.prototype.addAnt = function(x, y){
	    var ant = new Ant(x,y,this.cells, this.container);
	    this.ants.push(ant);
	}

	World.prototype.advance = function(){
	    for(var x = 0; x < this.ants.length; x++){
	        this.ants[x].advance();
	    }
	}

	// Export node module.
	if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
	{
	    module.exports = World;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {
	function Cell(x, y){
	    this.x = x;
	    this.y = y;
	}

	// Export node module.
	if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
	{
	    module.exports = Cell;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var Direction = __webpack_require__(5);
	var Detector = __webpack_require__(6);
	var Decider = __webpack_require__(7);
	//var MoveBehavior = require("./moveBehavior");

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

	// Export node module.
	if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
	{
	    module.exports = Ant;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {Direction = {
	    North : 0,
	    East : 1,
	    South : 2,
	    West: 3
	}

	// Export node module.
	if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
	{
	    module.exports = Direction;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {
	function Detector(cells){

	    this.cells = cells;

	    return this;
	}

	Detector.prototype.detectFrontCells = function(x, y, direction){
	    
	    var cellsToAdd = [];

	    if(direction == Direction.North){
	        cellsToAdd = this.detectCellsNorthOfLocation(x, y);
	    }
	    else if(direction == Direction.East){
	        cellsToAdd = this.detectCellsEastOfLocation(x, y);
	    }
	    else if(direction == Direction.South){
	        cellsToAdd = this.detectCellsSouthOfLocation(x, y);
	    }
	    else if(direction == Direction.West){
	        cellsToAdd = this.detectCellsWestOfLocation(x, y);
	    }

	    return this.filterUndefinedCells(cellsToAdd);
	}

	Detector.prototype.filterUndefinedCells = function(newCells){

	    var result = [];

	    for(var x = 0; x < newCells.length; x++){
	        if(newCells[x]){
	            result.push(newCells[x]);
	        }
	    }

	    return result;
	}

	Detector.prototype.detectCellsNorthOfLocation = function(x,y){
	    var result = [];
	    
	    if(y - 1 >= 0){
	        result.push(this.cells[y - 1][x - 1]);
	        result.push(this.cells[y - 1][x]);
	        result.push(this.cells[y - 1][x + 1]);
	    }

	    return result;
	}

	Detector.prototype.detectCellsSouthOfLocation = function(x,y){
	    var result = [];
	    var maxY = this.cells.length;
	    
	    if(y + 1 < maxY){
	        result.push(this.cells[y + 1][x - 1]);
	        result.push(this.cells[y + 1][x]);
	        result.push(this.cells[y + 1][x + 1]);
	    }

	    return result;
	}

	Detector.prototype.detectCellsEastOfLocation = function(x,y){
	    var result = [];
	    var maxY = this.cells.length;

	    if(y - 1 >= 0){
	        result.push(this.cells[y - 1][x + 1]);
	    }

	    result.push(this.cells[y][x + 1]);
	    
	    if(y + 1 < maxY){
	        result.push(this.cells[y + 1][x + 1]);
	    }

	    return result;
	}

	Detector.prototype.detectCellsWestOfLocation = function(x,y){
	    var result = [];
	    var maxY = this.cells.length;

	    if(y - 1 >= 0){
	        result.push(this.cells[y - 1][x - 1]);
	    }

	    result.push(this.cells[y][x - 1]);
	    
	    if(y + 1 < maxY){
	        result.push(this.cells[y + 1][x - 1]);
	    }

	    return result;
	}

	// Export node module.
	if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
	{
	    module.exports = Detector;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {
	'use strict'
	var MoveBehavior = __webpack_require__(8);

	function Decider(){

	    return this;
	}

	Decider.prototype.getNewBehavior = function(ant){

	    return new MoveBehavior(ant);
	}

	// Export node module.
	if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
	{
	    module.exports = Decider;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {function MoveBehavior(ant){
	    this.ant = ant;
	}

	MoveBehavior.prototype.doBehavior = function(){

	    if(this.ant.frontCells.length > 0){
	        var randomIndex = Math.floor((Math.random() * this.ant.frontCells.length));
	        this.ant.moveToCell(this.ant.frontCells[randomIndex]);
	    }
	}

	// Export node module.
	if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
	{
	    module.exports = MoveBehavior;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }
/******/ ]);