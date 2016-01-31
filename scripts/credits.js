var credits = {
    id: 'credits',
    visible: true,
    init: function () {
        var self = this;
        sidePlayers.style.display = 'inline';
        this.touchId = jsGFwk.IO.touch.registerTouch(function (coord) {
            jsGFwk.IO.touch.unregisterTouch(self.touchId);
            jsGFwk.IO.mouse.unregisterClick(self.clickId);
            jsGFwk.Scenes.scenes.hud.enable();
        });
            
        this.clickId = jsGFwk.IO.mouse.registerClick(function (coord) {
            jsGFwk.IO.touch.unregisterTouch(self.touchId);
            jsGFwk.IO.mouse.unregisterClick(self.clickId);
            jsGFwk.Scenes.scenes.hud.enable();
        });
    },
    update: function (delta) {},
    draw: function (context) {
        var offsetY = 100;
        context.textAlign = 'center';
        context.font = '60pt zxBold';
        
        context.fillText('Created by', jsGFwk.settings.width / 2, 30 + offsetY);
        
        context.font = '40pt zxBold';
        
        context.fillText('Matias Iacono', jsGFwk.settings.width / 2, 200 + offsetY);
        context.fillText('Patricio Marrone',jsGFwk.settings.width / 2, 120 + offsetY);
        context.fillText('Brian Infante', jsGFwk.settings.width / 2, 160 + offsetY);
        context.fillText('Francisco Della Puppa', jsGFwk.settings.width / 2, 80 + offsetY);
        context.fillText('Daniela Mercado', jsGFwk.settings.width / 2, 240 + offsetY);
        context.fillText('David Schvab', jsGFwk.settings.width / 2, 280 + offsetY);
    }
};