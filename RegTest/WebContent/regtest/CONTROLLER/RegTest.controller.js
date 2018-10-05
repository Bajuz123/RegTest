sap.ui.controller("regtest.CONTROLLER.RegTest", {
	onAddRegClick : function() {
		localStorage.setItem("choosenRegTest_idRegTest", "");
		localStorage.setItem("choosenRegTest_name", "");
		localStorage.setItem("choosenRegTest_XML", "");

		var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
		oRouter.navTo(routeRegTestDetail);
	},

	onDelRegClick : function(oRegTable) {
		var selIndex = oRegTable.getSelectedIndex();

		if (selIndex != -1) {
			var boundObject = getTableSelectedObject(oRegTable, selIndex);
			var idRegTest = boundObject.id_reg_test;
			var oModelRegTest = sap.ui.getCore().getModel();

			var deleteOKText = resourceModel.getProperty("DeleteOK");
			var deleteFailText = resourceModel.getProperty("DeleteFail");

			oModelRegTest.remove(entityRegTestSetName + "(" + sapRegTestId
					+ "='" + idRegTest + "')", {
				method : methodDelete,
				success : function(data) {
					sap.m.MessageToast.show(deleteOKText);
				},
				error : function(e) {
					sap.m.MessageToast.show(deleteFailText);
				}
			});
			reloadModel(oUser);
			var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
			oRouter.navTo(routeRegTestList);
		} else {
			var deleteSelectText = resourceModel.getProperty("DeleteSelect");
			sap.m.MessageToast.show(deleteSelectText);
		}
	},

	onEditRegClick : function(oRegTable) {
		var selIndex = oRegTable.getSelectedIndex();
		if (selIndex != "-1") {
			var boundObject = getTableSelectedObject(oRegTable, selIndex);

			localStorage.setItem("choosenRegTest_idRegTest",
					boundObject.id_reg_test);
			localStorage.setItem("choosenRegTest_name", boundObject.Name);
			localStorage.setItem("choosenRegTest_XML", boundObject.XML);
			localStorage.setItem("choosenRegTest_active", boundObject.active);

			var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
			oRouter.navTo(routeRegTestDetail);

			var oRegDetailView = sap.ui.getCore().byId(viewRegTestDetail);
			oRegDetailView.getController().refreshRelatedTables();
		} else {
			var editText = resourceModel.getProperty("EditSelect");
			sap.m.MessageToast.show(editText);
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
		} catch (err) {
			var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
			oRouter.navTo(routeLogin);
			var loginFirstText = resourceModel.getProperty("LoginFirst");
			sap.m.MessageToast.show(loginFirstText);
		}
	},
	onRunRegsClick : function(oRegTable) {
		var oDataModel = sap.ui.getCore().getModel();

		var progressTxt = resourceModel.getProperty("Progress");
		var progressTitleTxt = resourceModel.getProperty("ProgressTitle");

		var busy = new sap.m.BusyDialog(idBusyDialog, {
			text : progressTxt,
			title : progressTitleTxt
		});
		busy.open();
		// setTimeout(function() {
		// busy.close();
		// }, 25000);

		var creditStartedOK = resourceModel.getProperty("creditStartedOK");
		var creditStartedFail = resourceModel.getProperty("creditStartedFail");

		var tabRegTest = this.getTableWithIds();
		oDataModel.callFunction(fiStartCredit, httpGet, {
			"flg_synchron" : '',
			"tab_reg_test_id" : tabRegTest
		}, null, function(oData, response) {
			var busyDialog = sap.ui.getCore().byId(idBusyDialog)
			busyDialog.close();
			sap.m.MessageToast.show(creditStartedOK);
		}, // callback function for success
		function(oError) {
			var busyDialog = sap.ui.getCore().byId(idBusyDialog)
			busyDialog.close();
			sap.m.MessageToast.show(creditStartedFail);
		}); // callback function for error
	},
	changeAll: function() {
		var oTable = sap.ui.getCore().byId(idRegTestTable);
		//ToDo get checked Rows and revert selection
	},
	getTableWithIds: function () {
		var tabIds = "";
		var oTable = sap.ui.getCore().byId(idRegTestTable);	
		var oRowsBinding = oTable.getBinding(rowDefaultValue);
		var length = oRowsBinding.getLength();

		for (i = 0; i < length; i++) {
		  var context = oTable.getContextByIndex(i);
		  var boundObject = context.getProperty(context.getPath());
		  if (boundObject.active == true) { 
		    tabIds = tabIds + boundObject.id_reg_test + ',';
		  }
		};
		if (tabIds.length > 0) {
			tabIds = tabIds.substr(0 , tabIds.length - 1);
		}
			
		return tabIds;
	}
});