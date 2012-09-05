

var parentView = mainWindow;
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
parentView.add(aTextField);
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

parentView.add(aTextField2);
//globalRegistry.aTextField = aTextField2;