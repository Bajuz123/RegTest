sap.ui.jsview("regtest.VIEW.Main", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf regtest.Main
	 */
	getControllerName : function() {
		return "regtest.CONTROLLER.Main";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf regtest.Main
	 */
	createContent : function(oController) {	
		var oTable = new sap.ui.table.Table({
			tableID : "idRegTest",
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
			label: new sap.ui.commons.Label({text: "XML"}),
			template: new sap.ui.commons.TextField().bindProperty("value","XML"),
			visible: true
		} ))

		oTable.bindRows("/REG_TEST_SET");

		var panel = sap.m.Panel("idMainPanel", {
			content : [oTable]
		});		
		
		return new sap.m.Page({
			title : "Autotest",
			content : [
			  panel
			]
		});
	}

});