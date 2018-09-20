sap.ui.controller("regtest.CONTROLLER.RegTest", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf regtest.RegTest
	 */
	onInit : function() {
		this.reloadModel();
	},
	onDblClick : function() {
	     oTable = sap.ui.getCore().byId('idRegTest');
	    // oTable.setSelectedIndex(window.selectedIndex);
	     this._oDialog = sap.ui.xmlfragment("com.tutorial.fragments.addDialog",this);
	     this._oDialog.open();
	// sap.m.MessageToast.show("ondoubleclick");
	},

	getUrl : function(sUrl) {
		if (sUrl == "")
			return sUrl;
		if (window.location.hostname == "localhost") {
			return "proxy" + sUrl;
		} else {
			return sUrl;
		}
	},

	onAddRegClick : function() {
		oSplitApp.toDetail("idRegTestDetail1");
	},

	onDelRegClick : function(oRegTable) {
		var selIndex = oRegTable.getSelectedIndex();

		if (selIndex != -1) {
			var rows = oRegTable.getRows();
			var cells = rows[selIndex].getCells();
			var idRegTest = cells[0].getValue();
			var oModelRegTest = sap.ui.getCore().getModel();
			oModelRegTest.remove("/REG_TEST_SET(id_reg_test='" + idRegTest
					+ "')", {
				method : "DELETE",
				success : function(data) {
					sap.m.MessageToast.show("Delete successfull");
				},
				error : function(e) {
					sap.m.MessageToast.show("Delete error");
				}
			});
			this.reloadModel();
			oSplitApp.toDetail("idRegTest1");
		} else {
			sap.m.MessageToast.show("Select a row to delete!");
		}
	},

	onEditRegClick : function(oRegTable) {
		var selIndex = oRegTable.getSelectedIndex();

		if (selIndex != -1) {
			var rows = oRegTable.getRows();
			var cells = rows[selIndex].getCells();

			sap.ui.getCore().byId("fldIDReg").setValue(cells[0].getValue());
			sap.ui.getCore().byId("fldName").setValue(cells[1].getValue());
			sap.ui.getCore().byId("areaXML").setValue(cells[2].getValue());

			oSplitApp.toDetail("idRegTestDetail1");
		} else {
			sap.m.MessageToast.show("Select a row to edit!");
		}
	},

	reloadModel : function() {
		// JSON Data
		
		  var oModel = new sap.ui.model.json.JSONModel();
		  oModel.loadData("regtest/JSON/RegTest_DATA.json");
		  sap.ui.getCore().setModel(oModel);
		 
		// SAP Data
/*		var oModel = new sap.ui.model.odata.ODataModel(this
				.getUrl("/sap/opu/odata/sap/Z_REG_TEST_SRV"), true, "stoma",
				"palipali89");
		sap.ui.getCore().setModel(oModel);
*/	},
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf regtest.RegTest
	 */
	onBeforeRendering : function() {
		this.reloadModel();
	},
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf regtest.RegTest
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf regtest.RegTest
 */
// onExit: function() {
//
// }
});