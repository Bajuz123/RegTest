sap.ui.controller("regtest.CONTROLLER.updCheckSetFrag", {
	onInit : function() {
		sap.ui.getCore().byId(updateCheckset).setSelectedKey(
				localStorage.getItem(selectedCheckSet_idCheckSet));
		sap.ui.getCore().byId(updateRunNumber).setValue(
				localStorage.getItem(selectedCheckSet_runningNr));
	},

	onCloseDialogUpdCH : function() {
		fragUpdCH.close();
	},

	onSaveUpdCH : function(oEvent) {
		var oEntry = {};
		oEntry.id_reg_test = sap.ui.getCore().byId(idfldIDReg).getValue();
		oEntry.id_check_set = sap.ui.getCore().byId(updateCheckset)
				.getSelectedKey();
		oEntry.running_nr = sap.ui.getCore().byId(updateRunNumber).getValue();
		var oModelPlaceSet = sap.ui.getCore().getModel();

		var editOKTxt = resourceModel.getProperty("EditOK")
		var editFailTxt = resourceModel.getProperty("EditFail")

		oModelPlaceSet.update(entityRegSetName + "(" + sapRegTestId + "='"
				+ localStorage.getItem(selectedCheckSet_idRegTest) + "',"
				+ sapCheckSetId + "='"
				+ localStorage.getItem(selectedCheckSet_idCheckSet) + "',"
				+ sapRunningNr + "='"
				+ localStorage.getItem(selectedCheckSet_runningNr) + "')",
				oEntry, {
					success : function(data) {
						sap.m.MessageToast.show(editOKTxt);
					},
					error : function(e) {
						sap.m.MessageToast.show(editFailTxt);
					}
				})
		reloadModel(oUser);
		fragUpdCH.close();
	},

	onCloseDialogUpdCH : function() {
		fragUpdCH.close();
	}
});