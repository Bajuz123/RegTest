sap.ui.jsview("regtest.VIEW.RegTestDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf regtest.RegTestDetail
	*/ 
	getControllerName : function() {
		return "regtest.CONTROLLER.RegTestDetail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf regtest.RegTestDetail
	*/ 
	createContent : function(oController) {	
		var btnOKReg = new sap.m.Button("btnOKReg", {
			text : "OK",
			icon : "sap-icon://save",
		    press:  oController.onOKRegClick   });		

		var btnBackReg = new sap.m.Button("btnBackReg", {
			text : "Back",
			icon : "sap-icon://undo",
		    press:  oController.onBackRegClick   });		

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
		
		var fieldIDReg = new sap.m.Input("fldIDReg", {visible: false});

		var regTestNameLabel = new sap.m.Label("idRegTestNamet", {text: "RegTestName"});
		var fieldName = new sap.m.Input("fldName");
		var panelRegDetailName = new sap.m.Panel("idPanelRegDetailName", {
			content : [
			           regTestNameLabel, fieldName           
			          ]
		});
		
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
			id: "idPlaceTableToReg",
			tableID : "idPlaceTableToReg",
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
			id: "idCheckTableToReg",
			tableID : "idCheckTableToReg",
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
		
		return new sap.m.Page({
			title: "RegTest Detail",
			content: [
			  panelRegDetail, panelRelatedPlace, panelRelatedCheck 
			]
		});
	}
});