var levelController = {
    id: 'levelController',
    visible: false,
    init: function () {
        GLOBAL.currentLevels.player1 = 0;
        GLOBAL.currentLevels.player2 = 0;
        this.initGame();
    },
    update: function (delta) { },
    initGame: function () {
        this.cloneObjectsFor(levels[GLOBAL.currentLevels.player1].player1);
        this.cloneObjectsFor(levels[GLOBAL.currentLevels.player1].player2);
    },
    cloneObjectsFor: function (list) {
        for(var i = 0; i < list.length; i++) {
            shapeContainer.cloneObject(list[i]);
        }
    },
    updateGame: function (toPlayer) {
        GLOBAL.currentLevels[toPlayer]++;
        this.cloneObjectsFor(levels[GLOBAL.currentLevels[toPlayer]][toPlayer]);
    }
};