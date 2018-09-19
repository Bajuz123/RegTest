sap.ui.jsview("regtest.VIEW.RegTest", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf regtest.RegTest
	 */
	getControllerName : function() {
		return "regtest.CONTROLLER.RegTest";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf regtest.RegTest
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

		var btnAddReg = new sap.m.Button("idBtnAddReg", {
			text : "+",
		    press:  oController.onAddRegClick   });		

		var btnDelReg = new sap.m.Button("idBtnDelReg", {
			text : "-",
		    press:  oController.onDelRegClick   });		

		var btnEditReg = new sap.m.Button("idBtnEditReg", {
			text : "=>",
		    press:  oController.onEditRegClick});		

		var panel = sap.m.Panel("idMainPanel", {
			content : [btnAddReg, btnDelReg, btnEditReg, oTable]
		});		
		
		return new sap.m.Page({
			title : "Autotest",
			content : [
			  panel
			]
		});
	}

});