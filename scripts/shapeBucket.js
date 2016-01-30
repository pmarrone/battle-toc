var shapeBucket = [
    function (context) {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    },
    function (context) { 
        context.fillStyle = 'red';
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(100,50);
        context.lineTo(50, 100);
        context.lineTo(0, 90);
        context.closePath();
        context.fill();
    }
];