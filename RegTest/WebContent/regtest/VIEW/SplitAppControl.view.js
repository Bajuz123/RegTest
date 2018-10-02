sap.ui.jsview("regtest.VIEW.SplitAppControl", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf regtest.splittApp
	*/ 
	getControllerName : function() {
		return "regtest.CONTROLLER.SplitAppControl";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf regtest.splittApp
	*/ 
	createContent : function(oController) {
		var oSplitApp = new sap.m.SplitApp(idSplitAppControl, {});
		return [ oSplitApp];
	}
});