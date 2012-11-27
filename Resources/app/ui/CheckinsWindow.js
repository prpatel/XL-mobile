(function() {
	app.ui.createCheckinsWindow = function(controller) {
		var viewName = 'events';

		//	loadingView = app.ui.createLoadingView(),
		var container = Ti.UI.createView({ layout:'vertical'});

		var win = Ti.UI.createWindow(app.combine($$.Window, {
			navBarHidden:false,
     		tabBarHidden:true,
			//backgroundImage:'/imgs/ruff.png',
			viewName: viewName,
			container: container,
			title: 'Checkins',
			backButtonTitle: ''
		}));
		
		var profileButton = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.STOP,
			color: 'white'
		});
		profileButton.addEventListener('click', function()
		{
			
			var logoutAlert = Titanium.UI.createAlertDialog({
				title:'Logout', 
				message:'Are you sure you want to logout?',
				buttonNames : ['OK','Cancel'],
				cancel: 1,		
			});
			
            logoutAlert.addEventListener('click', function(e){
              //logger(e.index)
              if (e.index === 0) {
				app.services.UserService.logout();
				//win.close();
				setTimeout(function() {
					Ti.App.fireEvent('openWindow', {winName: 'login'});		
				}, 500)
				    
              }
            });
            logoutAlert.show();
		});
		
		var addButton = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.ADD,
			color: 'white'
		});
		addButton.addEventListener('click', function()
		{
			Ti.App.fireEvent('openWindow', {winName: 'enterCode'});	
		});		
		win.leftNavButton = profileButton;
		win.rightNavButton = addButton;
		
		app.os({
			iphone:function() { win.modal = false; }
		});
		
		var blankData = [{title: 'loading'}];
		var tableview = Titanium.UI.createTableView({
		  name: 'tableViewTranslations',
				top: 0,
				left: 0,
		//		width: Ti.UI.FILL,
		//		height: Ti.UI.SIZE,
			    height: '100%',
				width: '100%',
				backgroundColor:'#cef1f9',
		       //data : blankData,
		       separatorColor: app.ui.theme.tableSeparatorColor
		       
		});
		
		tableview.setData(blankData);
		
		var currentRowIndex = 0;
		function createTableRow(event) {

	        var row = Ti.UI.createTableViewRow({height: 'auto', className : 'datarow', clickName : 'row'});
	        row.backgroundSelectedColor = '#fff';
	        //row.separatorStyle = Titanium.UI.iPhone.TableViewSeparatorStyle.NONE;
	        row.height = 60;	        
	        if (currentRowIndex % 2 == 1) {
	                row.backgroundColor = app.ui.theme.tablerowLight;
	                //row.hasDetail = true;
	                row.hasChild = true;
	        } else {
	                row.backgroundColor = app.ui.theme.tablerowDark;
	                row.hasChild = true;
	                //row.hasDetail = true;
	        }
	        		
	        var nameLabel = Ti.UI.createLabel({
	                color:app.ui.theme.darkBlue,
	                left:10,
	                top:2,
	                height:60,
	                width: 'auto',
	                font : {
	                        fontFamily : "Helvetica Neue",
	                        fontSize : 20
	                },
	                textAlign : 'left',
	                text: event.get('name')
	        });
	
	        row.eventId = event.id;
	        row.add(nameLabel);   
	        // hack just for this demo
		    tableview.appendRow(row);
		    // tableview.appendRow(row);
		    // blankData.push(row);
		    currentRowIndex = currentRowIndex + 1;
		}
		
		// Tell controller to refresh events collection
		win.addEventListener('focus', function() {
			tableview.setData([]);
			blankData = [];
			currentRowIndex = 0;
			events.each(function(event){
				createTableRow(event);
			});
		});
				
		// create table view event listener
		tableview.addEventListener('click', function(e)
		{
			// event data
			var index = e.index;
			var section = e.section;
			var row = e.row;
			var rowdata = e.rowData;
			log('User clicked for eventId:' + row.eventId);
			controller.eventSelected(index);
			app.app.eventDetail = row.eventId;
			event = controller.events.get(row.eventId);
			app.eventController.setEvent(event);
			Ti.App.fireEvent('openWindow', {winName: 'eventDetail'});	
		});
		container.add(tableview);
		win.add(container);
	
		return win;
	};
})();