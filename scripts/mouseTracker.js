var mouseTracker = {
    
}

jsGFwk.IO.mouse.registerClick(function (coord) {			
    mouseTracker.currentMouseX = coord.x;
    mouseTracker.currentMouseY = coord.y;
});
