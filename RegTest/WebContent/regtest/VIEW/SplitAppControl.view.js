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
		debugger;
		var oSplitApp = new sap.m.SplitApp("idSplitAppControl", {});
	
/*		var oMenu 			= sap.ui.view({id:"idMenu", viewName:"regtest.VIEW.Menu", type:sap.ui.core.mvc.ViewType.JS});
		var oRegTest 		= sap.ui.view({id:"idRegTest", viewName:"regtest.VIEW.RegTest", type:sap.ui.core.mvc.ViewType.JS});
		oSplitApp.addMasterPage(oMenu);
		oSplitApp.addDetailPage(oRegTest);
		
		oSplitApp.setInitialDetail("idRegTest");
		oSplitApp.setInitialMaster("idMenu");
*/
		return [
   	      oSplitApp
		];

/*		var oCheckSet		= sap.ui.view({id:"idCheckSet1", viewName:"regtest.VIEW.CheckSet", type:sap.ui.core.mvc.ViewType.JS});
		var oRegTestDetail 	= sap.ui.view({id:"idRegTestDetail1", viewName:"regtest.VIEW.RegTestDetail", type:sap.ui.core.mvc.ViewType.JS});
		var oPageLogout  	= sap.ui.view({id:"idLogout", viewName:"regtest.VIEW.Logout", type:sap.ui.core.mvc.ViewType.JS});
		var oMenu 			= sap.ui.view({id:"idMenu1", viewName:"regtest.VIEW.Menu", type:sap.ui.core.mvc.ViewType.JS});
		    var oLog  			= sap.ui.view({id:"idLog1", viewName:"regtest.VIEW.Log", type:sap.ui.core.mvc.ViewType.JS});
		var oCheckSetDetail = sap.ui.view({id:"idCheckSetDetail1", viewName:"regtest.VIEW.CheckSetDetail", type:sap.ui.core.mvc.ViewType.JS});
		oSplitApp.setMode(sap.m.SplitAppMode.HideMode)
		oSplitApp.addDetailPage(oPageLogin);
		oSplitApp.addDetailPage(oPageLogout);
		oSplitApp.addDetailPage(oRegTest);
		oSplitApp.addDetailPage(oCheckSet);
		oSplitApp.addDetailPage(oRegTestDetail);
		oSplitApp.addDetailPage(oLog);
  	oSplitApp.addDetailPage(oCheckSetDetail);	       		
		oSplitApp.setInitialDetail("idLogin");
*/
	}

});