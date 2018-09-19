RegTestDetail.view.js

sap.ui.jsview("regtest.VIEW.RegTestDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf regtest.RegTestDetail
	*/ 
	getControllerName : function() {
		return "regtest.CONTROLLER.RegTestDetail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf regtest.RegTestDetail
	*/ 
	createContent : function(oController) {	
		var btnAdd = sap.m.Button("btnAdd", {
			text : "Add Datei",
			icon : "sap-icon://add",
		    press:  oController.onAddClick   });		
		
		var fieldName = sap.m.Input("fldName");
		var areaXML   = sap.m.TextArea("areaXML");
		
		return new sap.m.Page({
			title: "RegTest Detail",
			content: [
			  btnAdd, fieldName, areaXML
			]
		});
	}

});