sap.ui.controller("regtest.CONTROLLER.Log", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf regtest.VIEW.Log
	 */
/*	onInit : function() {
		try {
			oUser = localStorage.getItem("oUser");
			reloadModel(oUser);
		} catch (err) {
			var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
			oRouter.navTo("Login");
			sap.m.MessageToast.show("You have to login first!");
		}

	},*/
	onRefresh : function() {
		// Refresh Bind
		var oLogTable = sap.ui.getCore().byId("idLogTable");
		var oRegTestName = sap.ui.getCore().byId("idRegTestNameValue").getValue();
		var oRunID = sap.ui.getCore().byId("idRunIdValue").getValue();

		if (oRegTestName != '') {
			var oRegIDFilter = new sap.ui.model.Filter({
				path : 'reg_test_name',
				operator : sap.ui.model.FilterOperator.Contains,
				value1 : oRegTestName
			});
		} else {
			var oRegIDFilter = new sap.ui.model.Filter({
				path : 'reg_test_name',
				operator : sap.ui.model.FilterOperator.Contains,
				value1 : ''
			});
		}

		if ((oRunID != '')) {
			var oRunIDFilter = new sap.ui.model.Filter({
				path : 'run_id',
				operator : sap.ui.model.FilterOperator.EQ,
				value1 : oRunID
			})
		} else {
			var oRunIDFilter = new sap.ui.model.Filter({
				path : 'run_id',
				operator : sap.ui.model.FilterOperator.Contains,
				value1 : ''
			})
		}

		var oPartIDFilter = new sap.ui.model.Filter({
			path : 'id_part',
			operator : sap.ui.model.FilterOperator.Contains,
			value1 : ''
		})

		var filtersReg = new sap.ui.model.Filter({
			filters : [ oRegIDFilter, oRunIDFilter, oPartIDFilter ],
			and : true
		});

		oLogTable.getBinding("rows").filter(filtersReg,
				sap.ui.model.FilterType.Application);
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
			oUser = localStorage.getItem("oUser");			
			validateUser(oUser);
		} catch (err) {
			var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
			oRouter.navTo(routeLogin);
			var loginFirstText = resourceModel.getProperty("LoginFirst");
			sap.m.MessageToast.show(loginFirstText);
		}

		try {
			reloadModel(oUser);
		} catch (err) {
			var offlineText = resourceModel.getProperty("OfflineTxt");
			sap.m.MessageToast.show(offlineText);
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