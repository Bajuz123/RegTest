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

		/* ToDo only one can be set*/
		if ((oRegTest != '') || (oRunID != '')) {
			var filterCheck = new sap.ui.model.Filter({
				filters : [ new sap.ui.model.Filter({
					path : 'id_reg_test',
					operator : sap.ui.model.FilterOperator.EQ,
					value1 : oRegTest
				}), new sap.ui.model.Filter({
					path : 'run_id',
					operator : sap.ui.model.FilterOperator.EQ,
					value1 : oRunID
				}) ],
				and : true
			});
			debugger;
			oLogTable.bindRows("/REG_LOG_SET", null, null, filterCheck);
		} else {
			oLogTable.bindRows("/REG_LOG_SET");						
		}
	}
/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf regtest.VIEW.Log
 */
// onBeforeRendering: function() {
//
// },
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