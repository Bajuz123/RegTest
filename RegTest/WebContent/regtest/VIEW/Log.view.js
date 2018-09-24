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
			id: "idLogTable",
			tableID : "idLogTable",
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

		var runIdText = new sap.m.Label("idRunIdText", {text: "Run ID"});
		var runIdValue = new sap.m.Input("idRunIdValue");
		var panelRunId = new sap.m.Panel("idLogPanelRunId", {
			content : [runIdText, runIdValue]
		});

		var runIdRegTest = new sap.m.Label("idRegTestId", {text: "Reg Test ID"});
		var runIdRegTestValue = new sap.m.Input("idRegTestValue");
		var panelRegTestID = new sap.m.Panel("idRegTestIDPanel", {
			content : [runIdRegTest, runIdRegTestValue]
		});

		oLogTable.bindRows("/REG_LOG_SET");

		var btnRefresh = new sap.m.Button("idBtnRefresh", {
			text : "Refresh",
			icon : "sap-icon://refresh",
		    press: function(){
		    	oController.onRefresh();
		    }
		    });	

		var panel = new sap.m.Panel("idLogPanel", {
			content : [panelRunId, panelRegTestID, btnRefresh, oLogTable]
		});
						
		return new sap.m.Page({
			title: "Log",
			content: [
	          panel	
			]
			});
	}
 });
