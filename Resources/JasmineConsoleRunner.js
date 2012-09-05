Ti.include("jasmine.js");
Ti.include("jasmine-titanium-reporter.js");

jasmine.getEnv().addReporter(new jasmine.TitaniumReporter(JasmineTitaniumApp.verbose));
//jasmine.getEnv().execute();