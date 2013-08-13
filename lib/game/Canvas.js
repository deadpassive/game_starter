/*global namespace*/

var Game = namespace("Game");
var GClass = namespace("GClass");
var UIState = namespace("User.UIState");

Game.Canvas = (function() {
    
    var $this = function(canvasId) {
        this._canvas = document.getElementById(canvasId);
    
        // this.width = 500;
        // this.height = 500;
        // this.canvas.width = this.width;
        // this.canvas.height = this.height;
        this._ctx = this._canvas.getContext('2d');
        this._world = new Game.World(50);
        this._xPan = 0;
        this._yPan = 0;
        this._running = false;
        this._paused = false;
        
        this.initEvents();
        
        this.updateSize();
        
        // Set the default UI state
        this._uiState = UIState.Designate;
    };
    
    GClass.extend(Object, $this, {
        
        initEvents: function() {
            var _this = this;
            this._canvas.onmousedown = function(e) {
                _this._panning = true;
                _this._lastPanX = e.clientX;
                _this._lastPanY = e.clientY;
            };
            this._canvas.onclick = function(e) {
                var x = e.clientX;
                var y = e.clientY;
                var tile = _this._world.selectTile(x, y, _this._xPan, _this._yPan);
                if (_this._uiState) {
                    _this._uiState.tileClicked(tile);
                }
            };
            this._canvas.onmouseup = function(e) {
                _this._panning = false;
            };
            this._canvas.onmouseout = function(e) {
                _this._panning = false;
            };
            this._canvas.onmousemove = function(e) {
                var x = e.clientX;
                var y = e.clientY;
                if (_this._panning) {
                    var xDiff = x - _this._lastPanX;
                    var yDiff = y - _this._lastPanY;
                    if (xDiff !== 0 && yDiff !== 0) {
                        _this._lastPanX = x;
                        _this._lastPanY = y;
                        _this.pan(xDiff, yDiff);
                    }
                } else if (_this._uiState) {
                    _this._uiState.tileHover(_this._world.pixToTile(x, y, _this._xPan, _this._yPan));
                }
            };
            this._canvas.onmousewheel = function(e) {
                e.preventDefault();
                if (e.wheelDelta > 0) {
                    _this._world.zoomIn();
                } else {
                    _this._world.zoomOut();
                }
            };
            window.onresize = function() {
                _this.updateSize();
            };
            window.onkeypress = function() {
                // TODO: pause on space bar
                _this.togglePause();
            };
        },
        
        togglePause: function() {
            this._paused = !this._paused;
        },
        
        updateSize: function() {
            this._canvas.width = $(window).width();
            this._canvas.height = $(window).height();
        },
        
        clearCanvas: function() {
            this._ctx.fillStyle = '#d0e7f9';
            // this._ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this._ctx.beginPath();
            this._ctx.rect(0, 0, this._canvas.width, this._canvas.height);
            this._ctx.closePath();
            this._ctx.fill();
        },
        
        start: function() {
            if (!this._running) {
                this._running = true;
                this.renderLoop();
                this.gameStep();
            }
        },
        
        renderLoop: function() {
            this.draw();
            var _this = this;
            window.requestAnimationFrame(function() {
                _this.renderLoop();
            });
        },
        
        gameStep: function() {
            // TODO: use a delta to regulate FPS
            if (!this._paused) {
                this.update();
            }
            var _this = this;
            var FPS = 60;
            setTimeout(function() {
                _this.gameStep();
            }, 1000/FPS);
        },
        
        draw: function() {
            this.clearCanvas();
            this._world.draw(this._ctx, this._xPan, this._yPan);
            this._uiState.draw(this._ctx, this._xPan, this._yPan, this._world.tileSize);
        },
        
        update: function() {
            this._world.update();
        },
        
        pan: function(xMov, yMov) {
            this._xPan += xMov;
            this._yPan += yMov;
        }
    });
    
    return $this;
})();

