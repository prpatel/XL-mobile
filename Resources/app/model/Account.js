(function() {	
	//Create new Entity 'subclass' using parasitic inheritance
	//http://www.crockford.com/javascript/inheritance.html
	app.model.Account = function(_opts) {
		var that = new app.model.Entity('Account');

		//add any passed properties to the object
		app.mixin(that,_opts);
		
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

		
		that.authorize = function(/*Object*/ _params) {
			var requestUrl = 'https://api.PLATE/authorize';
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
				// process response
			};
			xhr.open('POST', finalUrl);
			xhr.send();
		};
		
	}


})();