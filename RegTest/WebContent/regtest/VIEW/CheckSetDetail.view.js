sap.ui.jsview("regtest.VIEW.CheckSetDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf regtest.RegTestDetail
	*/ 
	getControllerName : function() {
		return "regtest.CONTROLLER.CheckSetDetail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf regtest.RegTestDetail
	*/ 
	
	createContent : function(oController) {	
		var btnOKCheck = new sap.m.Button(idCheckSetBtnOKCheck, {
			text : "{i18n>OK}",
			icon : iconSave,
		    press:  oController.onOKCheckClick});		

     	var btnBackCkeck = new sap.m.Button(idCheckSetBtnBackCheck, {
			text : "{i18n>Cancel}",
			icon : iconUndo,
		    press:  oController.onBackCheckClick});		

     	var fieldIDCheck = new sap.m.Input(idCheckSetIdInput, {visible: false}); 
		var checkSetNameLabel = new sap.m.Label(idcheckSetNameLabel, {text: "{i18n>CheckSetName}"});
		var fieldName = new sap.m.Input(idCheckSetName);
		var panelcheckDetailName = new sap.m.Panel(idPanelCheckDetailName, {
			content : [
				fieldIDCheck, checkSetNameLabel, fieldName           
			          ]
		});
		var checkSetClasNameLabel = new sap.m.Label(idCheckSetClassNameLabel, {text: "{i18n>CheckSetClassName}"});
		var fieldClasName = new sap.m.Input(idCheckSetClass);
		var panelcheckDetailClasName = new sap.m.Panel(idPanelCheckDetailClassName, {
			content : [
				checkSetClasNameLabel, fieldClasName           
			          ]
		});
		
		return new sap.m.Page({
			title: "{i18n>TitleCheckSetDetail}",
			content: [ btnOKCheck, btnBackCkeck, panelcheckDetailName, panelcheckDetailClasName ]
		});
	}
});