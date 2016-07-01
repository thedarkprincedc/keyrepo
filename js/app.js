function doOnLoad() {
	mainApplication();
/*

	var toolbar = sideBar.cells().attachToolbar({
		items : [{
			id : "new",
			type : "button",
			text : "New"
		}, {
			id : "mod",
			type : "button",
			text : "Modify"
		}, {
			id : "delete",
			type : "button",
			text : "Delete"
		}]
	});
	toolbar.attachEvent("onClick", function(id) {
		if (id == "new") {
			var w2 = myLayout.dhxWins.createWindow("w2", 1, 1, 500, 300);
			w2.setModal(true);
		}
		if (id == "mod") {
			var w2 = myLayout.dhxWins.createWindow("w2", 1, 1, 500, 300);
			w2.setModal(true);
		}
		if(id == "delete"){
			
		}
	});
	sideBar.attachEvent("onSelect", function(id, lastId) {
		mygrid.clearAll();
		mygrid.load("php/keyrepoapp.php?action=search&type="+id,"json");
		//sideBar.cells().showView("def");
	});
	sideBar.loadStruct("php/keyrepoapp.php?action=getsoftwaretypes", function() {

	});

	var mygrid = sideBar.cells().attachGrid();
	mygrid.setHeader("Name,Manufacturer,Type,Expires");
	mygrid.init();
	mygrid.load("php/keyrepoapp.php?action=search", "json");
	mygrid.attachEvent("onRowSelect", function(id, lastId) {
	
		var myForm = sideBar.cells().attachForm();
		myForm.loadStruct("js/forms/keydetails.json", "json");
	});

*/
	//sideBar.cells().progressOn();
}

var mainApplication = function() {
	var token, myLayout, sideBar, subLayout, mygrid, myForm;
	this.init = function() {
		myLayout = new dhtmlXLayoutObject({
			parent : document.body, // parent container
			pattern : "1C", // layout's pattern
			cells : [{
				id : "a",
				text : "Serial",
			}]
		});
		sideBar = myLayout.cells("a").attachSidebar({
			single_cell : true,
			template : "text"
		});
		sideBar.loadStruct("php/keyrepoapp.php?action=getsoftwaretypes");
		sideBar.attachEvent("onSelect", function(id, lastId) {
			mygrid.clearAll();
			mygrid.load("php/keyrepoapp.php?action=search&type="+id,"json");
			//debugger;
			//var r = subLayout.cells("a").showView("def");
			//myForm = subLayout.cells("a").attachForm();
			//myForm.loadStruct("js/forms/keydetails.json", "json");
			
		});
		
		subLayout = sideBar.cells().attachLayout({
			pattern : "1C", // layout's pattern
			cells : [{
				id : "a",
				text : "Serial",
			}]
		});
		
		var view = subLayout.cells('a').showView('form');
		if(view){
			myForm = subLayout.cells("a").attachForm();
			myForm.loadStruct("js/forms/keydetails.json", "json");
		}
		
	
		//
		
		mygrid = subLayout.cells("a").attachGrid();
		mygrid.setHeader("Name,Manufacturer,Type,Expires");
		mygrid.init();
		mygrid.load("php/keyrepoapp.php?action=search", "json");
		mygrid.attachEvent("onRowSelect", function(id, lastId) {
			var myForm = sideBar.cells().attachForm();
			myForm.loadStruct("js/forms/keydetails.json", "json");
		});
	};
	this.init();
};
