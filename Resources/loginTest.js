(function() {

if (!jasmine) {
  throw new Exception("jasmine library does not exist in global namespace!");
}
(function() {
  describe('login window test', function() {


    it('create login window', function() {
		mainWindow.add(loginWindow());
		expect(mainWindow.children.length).toBe(2);
    });

    it('fill in login data', function() {
      //mainWindow	
      //expect(joli.models.has('city')).toBeTruthy();
      //expect(joli.models.has('inexistant_model')).toBeFalsy();
      
    });
  });
})();

  // execute the tests
  //jasmine.getEnv().addReporter(new jasmine.TitaniumReporter());
  jasmine.getEnv().execute();
})();
