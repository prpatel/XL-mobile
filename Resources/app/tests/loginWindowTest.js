(function() {
	// log(Math.floor(Math.random()*100));
	// run before to clear out the user data
	// reload userService so we can change it on the fly
	app.services.UserService = app.services.createUserService();
	app.services.UserService.logout();
	var loginWindow = app.ui.windows['login'];
	//loginWindow.cleanUp();
	loginWindow.close();
	
  describe('login window test', function() {
    it('create login window', function() {
    	app.ui.windows['login']  = app.ui.createLoginWindow(app.services.UserService); 	   				
        loginWindow = app.ui.windows['login']
		Ti.App.fireEvent('openWindow', {winName: 'login'});	
    });
    
    it('check login window', function() {
   		expect(loginWindow.children.length).toBe(2);   		
   		var containerView = loginWindow.container.getChildren();   		
   		expect(containerView.length).toBe(4);
    });
	
    it('fill in incorrect login data', function() {
		runs(function() {
			//    loginWindow.container.children[0].value = 'pratik';
      		//	loginWindow.container.children[1].value = 'passwordx';
    	});
    		
		runs(function() {
      		expect(loginWindow.container.children[0].value).toBe('pratik');
      	 //   loginWindow.container.children[2].fireEvent('click');  
    	});
	  
       waits(250);
       runs(function() {
      		     expect(app.services.UserService.getCurrentUser()).toBe(null);
       	});  
       	      
    });
	

	it('fill in correct login data', function() {
		runs(function() {
    	});
    		
		runs(function() {
      		expect(loginWindow.container.children[0].value).toBe('pratik');
      		loginWindow.container.children[1].value = 'titanium';
      	//	loginWindow.container.children[2].fireEvent('click');  
    	});
	  
       waits(250);
       runs(function() {
      		expect(app.services.UserService.getCurrentUser()).toBe('pratik'); 	
       	});    
      
    });    
    
  });
  
  jasmine.getEnv().execute();
})();