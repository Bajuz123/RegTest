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
 		var fldLoginText = new sap.m.Label("idLoginText", {text: "Name"});
 		var fldLoginName = new sap.m.Input("idLoginName");
 		var fldPwdText = new sap.m.Label("idPwdText", {text: "Password"});
		var fldPwd = new sap.ui.commons.PasswordField("idPwdField");
		
		var btnLogin = new sap.m.Button("btnLogin", {
			text : "Login",
		    press:  oController.onLoginClick   });		
		
		var panelLogin = sap.ui.commons.Panel("idLoginPanel", {
			content : [fldLoginText, fldLoginName, fldPwdText, fldPwd, btnLogin]
		});		
		
		return new sap.m.Page({
			title: "Login",
			content: [panelLogin]
		});
	}

});