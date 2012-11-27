(function() {
	app.ui.createSignupWindow = function(_args) {
		var viewName = 'signup';
		var dialog = Ti.UI.createAlertDialog({
	        message: 'change',
	        ok: 'OK',
	        title: 'change'
     	 });
		var container = Ti.UI.createView({top:10, layout:'vertical'});

		var win = Ti.UI.createWindow(app.combine($$.Window, {
			navBarHidden:false,
     		tabBarHidden:true,
			////backgroundImage:'/imgs/ruff.png',
			viewName: viewName,
			container: container,
			dialog: dialog,
	        backButtonTitle :'Login'
			
		}));
		
		app.os({
			iphone:function() { win.modal = false; }
		});
		
		//unLabel = Ti.UI.createLabel(app.combine($$.boldHeaderText,{text:L('username')})),
		var fnameField = Ti.UI.createTextField(app.combine($$.TextField,{
			top:10,
			hintText: 'First Name',
			clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS
		})),
		//pwLabel = Ti.UI.createLabel(app.combine($$.boldHeaderText,{text:L('password'),top:10})),
		// lnameField = Ti.UI.createTextField(app.combine($$.TextField,{			// top:0,			// left:50,			// right:50,			// hintText: 'Last Name',			// clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS		// })),
		emailField = Ti.UI.createTextField(app.combine($$.TextField,{
			top:5,
			hintText: 'Email address',
			clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS
		})),
		//pwLabel = Ti.UI.createLabel(app.combine($$.boldHeaderText,{text:L('password'),top:10})),
		pwField = Ti.UI.createTextField(app.combine($$.TextField,{
			top:5,
			passwordMask:true,
			hintText: 'Password',
			clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS
		})),

		cancelButton = app.ui.Button({
			title:L('Cancel'),
			//top: 0 - signupButton.height,
			top: 10, 
			width: 100, 
			left: 50
		}),
		signupButton = app.ui.Button({
			title:L('Signup'),
			top: 0 - cancelButton.height, 
			width: 100, 
			right: 50
		});	
		
			var tandcLabel = Ti.UI.createLabel(app.combine($$.headerText, {
				text : L('TandCNotice'),
				left : 10,
				right: 10
			}));			
			
			tandcLabel.addEventListener('click', function() {
				
				var t1 = Ti.UI.create2DMatrix().scale(0.0);
				// Create a WebView
				var aWebView = Ti.UI.createWebView({
					url : 'http://genericlicensing.com/terms_and_conditions.html',
					top:20, left:20, right:20, bottom: 20 ,
					transform: t1
				});
				var webViewCloseButton = Ti.UI.createButton(app.combine($$.Button, {
					title : 'X',
					top : 1,
					right:1,
					height: 40,
					width: 40
				}));		
				webViewCloseButton.addEventListener('click', function() {	
					var closeAnimation = Ti.UI.createAnimation();
					closeAnimation.transform = t1;
					closeAnimation.duration = 500;							
					aWebView.animate(closeAnimation);
					aWebView.close();
				});				
				aWebView.add(webViewCloseButton);
				var t2 = Ti.UI.create2DMatrix().scale(1.0);
				var a = Ti.UI.createAnimation();
				a.transform = t2;
				a.duration = 500;			

				win.add(aWebView);
				aWebView.animate(a);	
			})
			
		var signupCallback = function(data) {
			log('RESULT ' + data.result )
			if (data.result === 'success') {
				Ti.App.fireEvent('openWindow', {winName: 'welcome'});	
			} else {
				dialog.title = 'Error with Login';
				dialog.message = data.reason;
				dialog.show();
			}
		}
		
		signupButton.addEventListener('click', function() {
			app.services.UserService.signup(fnameField.value, pwField.value,
						   				   signupCallback);
		});
		
		cancelButton.addEventListener('click', function() {
			win.close({animated: true});
		})
		
		container.add(fnameField);
		//container.add(lnameField);
		container.add(emailField);
		container.add(pwField);			
		container.add(cancelButton);
		container.add(signupButton);
		container.add(tandcLabel);
		win.add(container);
		return win;
	};
})();