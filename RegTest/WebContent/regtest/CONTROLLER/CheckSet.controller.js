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
		localStorage.setItem("choosenCheckSet_idCheckSet", "");
		localStorage.setItem("choosenCheckSet_name", "");
		localStorage.setItem("choosenCheckSet_implementationClass", "");

		var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
		oRouter.navTo(routeCheckSetDetail);
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
			oModelCheckSet.refresh();
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
			localStorage.setItem("choosenCheckSet_idCheckSet",
					boundObject.id_check_set);
			localStorage.setItem("choosenCheckSet_name", boundObject.name);
			localStorage.setItem("choosenCheckSet_implementationClass",
					boundObject.implementation_class);
			oRouter.navTo(routeCheckSetDetail);
		} else {
			var editText = resourceModel.getProperty("EditSelect");
			sap.m.MessageToast.show(editText);
		}
	},

	onBeforeRendering : function() {
		if (!localStorage.getItem("oUser_Login") || !localStorage.getItem("oUser_Pwd")) {
			var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
			oRouter.navTo(routeLogin);
			var loginFirstText = resourceModel.getProperty("LoginFirst");
			sap.m.MessageToast.show(loginFirstText);
		}
	},
});