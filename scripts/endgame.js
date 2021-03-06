/*global GLOBAL, jsGFwk */
var endGame = {
    id: 'endGame',
    visible: true,
    init: function () {
        this.winner = GLOBAL.currentLevels.player1 === GLOBAL.currentLevels.player2 ?
            'No one wins' : ((GLOBAL.currentLevels.player1 > GLOBAL.currentLevels.player2) ?
                             'Ricky wins' : 'Putin wins');

        jsGFwk.ResourceManager.sounds[GLOBAL.currentLevels.player1 > GLOBAL.currentLevels.player2 ? 'miami' : 'bastaChicos'].audio.play();
        GLOBAL.currentLevels.player1 = 0;
        GLOBAL.currentLevels.player2 = 0;
        
        this.playTime = new jsGFwk.Timer({
            action: function () {
                jsGFwk.Scenes.scenes.hud.enable();
            },
            tickTime: 3
        });
    },
    update: function (delta) {
        this.playTime.tick(delta);
    },
    draw: function (context) {
        context.textAlign = 'center';
        context.fillStyle = 'black';
        context.font = '130pt zxBold';
        context.fillText(this.winner, jsGFwk.settings.width / 2, jsGFwk.settings.height / 2);
    }
};