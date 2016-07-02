function doOnLoad() {
	mainApplication();
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
		mygrid.attachEvent("onRowSelect", function(id, lastId) {
			
		}.bind(this));
	};
	this.createNewForm = function(modObj){
		myForm = subLayout.cells("a").attachForm();
		myForm.loadStruct("js/forms/new_keyform.json", function(){
			if(modObj){
				debugger;
				myForm.setFormData({
							"softwareName" : modObj.rows[0].data[0], 
							"softwareType" : modObj.rows[0].data[2], 
							"softwareOS" : modObj.rows[0].data[3]
							}
						);
			}
			
		});
		
		myForm.attachEvent("onButtonClick", function(id){
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
		return myForm;
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
			}
			if (id == "delete") {
				$.post("./php/keyrepoapp.php?action=deletekey", {id : mygrid.getSelectedRowId() },function(msg){
					this.createGrid("");
				}.bind(this));
			}
			if (id == "mod") {
				var idGridRef;
				if(idGridRef = mygrid.getSelectedRowId()){
					$.post("php/keyrepoapp.php?action=search", {id : mygrid.getSelectedRowId() },function(msg){
						this.createNewForm(msg);
					}.bind(this));
					
					//var trr = myForm.getFormData(false);
					//debugger;
					//myForm.load("php/keyrepoapp.php?action=search&id="+idGridRef);
				}
				
			}
		}.bind(this));
		this.createGrid("");

	};
	this.init();
};
