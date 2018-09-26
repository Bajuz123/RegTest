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
		oRouter.navTo("CheckSetDetail");
		sap.ui.getCore().byId("idCheckSetIdField").setValue("");		
	},
	onDelSetClick: function(oSetTable) {
		var selIndex = oSetTable.getSelectedIndex();
		
		if (selIndex != -1) {
			var boundObject = getTableSelectedObject(oSetTable ,selIndex);
			var idCheckSet = boundObject.id_check_set;	
			var oModelCheckSet = sap.ui.getCore().getModel();
			oModelCheckSet.remove("/CHCK_SET(id_check_set='" + idCheckSet

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
		} else {
			sap.m.MessageToast.show("Select a row to delete!");
		}
	},
		
	onEditSetClick: function(oSetTable) {
		var selIndex = oSetTable.getSelectedIndex();

		if (selIndex != -1) {
			var boundObject = getTableSelectedObject(oSetTable ,selIndex);		
			var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
			oRouter.navTo("CheckSetDetail");
			
			sap.ui.getCore().byId("idCheckSetIdField").setValue(boundObject.id_check_set);
			sap.ui.getCore().byId("fldName").setValue(boundObject.name);
			sap.ui.getCore().byId("fldImplClass").setValue(boundObject.implementation_class);
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