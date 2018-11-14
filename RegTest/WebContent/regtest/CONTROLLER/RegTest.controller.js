sap.ui.controller("regtest.CONTROLLER.RegTest", {

	onInit : function() {
		var oMessageManager = sap.ui.getCore().getMessageManager();
		this.getView().setModel(oMessageManager.getMessageModel(), "message");
	},

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
			oModelRegTest.refresh();
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

			localStorage.setItem("choosenRegTest_idRegTest",boundObject.id_reg_test);
			localStorage.setItem("choosenRegTest_name", boundObject.name);
			localStorage.setItem("choosenRegTest_XML", boundObject.xml);
			localStorage.setItem("choosenRegTest_active", boundObject.active);
			localStorage.setItem("choosenRegTest_variant", boundObject.variant);
			localStorage.setItem("choosenRegTest_last_run", boundObject.run_result);
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
		if (!localStorage.getItem("oUser_Login") || !localStorage.getItem("oUser_Pwd")) {
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
		
		var busy = sap.ui.getCore().byId(idBusyDialog)
		if ( typeof busy == 'undefined' ) {
			busy = new sap.m.BusyDialog(idBusyDialog, {
			 text : progressTxt,
			 title : progressTitleTxt
			});			
		}		
		
		busy.open();
		// setTimeout(function() {
		// busy.close();
		// }, 25000);

		var creditStartedOK = resourceModel.getProperty("creditStartedOK");
		var creditStartedFail = resourceModel.getProperty("creditStartedFail");

		var tabRegTest = this.getTableWithIds();
		oDataModel.callFunction(fiStartCredit, httpGet, {
			"flg_sync" : '',
			"tab_reg_test_id" : tabRegTest
		}, null, function(oData, response) {
			var busyDialog = sap.ui.getCore().byId(idBusyDialog)
			busyDialog.close();
			busyDialog.detachClose();
			sap.m.MessageToast.show(creditStartedOK);
		}, // callback function for success
		function(oError) {
			var busyDialog = sap.ui.getCore().byId(idBusyDialog)
			busyDialog.close();
			busyDialog.detachClose();
			sap.m.MessageToast.show(creditStartedFail);
		}); // callback function for error
//	    busy.close();
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