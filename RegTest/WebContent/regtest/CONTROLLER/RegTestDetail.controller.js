TegTestDetail.controller.js

sap.ui.controller("regtest.CONTROLLER.RegTestDetail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf regtest.RegTestDetail
*/
	onInit: function() {
		  var oModel = new sap.ui.model.odata.ODataModel(this
				  .getUrl("/sap/opu/odata/sap/Z_REG_TEST_SRV"), true, "jbreza", "majka123"); 
				  this.getView().setModel(oModel);
	},

	onAddClick: function() {
//		alert(" Neu Datei xxx");
		
		//read view fields
		var oList = {};
		var oEntry = {};
	//	oEntry.Name = document.getElementById("fldName");
		oList = this.getView().byId("fldName").
		oEntry.Name = oList.getText().
	//	oEntry.Name = document.getById("fldName").getText();
	//	oEntry.XML  = document.getById("areaXML").getText();
	 // MockUp	
	//	oEntry.Name = "RegTest1";
		oEntry.XML = "Xmlxml";
	//	var oModel = sap.ui.getCore().getModel();
		//entity - do ktorej idu precitane data zapisane na ui
		jQuery.sap.require("sap.ui.commons.MessageBox");
		debugger;
		var oModel = this.getModel();
		
		oModel.create("/REG_TEST_SET", oEntry);
	},
	getUrl : function(sUrl) {
		if (sUrl == "")
			return sUrl;
		if (window.location.hostname == "localhost") {
			return "proxy" + sUrl;
		} else {
			return sUrl;
		}
	}
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf regtest.RegTestDetail
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf regtest.RegTestDetail
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf regtest.RegTestDetail
*/
//	onExit: function() {
//
//	}

});