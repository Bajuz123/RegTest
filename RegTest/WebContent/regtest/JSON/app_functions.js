/**
 * 
 */
function reloadModel(oUser) {
	// SAP Data
	debugger;
		var oUser = {};
		var oModel = new sap.ui.model.odata.ODataModel(this
				.getUrl("/sap/opu/odata/sap/Z_REG_TEST_SRV"), true,
				oUser.hd1user, oUser.hd1pwd);
		sap.ui.getCore().setModel(oModel);

	    // JSON Data
/*		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData("regtest/JSON/RegTest_DATA.json");
		sap.ui.getCore().setModel(oModel);
		sap.m.MessageToast.show("Working offline with mockup!");
*/		
}

function getUrl(sUrl) {
	if (sUrl == "")
		return sUrl;
	if (window.location.hostname == "localhost") {
		return "proxy" + sUrl;
	} else {
		return sUrl;
	}
}