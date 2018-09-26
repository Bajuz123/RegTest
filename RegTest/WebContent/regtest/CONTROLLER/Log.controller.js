sap.ui.controller("regtest.CONTROLLER.Log", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf regtest.VIEW.Log
	 */
	// onInit: function() {
	// },
	onRefresh : function() {
		// Refresh Bind
		var oLogTable = sap.ui.getCore().byId("idLogTable");
		var oRegTest = sap.ui.getCore().byId("idRegTestValue").getValue();
		var oRunID = sap.ui.getCore().byId("idRunIdValue").getValue();

		var	filtersReg = [];
		
		if (oRegTest != '') {
			var oRegIDFilter = new sap.ui.model.Filter({
				path : 'id_reg_test',
				operator : sap.ui.model.FilterOperator.EQ,
				value1 : oRegTest
			});
			filtersReg.push(oRegIDFilter);
		}

		if ((oRunID != '')) {
			var oRunIDFilter = new sap.ui.model.Filter({
				path : 'run_id',
				operator : sap.ui.model.FilterOperator.EQ,
				value1 : oRunID})
			filtersReg.push(oRunIDFilter);
		}
		
		if ((oRegTest != '') || (oRunID != '')) {
			var combinedFilter = new sap.ui.model.Filter(filtersReg);
			oLogTable.bindRows({
			  path:	"/REG_LOG_SET", 
			  filters: combinedFilter
			});
		} else {
			oLogTable.bindRows("/REG_LOG_SET");
		}
	},
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf regtest.VIEW.Log
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
 * @memberOf regtest.VIEW.Log
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf regtest.VIEW.Log
 */
// onExit: function() {
//
// }
});