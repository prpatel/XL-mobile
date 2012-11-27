globals = {};
serviceRegistry = {};
viewRegistry = {};
globalRegistry = {};
var mainWindow = Ti.UI.currentWindow;
var devmode = true;

	Ti.include("jasmine.js");
	Ti.include("jasmine-titanium-reporter.js");
	
function startXliteClient(ipAddress) {
	//var logger = Logger('localhost', 8484);
	//var logger = Logger('aji.local', 8484);
	var logger = Logger('localhost', 8484);
	

	jasmine.getEnv().addReporter(new jasmine.TitaniumReporter(true));	
}

function createInputDialog(callback) {
	var dialogWin = Ti.UI.createWindow({
		top: '50%',
		backgroundColor: '#333333',
		height: 200,
		width: 300,
		borderColor: 'green',
		top: 100
	})
	
	var ipField = Ti.UI.createTextField({
		value: 'localhost',
		backgroundColor: 'white',
		borderWidth: 2,
		borderColor: 'white',
		top: 50,
		height : 30,
		width : 200,

	});
	
	
	// Create a Button.
	var okButton = Ti.UI.createButton({
		title : 'OK',
		height : 50,
		width : 80,
		bottom : 10,
		right : 50
	});
	
	// Listen for click events.
	okButton.addEventListener('click', function() {
		callback(ipField.value);
		dialogWin.close();
	});
	
	var cButton = Ti.UI.createButton({
		title : 'CANCEL',
		height : 50,
		width : 80,
		bottom : 10,
		left : 50
	});
	
	// Listen for click events.
	cButton.addEventListener('click', function() {
		dialogWin.close();
	});	
	
	// Add to the parent view.
	dialogWin.add(okButton);
	dialogWin.add(cButton);
	dialogWin.add(ipField);
	setTimeout(function() {
		dialogWin.open()
	}, 500);
}

if (devmode === true) {
	Ti.include('logger3.js');
	createInputDialog(startXliteClient)
	
} else {

	function logger(logmsg) {
		Ti.API.info(logmsg);
	}	
}
logger('app started');

//helper functions
function destroyChildren(v, viewName) {
	var parentView = v;
	var childViews = v.children;
	Ti.API.log('DESTROY:' + childViews);
	if (childViews === undefined) {
		return
	};
	var viewCount = childViews.length;

	if (viewName === undefined) {
		// nuke em all
		logger('removing all children views');
		for ( i = 0; i < viewCount; i++) {
			parentView.remove(childViews[((viewCount - 1) - i)]);
		}
	} else {
		// just remove the named view
		logger('removing just:' + viewName);
		for ( i = 0; i < viewCount; i++) {
			if (viewName === childViews[((viewCount - 1) - i)].name) {
				logger('removed:'+childViews[((viewCount - 1) - i)].name);
				parentView.remove(childViews[((viewCount - 1) - i)]);	
			}			
		}
	}
}

function rebuildView(viewRef2, viewName2, containerView2) {
  var parentView, viewNameInternal, containerViewInternal;

  /*
  if (viewRef2 === undefined) {
  	parentView = viewRef;  
  } else {
    parentView = viewRef2;
  }

  if (viewName2 === undefined) {
  	viewNameInternal = viewName;  
  } else {
    viewNameInternal = viewName2;
  }  

  if (containerView2 === undefined) {
  	containerViewInternal = containerView;  
  } else {
    containerViewInternal = containerView2;
  }
  
  
  if (parentView === undefined) {
    // do nothing
  } else {
    destroyChildren(parentView, viewNameInternal); 
  	parentView.add(containerView);
  } 
*/
  if (viewRef2 === undefined) {
    // do nothing
  } else {
    destroyChildren(viewRef2, viewName2); 
  	viewRef2.add(containerView2);
  }
}    

//Ti.include('main.js');                