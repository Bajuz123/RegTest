sap.ui.controller("regtest.CONTROLLER.Menu", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf regtest.VIEW.Menu
*/
//	onInit: function() {
//
//	},
	itemSelected: function(oList) {
		var name = oList.getSelectedItem().getId();
		switch (oList.getSelectedItem().getId()) {
		  case "sItem1":
			  var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
			  oRouter.navTo("RegTest", {value:1});
			  break;
		  case "sItem2":
			  debugger;
			  var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
			  oRouter.navTo("DetailCheck", {value:2});
			  break;
		  case "sItem3":
			  debugger;
			  var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
			  oRouter.navTo("DetailLog", {value:3});
			  break;
		  case "sItem4":
	 		  var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
  			  oRouter.navTo("Logout");
 
/*			  oSplitApp.toDetail("idLogout");
			  oSplitApp.removeMasterPage("idMenu1");
       		  oSplitApp.setMode(sap.m.SplitAppMode.HideMode);
			  oSplitApp.toMaster("");
*/			  break;
		  default: 
			  oSplitApp.toDetail("idRegTest1");
			  break;	  
		}
	}
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf regtest.VIEW.Menu
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf regtest.VIEW.Menu
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf regtest.VIEW.Menu
*/
//	onExit: function() {
//
//	}

});