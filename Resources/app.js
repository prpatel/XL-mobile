//We use app.js mainly as a bootstrap file to include our application namespace
//the `app` namespace is where the magic happens, it's the global JavaScript namespace
//There is one additional global variable, $$, which will hold 'styles' for our app
//components. 

// Load global libraries, mainly for use in UI included files that have access to global namespace
_ = require('/lib/underscore');

// Include UI components, include used instead of require for hot reload of components
Ti.include('/lib/date.js');
Ti.include('/app/main.js');

// open the main window
app.ui.createApplicationWindow();
