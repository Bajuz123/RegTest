sap.ui.controller("regtest.CONTROLLER.CheckSetDetail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf regtest.RegTestDetail
*/
	onInit: function() {
	},

	onBackCheckClick: function() {
		sap.ui.getCore().byId("idCheckIdField").setValue("");		
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		oRouter.navTo("RegCheckSet");
	}, 
	
	onOKCheckClick: function() {
		var oEntry = {};		
		
//escape the texts first!!! sap.ui functionality
		oEntry.id_check_set = sap.ui.getCore().byId("idCheckIdField").getValue();
		oEntry.name = sap.ui.getCore().byId("fldName").getValue();
		oEntry.implementation_class = sap.ui.getCore().byId("fldImplClass").getValue(); 
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		var oModelCheckSet = sap.ui.getCore().getModel();
		if (oEntry.id_check_set == '') {
			oModelCheckSet.create("/CHCK_SET", oEntry);
			sap.m.MessageToast.show("Add successfull"); //ToDo according to result
			oRouter.navTo("RegCheckSet");
		}  else { //update
/*			oModelRegTest.update("/REG_TEST_SET(id_reg_test='" + oEntry.id_reg_test + "')", oEntry, {
				success : function(data) {
					sap.m.MessageToast.show("Update successfull");
				},
				error : function(e) {
					sap.m.MessageToast.show("Update error");
				}				
			});
	*/		oModelCheckSet.refresh();
			oRouter.navTo("RegCheckSet");
		}
		sap.ui.getCore().byId("fldIDReg").setValue("");		
	},
	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf regtest.RegTestDetail
*/
/*
	onBeforeRendering: function() {
		debugger;
		var id_reg_test = sap.ui.getCore().byId("fldIDReg").getValue();
		if (id_reg_test != '') {
			reloadModel(oUser);			
			var oPlaceTable = sap.ui.getCore().byId("idPlaceTable");
//			oPlaceTable.bindRows("/REG_PLACE_SET(id_reg_test='" + sap.ui.getCore().byId("fldIDReg").getValue() + "')");			
		}	
	},
*/
/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf regtest.RegTestDetail
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf regtest.RegTestDetail
*/
//	onExit: function() {
//	}

});