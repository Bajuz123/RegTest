sap.ui.controller("regtest.CONTROLLER.Login", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf regtest.Login
*/
//	onInit: function() {
//
//	},

    onLoginClick : function() {
    	const Users = { "test": "test", "new" : "new"};

/*
    	var oUserModel = new sap.ui.model.json.JSONModel();
    	oUserModel.loadData("regtest/JSON/Users.json");
    	var jUser = oUserModel.parseJSON();
*/    	
    	oLogin 	= sap.ui.getCore().byId("idLoginName").getValue();
    	oPwd 	= sap.ui.getCore().byId("idPwdField").getValue();
    	
    	const keys = Object.keys(Users);
    	index = keys.indexOf(oLogin);
    	if (index != -1 ){
        	const values = Object.values(Users);
    		if ( values.indexOf(oPwd) == index ) {
        		oSplitApp.addMasterPage(oMenu);
        		oSplitApp.setInitialMaster("idMenu1");        		
        		oSplitApp.toDetail("idRegTest1");
        		oSplitApp.setMode(sap.m.SplitAppMode.ShowHideMode)
    		} else {
        		sap.m.MessageToast.show("Login failed");    		    			
    		}    			
    	} else {
    		sap.m.MessageToast.show("Login failed");    		
    	}   		
    },		

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf regtest.Login
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf regtest.Login
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf regtest.Login
*/
//	onExit: function() {
//
//	}

});