(function() {	
	//Globally available theme object to hold theme colors/constants
	app.ui.theme = {
		textColor:'#333333',
		grayTextColor:'#888888',
		headerColor:'white',
		fontFamily: app.os({
			iphone:'Helvetica Neue',
			android:'Droid Sans'
		}),
		tablerowLight: '#FAFCFB',
		tablerowDark: '#FAFCFB',
		baseColor: '#0085bf',
		white: '#FAFCFB',
		defaultBackground: '#242d59',
		tableSeparatorColor: '#999999',
		selectedButton: '#242d59',
	};

	app.ui.layout = {
		navButtons: false,
		navBarHeight: 44,
	};

	app.ui.createNavBar = function(title, leftButton, rightButton) {
		log('\n\n title is set to:' + title)
		var view = Ti.UI.createView({
			backgroundImage : '/imgs/topbar.png',
			height : app.ui.layout.navBarHeight,
			width : Ti.UI.FILL,
			top : 0,
			backgroundColor: 'none'
		});

		var navLabel = Ti.UI.createLabel({
			text : title,
			color : 'white',
			width : Ti.UI.SIZE,
			top : 10,
			textAlign : 'center',
			font : {
				fontFamily : fontFamily,
				fontSize : 20,
				fontWeight : 'bold'
			},
		});

		view.add(navLabel);

		if (leftButton != undefined || leftButton != null) {
			leftButton.left = 5;
			leftButton.top = 7;
			view.add(leftButton);
		}
		if (rightButton != undefined || rightButton != null) {
			rightButton.right = 5;
			rightButton.top = 7;
			view.add(rightButton);
		}
		view.updateTitle = function(newTitle){
			navLabel.setText(newTitle);
		};

		return view;
	};
	// helper vars not exposed outside of the module
	var fontFamily = app.os({
		iphone : 'Helvetica Neue',
		android : 'Droid Sans'
	});

	var textBase = {
		color : app.ui.theme.foregroundColor,
		font : {
			fontFamily : fontFamily,
			fontSize : 18,
			fontWeight : 'normal'
		},
	};

	app.ui.createNavbarBackButton = function(title, win) {
		var title = title || "Back";
		title = " " + title;
		var button = Titanium.UI.createButton(app.combine(app.ui.text.navbarHeaderStyle, {
			backgroundImage : '/imgs/navbar_back_button.png',
			backgroundSelectedImage: '/imgs/navbar_back_button_selected.png',
			title: title,
			textAlign: 'center',
			height : 30,
			width : 55,
		}));
		button.addEventListener('click', function() {
			win.close()
		});
		return button;
	};

	app.ui.createBaseWindow = function(winProps) {
		var title = winProps.title || L(winProps.name);

		var navBarHidden = winProps.navBarHidden;
		delete winProps.navBarHidden;

		var leftNavButton = winProps.leftNavButton;
		delete winProps.leftNavButton;

		var rightNavButton = winProps.rightNavButton;
		delete winProps.rightNavButton;				
		
		var win = Ti.UI.createWindow(app.combine($$.Window, {
			navBarHidden : true, // always hide, we have a custom navbar
			tabBarHidden : true,
			title : title,
		}, winProps));

		var containerProps = winProps.container;
		delete winProps.containerProps;

		if (navBarHidden) {// if passed property to hide the navbar
			win.navBar = undefined;
			win.navBarHeight = 0;
		} else {
			// only do nav buttons if that is our style
			if (app.ui.layout.navButtons) {
				leftNavButton = leftNavButton || app.ui.createNavbarBackButton(winProps.backButtonTitle, win);	
			}
			
			win.add(app.ui.createNavBar(title, leftNavButton, rightNavButton));
			win.navBarHeight = app.ui.layout.navBarHeight;
		}
		// calling win.setTitle has no effect with the custom nav bar, need to use this function
		win.updateTitle = function(newTitle){
			if(win.navBar){
				win.navBar.updateTitle(newTitle);
			}
		};
		
		if (!containerProps) {
			log(' in containerProps')
			var container = Ti.UI.createView(app.combine({
				top:app.ui.layout.navBarHeight, 
				layout:'vertical',
				backgroundColor: 'white',
				height: '100%',
				width: '100%',
				//borderRadius: 10
				
			}) , containerProps);			
			win.add(container);
			win.container = container;
		}		

		app.os({
			iphone : function() {
				win.modal = false;
			}
		});

		return win;
	};

	app.ui.text = {
		normalStyle : app.combine(textBase, {
		}),
		title1Style : app.combine(textBase, {
			font : {
				fontFamily : fontFamily,
				fontSize : 22,
				fontWeight : 'bold'
			},
		}),
		title2Style : app.combine(textBase, {
			font : {
				fontFamily : fontFamily,
				fontSize : 20,
				fontWeight : 'bold'
			},
		}),
		title3Style : app.combine(textBase, {
			font : {
				fontFamily : fontFamily,
				fontSize : 18,
				fontWeight : 'bold'
			},
		}),
		smallStyle : app.combine(textBase, {
			font : {
				fontFamily : fontFamily,
				fontSize : 14,
				fontWeight : 'normal'
			},
		}),
		largeStyle : app.combine(textBase, {
			font : {
				fontFamily : fontFamily,
				fontSize : 22,
				fontWeight : 'normal'
			},
		}),
		groupHeaderStyle : app.combine(textBase, {
			font : {
				fontFamily : fontFamily,
				fontSize : 20,
				fontWeight : 'bold'
			},
		}),
		navbarHeaderStyle : app.combine(textBase, {
			color: 'white',
			font : {
				fontFamily : fontFamily,
				fontSize : 13,
				fontWeight : 'bold'
			},
		}),
		subtleStyle : app.combine(textBase, {
			color : app.ui.theme.subtleColor,
		}),
		contrastStyle : app.combine(textBase, {
			color : app.ui.theme.contrastForegroundColor,
		}),
		accentStyle : app.combine(textBase, {
			color : app.ui.theme.accentColor,
		}),

	}
	//All shared property sets are declared here.
	app.ui.properties = {
		//grab platform dimensions only once to save a trip over the bridge
		platformWidth: Ti.Platform.displayCaps.platformWidth,
		platformHeight: Ti.Platform.displayCaps.platformHeight,
		
		//we use these for default components
		Button: {
			backgroundImage:'none',
			backgroundColor: 'red',
			height:50,
			width:250,
			color: app.ui.theme.white,
			font: {
				fontSize:18,
				fontWeight:'bold'
			},
			borderRadius: 5,
			paddingLeft: 100,
			paddingRight: 10
		},
		Label: {
			color:app.ui.theme.darkBlue,
			font: {
				fontFamily:app.ui.theme.fontFamily,
				fontSize:12
			},
			height:'auto'
		},
		MediumLabel: {
			color:app.ui.theme.darkBlue,
			font: {
				fontFamily:app.ui.theme.fontFamily,
				fontSize:18
			},
			height:'auto'
		},
		LargeLabel: {
			color:app.ui.theme.darkBlue,
			font: {
				fontFamily:app.ui.theme.fontFamily,
				fontSize:28
			},
			height:'auto'
		},
		Window: {
			navBarHidden:false,
			tabBarHidden: true,
			title: 'plate', 
			backgroundColor: app.ui.theme.white,
		},
		TableView: {			
		//	separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE
		},
		TableViewRow: {
			backgroundImage:'/imgs/tweet_bg.png',
			selectedBackgroundColor: app.ui.theme.darkBlue, //I know, this is dumb, but it's currently inconsistent x-platform
			backgroundSelectedColor: app.ui.theme.darkBlue,
			//height:110,
			className:'tvRow'
		},
		TextField: {
			height: app.os({
				iphone:45,
				android:'auto'
			}),
			//borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			color: app.ui.theme.darkBlue,
			backgroundColor: app.ui.theme.lightBlue,
			backgroundImage:'none',
			borderRadius : 5,
			width: 250,
			font:{fontSize:20,fontFamily:app.ui.theme.fontFamily, fontWeight:'normal'},
			borderWidth: 0,
			padding: 0
		},
		TextArea: {
			borderRadius:10,
			backgroundColor:'#efefef',
			font:{fontSize:20,fontFamily:app.ui.theme.fontFamily, fontWeight:'normal'},
			//gradient will only work on iOS
		},
		
		//we use these as JS-based 'style classes'
		animationDuration: 500,
		stretch: {
			top:0,bottom:0,left:0,right:0
		},
		variableTopRightButton: {
			top:5,
			right:5,
			height:30,
			width:app.os({
				iphone:60,
				android:'auto'
			}),
			color:'#ffffff',
			font: {
				fontSize:12,
				fontWeight:'bold'
			},
			backgroundImage:'/imgs/button_bg_black.png'
		},
		topRightButton: {
			top:5,
			right:5,
			height:30,
			width:38
		},
		headerText: {
			top:8,
			height:'auto',
			textAlign:'center',
			color:app.ui.theme.headerColor,
			font: {
				fontFamily:app.ui.theme.fontFamily,
				fontSize:18,
				fontWeight:'bold'
			}
		},
		headerView: {
			backgroundImage:'/imgs/header_bg.png',
			height:40
		},
		boldHeaderText: {
			height:'auto',
			color:'blue',
			font: {
				fontFamily:app.ui.theme.fontFamily,
				fontSize:14,
				fontWeight:'bold'
			}
		},
		smallText: {
			color:app.ui.theme.grayTextColor,
			font: {
				fontFamily:app.ui.theme.fontFamily,
				fontSize:10
			},
			height:'auto'
		},
		spacerRow: {
			backgroundImage:'/imgs/spacer_row.png',
			height:30,
			className:'spacerRow'
		},
		separator: {
			height: 1,
			left : 75,
			right: 75,
			top: 10,
			backgroundColor: app.ui.theme.burntOrange
		}
	};
	
	app.ui.Button = function(props){
		
		var _button = Ti.UI.createButton(app.combine($$.Button,props));
		
		  _button.addEventListener('touchstart', function() { 
		    _button.backgroundColor = app.ui.theme.hitStateOrange;
		    
		  });  
		
		  _button.addEventListener('touchend', function() { 
		    _button.backgroundColor = app.ui.theme.burntOrange;
		  });   
		  return _button;
	}	
		
})();

//global shortcut for UI properties, since these get used A LOT. polluting the global
//namespace, but for a good cause (saving keystrokes)
var $$ = app.ui.properties;
