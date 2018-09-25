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
		var oRegTable = new sap.ui.table.Table({
			tableID : "idRegTestTable",
			visibleRowCount : 20,
			selectionMode: sap.ui.table.SelectionMode.Single,
			selectionBehavior: sap.ui.table.SelectionBehavior.Row,
			editable : false
			
		});
		
		oRegTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "ID"}),
			template: new sap.ui.commons.TextField().bindProperty("value","id_reg_test"),
			visible: true
		} ))

		oRegTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Name"}),
			template: new sap.ui.commons.TextField().bindProperty("value","Name"),
			visible: true
		} ))

		oRegTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "XML"}),
			template: new sap.ui.commons.TextField().bindProperty("value","XML"),
			visible: true
		} ))
		
		//oRegTable.attachBrowserEvent("dblclick", oController.onDblClick);
		
		oRegTable.bindRows("/REG_TEST_SET");

		var btnAddReg = new sap.m.Button("idBtnAddReg", {
			text : "Add",
			icon : "sap-icon://add",
		    press:  oController.onAddRegClick
		    });		

		var btnDelReg = new sap.m.Button("idBtnDelReg", {
			text : "Delete",
			icon : "sap-icon://delete",
		    press: function(){
		    	oController.onDelRegClick(oRegTable);
		    }
		    });		

		var btnEditReg = new sap.m.Button("idBtnEditReg", {
			text : "Edit",
			icon : "sap-icon://edit",
		    press: function(){
		    	oController.onEditRegClick(oRegTable);
		    }
		    });	

		var panel = new sap.m.Panel("idMainPanel", {
			content : [btnAddReg, btnDelReg, btnEditReg, oRegTable]
		});		
		
		return new sap.m.Page({
			title : "Autotest",
			content : [
			  panel
			]
		});
	}

});