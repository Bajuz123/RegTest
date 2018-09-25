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
    	pattern:"Split/{value}",
    	name:"Split",
    	view:"regtest.VIEW.SplitAppControl",
        viewType: sap.ui.core.mvc.ViewType.JS,
   		targetControl: "appId",
   	//	targetAggregation: "pages",
    	callback: function(){
     		  myCallback(this);
        },  
    	clearTarget: false,
		subroutes:[{
  				pattern: "Split/{value}",
   				name:"Menu",
   				view:"regtest.VIEW.Menu",
     		    viewType: sap.ui.core.mvc.ViewType.JS,
		   		targetControl: "idSplitAppControl",
		   		targetAggregation: "masterPages",
   		
	   		subroutes:[
	   		  {
	   				pattern: "RegTest",
	   				name:"RegTest",
	   				view:"regtest.VIEW.RegTest",
	   		        viewType: sap.ui.core.mvc.ViewType.JS,
	   		        targetControl: "idSplitAppControl",
//			   		targetAggregation: "detailPages",
			    	callback: function(){
			     		  myMDCallback(this);
			          }  
	   		  },
	   		  {
	   				pattern: "RegTestDetail",
	   				name:"RegTestDetail",
	   				view:"regtest.VIEW.RegTestDetail",
	   		        viewType: sap.ui.core.mvc.ViewType.JS,
	   		        targetControl: "idSplitAppControl",
//			   		targetAggregation: "detailPages",
			    	callback: function(){
			     		  myMDCallback(this);
			          }  
	   		  },
	   		  {
	   				pattern: "CheckSetDetail",
	   				name:"CheckSetDetail",
	   				view:"regtest.VIEW.CheckSetDetail",
	   		        viewType: sap.ui.core.mvc.ViewType.JS,
	   		        targetControl: "idSplitAppControl",
//			   		targetAggregation: "detailPages",
			    	callback: function(){
			     		  myMDCallback(this);
			          }  
	   		  },	   		  
	   		  {
	   				pattern: "RegCheckSet",
	   				name:"RegCheckSet",
	   				view:"regtest.VIEW.CheckSet",
	   		        viewType: sap.ui.core.mvc.ViewType.JS,
	   		        targetControl: "idSplitAppControl",
//			   		targetAggregation: "detailPages",
			    	callback: function(){
			     		  myMDCallback(this);
			          }  
	   		  },	   	
	   		  {
	   				pattern: "DetailLog",
	   				name:"DetailLog",
	   				view:"regtest.VIEW.Log",
	   		        viewType: sap.ui.core.mvc.ViewType.JS,
	   		        targetControl: "idSplitAppControl",
//			   		targetAggregation: "detailPages",	   		
			    	callback: function(){
			     		  myMDCallback(this);
			          }  
	   		  }
	   		]
    	}]    	
    }
];

var myCallback = function($this) {
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
	var viewId = "id" + $this.name; 
	var view = sap.ui.getCore().byId(viewId);
	var oSplitApp = sap.ui.getCore().byId("idSplitAppControl");
		
	if (view==undefined) {
		view = sap.ui.view({
			id:viewId, 
			viewName:$this.view,
			type:sap.ui.core.mvc.ViewType.JS
		});
		oSplitApp.addDetailPage(view);
	}
	oSplitApp.toDetail(viewId);	
}

var router = new sap.ui.core.routing.Router(myroutes);
router.register("appRouter");
router.initialize();
