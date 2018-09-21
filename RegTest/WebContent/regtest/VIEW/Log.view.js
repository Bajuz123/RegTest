sap.ui.jsview("regtest.VIEW.Log", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf regtest.VIEW.Log
	*/ 
	getControllerName : function() {
		return "regtest.CONTROLLER.Log";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf regtest.VIEW.Log
	*/ 
		
	createContent : function(oController) {
		var oLogTable = new sap.ui.table.Table({
			tableID : "idLog",
			visibleRowCount : 20,
			selectionMode: sap.ui.table.SelectionMode.Single,
			selectionBehavior: sap.ui.table.SelectionBehavior.Row,
			editable : false
					});
		
		oLogTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Run ID"}),
			template: new sap.ui.commons.TextField().bindProperty("value","run_id"),
			visible: true
		} ))
		
		oLogTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Regresionstest ID"}),
			template: new sap.ui.commons.TextField().bindProperty("value","id_reg_test"),
			visible: true
		} ))
		
		oLogTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Part ID"}),
			template: new sap.ui.commons.TextField().bindProperty("value","id_part"),
			visible: true
		} ))
		
		oLogTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Message ID"}),
			template: new sap.ui.commons.TextField().bindProperty("value","msg_id"),
			visible: true
		} ))
		
		oLogTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Message Text"}),
			template: new sap.ui.commons.TextField().bindProperty("value","msg_text"),
			visible: true
		} ))
		
		oLogTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Platzhalter ID"}),
			template: new sap.ui.commons.TextField().bindProperty("value","id_placeholder"),
			visible: true
		} ))
		
		oLogTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Prufungsset ID"}),
			template: new sap.ui.commons.TextField().bindProperty("value","id_check_set"),
			visible: true
		} ))
		
		oLogTable.bindRows("/REG_LOG_SET");
		
		var btnFiltRunID = new sap.m.Button("idBtnFiltRunID", {
			text : "Filter run ID",
		    press:  function() {
		    	oController.onFiltRunID();
		    }
		    });		

		var btnFiltRegTest = new sap.m.Button("idBtnFiltRegTest", {
			text : "Filter Reg. Test",
		    press: function(){
		    	oController.onFiltRegTest();
		    }
		    });		

		var btnRefresh = new sap.m.Button("idBtnRefresh", {
			text : "Refresh",
		    press: function(){
		    	oController.onRefresh();
		    }
		    });	

		var panel = new sap.m.Panel("idLogPanel", {
			content : [btnFiltRunID, btnFiltRegTest, btnRefresh, oLogTable]
		});
						
		return new sap.m.Page({
			title: "Log",
			content: [
	          panel	
			]
			});
	}
 });
