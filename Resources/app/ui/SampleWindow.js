(function() {
	app.ui.createLoginWindow = function(controller) {
		var viewName = 'login';
		var win = app.ui.createBaseWindow({
			title: 'template app',
			viewName: viewName,
			backgroundColor: '#333333' ,
			containerProps: {
				layout: 'vertical',
				backgroundColor: 'red'
			},
			cleanUp: cleanUp   
		});
		

// Create a Button.
var aButton = Ti.UI.createButton({
	title : 'Click me',
	height : 100,
	width : 100,
	top : 20
});

var toggle = false;
aButton.addEventListener('click', function() {
	if (toggle) {
		Ti.App.fireEvent('app:hide.loader', {});
		toggle = false;
	} else {
		Ti.App.fireEvent('app:show.loader', {});
		toggle = true;	
	}
	
})
		win.container.add(aButton);
		
		win.addEventListener('close', function() {
			Ti.API.info('someone called close!');
		});
		function cleanUp() {
			loadingWin.close();
		}
		return win;
	};
})();


function oldCode() {
	var viewName = 'login';
		var win = app.ui.createBaseWindow({
			title: 'Demo App',
			viewName: viewName,
			backgroundColor: '#333333' ,
			containerProps: {
				height: '100%',
				layout: 'vertical',
				backgroundColor: 'none'
			} 
		});
		
		var containerView = Ti.UI.createView({
			top: 80,
			backgroundColor: 'green',
			width: '90%',
			height: 300
		})		
		
		// Create a Button.
		var GenerateNumberButton = Ti.UI.createButton(app.combine(app.ui.properties.Button,
			{
			title : 'Generate Number',

			top : 100			
		
		}));

		
		// Create a Label.
		var NumberLabel = Ti.UI.createLabel({
			text : 'NumberLabel',
			color : 'red',
			bottom : 20,
			textAlign : 'center'
		});
		
		// Add to the parent view.
		containerView.add(NumberLabel);
		

		
		// Listen for click events.
		GenerateNumberButton.addEventListener('click', function() {
			NumberLabel.text = 'generated number';
		});
		
		NumberLabel.addEventListener('click', function() {
			
			// Create a WebView
			var aWebView = Ti.UI.createWebView({
				url : 'http://www.google.com',
				height: 200,
				width: '100%',
				bottom: 0
				
			});
			aWebView.addEventListener('load', function(e) {
				Ti.API.info('webview loaded: '+ e.url);
			});
			
			// Add to the parent view.
			containerView.add(aWebView);
			
			
		});
		
		//win.add(containerView);
		// Add to the parent view.
		containerView.add(GenerateNumberButton);
}
