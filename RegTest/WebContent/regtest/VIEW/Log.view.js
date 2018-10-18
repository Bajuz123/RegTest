sap.ui.jsview("regtest.VIEW.Log", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf regtest.VIEW.Log
	 */
	getControllerName : function() {
		return "regtest.CONTROLLER.Log";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf regtest.VIEW.Log
	 */

	createContent : function(oController) {
		var panel = new sap.m.Panel(idLogPanel, {
			content : []
		});
		this.createFilter(oController, panel);
		this.createTable(oController, panel);

		return new sap.m.Page({
			title : "{i18n>TitleLog}",
			content : [ panel ]
		});
	},
	createFilter : function(oController, oPanel) {
		var oMenu = getBtnMenu(viewLogList);

		var btnMenuIcon = new sap.m.MenuButton(idMenuButtonLog, {
			text : "{i18n>MenuButton}",
			icon : iconMenu,
			menu : oMenu,
			visible: isPhone()
		});
		
		var runIdText = new sap.m.Label(idRunIdText, {
			text : "{i18n>RunID}"
		});
		var runIdValue = new sap.m.Input(idRunIdValue);
		runIdValue.onsapenter = (function(oEvent) {
			oController.onRefresh();
		});
		runIdValue.setValue(maxValue);

		var panelRunId = new sap.m.Panel(idLogPanelRunId, {
			content : [ runIdText, runIdValue ]
		});

		var idRegTestName = new sap.m.Label(idRegTestName, {
			text : "{i18n>RegTestName}"
		});
		var idRegTestNameValueFld = new sap.m.Input(idRegTestNameValue);
		idRegTestNameValue.onsapenter = (function(oEvent) {
			oController.onRefresh();
		});

		var panelRegTestID = new sap.m.Panel(idRegTestIDPanel, {
			content : [ idRegTestName, idRegTestNameValueFld ]
		});
		var btnRefresh = new sap.m.Button(idBtnRefresh, {
			text : "{i18n>Refresh}",
			icon : iconRefresh,
			press : function() {
				oController.onRefresh();
			}
		});
		oPanel.addContent(btnMenuIcon);
		oPanel.addContent(panelRunId);
		oPanel.addContent(panelRegTestID);
		oPanel.addContent(btnRefresh);
	},

	createTable : function(oController, oPanel) {
		var oLogTable = new sap.ui.table.Table({
			id : idLogTable,
			tableID : idLogTable,
			visibleRowCount : 16,
			selectionMode : sap.ui.table.SelectionMode.Single,
			selectionBehavior : sap.ui.table.SelectionBehavior.Row,
			editable : false
		});

		oLogTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>RunID}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapRunId),
			visible : true
		}))

		oLogTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>RegTestId}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapRegTestId),
			visible : false
		}))

		oLogTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>RegTestName}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapRegLogName),
			visible : true
		}))

		oLogTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>PardId}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapPartId),
			visible : true
		}))

		oLogTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>MessageType}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapMsgType),
			visible : true
		}))

		oLogTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>MessageId}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapMsgId),
			visible : true
		}))

		oLogTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>MessageText}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapMsgText),
			visible : true
		}))

		oLogTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>PlaceholderID}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapIdPlaceholder),
			visible : true
		}))

		oLogTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>CheckSetId}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapCheckSetId),
			visible : true
		}))

		oPanel.addContent(oLogTable);
		oLogTable.bindRows(entityLogSetName);
	}
});