var dashboardView = (function(viewRef) {
  var viewName = 'dashboardView';
  var containerView = Ti.UI.createView({
    backgroundColor: 'green',
    name: viewName,
    height: '80%',
    width: '100%',
    top: 0
  
  });
  
var formTop = 50;  

var aButton = Ti.UI.createButton({
	title : 'Pasta',
	height : 30,
	width : 120,
	top : formTop + 0,
});

aButton.addEventListener('click', function() {
  var loginResult = dashboardService.vote(aButton.title);

});

containerView.add(aButton);

var aButton2 = Ti.UI.createButton({
	title : 'Pizza',
	height : 30,
	width : 120,
	top : formTop + 40,
});

aButton2.addEventListener('click', function() {
  var loginResult = dashboardService.vote(aButton2.title);

});

containerView.add(aButton2);

  
var aButton3 = Ti.UI.createButton({
	title : 'Sandwich',
	height : 30,
	width : 120,
	top : formTop + 80,
});

aButton3.addEventListener('click', function() {
  var loginResult = dashboardService.vote(aButton3.title);

});

containerView.add(aButton3);

  
  logger('constructed dashboardView');
  

  var parentView = viewRef;  
 
  if (parentView === undefined) {
    // do nothing
  } else {
    destroyChildren(parentView, viewName); 
  	parentView.add(containerView);
  } 
  
  function close() {
    
	containerView.animate({left: -1000, duration: 500});
  }
  function slidein() {
	containerView.animate({left: 0, duration: 500});
  }
  
  return {view: containerView, close: close, slidein: slidein};
})(mainWindow);
