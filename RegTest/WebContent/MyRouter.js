var myroutes = [
    { name: "Login",
      pattern: "",
	  view: "regtest.VIEW.Login",
	  viewType: sap.ui.core.mvc.ViewType.JS,
	  targetControl: "appId",
	  clearTarget: false,
	  callback: function(){
		  myCallback(this);
	  }
    },
    { name: "Intro",
      pattern: "Intro",      
      view: "regtest.VIEW.RegTest",
  	  viewType: sap.ui.core.mvc.ViewType.JS,
	  targetControl: "appId",
  	  clearTarget: false,
  	  callback: function(){
  		  myCallback(this);
  	  }  
    },
    { name: "Logout",
      pattern: "Logout",      
      view: "regtest.VIEW.Logout",
      viewType: sap.ui.core.mvc.ViewType.JS,
  	  targetControl: "appId",
      clearTarget: true,
    	callback: function(){
   		  myCallback(this);
        }  
    },
    {
    	pattern:"SplitAppControl",
    	name:"Split",
    	view:"regtest.VIEW.SplitAppControl",
        viewType: sap.ui.core.mvc.ViewType.JS,
   		targetControl: "appId",
   		targetAggregation: "pages",
 		subroutes:[{
  				pattern: "SplitAppControl/",
   				name:"Menu",
   				view:"regtest.VIEW.Menu",
     		    viewType: sap.ui.core.mvc.ViewType.JS,
		   		targetControl: "idSplitAppControl",
		   		targetAggregation: "masterPages",
   		
	   		subroutes:[
	   		  {
	   				pattern: "SplitAppControl/",
	   				name:"RegTest",
	   				view:"regtest.VIEW.RegTest",
	   		        viewType: sap.ui.core.mvc.ViewType.JS,
	   		        targetControl: "idSplitAppControl",
			   		targetAggregation: "detailPages",
	   		  },
	   		  {
	   				pattern: "SplitAppControl/",
	   				name:"DetailCheck",
	   				view:"regtest.VIEW.CheckSet",
	   		        viewType: sap.ui.core.mvc.ViewType.JS,
	   		        targetControl: "idSplitAppControl",
			   		targetAggregation: "detailPages",
	   		  },	   	
	   		  {
	   				pattern: "SplitAppControl/",
	   				name:"DetailLog",
	   				view:"regtest.VIEW.Log",
	   		        viewType: sap.ui.core.mvc.ViewType.JS,
	   		        targetControl: "idSplitAppControl",
			   		targetAggregation: "detailPages",	   		
	   		  }
	   		]
    	}]    	
    }
];

var myCallback = function($this) {
	debugger;
	var viewId = "id" + $this.name;
	var view = sap.ui.getCore().byId(viewId);
	if (view==undefined) {
		view = sap.ui.view({
			id:viewId, 
			viewName:$this.view,
			type:sap.ui.core.mvc.ViewType.JS
		});
		app.addPage(view);
	}
	app.to(viewId);
}; 

var myMDCallback = function($this) {
/*	debugger;
	var viewId = "idSplitAppControl";
	var view = sap.ui.getCore().byId(viewId);
	if (view==undefined) {
		view = sap.ui.view({
			id:viewId, 
			viewName:$this.view,
			type:sap.ui.core.mvc.ViewType.JS
		});
		app.addPage(view);
	}

	var splitApp = sap.ui.getCore().byId(viewId);
	splitApp.setInitialMaster("idMenu");
	splitApp.setInitialDetail("idRegTest");
	splitApp.toMaster("idMenu");
	splitApp.toDetail("idRegTest");
	
	debugger;
	app.to("idLogout");
*/
}

var router = new sap.ui.core.routing.Router(myroutes);
router.register("appRouter");
router.initialize();
