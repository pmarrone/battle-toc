var foreground = {
    id: 'foreground',
    visible: true,
    
    init: function () {
        var self = this;
        this.playTime = new jsGFwk.Timer({
            action: function () {
                GLOBAL.currentPlayTime--;
                if (GLOBAL.currentPlayTime === 0) {
                    levelController.clearPlayerLevel('player1');
                    levelController.clearPlayerLevel('player2');
                    jsGFwk.Scenes.scenes.endgame.enable();
                }
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
        context.font = '30pt zxBold';
        
        context.save();
        context.translate(10, 10);
        context.rotate(0.5 * Math.PI);
        context.fillText('Points ' + GLOBAL.currentLevels.player1, 0, 0);
        
        context.font = '40pt zxBold';
        context.fillText(GLOBAL.currentPlayTime, 0, -(jsGFwk.settings.width / 2));
        context.restore();
        
        context.save();
        context.translate(jsGFwk.settings.width - 10, jsGFwk.settings.height - 10);
        context.rotate(-0.5 * Math.PI);
        context.fillText('Points ' + GLOBAL.currentLevels.player2, 0, 0);
        
        context.font = '40pt zxBold';
        context.fillText(GLOBAL.currentPlayTime, 0, -(jsGFwk.settings.width / 2));
        context.restore();
        
        GLOBAL.trueBlocks.player1.drawPointer.call({
            isTrueBlock: GLOBAL.trueBlocks.player1.isTrueBlock,
            trueBlockColor: GLOBAL.trueBlocks.player1.trueBlockColor,
            otherColor: GLOBAL.trueBlocks.player1.otherColor,
            x: GLOBAL.coordsHint.player1.x,
            y: GLOBAL.coordsHint.player1.y,
            width: GLOBAL.coordsHint.player1.width,
            height: GLOBAL.coordsHint.player1.height
        }, context);
        
        GLOBAL.trueBlocks.player2.drawPointer.call({
            isTrueBlock: GLOBAL.trueBlocks.player2.isTrueBlock,
            trueBlockColor: GLOBAL.trueBlocks.player2.trueBlockColor,
            otherColor: GLOBAL.trueBlocks.player2.otherColor,
            x: GLOBAL.coordsHint.player2.x,
            y: GLOBAL.coordsHint.player2.y,
            width: GLOBAL.coordsHint.player2.width,
            height: GLOBAL.coordsHint.player2.height
        }, context);
    }
};