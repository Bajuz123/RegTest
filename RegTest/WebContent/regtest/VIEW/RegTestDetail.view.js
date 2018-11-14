sap.ui.jsview("regtest.VIEW.RegTestDetail", {
	getControllerName : function() {
		return "regtest.CONTROLLER.RegTestDetail";
	},

	createContent : function(oController) {
		oPage = new sap.m.Page({
			title : "{i18n>TitleRegTestDetail}",
		});

		this.createRegTestDetail(oController, oPage);
		this.createPanelRegRelatedButtons(oController, oPage);
		this.createRelatedPlaceholders(oController, oPage);
		this.createRelatedCheckSets(oController, oPage);
		return oPage;
	},

	createRegTestDetail : function(oController, oPage) {
		var panelDetailButtons = this.createButtonsForDetail(oController);
		oPage.addContent(panelDetailButtons);

		var panelRegDetailName = this.createPanelRegDetailName(oController);
		oPage.addContent(panelRegDetailName);

		var panelRegDetailVariant = this.createPanelRegDetailVariant(oController);
		oPage.addContent(panelRegDetailVariant);
		
		var panelRegDetailLastRun = this.createPanelRegDetailLastRun(oController);
		oPage.addContent(panelRegDetailLastRun);
		panelRegDetailLastRun.visible = false;
		
		var panelRegDetailXML = this.createPanelRegDetailXML(oController);
		oPage.addContent(panelRegDetailXML);

//		var panelRegDetailXMLButton = this
//				.createPanelRegDetailXMLButton(oController);
//		oPage.addContent(panelRegDetailXMLButton);
	},
	createRelatedPlaceholders : function(oController, oPage) {
		var oPlaceTable = new sap.ui.table.Table({
			id : idPlaceTableToReg,
			tableID : idPlaceTableToReg,
			visibleRowCount : 5,
			selectionMode : sap.ui.table.SelectionMode.Single,
			editable : false
		});

		oPlaceTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>Id}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapRegTestId),
			visible : false
		}));

		oPlaceTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>Placeholders}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapPlaceholder),
			visible : true,
			editable: false
		}));

		oPlaceTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>ReplaceWith}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapReplaceWith),
			visible : true
		}));

		var btnPlaceAdd = new sap.m.Button(btnPlaceAdd, {
			// text : "Add",
			icon : iconAdd,
			press : oController.onAddPlaceClick
		});

		var btnPlaceDel = new sap.m.Button(btnPlaceDel, {
			// text : "Delete",
			icon : iconDel,
			press : function() {
				oController.onDelPlaceClick(oPlaceTable)
			}
		});

		oPlaceTable.attachBrowserEvent(dblclickEvent,
				oController.onEditPlaceClick);

		oPlaceTable.bindRows(entityPlaceSetName);
		var panelRelatedPlace = new sap.m.Panel(idListRelatedPlace, {
			content : [ btnPlaceAdd, btnPlaceDel, oPlaceTable ]
		});

		oPlaceTable.visible = true;
		oPage.addContent(panelRelatedPlace);
	},
	createRelatedCheckSets : function(oController, oPage) {
		var oCheckTable = new sap.ui.table.Table({
			id : idCheckTableToReg,
			tableID : idCheckTableToReg,
			visibleRowCount : 5,
			selectionMode : sap.ui.table.SelectionMode.Single,
			editable : false
		});

		oCheckTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>Id}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapRegTestId),
			visible : false
		}));

		oCheckTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>Id}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapCheckSetId),
			visible : false
		}));

		oCheckTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>CheckSetNameTable}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapCheckSetName),
			visible : true
		}));

		oCheckTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>RunningNr}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapRunningNr),
			visible : true
		}));

		var btnCheckAdd = new sap.m.Button(btnCheckAdd, {
			// text : "Add",
			icon : iconAdd,
			press : oController.onAddCheckClick
		});

		var btnCheckDel = new sap.m.Button(btnCheckDel, {
			// text : "Delete",
			icon : iconDel,
			press : function() {
				oController.onDelCheckClick(oCheckTable)
			}
		});

		oCheckTable.attachBrowserEvent(dblclickEvent,
				oController.onEditCheckClick);
		oCheckTable.bindRows(entityRegSetName);
		var panelRelatedCheck = new sap.m.Panel(idListRelatedCheck, {
			content : [ btnCheckAdd, btnCheckDel, oCheckTable ]
		});
		sap.ui.getCore().byId(idListRelatedCheck).setVisible(false);
		sap.ui.getCore().byId(idListRelatedPlace).setVisible(false);
		oCheckTable.visible = true;
		oPage.addContent(panelRelatedCheck);
	},

	createPanelRegDetailName : function(oController) {
		var fieldIDReg = new sap.m.Input(idfldIDReg, {
			visible : false
		});

		var regTestNameLabel = new sap.m.Label(idRegTestNameLabel, {
			text : "{i18n>RegTestName}"
		});
		var regTestNameValue = new sap.m.Input(idFldRegNameValue);
		
		var regTestActiveLabel = new sap.m.Label(idRegTestActiveLabel, {
			text : "{i18n>RegTestActive}",
		});
		var regTestActiveValue = new sap.ui.commons.CheckBox(idRegActiveCheck);
		regTestActiveValue.setWidth("20px");
		
		return new sap.m.Panel(idPanelRegDetailName, {
			content : [ fieldIDReg, regTestNameLabel, regTestNameValue, regTestActiveValue, regTestActiveLabel ]
		});
	},
	createPanelRegDetailXML : function(oController) {
		var regTestXMLLabel = new sap.m.Label(idRegTestXMLLabel, {
			text : "{i18n>XML}"
		});
		var areaXML = new sap.m.TextArea(idAreaXML, {
			width : "100%",
			height : "14rem"
		});

		var fileReader = new sap.ui.unified.FileUploader({
			id : idFileReaderComponent,
			uploadUrl : "",
			buttonText : "{i18n>UploadXML}",
			fileType : xmlType,
			maximumFileSize : 1,
			buttonOnly : true,
			icon : iconUpload,
			change : function(e) {
				var file = e.getParameter(filesType)
						&& e.getParameter(filesType)[0];
				if (file && window.FileReader) {
					var reader = new FileReader();
					var that = this;
					reader.onload = function(evn) {
						var strCSV = evn.target.result; // string
						// in
						// CSV
						sap.ui.getCore().byId(idAreaXML).setValue(strCSV);
					};
					reader.readAsText(file);
				}
			}
		});

		return new sap.m.Panel(idPanelRegDetailXML, {
			content : [ regTestXMLLabel, areaXML, fileReader ]
		});
		// , fileReader
	},
	createButtonsForDetail : function(oController) {
		var btnOKReg = new sap.m.Button(idBtnOKReg, {
			text : "{i18n>OK}",
			icon : iconSave,
			press : oController.onOKRegClick
		});

		var btnBackReg = new sap.m.Button(idBtnBackReg, {
			text : "{i18n>Cancel}",
			icon : iconUndo,
			press : oController.onBackRegClick
		});

		var btnRun = new sap.m.Button(idBtnRun, {
			text : "{i18n>RegRun}",
			icon : iconProcess,
			press : oController.onRunClick
		});

		return new sap.m.Panel(idPanelDetailButtons, {
			content : [ btnOKReg, btnBackReg, btnRun ]
		});
	},

	createPanelRegRelatedButtons : function(oController) {
		var btnRegPlace = new sap.m.Button(idBtnRegPlace, {
			text : "{i18n>Placeholders}",
			icon : iconPlaceholders,
			press : oController.onPlaceholderClick
		});

		var btnCheckSet = new sap.m.Button(idBtnSet, {
			text : "{i18n>CheckSets}",
			icon : iconCheckSets,
			press : oController.onCheckSetClick
		});

		var panelRegRelatedButtons = new sap.m.Panel(idRegRelatedDetailButtons,
				{
					content : [ btnRegPlace, btnCheckSet ]
				});
		oPage.addContent(panelRegRelatedButtons);
	},

	createPanelRegDetailVariant: function (oController) {
		var regVariantLabel = new sap.m.Label(idRegTestVariantLabel, {
			text : "{i18n>Variant}"
		});
		var regTestVariantValue = new sap.m.Input(idRegTestVariantValue);
		return new sap.m.Panel(idPanelDetailVariant, {
			content : [regVariantLabel, regTestVariantValue]
		});
	},

	createPanelRegDetailLastRun: function (oController) {
		var regTestLastRunValue = new sap.m.Input(idRegTestLastRunValue);
		return new sap.m.Panel(idPanelDetailLastRun, {
			content : [regTestLastRunValue]
		});
	}
	
	/*	createPanelRegDetailXMLButton : function(oController) {
		var btnXMLButton = new sap.m.Button(idBtnXMLUpload, {
			text : "{i18n>UploadXML}",
			icon : iconUpload,
		//	press : oController.onUploadClick
		});
		
		return new sap.m.Panel(idPanelRegDetailXMLButton, {
			content : [ btnXMLButton ]
		});
	}*/
});