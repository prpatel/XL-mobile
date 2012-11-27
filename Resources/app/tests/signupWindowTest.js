(function() {
	// run before to clear out the user data
	// reload userService so we can change it on the fly
	app.services.UserService = app.services.createUserService();
	app.services.UserService.logout();
	var signupWindow = app.ui.windows['signup'];	
	signupWindow.close();
	
  describe('signup window test', function() {
    it('create signup window', function() {
    	app.ui.windows['welcome']  = app.ui.createWelcomeWindow();
    	app.ui.windows['signup']  = app.ui.createSignupWindow(app.ui.mainWindow); 	   				
        signupWindow = app.ui.windows['signup']
		Ti.App.fireEvent('openWindow', {winName: 'signup'});	
    });
    
    it('check signup window', function() {
//		expect(app.ui.mainWindow.children.length).toBe(1);
   		expect(signupWindow.children.length).toBe(1);
   		var containerView = signupWindow.container.getChildren();   		
   		expect(containerView.length).toBe(6);
    });
	
    it('fill in incorrect signup data', function() {
      signupWindow.container.children[0].value = 'joe';
      signupWindow.container.children[1].value = 'bloggs';
      signupWindow.container.children[2].value = 'jb@ at at ';
      signupWindow.container.children[3].value = 'patel';
   //   signupWindow.container.children[5].fireEvent('click');
      
      expect(app.services.UserService.getCurrentUser()).toBe(null);
    });	
	
	it('fill in correct signup data', function() {
		runs(function() {
    	});
    	waits(1000);	
		runs(function() {
	      signupWindow.container.children[0].value = 'pratik';
	      signupWindow.container.children[1].value = 'patel';
	      signupWindow.container.children[2].value = 'pratik@mypatelspace.com';
	      signupWindow.container.children[3].value = 'patel';
	 //     signupWindow.container.children[5].fireEvent('click');
    	});
	  
       waits(3000);
       runs(function() {
      		expect(app.services.UserService.getCurrentUser()).toBe('pratik@mypatelspace.com'); 	
       	});    
      
    });    
    
  });
  
  jasmine.getEnv().execute();
})();