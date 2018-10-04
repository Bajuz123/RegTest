sap.ui.controller("regtest.CONTROLLER.updPHFrag", {
	onInit : function() {
		sap.ui.getCore().byId(updPlaceholder).setValue(
				localStorage.getItem(selectedPlObject_placeholder));
		sap.ui.getCore().byId(updReplace).setValue(
				localStorage.getItem(selectedPlObject_replace_with));
	},
	onSaveUpdPH : function(oEvent) {

		var oEntry = {};
		oEntry.id_reg_test = sap.ui.getCore().byId(idfldIDReg)
				.getValue();
		oEntry.placeholder = sap.ui.getCore().byId(
				updPlaceholder).getValue();
		oEntry.replace_with = sap.ui.getCore().byId(updReplace)
				.getValue();

		var oModelPlaceSet = sap.ui.getCore().getModel();

		var editOKTxt = resourceModel.getProperty("EditOK")
		var editFailTxt = resourceModel.getProperty("EditFail")

		oModelPlaceSet.update(entityPlaceSetName
				+ "("
				+ sapRegTestId
				+ "='"
				+ localStorage
						.getItem(selectedPlObject_id_reg_test)
				+ "',"
				+ sapPlaceholder
				+ "='"
				+ localStorage
						.getItem(selectedPlObject_placeholder)
				+ "')", oEntry, {
			success : function(data) {
				sap.m.MessageToast.show(editOKTxt);
			},
			error : function(e) {
				sap.m.MessageToast.show(editFailTxt);
			}
		})
		reloadModel(oUser);
		fragUpdPH.close();
	},
	onCloseDialogUpdPH : function() {
		fragUpdPH.close();
	},
	dialogAftercloseUpdPH : function(oEvent) {
		fragUpdPH.destroy();
	},
});