var levels = [
    { 
        player1: [{
            isClickable: true,
            player: 'player1', x: 100, y: 100, width: 200, height: 200,
            draw: function (context) {
                context.fillStyle = 'red';
                context.fillRect(this.x, this.y, this.width, this.height);                
            }
        }],
        player2: [{
            isClickable: true,
            player: 'player2', x: 800, y: 100, width: 200, height: 200,
            draw: function (context) {
                context.fillStyle = 'blue';
                context.fillRect(this.x, this.y, this.width, this.height);
            }
        }]
    },
    { 
        player1: [{
            isClickable: true,
            player: 'player1', x: 100, y: 150, width: 10, height: 10,
            draw: function (context) {
                context.fillStyle = 'red';
                context.fillRect(this.x, this.y, this.width, this.height);                
            }
        }],
        player2: [{
            isClickable: true,
            player: 'player2', x: 800, y: 600, width: 20, height: 20,
            draw: function (context) {
                context.fillStyle = 'blue';
                context.fillRect(this.x, this.y, this.width, this.height);
            }
        }]
    }
];