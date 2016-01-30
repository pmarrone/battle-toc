polygon = {
    id: 'pepe',
    visible: true,
    init: function () {
        
        this.polygon = new SAT.Polygon(new SAT.Vector(), [
            new SAT.Vector(0,0),
            new SAT.Vector(100,50),
            new SAT.Vector(50, 100),
            new SAT.Vector(0, 90)
        ]);
        
        
        var self = this;
        this.mouseMoveId = jsGFwk.IO.mouse.registerMove(function (coord) {			
            self.currentMouseX = coord.x;
            self.currentMouseY = coord.y;
        });
    },
    
    update: function (delta) {
        var mousePosition = new SAT.Vector(this.currentMouseX, this.currentMouseY);
        this.hit = SAT.pointInPolygon(mousePosition, this.polygon)
    },
    draw: function (context) {
        context.fillStyle = this.hit ? '#f00' : '#0f0';
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(100,50);
        context.lineTo(50, 100);
        context.lineTo(0, 90);
        context.closePath();
        context.fill();
        context.fillStyle = 'black';
        context.fillText(this.currentMouseX + ', ' + this.currentMouseY, 10, 10);
    }
}