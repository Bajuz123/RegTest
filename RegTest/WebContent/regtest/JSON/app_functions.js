/**
 * 
 */

function escapeText(text) {
	text = text.replace(/<script/g, '_');
	text = text.replace(/script/g, '_');
	text = text.replace(/<img/g, '_');
	text = text.replace(/img>/g, '_');

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

	var headers = {
		"X-CSRF-Token" : "fetch"
	};

	var oModel = new sap.ui.model.odata.ODataModel(
			this.getUrl(dataServiceName), true, oUser.hd1user, oUser.hd1pwd,
			headers, true);

	oModel.refreshSecurityToken();

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
	if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(window.location.hostname) == true)
		return "http://" + window.location.hostname + "/hd1";
	switch (window.location.hostname) {
	case "localhost":
		return "proxy" + sUrl;
	default:
		return sUrl;
	}
}

function initNotificationService() {
	try {
		oModel = sap.ui.getCore().getModel();

		sap.ui.require("sap/ui/core/ws/WebSocket");
		socket = new WebSocket(
				'ws://ibssaphd1.ibs.local:8050/sap/bc/apc/sap/z_reg_test_push_ch');

		socket.onopen = function() {

		};
		socket.onmessage = function(dunningRunFeed) {
			if (dunningRunFeed.data !== undefined) {
				var message = JSON.parse(dunningRunFeed.data);
				var oMessage = new sap.ui.core.message.Message(message);

				var oMessageManager = sap.ui.getCore().getMessageManager()
						.addMessages([ oMessage ]);
			}
		};

		socket.onclose = function() {
		};

	} catch (exception) {
	}
}
