sap.ui.jsview("regtest.VIEW.CheckSet", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf regtest.CheckSet
	*/ 
	getControllerName : function() {
		return "regtest.VIEW.CheckSet";
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
			label: new sap.ui.commons.Label({text: "Name"}),
			template: new sap.ui.commons.TextField().bindProperty("value","Name"),
			visible: true
		} ))

		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Implementation class"}),
			template: new sap.ui.commons.TextField().bindProperty("value","Implementation class"),
			visible: true
		} ))

		oTable.bindRows("/REG_CHECK_SET");

		var panel = sap.m.Panel("idMainPanelChck", {
			content : [oTable]
		});		
		
		return new sap.m.Page({
			title: "Prufung-Sets",
			content: [
			  panel
			]
		});
	}
});