var background = {
    id: 'background',
    visible: true,
    init: function () { },
    update: function (delta) { },
    draw: function (context) {
        context.fillStyle = '#F4E4C2';
        context.fillRect(0, 0, jsGFwk.settings.width, jsGFwk.settings.height);
        
        context.fillStyle = 'black';
        context.fillRect(jsGFwk.settings.width / 2, 0,
                         2, jsGFwk.settings.height);
    }
};