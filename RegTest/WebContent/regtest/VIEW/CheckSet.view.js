sap.ui.jsview("regtest.VIEW.CheckSet", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf regtest.CheckSet
	*/ 
	getControllerName : function() {
		return "regtest.CONTROLLER.CheckSet";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf regtest.CheckSet
	*/ 
	createContent : function(oController) {
		var oTable = new sap.ui.table.Table({
			tableID : "idCheckSet",
			visibleRowCount : 20,
			selectionMode: sap.ui.table.SelectionMode.Single,
			editable : true
		});

		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "ID"}),
			template: new sap.ui.commons.TextField().bindProperty("value","id_check_set"),
			visible: true
		} ))

		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Name"}),
			template: new sap.ui.commons.TextField().bindProperty("value","name"),
			visible: true
		} ))

		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Implementation class"}),
			template: new sap.ui.commons.TextField().bindProperty("value","implementation_class"),
			visible: true
		} ))
		oTable.bindRows("/CHCK_SET");
		
	    var btnAddSet = new sap.m.Button("idBtnAddSet", {
			text : "Add",
			icon : "sap-icon://add",
		    press:  oController.onAddSetClick   });		

		var btnDelSet = new sap.m.Button("idBtnDelSet", {
			text : "Delete",
			icon : "sap-icon://delete",
		    press: function(){  
		    	oController.onDelSetClick(oTable) 
		    }	
		    });		

		var btnEditSet = new sap.m.Button("idBtnEditSet", {
			text : "Edit",
			icon : "sap-icon://edit",
		    press: function(){
		    	oController.onEditSetClick
		    	}
			//press: oController.onEditSetClick
		});
		       		    	
		var panel = new sap.m.Panel("idMainPanelChck", {
			content : [
			           btnAddSet, btnDelSet, btnEditSet, 
			           oTable
			           ]
		});		
		
		return new sap.m.Page({
			title: "Prufung-Sets",
			content: [
			  panel
			]
		});
	}
});