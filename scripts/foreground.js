var foreground = {
    id: 'foreground',
    visible: true,
    init: function () { },
    update: function (delta) { },
    draw: function (context) {
        context.fillStyle = 'black';
        context.fillRect(jsGFwk.settings.width / 2, 0,
                         2, jsGFwk.settings.height);
        
        context.font = '80pt zxBold';
        
        context.save();
        context.translate(20, 10);
        context.rotate(0.5 * Math.PI);
        context.fillText('Points ' + GLOBAL.currentLevels.player1, 0, 0);
        context.restore();
        
        context.save();
        context.translate(jsGFwk.settings.width - 20, jsGFwk.settings.height - 10);
        context.rotate(-0.5 * Math.PI);
        context.fillText('Points ' + GLOBAL.currentLevels.player2, 0, 0);
        context.restore();
    }
};