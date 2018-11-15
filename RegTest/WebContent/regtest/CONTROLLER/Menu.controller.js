sap.ui.controller("regtest.CONTROLLER.Menu", {	
	onInit : function() {
        var oMessageManager = sap.ui.getCore().getMessageManager();
        this.getView().setModel(oMessageManager.getMessageModel(), "message");
	},

	itemSelected : function(oList) {
		var name = oList.getSelectedItem().getId();
		var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
		switch (oList.getSelectedItem().getId()) {
		case "sItem1":
			oRouter.navTo(routeRegTestList);
			break;
		case "sItem2":
			oRouter.navTo(routeCheckSetList);
			break;
		case "sItem3":
			oRouter.navTo(routeLogList);
			break;
		case "sItem4":
			var oDataModel = sap.ui.getCore().getModel();

			var forceOK = resourceModel.getProperty("forceOK");
			var forceFail = resourceModel.getProperty("forceFail");
			
			oDataModel.callFunction(fiForceJob, httpPost,null, null, function(oData, response) {
				var busyDialog = sap.ui.getCore().byId(
						idBusyDialog)
				busyDialog.close();
				sap.m.MessageToast.show(forceOK);
			}, // callback function for success
			function(oError) {
				var busyDialog = sap.ui.getCore().byId(
						idBusyDialog)
				busyDialog.close();
				sap.m.MessageToast.show(forceFail);
			}); // callback function for error
			break;
		case "sItem5":
			oRouter.navTo(routeLogout);
			window.setTimeout(oRouter.navTo(routeLogin),3000);					
			break;
		default:
			oRouter.navTo(routeRegTestList);
			break;
		}
	},

	onLangClick : function(langu) {
		sap.ui.getCore().getConfiguration().setLanguage(langu);
		initLanguageLocale();
		sap.ui.getCore().setModel(i18nModel, "i18n");
	},

	onMessagePopoverPress : function(oEvent) {
		if (!this._oMessagePopover || !this._oMessagePopover.isOpen()) {
			this.getMessagePopover().openBy(oEvent);
			sap.ui.getCore().byId(idBtnClearMessages).setVisible(true)
		} else {
			this.closeMessagePopover();
		}
	},

	getMessagePopover : function() {
		// create popover lazily (singleton)
		if (!this._oMessagePopover) {
			this._oMessagePopover = sap.ui
					.xmlfragment(fragMessagePopover, this);
			this.getView().addDependent(this._oMessagePopover);
		}
		return this._oMessagePopover;
	},

	clearMessages : function() {
		// sap.ui.getCore().getMessageManager().removeAllMessages();
		this.removeNotificationFromBackend();
	},

	closeMessagePopover : function() {
		this._oMessagePopover.close();
// sap.ui.getCore().byId(idBtnClearMessages).setVisible(false);
	},
	
	removeNotificationFromBackend : function(notificationId) {
		
		var oDataModel = sap.ui.getCore().getModel();
		oDataModel.callFunction(fiRemoveNotification, httpPost, {
			"notification_id" : notificationId,
		}, null, function(oData, response) {
			
			sap.ui.getCore().getMessageManager().removeAllMessages(); 
	
			sap.ui.getCore().byId(idToolbar).setVisible(false);
			sap.ui.getCore().byId(idBtnClearMessages).setVisible(false);
			
		}, // callback function for success
		function(oError) {
		}); // callback function for error
	}

});
/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf regtest.VIEW.Menu
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf regtest.VIEW.Menu
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf regtest.VIEW.Menu
 */
// onExit: function() {
//
// }
