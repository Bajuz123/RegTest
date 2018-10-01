sap.ui.jsview("regtest.VIEW.Login", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf regtest.Login
	 */
	getControllerName : function() {
		return "regtest.CONTROLLER.Login";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf regtest.Login
	 */

	createBoxLogin : function(oController) {
		var vBoxLogin = new sap.m.VBox(idBoxLogin, {
			justifyContent : sap.m.FlexJustifyContent.Center,
			alignItems : sap.m.FlexAlignItems.Center,
			alignContent : sap.m.FlexAlignContent.Center,
			fitContainer : true
		});

		var fldLoginText = new sap.m.Label(idLoginText, {
			text : "{i18n>LoginInfo}"
		});

		var fldLoginName = new sap.m.Input(idLoginName, {
			width : "12rem"
		});

		fldLoginName.onsapenter = (function(oEvent) {
			oController.onLoginClick();
		});

		var btnLogin = new sap.m.Button(idBtnLogin, {
			text : "{i18n>Login}",
			type : sap.m.ButtonType.Emphasized,
			width : "12rem",
			press : oController.onLoginClick
		});

		var fldPwd = new sap.m.Input(idPwdField, {
			type : sap.m.InputType.Password,
			width : "12rem"
		});

		fldPwd.attachBrowserEvent("keydown", function(e) {
			if (e.keyCode == 13) {
				oController.onLoginClick();
			}
		});

		vBoxLogin.addItem(fldLoginText);
		vBoxLogin.addItem(fldLoginName);
		vBoxLogin.addItem(fldPwd);
		vBoxLogin.addItem(btnLogin);
		return vBoxLogin;
	},

	createContent : function(oController) {
		var vBoxLogin = this.createBoxLogin(oController);

		return new sap.m.Page({
			title : "{i18n>LoginTitle}",
			content : [ vBoxLogin ]
		});
	}

});