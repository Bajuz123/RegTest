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
//			icon : "sap-icon://add",
		    press:  oController.onOKRegClick   });		

		var btnBackReg = new sap.m.Button("btnBackReg", {
			text : "Back",
//			icon : "sap-icon://add",
		    press:  oController.onBackRegClick   });		

		var btnRun = new sap.m.Button("btnRun", {
			text : "Run RegTest",
//			icon : "sap-icon://run",
		    press:  oController.onRunClick   });		

		var btnRegPlace = new sap.m.Button("btnRegPlace", {
			text : "Placeholders",
//			icon : "sap-icon://run",
		    press:  oController.onPlaceholderClick   });		

		var btnCheckSet = new sap.m.Button("btnSet", {
			text : "CheckSets",
//			icon : "sap-icon://run",
		    press:  oController.onCheckSetClick   });	
		
		/*var btnUpdXml = new sap.m.Button("idBtnUpdXML", {
			text : "Upload XML",
			icon : "sap-icon://upload",
		    press:   function(oEvent){oController.onOpenDialog(oEvent) } });	*/

		var fieldIDReg = new sap.m.Input("fldIDReg", {visible: false});
		var fieldName = new sap.m.Input("fldName");
		var areaXML   = new sap.m.TextArea("areaXML");
		
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
	                var strCSV= evn.target.result; //string in CSV 
	                  alert(strCSV);
	                };
	              reader.readAsText(file);  
	            }
	            }
	        });
		
/*		var oPlaceTable = new sap.ui.table.Table({
			tableID : "idPlaceTable",
			visibleRowCount : 20,
			selectionMode: sap.ui.table.SelectionMode.Single,
			editable : true
		});
		
		oPlaceTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Placeholder"}),
//			template: new sap.ui.commons.TextField().bindProperty("value","Placeholder"),
			visible: true
		} ));

		oPlaceTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Replace with"}),
//			template: new sap.ui.commons.TextField().bindProperty("value","Replace with"),
			visible: true
		} ));

		var oCheckTable = new sap.ui.table.Table({
			tableID : "idCheckTable",
			visibleRowCount : 20,
			selectionMode: sap.ui.table.SelectionMode.Single,
			editable : true
		});
		
		oCheckTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Name"}),
//			template: new sap.ui.commons.TextField().bindProperty("value","Name"),
			visible: true
		} ));

		oCheckTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Implementation Class"}),
//			template: new sap.ui.commons.TextField().bindProperty("value","Name"),
			visible: true
		} ));
*/		
		var panelRegDetail = new sap.m.Panel("idPanelRegDetail", {
			content : [
			           btnOKReg, btnBackReg, btnRun, fieldIDReg, fieldName, areaXML, fileReader, btnRegPlace, btnCheckSet 
			           ]
		});		

		var panelRelated = new sap.m.Panel("idListRelated", {
			content : [
			           // oPlaceTable
			           ]
		});		
		
		return new sap.m.Page({
			title: "RegTest Detail",
			content: [
			  panelRegDetail, panelRelated 
			]
		});
	}

});