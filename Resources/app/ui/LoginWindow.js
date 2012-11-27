(function() {
	app.ui.createLoginWindow = function(controller) {
		
		var win = Ti.UI.createWindow({
			title: 'San Francisco demo',
			navBarHidden: false,
			tabBarHidden: true,
			backgroundColor: '#333333'
		});
		
		
		// Create a Button.
		var basicButton = Ti.UI.createButton({
			title : 'basicButton',
			height : 100,
			width : 100,
			top : 50
		});
		
		// Listen for click events.
		basicButton.addEventListener('click', function() {
			greetingLabel.text = "Hello MSP!";
		});
		
		// Create a Label.
		var greetingLabel = Ti.UI.createLabel({
			text : 'greetingLabel',
			color : 'red',
			font : {fontSize:48},
			bottom : 200,
			textAlign : 'center'
		});
		
		// Add to the parent view.
		win.add(greetingLabel);
				
		
		// Add to the parent view.
		win.add(basicButton);
		return win;
	};
})();