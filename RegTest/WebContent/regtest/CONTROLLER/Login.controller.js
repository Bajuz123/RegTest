sap.ui.controller("regtest.CONTROLLER.Login", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf regtest.Login
	 */
	onInit : function() {
		initLanguageLocale();
		sap.ui.getCore().setModel(i18nModel, "i18n");
		sap.ui.getCore().byId(idVersion).setText("Version " + regTestVersion);
	},

	onLoginClick : function() {
		oUser.Login = sap.ui.getCore().byId(idLoginName).getValue();
		oUser.Pwd = sap.ui.getCore().byId(idPwdField).getValue();
		localStorage.setItem("oUser_Login", oUser.Login);
		localStorage.setItem("oUser_Pwd", oUser.Pwd);
		debugger;
		var found = validateUser(oUser.Login, oUser.Pwd);
		if (found) {
			initNotificationService();
			loadModel(oUser);		
		} else {
			loadMockup();
		}
		var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
		oRouter.navTo(routeSplit);
		oRouter.navTo(routeRegTestList);	
	},

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf regtest.Login
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf regtest.Login
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf regtest.Login
 */
// onExit: function() {
//
// }
});