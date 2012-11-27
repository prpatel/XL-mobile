(function() {

	var platformWidth = Ti.Platform.displayCaps.platformWidth;

	//create the main application window
	app.ui.createApplicationWindow = function(_args) {
		app.ui.mainWindow = Ti.UI.createWindow(app.combine($$.Window, {
			navBarHidden : true,
			tabBarHidden : true,
			exitOnClose : true,
			orientationModes : [Ti.UI.PORTRAIT],
		}));
		

// Create a Button.
var mainButton = Ti.UI.createButton({
	title : 'base window: click to open main app',
	height: 200
});

// Listen for click events.
mainButton.addEventListener('click', function() {
				Ti.App.fireEvent('openWindow', {
					winName : 'login'
				});
});

// Add to the parent view.
app.ui.mainWindow.add(mainButton);
		

		Ti.include('/lib/bootstrap.js');
		app.ui.windows = {};

		app.ui.windows['login'] = app.ui.createLoginWindow(app.services.UserService);
		app.ui.windows['signup'] = app.ui.createSignupWindow(app.services.UserService);
		app.ui.windows['forgotPassword'] = app.ui.createForgotPasswordWindow(app.services.UserService);
		app.ui.windows['events'] = app.ui.createCheckinsWindow(app.services.UserService);
		app.ui.windows['welcome'] = app.ui.createWelcomeWindow();
		app.ui.createLoadingView();

		if (Ti.Network.online == false) {
			Ti.UI.createAlertDialog({
				title : 'No Network Connection',
				message : 'Your device does not appear to be connected to a WiFi or mobile data network.'
			}).show();
		}

		//get the current account
		app.ui.mainWindow.addEventListener('open', function(e) {
			if (app.services.UserService.isLoggedIn()) {
				app.app.loadUser(function() {
					Ti.App.fireEvent('app:account.selected');
					Ti.App.fireEvent('openWindow', {
						winName : 'checkins'
					});
				});
			} else {
				// User is logged out
				Ti.App.fireEvent('openWindow', {
					winName : 'login'
				});
			}
		});

		app.ui.tabGroup = Ti.UI.createTabGroup();
		var tab1 = Ti.UI.createTab({
			title : 'plate',
			window : app.ui.mainWindow
		});
		app.ui.tabGroup.addTab(tab1);
		Ti.App.addEventListener('openWindow', function(data) {
			log('opening:' + data.winName);
			tab1.open(app.ui.windows[data.winName], {
				animated : true
			});
		});

		app.ui.tabGroup.open();
		//app.ui.mainWindow.open();
		return app.ui.mainWindow;
	};
})(); 