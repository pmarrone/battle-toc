/* global jsGFwk, parseColor, GLOBAL*/
function paintPlayerBackground(color, playerXOffset, context) {
    context.fillStyle = parseColor(color);
    context.fillRect(playerXOffset, 0, jsGFwk.settings.width + playerXOffset, jsGFwk.settings.height);

}

function paintLevelBackground(level, playerXOffset, context) {
    var grey = {r: 255, g: 255, b: 255};
    var colors = [
        {r: 130, g: 200, b: 180},
        {r: 250, g: 20, b: 50},
        {r: 79, g: 10, b: 150},
        {r: 10, g: 200, b: 150}
    ];

    if (level < 22) {
        paintPlayerBackground(grey, playerXOffset, context);
    } else if (level < 45) {
        paintPlayerBackground(colors[(playerXOffset * 11 + 51 + level * 4373) % colors.length], playerXOffset, context);
    } else {
        var red = parseInt(Math.abs(Math.sin(Date.now() / 10000 + 1500 * 10)) * 255);
        var green = parseInt(Math.abs(Math.cos(Date.now() / 10000 * 8)) * 255);
        var blue = parseInt(Math.abs(Math.sin(Date.now() * 2 / 10000 * 15)) * 255);
        
         paintPlayerBackground({r: red, g: green, b: blue}, playerXOffset, context);
    }
}

var background = {
    id: 'background',
    visible: true,
    init: function () { },
    update: function (delta) { },
    draw: function (context) {
        
        var offsetX = 0;
        var backgroundColor = {r: 250, g: 250, b: 250};

        paintLevelBackground(GLOBAL.currentLevels.player1, 0, context);
        paintLevelBackground(GLOBAL.currentLevels.player2, jsGFwk.settings.width / 2, context);
    }
};