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
		if (selIndex != -1) {
			var boundObject = getTableSelectedObject(oRegTable, selIndex);

			localStorage.setItem("choosenRegTest_idRegTest",
					boundObject.id_reg_test);
			localStorage.setItem("choosenRegTest_name", boundObject.Name);
			localStorage.setItem("choosenRegTest_XML", boundObject.XML);

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

	onMessagePopoverPress : function(oEvent) {
		if (!this._oMessagePopover || !this._oMessagePopover.isOpen()) {
			this.getMessagePopover().openBy(oEvent);
			sap.ui.getCore().byId("clear_messages_btn").setVisible(true)
		} else {
			this.closeMessagePopover();
		}
	},

	getMessagePopover : function() {
		// create popover lazily (singleton)
		if (!this._oMessagePopover) {
			this._oMessagePopover = sap.ui.xmlfragment(
					"regtest.fragments.MessagePopover", this);
			this.getView().addDependent(this._oMessagePopover);
		}
		return this._oMessagePopover;
	},
	
	clearMessages : function() {
		sap.ui.getCore().getMessageManager().removeAllMessages();
	},
	
	closeMessagePopover: function() {
		this._oMessagePopover.close();
		sap.ui.getCore().byId("clear_messages_btn").setVisible(false)
	}

});