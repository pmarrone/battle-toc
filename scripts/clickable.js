clickablePolygon = {
    onInit: function (params) {
        this.polygon = params.polygon;
        this.mouseTracker = params.tracker;
        
    },
    
    update: function (delta) {
        var mousePosition = new SAT.Vector(this.currentMouseX, this.currentMouseY);
        this.hit = SAT.pointInPolygon(mousePosition, this.polygon);
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