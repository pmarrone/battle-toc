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
        
        function getOtherColor() {
            if (typeof otherColor === 'string') {
                return otherColor;
            }
            return otherColor[parseInt(Math.random() * otherColor.length)];
        }
        
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
                    draw: function (isTrueBlock, otherColor) {
                        return function (context) {
                            context.fillStyle = isTrueBlock ? /*'rgba(255,0,0,'+ this.alpha +')'*/ trueBlockColor : otherColor;
                            context.fillRect(this.x, this.y, this.width, this.height);
                        };
                    }(isTrueBlock, getOtherColor())
                };
                blocks.push(block);
            }
        }
        return blocks;
    }
    
    function addGridLevel(params) {
        var number = params.number || 1;
        var trueBlockColor1 = params.trueBlockColor1 || 'blue';
        var otherColor1 = params.otherColor1 || 'red';
        var trueBlockColor2 = params.trueBlockColor2 || 'red';
        var otherColor2 = params.otherColor2 || 'blue';

        return {
            player1: function () {
            return createGridLevel(0, jsGFwk.settings.width / 2, jsGFwk.settings.height, number, 20, 'player1',  trueBlockColor1, otherColor1, 50);
            },
            player2: function () {
                return createGridLevel(jsGFwk.settings.width / 2, jsGFwk.settings.width / 2, jsGFwk.settings.height, number, 20, 'player2', trueBlockColor2, otherColor2, 50);
            },
            player1target: function (context) {
                context.fillStyle = trueBlockColor1;
                context.fillRect(10, jsGFwk.settings.height - 50, 30, 30);
            },
            player2target: function (context) {
                context.fillStyle = trueBlockColor2;
                context.fillRect(jsGFwk.settings.width - 40, 50, 30, 30);
            }
        };
    }
    
    
    levels = [    ]; 
    for (var i = 1; i <= 7; i++) {
        levels.push(addGridLevel({number: i}));    
    }
    
    var otherReds = ['rgb(200, 0, 0 )', 'rgb(230, 40, 0 )', 'rgb(150, 30, 20 )', 'rgb(100, 20, 60 )'];
    var otherBlues = ['rgb(0, 0, 210 )', 'rgb(0, 40, 200 )', 'rgb(50, 50, 200 )', 'rgb(60, 60, 150 )'];
    var otherColor1 = ['red'];
    var otherColor2 = ['blue'];
    
    for (i = 3; i <= 8; i++) {
        levels.push(addGridLevel({number: i, trueBlockColor1: 'rgb(230, 40, 80 )', trueBlockColor2: 'rgb(80, 80, 210 )', otherColor1: otherColor1.slice(), otherColor2: otherColor2.slice()}));
        if (otherReds.length > 0) {
            otherColor1.push(otherReds.shift());  
        }
        if (otherBlues.length > 0) {
            otherColor2.push(otherBlues.shift());
        }
    }
       
}());
