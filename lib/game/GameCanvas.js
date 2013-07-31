/*global Utils namespace*/

var game = namespace("Game");

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
    this.running = false;
    this.paused = false;
    
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
    this.canvas.onclick = function(e) {
        var x = e.clientX;
        var y = e.clientY;
        _this.world.selectTile(x, y, _this.xPan, _this.yPan);
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
            if (xDiff !== 0 && yDiff !== 0) {
                _this.lastPanX = e.clientX;
                _this.lastPanY = e.clientY;
                _this.pan(xDiff, yDiff);
            }
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
    window.onkeypress = function() {
        // TODO: pause on space bar
        _this.togglePause();
    };
};

game.GameCanvas.prototype.togglePause = function() {
    this.paused = !this.paused;
}

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
    if (!this.running) {
        this.running = true;
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
    if (!this.paused) {
        this.update();
    }
    var _this = this;
    var FPS = 60;
    setTimeout(function() {
        _this.gameStep();
    }, 1000/FPS);
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