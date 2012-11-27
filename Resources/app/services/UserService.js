(function() {	
	app.services.createUserService = function(_opts) {
		
		
		//General mechanism for handling request errors
		function handleError(_e,_xhr,_custom) {
			if (_custom) {
				_custom(e,xhr);
			}
			else {
				Ti.API.error('Error: '+JSON.stringify(_e)+'\nServer response: '+_xhr.responseText);
				app.ui.alert(L('error'), L('error_general'));
				Ti.App.fireEvent('app:hide.loader');
			}
		}

		function mockAuthorize(username, password, callback) {
			var data = {};
			if (username == 'pratik' && password == 'titanium') {
				// success
				Ti.App.Properties.setString('userId', username);
				data = {result: 'success'};
				log('======> login success');
			} else {
				// fail
			    data = {result: 'error', reason: 'incorrect username or password'};	
			}	
			callback(data);					
		}
		/*
		 * Remote calls are ASYNC by nature, so we must fire events
		 * or use callbacks
		 */
		var authorize = function(username, password, callback) {
			mockAuthorize(username, password, callback)
			return;
						
			var requestUrl = 'https://api.PLATE.com/authorize';
			// for using ACS is we want to
			var accessor = { consumerSecret: app.config.consumer_secret };
			var message = {
				method: 'POST',
				action: requestUrl,
				parameters: [
					['x_auth_username', _params.username],
					['x_auth_password', _params.password],   
					['x_auth_mode', 'client_auth'],
					['format', 'json']
				]
			};
			
			var xhr = Titanium.Network.createHTTPClient();
			xhr.onerror = function(e){
				Ti.API.error('Error received while authenticating: '+JSON.stringify(e));
				if (_params.error) {
					_params.error(e,xhr);
				}
			};	
			xhr.onload = function(){
				var uri = this.responseText;
				var queryString = {};
				Ti.App.Properties.setString('userId', userId);
				// process response
			};
			xhr.open('POST', finalUrl);
			xhr.send();
		};
		
		var getCurrentUser = function () {
			// Retrieve the Properties.
			return Ti.App.Properties.getString('userId');			
		}
		
		var isLoggedIn = function () {
			// Retrieve the Properties.
			var userid = Ti.App.Properties.getString('userId');
			if ( userid == null || userid == undefined || userid == '') {
				return false;				
			} else {
				return true;
			}			
		}		
		
		
		
		var logout = function() {
			log('======> logout');
			Ti.App.Properties.setString('userId', null);
		}
		
		function validateEmail(email) {
			log('validateEmail:' + email);
			var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
 
		    if(reg.test(email) === false) {
		        return false;
		    } else {
				return true;
		    }
		}

		function mockSignup(first_last_name, email, passwd, callback) {
			log('mockSignup');
			if (!validateEmail(email)) {
				log('INVALID EMAIL');
				callback({result: 'error', reason: L('InvalidEmail')});
				return null;
			};
			
			log('mockSignup2');
			var data = {};
			if (email == 'pratik@mypatelspace.com') {
				// success
				Ti.App.Properties.setString('userId', email);
				data = {result: 'success'};
				log('======> signup success');
			} else {
				// fail
			    data = {result: 'error', reason: 'some mock issue'};	
			}	
			callback(data);					
		}
		
		var signup = function(first_last_name, lname, email, passwd, callback) {
			mockSignup(first_last_name, email, passwd, callback);
			return;
			};
				
	return {login: authorize, 
			getCurrentUser: getCurrentUser, 
			logout: logout,
			signup: signup,
			isLoggedIn: isLoggedIn}	
	}
	
})();