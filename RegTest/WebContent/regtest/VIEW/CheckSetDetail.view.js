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
		var btnOKCheck = new sap.m.Button("btnOKCheck", {
			text : "OK",
			icon : "sap-icon://save",
		    press:  oController.onOKCheckClick   });		

     	var btnBackCkeck = new sap.m.Button("btnBackCheck", {
			text : "Back",
			icon : "sap-icon://undo",
		    press:  oController.onBackCheckClick   });		

     	var fieldIDCheck = new sap.m.Input("idCheckIdField", {visible: false}); 

		var checkSetNameLabel = new sap.m.Label("idcheckSetName", {text: "CheckSetName"});
		var fieldName = new sap.m.Input("fldName");
		var panelcheckDetailName = new sap.m.Panel("idPanelCheckDetailName", {
			content : [
				checkSetNameLabel, fieldName           
			          ]
		});
		var checkSetClasNameLabel = new sap.m.Label("idcheckSetClasName", {text: "CheckSetClasName"});
		var fieldClasName = new sap.m.Input("fldImplClass");
		var panelcheckDetailClasName = new sap.m.Panel("idPanelCheckDetailClasName", {
			content : [
				checkSetClasNameLabel, fieldClasName           
			          ]
		});
		return new sap.m.Page({
			title: "Prufung-Sets Detail",
			content: [ btnOKCheck, btnBackCkeck, panelcheckDetailName, panelcheckDetailClasName
			]
		});
	}
});