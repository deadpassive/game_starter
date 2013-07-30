/*global Utils namespace*/

var game = namespace("Game");

// // shim layer with setTimeout fallback
// window.requestAnimFrame = (function(){
//   return  window.requestAnimationFrame       ||
//           window.webkitRequestAnimationFrame ||
//           window.mozRequestAnimationFrame    ||
//           function( callback ){
//             window.setTimeout(callback, 1000 / 60);
//           };
// })();

game.GameCanvas = function(canvasId) {
    this.canvas = document.getElementById(canvasId);
    
    // this.width = 500;
    // this.height = 500;
    // this.canvas.width = this.width;
    // this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');
    this.world = new game.World(50);
    this.xPan = 0;
    this.yPan = 0;
    this.started = false;
    
    this.initEvents();
    
    this.updateSize();
};

game.GameCanvas.prototype.initEvents = function() {
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
    window.onresize = function() {
        _this.updateSize();
    };
};

game.GameCanvas.prototype.updateSize = function() {
    this.canvas.width = $(window).width();
    this.canvas.height = $(window).height();
};

game.GameCanvas.prototype.clearCanvas = function() {
    this.ctx.fillStyle = '#d0e7f9';
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.closePath();
    this.ctx.fill();
};

game.GameCanvas.prototype.start = function() {
    if (!this.started) {
        this.started = true;
        this.renderLoop();
        this.gameStep();
    }
};

game.GameCanvas.prototype.renderLoop = function() {
    this.draw();
    var _this = this;
    window.requestAnimationFrame(function() {
        _this.renderLoop();
    });
};

game.GameCanvas.prototype.gameStep = function() {
    // TODO: use a delta to regulate FPS
    this.update();
    var _this = this;
    var FPS = 60;
    setTimeout(function() {
        _this.gameStep();
    }, FPS);
};

game.GameCanvas.prototype.draw = function() {
    this.clearCanvas();
    this.world.draw(this.ctx, this.xPan, this.yPan);
};

game.GameCanvas.prototype.update = function() {
    this.world.update();
};

game.GameCanvas.prototype.pan = function(xMov, yMov) {
    this.xPan += xMov;
    this.yPan += yMov;
};