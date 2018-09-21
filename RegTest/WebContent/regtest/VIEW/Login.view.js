sap.ui.jsview("regtest.VIEW.Login", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf regtest.Login
	*/ 
	getControllerName : function() {
		return "regtest.CONTROLLER.Login";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf regtest.Login
	*/ 
	createContent : function(oController) {						
		var vBoxLogin = new sap.m.VBox("vBoxLogin", {
			justifyContent : sap.m.FlexJustifyContent.Center,
			alignItems: sap.m.FlexAlignItems.Center,
			alignContent: sap.m.FlexAlignContent.Center,
			fitContainer: true
		});

 		var fldLoginText = new sap.m.Label("idLoginText", 
 				{text: "Use your login and password"});
 		var fldLoginName = new sap.m.Input("idLoginName", {
			 width : "12rem"
 		});
		var fldPwd = new sap.ui.commons.PasswordField("idPwdField", {
			 width : "12rem"			
		});
		
		var btnLogin = new sap.m.Button("btnLogin", {
			text : "Login",
			type : sap.m.ButtonType.Emphasized,
			width : "12rem",
		    press:  oController.onLoginClick   });		
		
		vBoxLogin.addItem(fldLoginText);
		vBoxLogin.addItem(fldLoginName);
		vBoxLogin.addItem(fldPwd);
		vBoxLogin.addItem(btnLogin);
		
		return new sap.m.Page({
			title: "Login",
			content: 
				//[panelLogin]
				[vBoxLogin]
		});
	}

});