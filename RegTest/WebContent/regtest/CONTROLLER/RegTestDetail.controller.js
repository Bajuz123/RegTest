sap.ui.controller("regtest.CONTROLLER.RegTestDetail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf regtest.RegTestDetail
*/
	onInit: function() {
	},

	onBackRegClick: function() {
		oSplitApp.toDetail("idRegTest1");				
		sap.ui.getCore().byId("fldIDReg").setValue("");		
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
			oSplitApp.toDetail("idRegTest1");		
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
			oSplitApp.toDetail("idRegTest1");		
		}
		sap.ui.getCore().byId("fldIDReg").setValue("");		
	},
	
    onRunClick : function() {
//		update/insert
//    	start web service
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
		this._oDialog = sap.ui.xmlfragment("com.tutorial.fragments.addDialog",this);
	     this._oDialog.open(); 
		// this._getDialog().open();
	},		

	onDelPlaceClick: function() {
		this._oDialog = sap.ui.xmlfragment("com.tutorial.fragments.delDialog",this);
	     this._oDialog.open(); 
	},		

	onEditPlaceClick: function() {
		this._oDialog = sap.ui.xmlfragment("com.tutorial.fragments.updDialog",this);
	     this._oDialog.open(); 
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
		debugger;
		var id_reg_test = sap.ui.getCore().byId("fldIDReg").getValue();
		if (id_reg_test != '') {
			reloadModel(oUser);			
			var oPlaceTable = sap.ui.getCore().byId("idPlaceTable");
//			oPlaceTable.bindRows("/REG_PLACE_SET(id_reg_test='" + sap.ui.getCore().byId("fldIDReg").getValue() + "')");			
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