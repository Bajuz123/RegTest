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

function loadModel(oUser) {
	// SAP Data
	initLanguageLocale();

	var headers = {
		"X-CSRF-Token" : "fetch",
		"set-cookie" : "MYSAPSSO2"
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
		socket = new WebSocket('ws://' + oUser.hd1user + ':' + oUser.hd1pwd
				+ '@'
				+ 'ibssaphd1.ibs.local:8050/sap/bc/apc/sap/z_reg_test_push_ch');

		socket.onopen = function() {

		};
		socket.onmessage = function(dunningRunFeed) {
			if (dunningRunFeed.data !== undefined) {
				var message = JSON.parse(dunningRunFeed.data);
				var oMessage = new sap.ui.core.message.Message(message);

				sap.ui.getCore().byId(idToolbar).setVisible(true);
				var oMessageManager = sap.ui.getCore().getMessageManager();
				oMessageManager.addMessages([ oMessage ]);
			}
		};

		socket.onclose = function() {
		};

	} catch (exception) {
	}
}

function getMenuItem(itemName, itemText) {
	var item = sap.ui.getCore().byId(itemName);
	if (item == undefined) {
		item = new sap.m.MenuItem(itemName, {
			text : itemText
		})
	}
	;
	return item;
}

function getBtnMenu(viewName) {
	var item1 = getMenuItem(viewName + idMenuRegTest, "{i18n>BtnMenuRegTest}");
	var item2 = getMenuItem(viewName + idMenuCheckSet, "{i18n>BtnMenuCheckSet}");
	var item3 = getMenuItem(viewName + idMenuLogList, "{i18n>BtnMenuLog}");
	var item4 = getMenuItem(viewName + idMenuLogout, "{i18n>BtnMenuLogout}");

	return new sap.m.Menu({
		title : "idBtnMenu",
		itemSelected : function(oEvent) {
			var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
			var oItem = oEvent.getParameter("item"), sItemPath = "";
			var sId = oItem.sId;
			if (sId.includes(idMenuRegTest)) {
				oRouter.navTo(routeRegTestList);
			} else if (sId.includes(idMenuCheckSet)) {
				oRouter.navTo(routeCheckSetList);
			} else if (sId.includes(idMenuLogList)) {
				oRouter.navTo(routeLogList);
			} else if (sId.includes(idMenuLogout)) {
				oRouter.navTo(routeLogout);
			}
		},
		items : [ item1, item2, item3, item4 ]
	});
}

function isPhone() {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
			.test(navigator.userAgent)) {
	  return true;
	} else return false;
}

window.onbeforeunload = function(event) {
	localStorage.setItem("reloading", "true");
};

window.onload = function() {
    var reloading = localStorage.getItem("reloading");
    if (reloading) {
    	localStorage.removeItem("reloading");
		oUser.Login = localStorage.getItem("oUser_Login");
		oUser.Pwd = localStorage.getItem("oUser_Pwd");
		if (validateUser(oUser.Login, oUser.Pwd)) {
    		loadModel(oUser);
    		}
    }
}
