/*global namespace*/

var UIState = namespace("User.UIState");
var GClass = namespace("GClass");

UIState.Designate = {
    started: false,
    startTile: null,
    endTile: null,
    
    tileClicked: function(tile) {
        if (!this.started) {
            this.started = true;
            this.startTile = tile;
        } else {
            this.started = false;
            // TODO: (jonb) finish creation of designation
        }
    },
    
    tileHover: function(tile) {
        this.endTile = tile;
    },
    
    draw: function(ctx, xOffset, yOffset, tileSize) {
        if (this.startTile && this.endTile && this.started) {
            var startX = Math.min(this.startTile.x, this.endTile.x);
            var endX = Math.max(this.startTile.x, this.endTile.x);
            var startY = Math.min(this.startTile.y, this.endTile.y);
            var endY = Math.max(this.startTile.y, this.endTile.y);
            
            var leftPix = (tileSize * startX) + xOffset;
            var topPix = (tileSize * startY) + yOffset;
            var width = (endX - startX + 1) * tileSize;
            var height = (endY - startY + 1) * tileSize;
            
            ctx.beginPath();
            ctx.rect(leftPix, topPix, width, height);
            ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgb(0, 0, 200)';
            ctx.stroke();
        }
    },
    
    leaveState: function() {
        this.started = false;
    }
};