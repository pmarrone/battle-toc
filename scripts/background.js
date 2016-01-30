var background = {
    id: 'background',
    visible: true,
    init: function () { },
    update: function (delta) { },
    draw: function (context) {
        context.fillStyle = 'white';
        context.fillRect(0, 0, jsGFwk.settings.width, jsGFwk.settings.height);
        
        context.fillStyle = 'black';
        context.fillRect(jsGFwk.settings.width / 2, 0,
                         2, jsGFwk.settings.height);
        
        context.fillText(GLOBAL.currentLevels.player1, 10, 10);
    }
};