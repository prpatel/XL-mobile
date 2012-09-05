globals = {};
serviceRegistry = {};
viewRegistry = {};
globalRegistry = {};
var mainWindow = Ti.UI.currentWindow;
var devmode = true;


if (devmode === true) {
	Ti.include('logger3.js');
	var logger = Logger('localhost', 8484);
	Ti.include("jasmine.js");
	Ti.include("jasmine-titanium-reporter.js");
	jasmine.getEnv().addReporter(new jasmine.TitaniumReporter(true));
	
} else {

	function logger(logmsg) {
		Ti.API.info(logmsg);
	}	
}

logger('hello');

logger('app started');

//helper functions
function destroyChildren(v, viewName) {
	var parentView = v;
	var childViews = v.children;
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

Ti.include('main.js');                