/**
 * 
 */

function escapeText(text) {
	text = text.replace("<", "_");
	text = text.replace(">", "_");

	return text;
}

function initLanguageLocale() {
	i18nModel = new sap.ui.model.resource.ResourceModel({
		bundleName : bundlePath
	});
	resourceModel = sap.ui.getCore().getModel("i18n");
}

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
				localStorage.setItem("oUser_Login", oUser.Login);
				localStorage.setItem("oUser_Pwd", oUser.Pwd);
				localStorage.setItem("oUser_hd1user", oUser.hd1user);
				localStorage.setItem("oUser_hd1pwd", oUser.hd1pwd);
				break;
			}
		}
	}

	return found;
}

function reloadModel(oUser) {
	// SAP Data
	initLanguageLocale();
	var oModel = new sap.ui.model.odata.ODataModel(
			this.getUrl(dataServiceName), true, oUser.hd1user, oUser.hd1pwd);

	if ((oUser != "null") && (oUser.hd1user != "null")) {
		var data = oModel.read(entityRegTestSetName, {
			error : function(oError) {
				oModel = new sap.ui.model.json.JSONModel();
				oModel.loadData(jSONDataName);
				sap.ui.getCore().setModel(oModel);
				sap.m.MessageToast.show("Working with Mockup");
			}
		});
		sap.ui.getCore().setModel(oModel);
	} else {
		throw "user_invalid";
	}
}

function getUrl(sUrl) {
	if (sUrl == "")
		return sUrl;
	switch (window.location.hostname) {
	case "192.168.1.211":
		return "http://ibssaphd1.ibs.local:8050" + sUrl;
	case "localhost":
		return "proxy" + sUrl;
	default:
		return sUrl;
	}
}