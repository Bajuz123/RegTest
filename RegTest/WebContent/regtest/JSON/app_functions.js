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
		
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", getUrl(dataServiceName), false, oLogin, oPwd); // false for synchronous request
    xmlHttp.send( null );
    if ( xmlHttp.status == 200 ){ 
    	return true;
    }
    else
    	return false;
}

function loadModel(oUser) {
	// SAP Data
	initLanguageLocale();

	var headers = {
		"X-CSRF-Token" : "fetch",
		"set-cookie" : "MYSAPSSO2"
	};

	var oModel = new sap.ui.model.odata.ODataModel(
			this.getUrl(dataServiceName), true, headers, true);

	oModel.refreshSecurityToken();

	var oModel = new sap.ui.model.odata.ODataModel(
			this.getUrl(dataServiceName), true );

	var data = oModel.read(entityRegTestSetName, {
		error : function(oError) {
			oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData(jSONDataName);
			sap.ui.getCore().setModel(oModel);
			sap.m.MessageToast.show("Working with Mockup");
		}
	});
	sap.ui.getCore().setModel(oModel);

}

function loadMockup() {
	// SAP Data
	initLanguageLocale();

	oModel = new sap.ui.model.json.JSONModel();
	oModel.loadData(jSONDataName);
	sap.ui.getCore().setModel(oModel);
	sap.ui.getCore().setModel(oModel);
	
	var text = resourceModel.getProperty("LoginFailed") + ". " + resourceModel.getProperty("OfflineTxt");
	sap.m.MessageToast.show(text);
}

function getUrl(sUrl) {
	if (sUrl == "")
		return sUrl;
	if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(window.location.hostname) == true && sUrl == logoffService)
		return "http://" + window.location.hostname + "/logoff";
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
		socket = new WebSocket('ws://' + oUser.Login + ':' + oUser.Pwd
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
		if( oUser.Login &&  oUser.Pwd ){
			var found = validateUser(oUser.Login, oUser.Pwd);
			if (found) {
				initNotificationService();
				loadModel(oUser);		
			} else {
				loadMockup();
			}
		}
    }
}
