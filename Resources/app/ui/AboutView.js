(function() {
  //create the about view
  app.ui.createAboutView = function(_args) {
    var aboutView = Ti.UI.createView($$.stretch);

 		aboutView.add(Ti.UI.createLabel(app.combine($$.headerText, {text:L('Share')})));
		aboutView.add(Ti.UI.createView({
			top:$$.headerView.height,
			bottom:0,
			right:0,
			left:0,
			//backgroundImage:'/imgs/ruff.png'
		}));
		
    return aboutView;
  };
})();