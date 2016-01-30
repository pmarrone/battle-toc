/*global levelController, jsGFwk*/

var clickActions = {
    updateGame: function () {
        levelController.updateGame(this.belongToPlayer);
    },
    penalizePlayer: function() {
        levelController.penalizePlayer(this.belongToPlayer);
    },
};

var shape = {
    onInit: function (params) {
        var self = this;
        this.x = params.x;
        this.y = params.y;
        this.width = params.width;
        this.height = params.height;
        this.belongToPlayer = params.player;
        this.drawPointer = params.draw;
        this.clickAction = params.clickAction || clickActions.updateGame;
        this.alpha = 1;
        this.direction = -0.1;
        this.update = params.update || function () {};
        
        if (params.isClickable) {
            this.touchId = jsGFwk.IO.touch.registerTouch(function (coord) {
                var fakeMouse = {x: coord.x, y: coord.y, width: 1, height: 1 };
                if (jsGFwk.Collisions.areCollidingBy(self, fakeMouse, jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                    return self.clickAction();
                }
            });
            
            this.clickId = jsGFwk.IO.mouse.registerClick(function (coord) {
                var fakeMouse = {x: coord.x, y: coord.y, width: 1, height: 1 };
                if (jsGFwk.Collisions.areCollidingBy(self, fakeMouse, jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                    return self.clickAction();
                }
            });
        }
    },
    onUpdate: function (delta) {
        this.update(delta);
        /*var mousePosition = new SAT.Vector(this.currentMouseX, this.currentMouseY);
        this.hit = SAT.pointInPolygon(mousePosition, this.polygon);*/
        //this.alpha += this.direction;
        //this.direction *= this.alpha <= 0 || this.alpha >= 1 ? -1 : 1; 
    },
    onDraw: function (context) {
        this.drawPointer.call(this, context);
    }
};

