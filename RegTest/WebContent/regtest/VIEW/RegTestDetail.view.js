RegTestDetail.view.js

sap.ui.jsview("regtest.VIEW.RegTestDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf regtest.RegTestDetail
	*/ 
	getControllerName : function() {
		return "regtest.CONTROLLER.RegTestDetail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf regtest.RegTestDetail
	*/ 
	createContent : function(oController) {	
		var btnAdd = sap.m.Button("btnAdd", {
			text : "Add Datei",
			icon : "sap-icon://add",
		    press:  oController.onAddClick   });		

		var btnRun = sap.m.Button("btnRun", {
			text : "Run RegTest",
//			icon : "sap-icon://run",
		    press:  oController.onRunClick   });		

		var btnPlace = sap.m.Button("btnPlace", {
			text : "Placeholders",
//			icon : "sap-icon://run",
		    press:  oController.onPlaceholderClick   });		

		var btnCheckSet = sap.m.Button("btnPlace", {
			text : "CheckSets",
//			icon : "sap-icon://run",
		    press:  oController.onCheckSetClick   });		

		var fieldName = sap.m.Input("fldName");
		var areaXML   = sap.m.TextArea("areaXML");
		
		var oPlaceTable = new sap.ui.table.Table({
			tableID : "idPlaceTable",
			visibleRowCount : 20,
			selectionMode: sap.ui.table.SelectionMode.Single,
			editable : true
		});
		
		oPlaceTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Placeholder"}),
//			template: new sap.ui.commons.TextField().bindProperty("value","Placeholder"),
			visible: true
		} ));

		oPlaceTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Replace with"}),
//			template: new sap.ui.commons.TextField().bindProperty("value","Replace with"),
			visible: true
		} ));

		var oCheckTable = new sap.ui.table.Table({
			tableID : "idCheckTable",
			visibleRowCount : 20,
			selectionMode: sap.ui.table.SelectionMode.Single,
			editable : true
		});
		
		oCheckTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Name"}),
//			template: new sap.ui.commons.TextField().bindProperty("value","Name"),
			visible: true
		} ));

		oCheckTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Implementation Class"}),
//			template: new sap.ui.commons.TextField().bindProperty("value","Name"),
			visible: true
		} ));
		
		var panelRegDetail = sap.m.Panel("idPanelRegDetail", {
			content : [btnAdd, btnRun, btnPlace, btnSet, fieldName, areaXML]
		});		

		var panelRelated = sap.m.Panel("idListRelated", {
			content : [oPlaceTable]
		});		
		
		return new sap.m.Page({
			title: "RegTest Detail",
			content: [
			  panelRegDetail, panelRelated 
			]
		});
	}

});