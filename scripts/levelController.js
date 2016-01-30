var levelController = {
    id: 'levelController',
    visible: false,
    init: function () {
    },
    update: function (delta) {
    },
    updateGame: function (toPlayer) {
        GLOBAL.currentLevels[toPlayer]++;
        
    }
};