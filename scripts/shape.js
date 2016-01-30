var shape = {
    onInit: function (params) {
        var self = this;
        
        this.x = 100;
        this.y = 200;
        this.width = 30;
        this.height = 40;
        this.belongToPlayer = 'player1';//params.player;
        this.drawingPolygon = params.drawingPolygonFunction;
        
        this.clickId = jsGFwk.IO.mouse.registerClick(function (coord) {
            var fakeMouse = {x: coord.x, y: coord.y, width: 1, height: 1 };
            
            if (jsGFwk.Collisions.areCollidingBy(self, fakeMouse, jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                jsGFwk.IO.mouse.unregisterClick(self.clickId);
                levelController.updateGame(self.belongToPlayer);
                self.destroy();
            }
        });
    },
    onUpdate: function (delta) {
        /*var mousePosition = new SAT.Vector(this.currentMouseX, this.currentMouseY);
        this.hit = SAT.pointInPolygon(mousePosition, this.polygon);*/
    },
    onDraw: function (context) {
        this.drawingPolygon.call(this, context);
    }
}