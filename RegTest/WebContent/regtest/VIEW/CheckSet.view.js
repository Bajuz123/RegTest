sap.ui.jsview("regtest.VIEW.CheckSet", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf regtest.CheckSet
	 */
	getControllerName : function() {
		return "regtest.CONTROLLER.CheckSet";
	},

	initializeTable: function(oController, oBox) {
		var oTable = new sap.ui.table.Table({
			tableID : idTableCheckSet,
			visibleRowCount : 20,
			selectionMode : sap.ui.table.SelectionMode.Single,
			editable : false
		});

		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>Id}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapCheckSetId),
			visible : false
		}))

		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>Name}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapName),
			visible : true
		}))

		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>ImplClass}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapCheckSetClass),
			visible : true
		}))
		oTable.bindRows(entityCheckSetSetName);
		return oTable;
	},
	
	initializeButtons: function(oController, oBox, oTable) {
		var btnAddSet = new sap.m.Button(idBtnAddCheckSet, {
			icon : iconAdd,
			press : oController.onAddSetClick
		});

		var btnDelSet = new sap.m.Button(idBtnDelCheckSet, {
			icon : iconDel,
			press : function() {
				oController.onDelSetClick(oTable)
			}
		});

		var btnEditSet = new sap.m.Button(idBtnEditCheckSet, {
			icon : iconEdit,
			press : function() {
				oController.onEditSetClick(oTable) }
		});
		// press: oController.onEditSetClick
		oBox.addContent(btnAddSet);
		oBox.addContent(btnDelSet);
		oBox.addContent(btnEditSet);
		
	},
	initializeBox: function(oController) {
		var panel = new sap.m.Panel(idMainPanelChck);
		return panel;
	},
	
	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf regtest.CheckSet
	 */
	createContent : function(oController) {
		oBox = this.initializeBox(oController);
		
		oTable = this.initializeTable(oController, oBox);
		this.initializeButtons(oController, oBox, oTable);

		oBox.addContent(oTable);
		
		return new sap.m.Page({
			title : "{i18n>TitleCheckSet}",
			content : [ oBox ]
		});
	}	
});