var background = {
    id: 'background',
    visible: true,
    init: function () { },
    update: function (delta) { },
    draw: function (context) {
        context.fillStyle = 'gray';
        context.fillRect(0, 0, jsGFwk.settings.width, jsGFwk.settings.height);
    }
};