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
		var oList = new sap.m.List({
			id : "idMenuList",
			mode : sap.m.ListMode.SingleSelect,
			select: function(){
				oController.itemSelected(oList);
			}
		});
		var oItem1 = new sap.m.ObjectListItem({
			id: "sItem1",
			title: "Regresionstest"
		});
		var oItem2 = new sap.m.ObjectListItem({
			id: "sItem2",
			title: "Prufungsset"
		});
		oList.addItem(oItem1);
		oList.addItem(oItem2);
 		return new sap.m.Page({
			title: "",
			content: [ oList
			]
		});
	}
});