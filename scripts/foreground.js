var foreground = {
    id: 'foreground',
    visible: true,
    
    init: function () {
        var self = this;
        this.playTime = new jsGFwk.Timer({
            action: function () {
                GLOBAL.currentPlayTime--;
            },
            tickTime: 1
        });
    },
    update: function (delta) {
        this.playTime.tick(delta);
    },
    draw: function (context) {
        context.fillStyle = 'black';
        context.fillRect(jsGFwk.settings.width / 2, 0,
                         2, jsGFwk.settings.height);
        
        context.fillStyle = 'white';
        context.fillRect(0, 0, 50, jsGFwk.settings.height);
        context.fillRect(jsGFwk.settings.width - 50, 0, 50, jsGFwk.settings.height);
        
        context.fillStyle = 'black';
        context.font = '50pt zxBold';
        
        context.save();
        context.translate(10, 10);
        context.rotate(0.5 * Math.PI);
        context.fillText('Points ' + GLOBAL.currentLevels.player1, 0, 0);
        
        context.font = '80pt zxBold';
        context.fillText(GLOBAL.currentPlayTime, 0, -(jsGFwk.settings.width / 2));
        context.restore();
        
        context.save();
        context.translate(jsGFwk.settings.width - 10, jsGFwk.settings.height - 10);
        context.rotate(-0.5 * Math.PI);
        context.fillText('Points ' + GLOBAL.currentLevels.player2, 0, 0);
        
        context.font = '80pt zxBold';
        context.fillText(GLOBAL.currentPlayTime, 0, -(jsGFwk.settings.width / 2));
        context.restore();
        
        levels[GLOBAL.currentLevels.player1].player1target && levels[GLOBAL.currentLevels.player1].player1target(context);
        levels[GLOBAL.currentLevels.player2].player2target && levels[GLOBAL.currentLevels.player2].player2target(context);
    }
};