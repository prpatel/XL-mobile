var loginService = (function() {
	var loggedIn = false;
	var login = function (username, password) {
		var loginSucess = true;
		if (loginSucess) {
			logger("logged in successfully");
			loggedIn = true;
			return true;	
		} else {
			logger("logged in failure");
			return false;
		}
	}
	
	var isUserLoggedIn = function() {
		return loggedIn;		
	}
	
	var createNewUser = function(username, passwd, email) {
		
		
	}
	
	return {
		login: login,
		isUserLoggedIn: isUserLoggedIn,
		createNewUser: createNewUser 
	}
	
})();
