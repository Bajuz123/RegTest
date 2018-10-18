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
			id : idRegTestTable,
			tableID : idRegTestTable,
			visibleRowCount : 20,
			selectionMode : sap.ui.table.SelectionMode.Single,
			selectionBehavior : sap.ui.table.SelectionBehavior.Row,
			editable : false,
			enableColumnFreeze : true
		});

		oRegTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>Id}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapRegTestId),
			visible : false
		}));

		/*
		 * oRegTable.addColumn(new sap.ui.table.Column({ width : '50px', label :
		 * new sap.ui.commons.CheckBox({ change: oController.changeAll,
		 * checked:false}), template : new sap.ui.commons.CheckBox({id:
		 * "idCheckSel"}).bindProperty(columnDefaultCheckBoxValue, sapRegSel),
		 * visible : true }));
		 */
		oRegTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>Name}"
			}),
			width : "25%",
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapRegTestName),
			visible : true
		}));

		oRegTable.addColumn(new sap.ui.table.Column({
			enableColumnFreeze : true,
			width : '100px',
			label : new sap.ui.commons.Label({
				text : "{i18n>Variant}"
			}),
			template : new sap.ui.commons.TextField().bindProperty(
					columnDefaultValue, sapVariant),
			visible : true
		}));

		oRegTable.addColumn(new sap.ui.table.Column({
			enableColumnFreeze : true,
			width : '100px',
			label : new sap.ui.commons.Label({
				text : "{i18n>Active}"
			}),
			template : new sap.ui.commons.CheckBox({
				id : "idCheckActive"
			}).bindProperty(columnDefaultCheckBoxValue, sapRegTestActive),
			visible : true
		}));

		oRegTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>LastRun}"
			}),
			template : new sap.ui.commons.TextView().bindProperty(
					columnDefaultTextView, sapRunResult, function(cellValue) {
						this.removeStyleClass('green');
						this.removeStyleClass('yellow');
						this.removeStyleClass('red');
						// Set style Conditionally
						if (cellValue == 'X') {
							this.addStyleClass('green');
						} else if (cellValue == 'W') 
							this.addStyleClass('yellow');						
						{
							this.addStyleClass('red');
						}
						// cellValue = '';
						return cellValue;
					}),
			visible : true
		}));

		/*
		 * oRegTable.addColumn(new sap.ui.table.Column({ label : new
		 * sap.ui.commons.Label({ text : "{i18n>XML}" }), template : new
		 * sap.ui.commons.TextField().bindProperty( columnDefaultValue,
		 * sapRegTestXML), visible : true }));
		 */
		// oRegTable.attachBrowserEvent("dblclick",
		// oController.onEditRegClick(oRegTable));
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

		var btnRunRegs = new sap.m.Button(idBtnRunRegs, {
			text : "{i18n>RunRegs}",
			icon : iconProcess,
			press : function() {
				oController.onRunRegsClick(oRegTable);
			}
		});
	
		var oMenu = getBtnMenu(viewRegTestList);
		var btnMenuIcon = new sap.m.MenuButton(idMenuButtonReg, {
			text : "{i18n>MenuButton}",
			icon : iconMenu,
			menu : oMenu,
			visible: isPhone()
		});
		// menu[]
		var panel = new sap.m.Panel(idMainPanel, {
			content : [ btnMenuIcon, btnAddReg, btnDelReg, btnEditReg,
					btnRunRegs, oRegTable ]
		});

		return new sap.m.Page({
			title : "{i18n>Autotest}",
			content : [ panel ],
		});
	}
});