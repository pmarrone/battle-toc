/*global levelController*/

var levels = [
    { 
        player1: function () {
            return [{
                isClickable: true,
                player: 'player1', x: 100, y: 100, width: 200, height: 200,
                clickAction: function () {
                    levelController.updateGame(this.belongToPlayer);
                },
                draw: function (context) {
                    context.fillStyle = 'red';
                    context.fillRect(this.x, this.y, this.width, this.height);
                }
            }]; 
        },

        player2: function () {
            return [{
                isClickable: true,
                player: 'player2', x: 800, y: 100, width: 200, height: 200,
                draw: function (context) {
                    context.fillStyle = 'blue';
                    context.fillRect(this.x, this.y, this.width, this.height);
                }
            }];
        }
    },
    { 
        player1: function () {
            return [{
                isClickable: true,
                player: 'player1', x: 100, y: 100, width: 100, height: 100,
                clickAction: function () {
                    levelController.updateGame(this.belongToPlayer);
                },
                draw: function (context) {
                    context.fillStyle = 'red';
                    context.fillRect(this.x, this.y, this.width, this.height);
                }
            }, {
                isClickable: true,
                x: 100,
                y: 500,
                player: 'player1',
                width: 100,
                height: 100,
                clickAction: function() {
                    levelController.penalizePlayer(this.belongToPlayer);
                },
                draw: function (context) {
                    context.fillStyle = 'green';
                    context.fillRect(this.x, this.y, this.width, this.height);
                }
            }]; 
        },

        player2: function () {
            return [{
                isClickable: true,
                clickAction: function () {
                    levelController.updateGame(this.belongToPlayer);
                },
                player: 'player2', x: 800, y: 100, width: 200, height: 200,
                draw: function (context) {
                    context.fillStyle = 'blue';
                    context.fillRect(this.x, this.y, this.width, this.height);
                }
            }];
        }
    }

];