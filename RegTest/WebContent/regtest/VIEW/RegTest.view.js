sap.ui.jsview("regtest.VIEW.RegTest", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf regtest.RegTest
	 */
	getControllerName : function() {
		return "regtest.CONTROLLER.RegTest";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf regtest.RegTest
	 */
	createContent : function(oController) {
		var oRegTable = new sap.ui.table.Table({
			tableID : idRegTestTable,
			visibleRowCount : 20,
			selectionMode : sap.ui.table.SelectionMode.Single,
			selectionBehavior : sap.ui.table.SelectionBehavior.Row,
			editable : false
		});

		oRegTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>Id}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapRegTestId),
			visible : false
		}));

		oRegTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>Name}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapRegTestName),
			visible : true
		}));

		oRegTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>XML}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapRegTestXML),
			visible : true
		}));

		// oRegTable.attachBrowserEvent("dblclick", oController.onDblClick);

		oRegTable.bindRows(entityRegTestSetName);
		var btnAddReg = new sap.m.Button(idBtnAddReg, {
			icon : iconAdd,
			press : oController.onAddRegClick
		});

		var btnDelReg = new sap.m.Button(idBtnDelReg, {
			icon : iconDel,
			press : function() {
				oController.onDelRegClick(oRegTable);
			}
		});

		var btnEditReg = new sap.m.Button(idBtnEditReg, {
			icon : iconEdit,
			press : function() {
				oController.onEditRegClick(oRegTable);
			}
		});

		var panel = new sap.m.Panel(idMainPanel, {
			content : [ btnAddReg, btnDelReg, btnEditReg, oRegTable ]
		});
		
		//notification bar
		var toolbar = new sap.m.Toolbar({
				id: "toolbar",
				content: [
					new sap.m.Button({
						id: "display_messages_btn",
						icon: 'sap-icon://message-popup',
						type: 'Emphasized',
						//visible: (sap.ui.getCore().getMessageManager().getMessageModel().getData().length !== 0) ? true : false,
						press: function() {
							oController.onMessagePopoverPress(this);
						}
					}),
					new sap.m.Button({
						id: "clear_messages_btn",
						text: "Clear",
						visible: false,
						press: function() {
							oController.clearMessages();
						}
					})
				]
		});

		return new sap.m.Page({
			title : "{i18n>Autotest}",
			content : [ panel ],
			footer: [ toolbar ]
		});
	}
});