sap.ui.controller("regtest.CONTROLLER.CheckSet", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf regtest.CheckSet
*/
//	onInit : function() {
//		this.reloadModel();
//	},
	
	onAddSetClick: function() {
		oSplitApp.toDetail("idCheckSetDetail1");
	},
	onDelSetClick: function() {
		
	},
	onEditSetClick: function(oSetTable) {
		var selIndex = oSetTable.getSelectedIndex();

		if (selIndex != -1) {
			var rows = oSetTable.getRows();
			var cells = rows[selIndex].getCells();

			sap.ui.getCore().byId("fldIDCheck").setValue(cells[0].getValue());
			sap.ui.getCore().byId("fldName").setValue(cells[1].getValue());
			sap.ui.getCore().byId("fldImplClass").setValue(cells[2].getValue());

			oSplitApp.toDetail("idCheckSetDetail1");
		} else {
			sap.m.MessageToast.show("Select a row to edit!");
		}
		
	},

	/*
	var oModelRegTest = sap.ui.getCore().getModel();

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf regtest.CheckSet
*/
	onBeforeRendering: function() {
		reloadModel(oUser);
	},
	
/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf regtest.CheckSet
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf regtest.CheckSet
*/
//	onExit: function() {
//
//	}

});