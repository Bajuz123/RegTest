/**
 * 
 */
function getTableSelectedObject(oTable, oSelIndex) {
	var bind = oTable.getBinding("rows");
	var context = oTable.getContextByIndex(oSelIndex);
	var boundObject = context.getProperty(context.getPath());
	return boundObject;
}

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
			.getUrl("/sap/opu/odata/sap/Z_REG_TEST_SRV"), true, oUser.hd1user,
			oUser.hd1pwd);

	var data = oModel.read('REG_TEST_SET', {
		error : function(oError) {
			oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("regtest/JSON/RegTest_DATA.json");
			sap.ui.getCore().setModel(oModel);
			sap.m.MessageToast.show("Working offline with mockup!");
		}
	});
	sap.ui.getCore().setModel(oModel);
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