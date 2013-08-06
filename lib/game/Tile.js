/*global namespace*/

var Game = namespace("Game");
var GClass = namespace("GClass");

Game.Tile = (function() {
    var $this = function(x, y) {
        this.x = x;
        this.y = y;
        this.inView = false;
        this.explored = false;
    };
    
    GClass.extend(Object, $this, {
        
        draw: function(ctx, xOffset, yOffset, tileSize) {
            var originX = (this.x * tileSize) + xOffset;
            var originY = (this.y * tileSize) + yOffset;
            
            ctx.beginPath();
            ctx.rect(originX, originY, tileSize, tileSize);
            ctx.fillStyle = !this.explored ? "grey" : (this.inView ? "yellow" : "#808000");
            ctx.fill();
            // if (!this.selected) {
            //     ctx.lineWidth = 1;
            //     ctx.strokeStyle = 'black';
            //     ctx.stroke();
            // }
        },
        
        drawSelected: function(ctx, xOffset, yOffset, tileSize) {
            if (this.selected) {
                var originX = (this.x * tileSize) + xOffset;
                var originY = (this.y * tileSize) + yOffset;
            
                ctx.beginPath();
                ctx.rect(originX, originY, tileSize, tileSize);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'green';
                ctx.stroke();
            }
        },
        
        toString: function() {
            return "Tile[" + this.x + "," + this.y + "]";
        },
        
        straightLineDistance: function(end) {
            var xDiff = this.x - end.x;
            var yDiff = this.y - end.y;
            var dist = Math.sqrt(xDiff*xDiff + yDiff*yDiff);
            return dist;
        },
        
        actualDistance: function( end) {
            var xDiff = Math.abs(this.x - end.x);
            var yDiff = Math.abs(this.y - end.y);
            var dist = Math.max(xDiff, yDiff);
            return dist;
        },
        
        manhattanDistance: function(end) {
            var xDiff = Math.abs(this.x - end.x);
            var yDiff = Math.abs(this.y - end.y);
            var dist = xDiff + yDiff;
            return dist;
        }
    });
    
    return $this;
})();

