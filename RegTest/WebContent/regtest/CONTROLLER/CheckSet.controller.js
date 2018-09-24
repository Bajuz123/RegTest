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
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
<<<<<<< HEAD

=======
>>>>>>> branch 'master' of https://github.com/Bajuz123/RegTest.git
		oRouter.navTo("CheckSetDetail");
	},
	onDelSetClick: function(oSetTable) {
		var selIndex = oSetTable.getSelectedIndex();
		
		if (selIndex != -1) {
			var rows = oSetTable.getRows();
			var cells = rows[selIndex].getCells();
			var idCheckSet = cells[0].getValue();
			var oModelCheckSet = sap.ui.getCore().getModel();
			oModelCheckSet.remove("/REG_TEST_SET(id_reg_test='" + idCheckSet
					+ "')", {
				method : "DELETE",
				success : function(data) {
					sap.m.MessageToast.show("Delete successfull");
				},
				error : function(e) {
					sap.m.MessageToast.show("Delete error");
				}
			});
			reloadModel(oUser);
			var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
			oRouter.navTo("CheckSetDetail");
		} else {
			sap.m.MessageToast.show("Select a row to delete!");
		}
	},
		
	onEditSetClick: function(oSetTable) {
		var selIndex = oSetTable.getSelectedIndex();

		if (selIndex != -1) {
			var rows = oSetTable.getRows();
			var cells = rows[selIndex].getCells();

			sap.ui.getCore().byId("fldIDCheck").setValue(cells[0].getValue());
			sap.ui.getCore().byId("fldName").setValue(cells[1].getValue());
			sap.ui.getCore().byId("fldImplClass").setValue(cells[2].getValue());

			var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
			oRouter.navTo("DetailCheck");
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