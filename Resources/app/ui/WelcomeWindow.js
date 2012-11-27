(function() {
	app.ui.createWelcomeWindow = function(_args) {
		var viewName = 'welcome';

		var container = Ti.UI.createView({top:10, layout:'vertical', height: 300});

		var win = Ti.UI.createWindow(app.combine($$.Window, {
			navBarHidden:false,
     		tabBarHidden:true,
			////backgroundImage:'/imgs/ruff.png',
			viewName: viewName,
			container: container,
	        backButtonTitle :''
			
		}));
		
		app.os({
			iphone:function() { win.modal = false; }
		});
		
		var okButton = app.ui.Button({
			title:L('OK'),
			bottom: 70, 
			width: 100
		});		
			
		
		okButton.addEventListener('click', function() {
				Ti.App.fireEvent('openWindow', {winName: 'events'});
		});
			
		var welcomeLabel = Ti.UI.createLabel(app.combine($$.headerText,{text:L('welcomeCopy')}));			
		container.add(welcomeLabel);
		win.add(okButton);		
		win.add(container);
		return win;
	};
})();