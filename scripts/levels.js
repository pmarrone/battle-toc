/*global levelController, clickActions, jsGFwk */

var levels;

(function () {
    
    function createGridLevel(xOffset, width, height, number, gutter, player, trueBlockColor, otherColor, margins) {
        if (typeof xOffset === 'object') {
            var params = xOffset;
            xOffset = params.xOffset;
            width = params.width;
            height = params.height;
            number = params.number;
            gutter = params.gutter;
            player = params.player;
            trueBlockColor = params.trueBlockColor;
            otherColor = params.otherColor;
            margins = params.margins;
        }
        margins = margins || 0;
        
        var blocks = [];
        var blockWidth = ((width - 2 * margins) / number) - gutter;
        var blockHeight = ((height - 2 * margins) / number) - gutter;
        var trueBlock = parseInt(Math.random() * number * number); 
        for (var i = 0; i < number; i ++) {
            for (var j = 0; j < number; j++) {
                var isTrueBlock = (i * number + j === trueBlock);
                
                var block = {
                    isClickable: true,
                    player: player,
                    x: xOffset + margins + gutter / 2 + (gutter + blockWidth) * i,
                    y: margins + gutter / 2 + (gutter + blockHeight) * j,
                    width: blockWidth,
                    height: blockHeight,
                    clickAction: isTrueBlock ? clickActions.updateGame : clickActions.penalizePlayer,
                    //FIXME
                    draw: function (isTrueBlock) {
                        return function (context) {
                            context.fillStyle = isTrueBlock ? trueBlockColor : otherColor;
                            context.fillRect(this.x, this.y, this.width, this.height);
                        };
                    }(isTrueBlock)
                };
                blocks.push(block);
            }
        }
        return blocks;
    }
    
    function addGridLevel(params) {
        var number = params.number || 1;
        var trueBlockColor1 = params.trueBlockColor || 'blue';
        var otherColor1 = params.otherColor || 'red';
        var trueBlockColor2 = params.trueBlockColor || 'red';
        var therColor2 = params.otherColor || 'blue';

        return {
            player1: function () {
            return createGridLevel(0, jsGFwk.settings.width / 2, jsGFwk.settings.height, number, 20, 'player1',  trueBlockColor1, otherColor1, 50);
            },
            player2: function () {
                return createGridLevel(jsGFwk.settings.width / 2, jsGFwk.settings.width / 2, jsGFwk.settings.height, number, 20, 'player2', trueBlockColor1, otherColor1, 50);
            }    
        };
    }
    
    
    levels = [
        {
            player1: function () {
                return createGridLevel(0, jsGFwk.settings.width / 2, jsGFwk.settings.height, 2, 20, 'player1', 'red', 'blue', 50);
            },
            player2: function () {
                return createGridLevel(jsGFwk.settings.width / 2, jsGFwk.settings.width / 2, jsGFwk.settings.height, 2, 20, 'player2', 'blue', 'red', 50);
            }
        },
        {
            player1: function () {
                return createGridLevel(0, jsGFwk.settings.width / 2, jsGFwk.settings.height, 3, 20, 'player1', 'red', 'blue', 50);
            },
            player2: function () {
                return createGridLevel(jsGFwk.settings.width / 2, jsGFwk.settings.width / 2, jsGFwk.settings.height, 3, 20, 'player2', 'blue', 'red', 50);
            }
        },
        {
            player1: function () {
                return createGridLevel(0, jsGFwk.settings.width / 2, jsGFwk.settings.height, 4, 20, 'player1', 'red', 'blue', 50);
            },
            player2: function () {
                return createGridLevel(jsGFwk.settings.width / 2, jsGFwk.settings.width / 2, jsGFwk.settings.height, 4, 20, 'player2', 'blue', 'red', 50);
            }
        },
        {
            player1: function () {
                return createGridLevel(0, jsGFwk.settings.width / 2, jsGFwk.settings.height, 5, 20, 'player1', 'red', 'blue', 50);
            },
            player2: function () {
                return createGridLevel(jsGFwk.settings.width / 2, jsGFwk.settings.width / 2, jsGFwk.settings.height, 5, 20, 'player2', 'blue', 'red', 50);
            }
        },
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
    
}());
