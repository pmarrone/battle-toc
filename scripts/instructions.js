var instructions = {
    id: 'instructions',
    visible: true,
    init: function () {
        
        this.playTime = new jsGFwk.Timer({
            action: function () {
                jsGFwk.Scenes.scenes.game.enable();
            },
            tickTime: 3
        });
    },
    update: function (delta) {
        this.playTime.tick(delta);
    },
    draw: function (context) {
        context.textAlign = 'center';
        context.fillStyle = '#359CEF';
        context.font = '60pt zxBold';
        context.fillText("Tap the different one", jsGFwk.settings.width / 2, jsGFwk.settings.height / 2);
    }
};