
//globalRegistry.label1.backgroundColor = 'green';

//globalRegistry.

var loginWindow = function() {
var containerView = Ti.UI.createView();
// Create a TextField.
var aTextField = Ti.UI.createTextField({
	height : 35,
	top : 10,
	left : 40,
	width : 240,
	hintText : 'username',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

// Add to the parent view.
containerView.add(aTextField);
//globalRegistry.aTextField = aTextField;

var aTextField2 = Ti.UI.createTextField({
	height : 35,
	top : 50,
	left : 40,
	width : 240,
	hintText : 'passwd',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

containerView.add(aTextField2);
//globalRegistry.aTextField = aTextField2;


// Create a Button.
var aButton = Ti.UI.createButton({
	title : 'Login',
	height : 30,
	width : 120,
	top : 110,
});

// Listen for click events.
aButton.addEventListener('click', function() {
	alert('\'aButton\' was clicked!');
});

// Add to the parent view.
containerView.add(aButton);
//globalRegistry.aButton = aButton;
viewRegistry.loginWindow =  containerView;
}