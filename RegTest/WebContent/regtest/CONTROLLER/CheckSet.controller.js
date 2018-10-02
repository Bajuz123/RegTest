sap.ui.controller("regtest.CONTROLLER.CheckSet", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf regtest.CheckSet
	 */
	// onInit : function() {
	// this.reloadModel();
	// },
	onAddSetClick : function() {
		var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
		oRouter.navTo(routeCheckSetDetail);
		sap.ui.getCore().byId(idCheckSetIDField).setValue("");
	},

	onDelSetClick : function(oSetTable) {
		var selIndex = oSetTable.getSelectedIndex();

		if (selIndex != -1) {
			var boundObject = getTableSelectedObject(oSetTable, selIndex);
			var idCheckSet = boundObject.id_check_set;
			var oModelCheckSet = sap.ui.getCore().getModel();

			var deleteOKText = resourceModel.getProperty("DeleteOK");
			var deleteFailText = resourceModel.getProperty("DeleteFail");

			oModelCheckSet.remove(entityCheckSetSetName + "(" + sapCheckSetId
					+ "='" + idCheckSet + "')", {
				method : methodDelete,
				success : function(data) {
					sap.m.MessageToast.show(deleteOKText);
				},
				error : function(e) {
					sap.m.MessageToast.show(deleteFailText);
				}
			});
			reloadModel(oUser);
		} else {
			var deleteSelectText = resourceModel.getProperty("DeleteSelect");
			sap.m.MessageToast.show(deleteSelectText);
		}
	},

	onEditSetClick : function(oSetTable) {
		var selIndex = oSetTable.getSelectedIndex();

		if (selIndex != -1) {
			var boundObject = getTableSelectedObject(oSetTable, selIndex);
			var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
			oRouter.navTo(routeCheckSetDetail);

			sap.ui.getCore().byId(idCheckSetIDField).setValue(
					boundObject.id_check_set);
			sap.ui.getCore().byId(idCheckSetName).setValue(boundObject.name);
			sap.ui.getCore().byId(idCheckSetClass).setValue(
					boundObject.implementation_class);
		} else {
			var editText = resourceModel.getProperty("EditSelect");
			sap.m.MessageToast.show(editText);
		}
	},

	/*
	 * var oModelRegTest = sap.ui.getCore().getModel();
	 * 
	 * /** Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!). @memberOf regtest.CheckSet
	 */
	onBeforeRendering : function() {
		try {
			oUser = localStorage.getItem("oUser");
			validateUser(oUser);
			reloadModel(oUser);
		} catch (err) {
			var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
			oRouter.navTo(routeLogin);
			var loginFirstText = resourceModel.getProperty("LoginFirst");
			sap.m.MessageToast.show(loginFirstText);
		}
	},

/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf regtest.CheckSet
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf regtest.CheckSet
 */
// onExit: function() {
//
// }
});