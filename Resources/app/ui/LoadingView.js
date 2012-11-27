(function() {
	app.ui.createLoadingView = function(_args) {

	var animatedIcon = Ti.UI.createImageView({
	                        image: 'loading_plane.png',
	                        height: 100,
	                        width: 100 });
	                
	var loadingWin = Ti.UI.createWindow({
		backgroundColor: 'white',
		height: 200,
		width: 200, opacity: '.7'  ,
		bottom: 10
	});
		
	loadingWin.add(animatedIcon);		
	var visible = false;
	log('registering loading window');
	var spinnerInterval;
	Ti.App.addEventListener('app:show.loader', function() {
		
		if (!visible) {
			visible = true;
			
			var duration = 250;
			var t = Ti.UI.create2DMatrix();
	        function rotate() {
	            var a = Titanium.UI.createAnimation({curve: Ti.UI.ANIMATION_CURVE_LINEAR });
	            t = t.rotate(90);
	            a.transform = t;
	            a.duration = duration;
	            animatedIcon.animate(a);
	        }
	        rotate();
	        spinnerInterval = setInterval(rotate,duration);	

			var t1 = Titanium.UI.create2DMatrix();
	        t1 = t1.scale(1.1);
	        var a = Titanium.UI.createAnimation();
	        a.transform = t1;
	        a.duration = 200;
	        // when this animation completes, scale to normal size
	        a.addEventListener('complete', function() {
	                var t2 = Titanium.UI.create2DMatrix();
	                t2 = t2.scale(1.0);
	                loadingWin.animate({
	                        transform:t2,
	                        duration:200
	                });
	        });
        	loadingWin.open(a);									
		}
	});
	
	Ti.App.addEventListener('app:hide.loader', function() {
		clearInterval(spinnerInterval);
		loadingWin.close();
		visible = false
	});
	
	};
})();