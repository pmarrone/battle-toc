/*global GLOBAL, shapeContainer, levels*/
var levelController = {
    self: this,
    id: 'levelController',
    visible: false,
    init: function () {
        GLOBAL.currentLevels.player1 = 0;
        GLOBAL.currentLevels.player2 = 0;
        this.levelObjects = {
            player1: [],
            player2: []
        };
        shapeContainer.clearAll();
        this.initGame();
    },
    update: function (delta) { },
    initGame: function () {
        this.setLevel('player1', 0);
        this.setLevel('player2', 0);
    },
    cloneObjectsFor: function (list) {
        for(var i = 0; i < list.length; i++) {
            shapeContainer.cloneObject(list[i]);
        }
    },
    clearPlayerLevel: function (toPlayer) {
        for (var i = 0; i < this.levelObjects[toPlayer].length; i++) {
            var currentObject = this.levelObjects[toPlayer][i];
            if (currentObject.clickId !== undefined) {
                jsGFwk.IO.touch.unregisterTouch(currentObject.touchId);
                jsGFwk.IO.mouse.unregisterClick(currentObject.clickId);
            }
            currentObject.destroy();
        }
        this.levelObjects[toPlayer] = [];
    },
    updateGame: function (toPlayer) {
        if (GLOBAL.currentLevels[toPlayer] < levels.length - 1) {
            GLOBAL.currentLevels[toPlayer]++;
            this.setLevel(toPlayer, GLOBAL.currentLevels[toPlayer]);    
        }
        jsGFwk.ResourceManager.sounds.ok.audio.play();
    },
    penalizePlayer: function (toPlayer) {
        if (GLOBAL.currentLevels[toPlayer] > 0) {
            GLOBAL.currentLevels[toPlayer]--;    
        }
        this.setLevel(toPlayer, GLOBAL.currentLevels[toPlayer]);
        jsGFwk.ResourceManager.sounds.miss.audio.play();
    },
    setLevel: function (player, levelNumber) {
        GLOBAL.currentLevels[player] = levelNumber;
        this.clearPlayerLevel(player);
        this.levelObjects[player] = [];
        var levelObjectsParams = levels[levelNumber][player](); 
        for (var i = 0; i < levelObjectsParams.length; i++) {
            var currentObject = shapeContainer.cloneObject(levelObjectsParams[i]);
            this.levelObjects[player].push(currentObject);
            if (currentObject.isTrueBlock) {
                GLOBAL.trueBlocks[currentObject.belongToPlayer] = currentObject;
            }
        }
    }
    
};