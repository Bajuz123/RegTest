var myroutes = [ {
	name : "Login",
	pattern : "",
	view : "regtest.VIEW.Login",
	viewType : sap.ui.core.mvc.ViewType.JS,
	targetControl : "appId",
	clearTarget : false,
	callback : function() {
		myCallback(this);
	}
}, {
	name : "Logout",
	pattern : "Logout",
	view : "regtest.VIEW.Logout",
	viewType : sap.ui.core.mvc.ViewType.JS,
	targetControl : "appId",
	clearTarget : true,
	callback : function() {
		myCallback(this);
	}
}, {
	pattern : "Split",
	name : "SplitAppControl",
	view : "regtest.VIEW.SplitAppControl",
	viewType : sap.ui.core.mvc.ViewType.JS,
	targetControl : "appId",
	// targetAggregation: "pages",
	callback : function() {
		myCallback(this);
	},
	clearTarget : false,
	subroutes : [ {
		pattern : "Split",
		name : "Menu",
		view : "regtest.VIEW.Menu",
		viewType : sap.ui.core.mvc.ViewType.JS,
		targetControl : "idSplitAppControl",
		targetAggregation : "masterPages",

		subroutes : [ {
			pattern : "RegTest",
			name : "RegTest",
			view : "regtest.VIEW.RegTest",
			viewType : sap.ui.core.mvc.ViewType.JS,
			targetControl : "idSplitAppControl",
			// targetAggregation: "detailPages",
			callback : function() {
				myMDCallback(this);
			}
		}, {
			pattern : "RegTestDetail",
			name : "RegTestDetail",
			view : "regtest.VIEW.RegTestDetail",
			viewType : sap.ui.core.mvc.ViewType.JS,
			targetControl : "idSplitAppControl",
			// targetAggregation: "detailPages",
			callback : function() {
				myMDCallback(this);
			}
		}, {
			pattern : "CheckSetDetail",
			name : "CheckSetDetail",
			view : "regtest.VIEW.CheckSetDetail",
			viewType : sap.ui.core.mvc.ViewType.JS,
			targetControl : "idSplitAppControl",
			// targetAggregation: "detailPages",
			callback : function() {
				myMDCallback(this);
			}
		}, {
			pattern : "CheckSet",
			name : "CheckSet",
			view : "regtest.VIEW.CheckSet",
			viewType : sap.ui.core.mvc.ViewType.JS,
			targetControl : "idSplitAppControl",
			// targetAggregation: "detailPages",
			callback : function() {
				myMDCallback(this);
			}
		}, {
			pattern : "Log",
			name : "Log",
			view : "regtest.VIEW.Log",
			viewType : sap.ui.core.mvc.ViewType.JS,
			targetControl : "idSplitAppControl",
			// targetAggregation: "detailPages",
			callback : function() {
				myMDCallback(this);
			}
		} ]
	} ]
} ];

var createView = function(viewId, viewName) {
	view = sap.ui.view({
		id : viewId,
		viewName : viewName,
		type : sap.ui.core.mvc.ViewType.JS
	});
	return view;
}

var myCallback = function($this) {
	var viewName = "regtest.VIEW." + $this.name;

	var viewId = "id" + viewName;
	var view = sap.ui.getCore().byId(viewId);

	if (viewName != "regtest.VIEW.SplitAppControl") {
		if (view != undefined) {			
			view.destroy();
			view = createView(viewId, viewName);
			app.addPage(view);
		} else {
			view = createView(viewId, viewName);
			app.addPage(view);			
		}
	} else {
		if (view == undefined) {
			view = createView(viewId, viewName);
			app.addPage(view);
		}
	}
	app.to(viewId);
};

var myMDCallback = function($this) {
	debugger;
	var viewName = "regtest.VIEW." + $this.name;
	var viewId = "id" + viewName;
	var view = sap.ui.getCore().byId(viewId);
	var oSplitApp = sap.ui.getCore().byId("idSplitAppControl");

	if (view != undefined) {
		oSplitApp.removeDetailPage(view);		
		//view.destroy();		
	} else {
	    view = createView(viewId, viewName);
	}
	oSplitApp.addDetailPage(view);
	oSplitApp.toDetail(viewId);
}

var router = new sap.ui.core.routing.Router(myroutes);
router.register("appRouter");
router.initialize();
