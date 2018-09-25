sap.ui.controller("regtest.CONTROLLER.RegTest", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf regtest.RegTest
	 */
//	onInit : function() {
//	},
	/*onDblClick : function() {
	     oTable = sap.ui.getCore().byId('idRegTest');
	    // oTable.setSelectedIndex(window.selectedIndex);
	     this._oDialog = sap.ui.xmlfragment("com.tutorial.fragments.addDialog",this);
	     this._oDialog.open();
	// sap.m.MessageToast.show("ondoubleclick");
	},*/

	onAddRegClick : function() {
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		oRouter.navTo("RegTestDetail");
		sap.ui.getCore().byId("fldIDReg").setValue("");
	},

	onDelRegClick : function(oRegTable) {
		var selIndex = oRegTable.getSelectedIndex();

		if (selIndex != -1) {
			var rows = oRegTable.getRows();
			var cells = rows[selIndex].getCells();
			var idRegTest = cells[0].getValue();
			var oModelRegTest = sap.ui.getCore().getModel();
			oModelRegTest.remove("/REG_TEST_SET(id_reg_test='" + idRegTest
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
			oRouter.navTo("RegTestDetail");
		} else {
			sap.m.MessageToast.show("Select a row to delete!");
		}
	},

	onEditRegClick : function(oRegTable) {
		var selIndex = oRegTable.getSelectedIndex();
		if (selIndex != -1) {
			var rows = oRegTable.getRows();
			var cells = rows[selIndex].getCells();

			var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
			oRouter.navTo("RegTestDetail");

			sap.ui.getCore().byId("fldIDReg").setValue(cells[0].getValue());
			sap.ui.getCore().byId("fldName").setValue(cells[1].getValue());
			sap.ui.getCore().byId("areaXML").setValue(cells[2].getValue());
			
			var oRegDetailView = sap.ui.getCore().byId("idregtest.VIEW.RegTestDetail");
			oRegDetailView.getController().refreshRelatedTables();
		} else {
			sap.m.MessageToast.show("Select a row to edit!");
		}
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf regtest.RegTest
	 */
	onBeforeRendering : function() {
		try {
			  reloadModel(oUser);			
		} catch (err) {
			var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
			oRouter.navTo("Login");
			sap.m.MessageToast.show("You have to login first!");					
		}
	},
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf regtest.RegTest
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf regtest.RegTest
 */
// onExit: function() {
//
// }
});