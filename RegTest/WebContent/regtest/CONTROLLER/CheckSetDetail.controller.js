sap.ui.controller("regtest.CONTROLLER.CheckSetDetail", {
	
	onBackCheckClick: function() {
		var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
		oRouter.navTo(routeCheckSetList);
	}, 
	
	onOKCheckClick: function() {
		var oEntry = {};		
		debugger;
		oEntry.id_check_set = escapeText(sap.ui.getCore().byId(idCheckSetIdInput).getValue());
		oEntry.name = escapeText(sap.ui.getCore().byId(idCheckSetName).getValue());
		oEntry.implementation_class = escapeText(sap.ui.getCore().byId(idCheckSetClass).getValue()); 
		var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
		var oModelCheckSet = sap.ui.getCore().getModel();
		if (oEntry.id_check_set == '') {
			oModelCheckSet.create(entityCheckSetSetName, oEntry);
			var addOKTxt = resourceModel.getProperty("AddOK")
			sap.m.MessageToast.show(addOKTxt); //ToDo according to result
			oRouter.navTo(routeCheckSetList);
		}  else { //update		
			var editOKTxt = resourceModel.getProperty("EditOK")
			var editFailTxt = resourceModel.getProperty("EditFail")
			oModelCheckSet.update(entityCheckSetSetName + "(" + sapCheckSetId + "='" + oEntry.id_check_set + "')", oEntry, {
				success : function(data) {
					sap.m.MessageToast.show(editOKTxt);
				},
				error : function(e) {
					sap.m.MessageToast.show(editFailTxt);
				}				
			});
			oModelCheckSet.refresh();
			oRouter.navTo(routeCheckSetList);
		}
	},

	onBeforeRendering : function() {
		try {
			oUser.Login = localStorage.getItem("oUser_Login");
			oUser.Pwd = localStorage.getItem("oUser_Pwd");
			oUser.hd1user = localStorage.getItem("oUser_hd1user");
			oUser.hd1pwd = localStorage.getItem("oUser_hd1pwd");
			validateUser(oUser);
			reloadModel(oUser);

			debugger;
			sap.ui.getCore().byId(idCheckSetIdInput).setValue(localStorage.getItem("choosenCheckSet_idCheckSet"));
			sap.ui.getCore().byId(idCheckSetName).setValue(localStorage.getItem("choosenCheckSet_name"));
			sap.ui.getCore().byId(idCheckSetClass).setValue(localStorage.getItem("choosenCheckSet_implementationClass"));
		} catch (err) {
			var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
			oRouter.navTo(routeLogin);
			var loginFirstText = resourceModel.getProperty("LoginFirst");
			sap.m.MessageToast.show(loginFirstText);
		}
	}
});