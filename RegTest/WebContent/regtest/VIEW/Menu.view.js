sap.ui.jsview("regtest.VIEW.Menu", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf regtest.VIEW.Menu
	*/ 
	getControllerName : function() {
		return "regtest.CONTROLLER.Menu";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf regtest.VIEW.Menu
	*/ 
	createContent : function(oController) {		
		var versionLabel = new sap.m.Label(idVersionLabel, {text: regTestVersion });
		var oBox = new sap.m.HBox({
		  items: [
			new sap.m.Button({
				icon : iconLangGer,
				press : function() {
					oController.onLangClick(gerLangu);
				}
			}),
			new sap.m.Button({
				icon : iconLangSvk,
				press : function() {
					oController.onLangClick(svkLangu);
				}
			})			
		  ]		
		});
				
		var oList = new sap.m.List({
			id : idMenuList,
			mode : sap.m.ListMode.SingleSelectMaster,
			select: function(){
				oController.itemSelected(oList);
			}
		});
		var oItem1 = new sap.m.StandardListItem({
			id: "sItem1",
			title: "{i18n>MenuRegTest}"
		});
		var oItem2 = new sap.m.StandardListItem({
			id: "sItem2",
			title: "{i18n>MenuCheckSet}"
		});
		var oItem3 = new sap.m.StandardListItem({
			id: "sItem3",
			title: "{i18n>MenuLog}"
		});
		var oItem4 = new sap.m.StandardListItem({
			id: "sItem4",
			icon: iconLog,
			title: "{i18n>MenuLogout}"
		});
		oList.addItem(oItem1);
		oList.addItem(oItem2);
		oList.addItem(oItem3);
		oList.addItem(oItem4);
 
		//notification bar
		var toolbar = new sap.m.Toolbar({
				id: idToolbar,
				visible: false,
				content: [
					new sap.m.Button({
						id: idBtnDisplayMessages,
						icon: iconPopup,
						type: sap.m.ButtonType.Emphasized,
						visible: true,
						press: function() {
							oController.onMessagePopoverPress(this);
						}
					}),
					new sap.m.Button({
						id: idBtnClearMessages,
						text: "{i18n>Clear}",
						visible: false,
						press: function() {
							oController.clearMessages();
						}
					})
				]
		});
	
		
		return new sap.m.Page({
			title: "",
			content: [ versionLabel, oBox, oList ], 
			footer: [ toolbar ]
		});
	}
});