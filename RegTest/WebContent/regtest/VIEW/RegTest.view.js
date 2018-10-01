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
			template: new sap.ui.commons.TextField().bindProperty(columnDefaultValue,"id_reg_test"),
			visible: false
		} ));

		oRegTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Name"}),
			template: new sap.ui.commons.TextField().bindProperty(columnDefaultValue,"Name"),
			visible: true
		} ));

		oRegTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "XML"}),
			template: new sap.ui.commons.TextField().bindProperty(columnDefaultValue,"XML"),
			visible: true			
		} ));
		
		//oRegTable.attachBrowserEvent("dblclick", oController.onDblClick);
		
		oRegTable.bindRows("/REG_TEST_SET");
		var btnAddReg = new sap.m.Button("idBtnAddReg", {
			icon : iconAdd,
		    press:  oController.onAddRegClick
		    });		

		var btnDelReg = new sap.m.Button("idBtnDelReg", {
			icon : iconDel,
		    press: function(){
		    	oController.onDelRegClick(oRegTable);
		    }
		    });		

		var btnEditReg = new sap.m.Button("idBtnEditReg", {
			icon : iconEdit,
		    press: function(){
		    	oController.onEditRegClick(oRegTable);
		    }
		    });	

		var panel = new sap.m.Panel("idMainPanel", {
			content : [btnAddReg, btnDelReg, btnEditReg, oRegTable]
		});		
		
		return new sap.m.Page({
			title : "{i18n>Autotest}",
			content : [
			  panel
			]
		});
	}

});