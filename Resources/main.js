
//globalRegistry.label1.backgroundColor = 'green';

//globalRegistry.

// viewRegistry.loginWindow = function() {
var loginWindow = (function(viewRef) {
  var viewName = 'loginWindow';
  var containerView = Ti.UI.createView({
    backgroundColor: 'green',
    name: viewName,
    height: '100%',
    width: '100%',
    top: 0,
    layout: 'vertical'
  });
  
var formTop = 100;  
// Create a TextField.
var aTextField = Ti.UI.createTextField({
	height : 35,
	//top : formTop,
	left : 40,
	width : 240,
  top: 10,
	hintText : 'Your triplingo id',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});



// Add to the parent view.
containerView.add(aTextField);
//globalRegistry.aTextField = aTextField;

var aTextField2 = Ti.UI.createTextField({
  top: 10,
  height : 35,
	//top : formTop + 40,
	left : 40,
	width : 240,
	hintText : 'Password',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

containerView.add(aTextField2);
//globalRegistry.aTextField = aTextField2;


// Create a Button.
var aButton = Ti.UI.createButton({
  top: 10,
  title : 'SUBSCRIBE',
	height : 30,
	width : 120,
	//top : formTop + 120,
});

// Listen for click events.
aButton.addEventListener('click', function() {
//  var loginResult = loginService.login(aTextField.value, aTextField2.value);
 //  Ti.API.fireEvent('loginResult', {result: loginResult});  
//  Ti.API.fireEvent('loginResult', {username: aTextField.value});  
  Ti.UI.createWindow({
  	url: 'window2.js'
  })

  
});
 
  
  Ti.API.addEventListener('loginResult', function(data) {
  	alert('You entered:' + data.username);  
  });
  
// Add to the parent view.
containerView.add(aButton);
//globalRegistry.aButton = aButton;
  logger('constructed loginView');
  
//var parentView = loginWindow.parent;  
  var parentView = viewRef;  
 
  if (parentView === undefined) {
    // do nothing
  } else {
    destroyChildren(parentView, viewName); 
  	parentView.add(containerView);
  } 
  
  function reset() {
    aTextField2.value = "";
  }
  
  function close() {
    
	containerView.animate({left: -1000, duration: 500});
  }
  function slidein() {
	containerView.animate({left: 0, duration: 500});
  }
  
  return {view: containerView, reset: reset, close: close, slidein: slidein};
})(mainWindow);
