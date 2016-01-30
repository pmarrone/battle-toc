var hud = {
    id: 'hud',
    visible: true,
    init: function (){
        var self = this;
        
        sidePlayers.style.display = 'inline';
        
        this.showStart = true;
        this.timerBlink = new jsGFwk.Timer({
            action: function () {
                self.showStart = !self.showStart;
            }, tickTime: 0.5
        });
        this.startOption = {
            x: (jsGFwk.settings.width / 2) - 200,
            y: (jsGFwk.settings.height / 2) - 50,
            width: 400,
            height: 50
        };
        this.creditsOption = {
            x: (jsGFwk.settings.width / 2) - 200,
            y: (jsGFwk.settings.height / 2) + 50,
            width: 400,
            height: 50
        };
        
        this.touchId = jsGFwk.IO.touch.registerTouch(function (coord) {
            var fakeMouse = {x: coord.x, y: coord.y, width: 1, height: 1 };
            if (jsGFwk.Collisions.areCollidingBy(self.startOption, fakeMouse, jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                jsGFwk.IO.touch.unregisterTouch(self.touchId);
                jsGFwk.IO.mouse.unregisterClick(self.clickId);
                sidePlayers.style.display = 'none';
                jsGFwk.Scenes.scenes.game.enable();
                return;
            }
            
            if (jsGFwk.Collisions.areCollidingBy(self.creditsOption, fakeMouse, jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                jsGFwk.IO.touch.unregisterTouch(self.touchId);
                jsGFwk.IO.mouse.unregisterClick(self.clickId);
                sidePlayers.style.display = 'none';
                jsGFwk.Scenes.scenes.credits.enable();
                return;
            }
        });
            
        this.clickId = jsGFwk.IO.mouse.registerClick(function (coord) {
            var fakeMouse = {x: coord.x, y: coord.y, width: 1, height: 1 };
            if (jsGFwk.Collisions.areCollidingBy(self.startOption, fakeMouse, jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                jsGFwk.IO.touch.unregisterTouch(self.touchId);
                jsGFwk.IO.mouse.unregisterClick(self.clickId);
                sidePlayers.style.display = 'none';
                jsGFwk.Scenes.scenes.game.enable();
            }
            
            if (jsGFwk.Collisions.areCollidingBy(self.creditsOption, fakeMouse, jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                jsGFwk.IO.touch.unregisterTouch(self.touchId);
                jsGFwk.IO.mouse.unregisterClick(self.clickId);
                sidePlayers.style.display = 'none';
                jsGFwk.Scenes.scenes.credits.enable();
                return;
            }
        });
    },
    update: function (delta) {
        this.timerBlink.tick(delta);
    },
    draw: function (context) {
        context.font = '200pt zxBold';
        context.textAlign = 'center';
        if (this.showStart) {
            context.fillText('Start', jsGFwk.settings.width / 2,
                             jsGFwk.settings.height / 2);
        }
        
        context.font = '100pt zxBold';
        context.fillText('Credits', jsGFwk.settings.width / 2, (jsGFwk.settings.height / 2) + 100);
        
        context.font = '110pt zxBold';
        context.fillText('PICK A SIDE!!!', jsGFwk.settings.width / 2,
                         (jsGFwk.settings.height / 2) + 300);
    }
};