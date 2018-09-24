sap.ui.jsview("regtest.VIEW.CheckSetDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf regtest.RegTestDetail
	*/ 
	getControllerName : function() {
		return "regtest.CONTROLLER.CheckSetDetail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf regtest.RegTestDetail
	*/ 
	createContent : function(oController) {	
		var btnOKCheck = new sap.m.Button("btnOKCheck", {
			text : "OK",
			icon : "sap-icon://save",
		    press:  oController.onOKCheckClick   });		

     	var btnBackCkeck = new sap.m.Button("btnBackCheck", {
			text : "Back",
			icon : "sap-icon://undo",
		    press:  oController.onBackCheckClick   });		
/*
		var btnRun = new sap.m.Button("btnRun", {
			text : "Run RegTest",
			icon : "sap-icon://process",
		    press:  oController.onRunClick   });		

		var btnRegPlace = new sap.m.Button("btnRegPlace", {
			text : "Placeholders",
			icon : "sap-icon://x-ray",
		    press:  oController.onPlaceholderClick   });		

		var btnCheckSet = new sap.m.Button("btnSet", {
			text : "CheckSets",
			icon : "sap-icon://stethoscope",
		    press:  oController.onCheckSetClick   }); 	

		var fieldIDCheck = new sap.m.Input("fldIDCheck", {visible: false}); 
*/
		var checkSetNameLabel = new sap.m.Label("idcheckSetName", {text: "CheckSetName"});
		var fieldName = new sap.m.Input("fldName");
		var panelcheckDetailName = new sap.m.Panel("idPanelCheckDetailName", {
			content : [
				checkSetNameLabel, fieldName           
			          ]
		});
		var checkSetClasNameLabel = new sap.m.Label("idcheckSetClasName", {text: "CheckSetClasName"});
		var fieldClasName = new sap.m.Input("fldImplClass");
		var panelcheckDetailClasName = new sap.m.Panel("idPanelCheckDetailClasName", {
			content : [
				checkSetClasNameLabel, fieldClasName           
			          ]
		});
		/*
		var regTestXMLLabel = new sap.m.Label("idRegTestXML", {text: "XML"});
		var areaXML   = new sap.m.TextArea("areaXML", {
			width: "100%",
			growing: true
		});
		
		var fileReader = new sap.ui.unified.FileUploader({ 
	          uploadUrl : "",
	          buttonText : "Upload XML",  
	          fileType : "xml",  
	          maximumFileSize : 1,
	          buttonOnly : true,
	          icon : "sap-icon://upload",
	          change : function(e){
	          var file = e.getParameter("files") && e.getParameter("files")[0];
	           if(file && window.FileReader){  
	              var reader = new FileReader();  
	              var that = this;  
	              reader.onload = function(evn) { 
	            	  debugger;
	                var strCSV= evn.target.result; //string in CSV
	        		sap.ui.getCore().byId("areaXML").setValue(strCSV);
                  };
	              reader.readAsText(file);  
	            }
	            }
	        });

		var panelRegDetailXML = new sap.m.Panel("idPanelRegDetailXML", {
			content : [
			           regTestXMLLabel, areaXML           
			          ]
		});

		var panelRegDetailXMLButton = new sap.m.Panel("idPanelRegDetailXMLButton", {
			content : [
			           fileReader           
			          ]
		});

		var oPlaceTable = new sap.ui.table.Table({
			tableID : "idPlaceTable",
			visibleRowCount : 5,
			selectionMode: sap.ui.table.SelectionMode.Single,
			editable : true
		});

		oPlaceTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "ID"}),
			template: new sap.ui.commons.TextField().bindProperty("value","id_reg_test"),
			visible: true
		} ));

		oPlaceTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Placeholder"}),
			template: new sap.ui.commons.TextField().bindProperty("value","placeholder"),
			visible: true
		} ));

		oPlaceTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Replace with"}),
			template: new sap.ui.commons.TextField().bindProperty("value","replace_with"),
			visible: true
		} ));
		
		var oCheckTable = new sap.ui.table.Table({
			tableID : "idCheckTable",
			visibleRowCount : 5,
			selectionMode: sap.ui.table.SelectionMode.Single,
			editable : true
		});

		oCheckTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Check Set"}),
			template: new sap.ui.commons.TextField().bindProperty("value","id_check_set"),
			visible: true
		} ));

		oCheckTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Running nr"}),
			template: new sap.ui.commons.TextField().bindProperty("value","running_nr"),
			visible: true
		} ));

		oPlaceTable.bindRows("/REG_PLACE_SET");			
		oCheckTable.bindRows("/REG_SET");

		var btnPlaceAdd = new sap.m.Button("btnPlaceAdd", {
			text : "Add",
			icon : "sap-icon://add",
		    press:  oController.onAddPlaceClick   });		

		var btnPlaceDel = new sap.m.Button("btnPlaceDel", {
			text : "Delete",
			icon : "sap-icon://delete",
		    press:  oController.onDelPlaceClick   });		

		var btnPlaceEdit = new sap.m.Button("btnPlaceEdit", {
			text : "Edit",
			icon : "sap-icon://edit",
		    press:  oController.onEditPlaceClick   });		

		var panelRegDetail = new sap.m.Panel("idPanelRegDetail", {
			content : [
			           btnOKReg, btnBackReg, btnRun, fieldIDReg, 
			           panelRegDetailName,
			           panelRegDetailXML,
			           panelRegDetailXMLButton,
			           btnRegPlace, btnCheckSet 
			           ]
		});		

		oCheckTable.visible = false;
		var panelRelatedPlace = new sap.m.Panel("idListRelatedPlace", {
			content : [
			           btnPlaceAdd, btnPlaceDel, btnPlaceEdit, oPlaceTable
			           ]
		});		

		var btnCheckAdd = new sap.m.Button("btnCheckAdd", {
			text : "+",
//			icon : "sap-icon://add",
		    press:  oController.onAddCheckClick   });		

		var btnCheckDel = new sap.m.Button("btnCheckDel", {
			text : "-",
//			icon : "sap-icon://add",
		    press:  oController.onDelCheckClick   });		

		var btnCheckEdit = new sap.m.Button("btnCheckEdit", {
			text : "=>",
//			icon : "sap-icon://add",
		    press:  oController.onEditCheckClick   });		
		
		var panelRelatedCheck = new sap.m.Panel("idListRelatedCheck", {
			content : [
			          btnCheckAdd, btnCheckDel, btnCheckEdit, oCheckTable
			          ]
		});		

		sap.ui.getCore().byId("idListRelatedCheck").setVisible(false);
	*/	
		return new sap.m.Page({
			title: "Prufung-Sets Detail",
			content: [ btnOKCheck, btnBackCkeck, panelcheckDetailName, panelcheckDetailClasName
		//	  panelRegDetail, panelRelatedPlace, panelRelatedCheck 
			]
		});
	}
});