/*global jsGFwk*/
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
        
        context.drawImage(jsGFwk.ResourceManager.graphics.contraportada.image,
                     (jsGFwk.settings.width - jsGFwk.ResourceManager.graphics.contraportada.image.width) / 2,
                     (jsGFwk.settings.height - jsGFwk.ResourceManager.graphics.contraportada.image.height) / 2);

    }
};