/*global levelController, clickActions, jsGFwk */

    
/**
 Niveles habilitados
*/
var levelsEnabled = {
    colors1: true,
    colors2: true,
    fade: true,
    shapes: true,
    shapesColor: true,
    shapesColorFading: true
};

var levels;

var parseColor = function (color) {
    color.a = color.a || 1;
    return "rgba(" + parseInt(color.r) + ", " + parseInt(color.g) + ", " + parseInt(color.b) + ", " + color.a + ")";
};

function getRandomColorFromArray(colorArray, max) {
    if (Array.isArray(colorArray)) {
        return parseColor(colorArray[parseInt(Math.random() * Math.min(max || colorArray.length, colorArray.length))]);
    }
    return parseColor(colorArray);
}

var drawingFunctions = {
    drawSquare: function(context) {
        context.fillStyle = this.isTrueBlock ? parseColor(this.trueBlockColor) : parseColor(this.otherColor);
        context.fillRect(this.x, this.y, this.width, this.height);
    },
    
    drawTriangle: function(context) {
        var height = this.height * (Math.sqrt(3)/2);
        context.fillStyle = this.isTrueBlock ? parseColor(this.trueBlockColor) : getRandomColorFromArray(this.otherColor);
        context.beginPath();
        context.moveTo(this.x, this.y + height);
        context.lineTo(this.x + this.width / 2, this.y);
        context.lineTo(this.x + this.width, this.y + height);
        context.lineTo(this.x, this.y + height);
        context.fill();
        context.closePath();
    },
    
    drawCircle: function (context) {
      var centerX = this.x + this.width / 2;
      var centerY = this.y + this.height / 2;
      var radius = Math.min(this.width, this.height) / 2;

        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.isTrueBlock ? parseColor(this.trueBlockColor) : getRandomColorFromArray(this.otherColor);
        context.fill();
        context.closePath();
    },
    
    drawStar: function (context) {
        var i, angle, radius;
        var radius1 = this.width / 2;
        var radius2 = radius1 * 0.4;
        var points = 5;
        var alpha0 = 0;
        if (radius2 !== radius1) {
            points = 2 * points;
        }
        
        context.beginPath();
        
        for (i = 0; i <= points; i++) {
            angle = i * 2 * Math.PI / points - Math.PI / 2 + alpha0;
            radius = i % 2 === 0 ? radius1 : radius2;
            context.lineTo(this.x + this.width / 2 + radius * Math.cos(angle), this.y + this.height / 2 + radius * Math.sin(angle));
        }
        context.fillStyle = this.isTrueBlock ? parseColor(this.trueBlockColor) : getRandomColorFromArray(this.otherColor);
        context.fill();
        context.closePath();
    },
    
    drawShapes: function (trueDrawingFunction, othersDrawingFunctions, maxOthers) {
        var draw = function (context) {
            if (this.isTrueBlock) {
                this.drawPointer = trueDrawingFunction;
            } else {
                this.drawPointer = othersDrawingFunctions[parseInt(Math.random() * maxOthers)];
            }
            this.drawPointer.call(this, context);
        };
        return draw;
    },
    
    drawColorShapes: function (trueDrawingFunction, othersDrawingFunctions, maxOthers, maxColors) {
        var draw = function (context) {
            if (Array.isArray(this.listOfOriginalVectorsOfColors)) {
                //Incluir el trueBlockColor
                this.listOfOriginalVectorsOfColors = [this.trueBlockColor].concat(this.listOfOriginalVectorsOfColors);
                this.otherColor = this.listOfOriginalVectorsOfColors[parseInt(Math.random() * Math.min(this.listOfOriginalVectorsOfColors.length, maxColors))];
            }
            
            if (this.isTrueBlock) {
                this.drawPointer = trueDrawingFunction;
            } else {
                this.othersDrawingFunctions = othersDrawingFunctions.slice();
                if (this.trueBlockColor !== this.otherColor) {
                    this.othersDrawingFunctions = [trueDrawingFunction].concat(this.othersDrawingFunctions);
                }                
                this.drawPointer = this.othersDrawingFunctions[parseInt(Math.random() * Math.min(this.othersDrawingFunctions.length, maxOthers))];
            }
            this.drawPointer.call(this, context);
        };
        return draw;
    }
};

(function () {
    
    function createGridLevel(xOffset, width, height, number, gutter, player, trueBlockColor, otherColor, margins, updateModifiers, draw, colorChange) {
        if (typeof xOffset === 'object') {
            var params = xOffset;
            xOffset = params.xOffset;
            width = params.width;
            height = params.height;
            number = params.number;
            gutter = params.gutter;
            player = params.player;
            colorChange = params.colorChange;
            trueBlockColor = params.trueBlockColor;
            otherColor = params.otherColor;
            margins = params.margins;        
            updateModifiers = params.updateModifiers;
        }
        colorChange = colorChange || 0;
        margins = margins || 0;
        
        var blocks = [];
        var blockWidth = ((width - 2 * margins) / number) - gutter;
        var blockHeight = ((height - 2 * margins) / number) - gutter;
        var trueBlock = parseInt(Math.random() * number * number);
        
        function getOtherColor() {
            if (Array.isArray(otherColor)) {
                return otherColor[parseInt(Math.random() * otherColor.length)];
            }
            return otherColor;
        }
        
        for (var i = 0; i < number; i ++) {
            for (var j = 0; j < number; j++) {
                var isTrueBlock = (i * number + j === trueBlock);
                
                var block = {
                    updateModifiers: updateModifiers || [],
                    trueBlockColor: trueBlockColor,
                    listOfOriginalVectorsOfColors: Array.isArray(otherColor) ? otherColor.slice() : [otherColor],
                    otherColor: getOtherColor(),
                    isClickable: true,
                    player: player,
                    x: xOffset + margins + gutter / 2 + (gutter + blockWidth) * i,
                    y: margins + gutter / 2 + (gutter + blockHeight) * j,
                    width: blockWidth,
                    height: blockHeight,
                    isTrueBlock: isTrueBlock,
                    clickAction: isTrueBlock ? clickActions.updateGame : clickActions.penalizePlayer,
                    draw: draw || drawingFunctions.drawSquare
                };
                blocks.push(block);
            }
        }
        return blocks;
    }

    
    function addGridLevel(params) {
        var i = 0;
        
        var number = params.number || 1;
        var trueBlockColor1 = params.trueBlockColor1 || {r: 53, g: 156, b: 239};
        var otherColor1 = params.otherColor1 || {r: 244, g: 138, b: 42};
        var trueBlockColor2 = params.trueBlockColor2 || {r: 244, g: 138, b: 42};
        var otherColor2 = params.otherColor2 || {r: 53, g: 156, b: 239};
        var updateModifiers = params.updateModifiers;
        var draw = params.draw;

        return {
            player1: function () {
                return createGridLevel(0, jsGFwk.settings.width / 2, jsGFwk.settings.height, number, 5, 'player1',  trueBlockColor1, otherColor1, 50, updateModifiers, draw);
            },
            player2: function () {
                return createGridLevel(jsGFwk.settings.width / 2, jsGFwk.settings.width / 2, jsGFwk.settings.height, number, 5, 'player2', trueBlockColor2, otherColor2, 50, updateModifiers, draw);
            }
        };
    }
    
    
    levels = []; 
    if (levelsEnabled.colors1) {
        for (i = 2; i <= 8; i++) {
            levels.push(addGridLevel({number: parseInt(i)}));    
        }
    }
    
    var otherReds = [{r: 170, g: 77, b: 7}, {r: 221, g: 100, b: 10}];
    var otherBlues = [{r: 43, g: 124, b: 178}, {r: 8, g: 62, b: 99}];
    var otherColor1 = [{r: 244, g: 138, b: 42}];
    var otherColor2 = [{r: 53, g: 156, b: 239}];
    var trueBlockColor1 = {r: 209, g: 126, b: 70};
    var trueBlockColor2 = {r: 146, g: 190, b: 214};
    var isModule;
    if (levelsEnabled.colors2) {
        for (i = 5; i <= 14; i++) {
            
            levels.push(addGridLevel({number: parseInt(i / 2), trueBlockColor1: trueBlockColor1, trueBlockColor2: trueBlockColor2, otherColor1: otherColor1.slice(), otherColor2: otherColor2.slice()}));
            isModule = i % 2 === 0;
            
            if (otherReds.length > 0 && isModule) {
                otherColor1.push(otherReds.shift());  
            }
            if (otherBlues.length > 0 && isModule) {
                otherColor2.push(otherBlues.shift());
            }
        }   
    }
    
    function fadeToGrey(originalColor,delta) { 
        var color = {
            a: originalColor.a,
            b: originalColor.b,
            r: originalColor.r,
            g: originalColor.g
        };
        delta = delta || 1;
        delta = Math.min(1, delta);
        delta *= 10;
        var magicalFactor = 20;
        var grayTone = 60;
        color.r += (grayTone - color.r) / magicalFactor * delta;
        color.g += (grayTone - color.g) / magicalFactor * delta;
        color.b += (grayTone - color.b) / magicalFactor * delta;

        return color;
    }
    
    var fadeBlock = function (delta) {
        this.trueBlockColor = fadeToGrey(this.trueBlockColor, delta);
        this.otherColor = fadeToGrey(this.otherColor, delta);
    };
    
    var i;
    if (levelsEnabled.fade) {
        isModule = i % 2 === 0;
        for (i = 6; i <= 12; i++) {
            levels.push(addGridLevel({number: parseInt(i / 2), trueBlockColor1: trueBlockColor1, trueBlockColor2: trueBlockColor2, otherColor1: otherColor1.slice(), otherColor2: otherColor2.slice(), updateModifiers: [fadeBlock] }));

            if (otherReds.length > 0 && isModule) {
                otherColor1.push(otherReds.shift());  
            }
            if (otherBlues.length > 0 && isModule) {
                otherColor2.push(otherBlues.shift());
            }
        }        
    }
    
    
    trueBlockColor1 = {r: 53, g: 156, b: 239};
    otherColor1 = {r: 53, g: 156, b: 239};
    trueBlockColor2 = {r: 244, g: 138, b: 42};
    otherColor2 = {r: 244, g: 138, b: 42};
    
    if (levelsEnabled.shapes) {
        for (i = 7; i <= 12; i++) {
            levels.push(addGridLevel({number: parseInt(i / 2), trueBlockColor1: trueBlockColor1,
                                      trueBlockColor2: trueBlockColor2, otherColor1: otherColor1,
                                      otherColor2: otherColor2, updateModifiers: [],
                                      draw: drawingFunctions.drawShapes(drawingFunctions.drawStar,
                                                                        [drawingFunctions.drawCircle, 
                                                                         drawingFunctions.drawTriangle, 
                                                                         drawingFunctions.drawSquare],
                                                                        Math.min(3, parseInt(i / 2)))}));
        } 
    }
    
    otherReds = [{r: 170, g: 77, b: 7}, {r: 221, g: 100, b: 10}];
    otherBlues = [{r: 43, g: 124, b: 178}, {r: 8, g: 62, b: 99}];
    trueBlockColor1 = {r: 209, g: 126, b: 70};
    trueBlockColor2 = {r: 146, g: 190, b: 214};
    
    if (levelsEnabled.shapesColor) {
        for (i = 18; i <= 28; i++) {
            levels.push(addGridLevel({number: parseInt(i / 4), 
                                      trueBlockColor1: trueBlockColor1,
                                      trueBlockColor2: trueBlockColor2, 
                                      otherColor1: otherReds,
                                      otherColor2: otherBlues,
                                      updateModifiers: [],
                                      draw: drawingFunctions.drawColorShapes(drawingFunctions.drawSquare,
                                                                        [drawingFunctions.drawCircle, 
                                                                         drawingFunctions.drawTriangle, 
                                                                         drawingFunctions.drawStar],
                                                                         parseInt(i / 4) - 3, parseInt(i / 4) - 2) }));
        } 
    }
    
    if (levelsEnabled.shapesColorFading) {
        for (i = 7; i <= 14; i++) {
            levels.push(addGridLevel({number: parseInt(i / 2), 
                                      trueBlockColor1: trueBlockColor1,
                                      trueBlockColor2: trueBlockColor2, 
                                      otherColor1: otherReds,
                                      otherColor2: otherBlues,
                                      updateModifiers: [fadeBlock],
                                      draw: drawingFunctions.drawColorShapes(drawingFunctions.drawCircle,
                                                                        [drawingFunctions.drawSquare, 
                                                                         drawingFunctions.drawTriangle, 
                                                                         drawingFunctions.drawStar],
                                                                         parseInt(i / 2) - 3, parseInt(i / 2) - 2) }));
        } 
    }
    
    if (levelsEnabled.shapesColor) {
        for (i = 20; i <= 28; i++) {
            levels.push(addGridLevel({number: parseInt(i / 4), 
                                      trueBlockColor1: trueBlockColor1,
                                      trueBlockColor2: trueBlockColor2, 
                                      otherColor1: otherReds,
                                      otherColor2: otherBlues,
                                      updateModifiers: [],
                                      draw: drawingFunctions.drawColorShapes(drawingFunctions.drawSquare,
                                                                        [drawingFunctions.drawCircle, 
                                                                         drawingFunctions.drawTriangle, 
                                                                         drawingFunctions.drawStar],
                                                                         parseInt(i / 4) - 3, parseInt(i / 4) - 2) }));
        } 
    }
}());
