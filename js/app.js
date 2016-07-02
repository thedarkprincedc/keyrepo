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
	var token,
	    myLayout,
	    sideBar,
	    subLayout,
	    mygrid,
	    myForm;
	var selectedSidebarId = null;
	this.createFormData = function(data) {

		return [{
			type : "fieldset",
			name : "data",
			label : data.name,
			inputWidth : "500",
			list : [{
				type : "container",
				name : "keyGrid",
				label : "Product Keys",
				inputWidth : 250,
				inputHeight : 200
			}, {
				type : "button",
				name : "return",
				value : "<<Return"
			}]
		}];
	};
	this.createGrid = function(id) {
		mygrid = subLayout.cells("a").attachGrid();
		mygrid.setHeader("Name,Manufacturer,Type,Expires");
		mygrid.init();
		mygrid.load("php/keyrepoapp.php?action=search&type=" + id, "json");
		mygrid.attachEvent("onRowDblClicked", function(id, lastId) {
			//var myForm = sideBar.cells().attachForm();
			//myForm.loadStruct(this.createForm(id), "json");

			this.createForm({
				name : mygrid.cells(id, 0).getValue(),
				keys : ["99mr9md9rm9kdr9", "jm99k9ik9irk9ikr9"]
			});
		}.bind(this));
	};
	this.createNewForm = function(){
		myForm = subLayout.cells("a").attachForm();
		myForm.loadStruct("js/forms/new_keyform.json", "json");
		myForm.attachEvent("onButtonClick", function(id){
				//if (id == "set1") myForm.load("php/data.php?id=1");
				//if (id == "set2") myForm.load("php/data.php?id=2");
				//if (id == "set3") myForm.load("php/data.php?id=5");
				if (id == "save") myForm.save();
		});
		var dp = new dataProcessor("php/keyrepoapp.php?action=addkey");
		dp.init(myForm);
		dp.setTransactionMode("REST");
		dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
     		if(action == "inserted"){
     			this.createGrid("");
     		}
		}.bind(this));
	};
	this.createForm = function(data) {
		myForm = subLayout.cells("a").attachForm();
		//myForm.loadStruct("js/forms/keydetails.json", "json");
		myForm.loadStruct(this.createFormData(data), "json");
		myForm.attachEvent("onButtonClick", function(id){
				if (id == "return") this.createGrid("");
		}.bind(this));
		var keygrid = new dhtmlXGridObject(myForm.getContainer("keyGrid"));
		keygrid.setHeader("Key");
		keygrid.init();
		keygrid.parse({
		    "rows": [
		        {
		            "id": "1",
		            "data": [
		                data.keys[0]
		                
		            ]
		        },
		       
		    ]
		}, "json");
	};
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
			this.createGrid(id);
		}.bind(this));

		subLayout = sideBar.cells().attachLayout({
			pattern : "1C", // layout's pattern
			cells : [{
				id : "a",
				text : "Serial",
				header : false,
			}]
		});
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
				this.createNewForm();
				//var w2 = myLayout.dhxWins.createWindow("w2", 1, 1, 500, 300);
				//w2.setModal(true);
			}
		}.bind(this));
		this.createGrid("");

	};
	this.init();
};
