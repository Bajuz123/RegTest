/**
 * 
 */

function registerRouter(oRouter) {
	oGlobalRouter = oRouter;
}

function validateUser(oLogin, oPwd) {
	var found = false;
	for (var j = 0; j < Users.length; j++) {
		if (oLogin == Users[j].Login) {
			if (oPwd == Users[j].Pwd) {
				found = true;
				oUser = Users[j];
			}
		}
	}

	return found;
}

function reloadModel(oUser) {
	// SAP Data
		var oModel = new sap.ui.model.odata.ODataModel(this
				.getUrl("/sap/opu/odata/sap/Z_REG_TEST_SRV"), true,
				oUser.hd1user, oUser.hd1pwd);
		sap.ui.getCore().setModel(oModel);

	    // JSON Data
/*
		var oModel = new sap.ui.model.json.JSONModel();
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