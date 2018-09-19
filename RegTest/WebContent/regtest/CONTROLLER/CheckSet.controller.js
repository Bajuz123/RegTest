sap.ui.controller("regtest.CONTROLLER.CheckSet", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf regtest.CheckSet
*/
	onInit: function() {
		//SAP Data
		  var oModel = new sap.ui.model.odata.ODataModel(this
		  .getUrl("/sap/opu/odata/sap/Z_REG_TEST_SRV"), true, "stoma", "palipali89"); 
		  this.getView().setModel(oModel);
	},
	
	getUrl : function(sUrl) {
		if (sUrl == "")
			return sUrl;
		if (window.location.hostname == "localhost") {
			return "proxy" + sUrl;
		} else {
			return sUrl;
		}
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf regtest.CheckSet
*/
//	onBeforeRendering: function() {
//
//	},

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