(function() {
	app.ui.createForgotPasswordWindow = function(controller) {
		var viewName = 'forgotPassword';
		var dialog = Ti.UI.createAlertDialog({
			title: 'change',
			message: 'change',
	        ok: 'OK'
     	 });
		var container = Ti.UI.createView({top:10, layout:'vertical', height: 320});

		var win = Ti.UI.createWindow(app.combine($$.Window, {
			navBarHidden:false,
     		tabBarHidden:true,			
			viewName: viewName,
			container: container,
	        backButtonTitle :'Login',	       
		}));
		
		app.os({
			iphone:function() { win.modal = false; }
		});
		
		var okButton = app.ui.Button({
			title:L('OK'),
			top: 10,
			width: 100
		});		
			
		// controller.on('reminder_error', function(error){			// dialog.title = 'ERROR';			// dialog.message = 'there was an error sending your reminder request, try again later' + error;			// dialog.show();		// });// 				// controller.on('reminder_success', function(message){			// dialog.title = 'Success';			// dialog.message = 'Please check your email for a reminder email';			// dialog.show();		// });		
		okButton.addEventListener('click', function() {
				// email reminder call to backend
				controller.sendReminder(emailField.value);
		});
			
		var welcomeLabel = Ti.UI.createLabel(app.combine($$.MediumLabel,
			{text:L('ForgotPasswordPreamble'), left: 20, right: 20, top: 10}));	
		var emailField = Ti.UI.createTextField(app.combine($$.TextField,{
			top:10,
			hintText: 'Email address',
			clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS
		}));				
		
		container.add(emailField);
		container.add(okButton);
		container.add(welcomeLabel);		
		win.add(container);
		return win;
	};
})();