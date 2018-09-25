sap.ui.controller("regtest.CONTROLLER.RegTestDetail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf regtest.RegTestDetail
*/
	onInit: function() {
	},

	onBackRegClick: function() {
		sap.ui.getCore().byId("fldIDReg").setValue("");		
		var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
		oRouter.navTo("RegTest");
	},
	
	onOKRegClick: function() {
		var oEntry = {};		
		
//escape the texts first!!! sap.ui functionality
		oEntry.id_reg_test = sap.ui.getCore().byId("fldIDReg").getValue();
		oEntry.Name = sap.ui.getCore().byId("fldName").getValue();
		oEntry.XML = sap.ui.getCore().byId("areaXML").getValue();
		var oModelRegTest = sap.ui.getCore().getModel();

		if ( oEntry.id_reg_test == '' ) { //insert
			oModelRegTest.create("/REG_TEST_SET", oEntry);
			sap.m.MessageToast.show("Add successfull");
			var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
			oRouter.navTo("RegTest");
		} else { //update
			debugger;			
			oModelRegTest.update("/REG_TEST_SET(id_reg_test='" + oEntry.id_reg_test + "')", oEntry, {
				success : function(data) {
					sap.m.MessageToast.show("Update successfull");
				},
				error : function(e) {
					sap.m.MessageToast.show("Update error");
				}				
			});
			oModelRegTest.refresh();
			var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
			oRouter.navTo("RegTest");
		}
		sap.ui.getCore().byId("fldIDReg").setValue("");		
	},
	
    onRunClick : function() {
		var regTestID = sap.ui.getCore().byId("fldIDReg").getValue();		

		var oDataModel = sap.ui.getCore().getModel();
		debugger;
		oDataModel.callFunction("START_CREDIT", // function import name
                "GET", // http method
                {"id_reg_test" : regTestID  }, // function import parameters
                null,        
                function(oData, response) { 
					sap.m.MessageToast.show("Credit start successfull");                	
                }, // callback function for success
                function(oError){
					sap.m.MessageToast.show("Credit start failed");
                } ); // callback function for error		
    },		

    onPlaceholderClick : function() {
		sap.ui.getCore().byId("idListRelatedCheck").setVisible(false);
		sap.ui.getCore().byId("idListRelatedPlace").setVisible(true);
    },		

    onCheckSetClick : function() {
		sap.ui.getCore().byId("idListRelatedCheck").setVisible(true);
		sap.ui.getCore().byId("idListRelatedPlace").setVisible(false);
    },
    
    onAddCheckClick: function(){   	
	   
    },	

    onDelCheckClick: function() {
    	
    },		

    onEditCheckClick: function() {
    	
    },		

	onAddPlaceClick: function() {
	     if(!this._oDialog){
	     this._oDialog = sap.ui.xmlfragment("regtest.VIEW.RegTestDetail","regtest.fragments.addDialog", this);
	     }
         this._oDialog.open();
	},		

	onDelPlaceClick: function() {
		  if(!this._oDialog){
		this._oDialog = sap.ui.xmlfragment("regtest.fragments.delDialog",this);
		  }
	     this._oDialog.open(); 
	},	
	dialogAfterclose: function(oEvent) {
	    this._oDialog.destroy();
	},

	onEditPlaceClick: function() {
		  if(!this._oDialog){
		this._oDialog = sap.ui.xmlfragment("regtest.fragments.updDialog",this);
		  }
		
	     this._oDialog.open(); 
	},		
	onSave: function(oEvent) {
		this._oDialog.close();
	},
	onCloseDialog : function () {
       this._getDialog().close();
     },
	 _getDialog : function () {
         // create dialog lazily
         if (!this._oDialog) {
            // create dialog via fragment factory
            this._oDialog = sap.ui.xmlfragment("com.tutorial.fragments.addDialog", this);
            // connect dialog to view (models, lifecycle)
            this.getView().addDependent(this._oDialog);
         }
         return this._oDialog;
      },

	/* FRAGMENT
	 onOpenDialog : function () {
         this._getDialog().open();
      },
	onCloseDialog : function () {
        this._getDialog().close();
     },
     _getDialog : function () {
         // create dialog lazily
         if (!this._oDialog) {
            // create dialog via fragment factory
            this._oDialog = sap.ui.xmlfragment("com.tutorial.fragments.addDialog", this);
            // connect dialog to view (models, lifecycle)
            this.getView().addDependent(this._oDialog);
         }
         return this._oDialog;
      }*/
	
		
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf regtest.RegTestDetail
*/
	onBeforeRendering: function() {
		var idRegTest = sap.ui.getCore().byId("fldIDReg").getValue();
		if (idRegTest != '') {
			var oPl = sap.ui.getCore().byId("idPlaceTableToReg")
			var filter = new sap.ui.model.Filter("id_reg_test", sap.ui.model.FilterOperator.EQ, idRegTest);
			
			oPl.bindRows("/REG_PLACE_SET", null, null, filter);			

			var oCheck = sap.ui.getCore().byId("idCheckTableToReg")
			var filterCheck = new sap.ui.model.Filter("id_reg_test", sap.ui.model.FilterOperator.EQ, idRegTest);
			
			oCheck.bindRows("/REG_SET", null, null, filterCheck);			
		}	
	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf regtest.RegTestDetail
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf regtest.RegTestDetail
*/
//	onExit: function() {
//	}

});