//Use the UI namespace for all UI component creation.  A few common components will be defined in this file,
//but the bigger ones get their own file (along with styles)
(function() {
	app.ui = {};
	
	app.ui.createTableRow = function(text, fn) {
		var row = Ti.UI.createTableViewRow(app.combine($$.TableViewRow, {
			height:'auto', //hasDetail: true 
			hasChild: true 
			
		})),
		spacing = 6;
		
		var label = Ti.UI.createLabel(app.combine($$.LargeLabel, {
			text: text,
			//top: (retweeted) ? spacing*3+nameHeight : spacing+nameHeight,
			//left:avatarOffset,
			right:spacing,
			height:60,
			textAlign:'left'
		}));
		row.add(label);
		
		return row;
	};
		
	//create a spacer row for a table view
	app.ui.createSpacerRow = function() {
		return Ti.UI.createTableViewRow($$.spacerRow);
	};
	
	//shorthand for alert dialog
	app.ui.alert = function(/*String*/ _title, /*String*/ _message) {
		Ti.UI.createAlertDialog({
			title:_title, 
			message:_message
		}).show();
	};
})();

//Include major UI components and styling properties
Ti.include(
	'/app/ui/styles.js',
	'/app/ui/ApplicationWindow.js',
	'/app/ui/LoadingView.js',
	'/app/ui/LoginWindow.js',
	'/app/ui/CheckinsWindow.js',
	'/app/ui/AboutView.js',
	'/app/ui/SignupWindow.js',
	'/app/ui/WelcomeWindow.js',
	'/app/ui/ForgotPasswordWindow.js'
	

);