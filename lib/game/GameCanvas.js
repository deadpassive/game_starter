/*global Utils namespace*/

var game = namespace("Game");

game.GameCanvas = function(canvasId) {
    this.canvas = document.getElementById(canvasId);
    
    this.width = 500;
    this.height = 500;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');
    this.world = new game.World(20);
    this.xPan = 0;
    this.yPan = 0;
    
    this.initMouseEvents();
};

game.GameCanvas.prototype.initMouseEvents = function() {
    var _this = this;
    this.canvas.onmousedown = function(e) {
        _this.panning = true;
        _this.lastPanX = e.clientX;
        _this.lastPanY = e.clientY;
    };
    this.canvas.onmouseup = function(e) {
        _this.panning = false;
    };
    this.canvas.onmouseout = function(e) {
        _this.panning = false;
    };
    this.canvas.onmousemove = function(e) {
        if (_this.panning) {
            var xDiff = e.clientX - _this.lastPanX;
            var yDiff = e.clientY - _this.lastPanY;
            _this.lastPanX = e.clientX;
            _this.lastPanY = e.clientY;
            _this.pan(xDiff, yDiff);
        }
    };
    this.canvas.onmousewheel = function(e) {
        e.preventDefault();
        if (e.wheelDelta > 0) {
            _this.world.zoomIn();
        } else {
            _this.world.zoomOut();
        }
    };
};

game.GameCanvas.prototype.clearCanvas = function() {
    this.ctx.fillStyle = '#d0e7f9';
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, this.height);
    this.ctx.closePath();
    this.ctx.fill();
};

game.GameCanvas.prototype.gameLoop = function(){
    this.update();
    this.draw();

    // make sure 'this' references the object, not the window
    var _this = this;
	this.gLoop = setTimeout(function() {
        _this.gameLoop();
    }, 1000 / 50);
};

game.GameCanvas.prototype.draw = function() {
    this.clearCanvas();
    this.world.draw(this.ctx, this.xPan, this.yPan);
};

game.GameCanvas.prototype.update = function() {
    this.world.update();
};

game.GameCanvas.prototype.start = function() {
    this.gameLoop();
};

game.GameCanvas.prototype.pan = function(xMov, yMov) {
    this.xPan += xMov;
    this.yPan += yMov;
};