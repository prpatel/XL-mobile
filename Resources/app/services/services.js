app.services = {};
Ti.include(
	'/app/services/UserService.js'
    // '/app/services/OtherService.js'
	
);
(function() {
	app.services.UserService = app.services.createUserService();
	// app.services.EventService = app.services.createOtherService();
})();