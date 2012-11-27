(function() {
	// log(Math.floor(Math.random()*100));
	// run before to clear out the user data
	// reload userService so we can change it on the fly
	//app.services.UserService = app.services.createUserService();
	//app.services.UserService.logout();
	var loginWindow = app.ui.windows['login'];
	//loginWindow.cleanUp();
	loginWindow.close();
	
  describe('login window test', function() {
    it('create login window', function() {
    	app.ui.windows['login']  = app.ui.createLoginWindow(); 	   				
        loginWindow = app.ui.windows['login']
		Ti.App.fireEvent('openWindow', {winName: 'login'});	
    });  
    
  });
  
  jasmine.getEnv().execute();
})();