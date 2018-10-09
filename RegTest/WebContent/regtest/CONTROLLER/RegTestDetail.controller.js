sap.ui
		.controller(
				"regtest.CONTROLLER.RegTestDetail",
				{
					onInit : function() {
						var fragAddPH = {};
						var fragDelPH = {};
						var fragUpdPH = {};
						var fragAddCH = {};
						var fragDelCH = {};
						var fragUpdCH = {};

						try {
							oUser.Login = localStorage.getItem("oUser_Login");
							oUser.Pwd = localStorage.getItem("oUser_Pwd");
							oUser.hd1user = localStorage
									.getItem("oUser_hd1user");
							oUser.hd1pwd = localStorage.getItem("oUser_hd1pwd");
							validateUser(oUser);
//							reloadModel(oUser);
						} catch (err) {
							var oRouter = sap.ui.core.routing.Router
									.getRouter(routerName);
							oRouter.navTo(routeLogin);
							var loginFirstText = resourceModel
									.getProperty("LoginFirst");
							sap.m.MessageToast.show(loginFirstText);
						}
					},

					refreshRelatedTables : function() {
						var idRegTest = sap.ui.getCore().byId(idfldIDReg)
								.getValue();
						var oPl = sap.ui.getCore().byId(idPlaceTableToReg)
						var filter = new sap.ui.model.Filter(sapRegTestId,
								sap.ui.model.FilterOperator.EQ, idRegTest);

						oPl.bindRows(entityPlaceSetName, null, null, filter);

						var oCheck = sap.ui.getCore().byId(idCheckTableToReg)
						var filterCheck = new sap.ui.model.Filter(sapRegTestId,
								sap.ui.model.FilterOperator.EQ, idRegTest);

						oCheck.bindRows(entityRegSetName, null, null,
								filterCheck);
						if (idRegTest != '') {
							this.onPlaceholderClick();
						}
					},

					onBackRegClick : function() {
						var oRouter = sap.ui.core.routing.Router
								.getRouter(routerName);
						oRouter.navTo(routeRegTestList);
					},

					onOKRegClick : function() {
						var oEntry = {};

						oEntry.id_reg_test = escapeText(sap.ui.getCore().byId(
								idfldIDReg).getValue());
						oEntry.name = escapeText(sap.ui.getCore().byId(
								idFldRegNameValue).getValue());
						oEntry.xml = escapeText(sap.ui.getCore()
								.byId(idAreaXML).getValue());
						oEntry.active = sap.ui.getCore().byId(idRegActiveCheck).getChecked();
						oEntry.variant = sap.ui.getCore().byId(idRegTestVariantValue).getValue();

						var oModelRegTest = sap.ui.getCore().getModel();
						var oRouter = sap.ui.core.routing.Router
								.getRouter(routerName);

						if (oEntry.id_reg_test == '') { // insert
							oModelRegTest.create(entityRegTestSetName, oEntry);

							var addOKTxt = resourceModel.getProperty("AddOK")
							sap.m.MessageToast.show(addOKTxt); // ToDo
							// according to
							// result

							oRouter.navTo(routeRegTestList);
						} else { // update
							var editOKTxt = resourceModel.getProperty("EditOK");
							var editFailTxt = resourceModel
									.getProperty("EditFail");

							oModelRegTest.update(entityRegTestSetName + "("
									+ sapRegTestId + "='" + oEntry.id_reg_test
									+ "')", oEntry, {
								success : function(data) {
									sap.m.MessageToast.show(editOKTxt);
								},
								error : function(e) {
									sap.m.MessageToast.show(editFailTxt);
								}
							});
							oModelRegTest.refresh();
							oRouter.navTo(routeRegTestList);
						}
					},

					onRunClick : function() {
						var regTestID = sap.ui.getCore().byId(idfldIDReg)
								.getValue();
						if (regTestID != '') {
							var oDataModel = sap.ui.getCore().getModel();

							var progressTxt = resourceModel
									.getProperty("Progress");
							var progressTitleTxt = resourceModel
									.getProperty("ProgressTitle");

							var busy = new sap.m.BusyDialog(idBusyDialog, {
								text : progressTxt,
								title : progressTitleTxt
							});
							busy.open();
							// setTimeout(function() {
							// busy.close();
							// }, 25000);

							var creditStartedOK = resourceModel
									.getProperty("creditStartedOK");
							var creditStartedFail = resourceModel
									.getProperty("creditStartedFail");

							var tabRegTest = [regTestID];
							oDataModel.callFunction(fiStartCredit, httpGet, {
								"flg_synchron" : '',
								"tab_reg_test_id" : tabRegTest
							}, null, function(oData, response) {
								var busyDialog = sap.ui.getCore().byId(
										idBusyDialog)
								busyDialog.close();
								sap.m.MessageToast.show(creditStartedOK);
							}, // callback function for success
							function(oError) {
								var busyDialog = sap.ui.getCore().byId(
										idBusyDialog)
								busyDialog.close();
								sap.m.MessageToast.show(creditStartedFail);
							}); // callback function for error
						} else {
							var saveBeforeRun = resourceModel
									.getProperty("SaveBeforeRun");
							sap.m.MessageToast.show(saveBeforeRun);
						}
					},

					onPlaceholderClick : function() {
						if (sap.ui.getCore().byId(idfldIDReg).getValue() != '') {
							sap.ui.getCore().byId(idListRelatedCheck)
									.setVisible(false);
							sap.ui.getCore().byId(idListRelatedPlace)
									.setVisible(true);
						} else {
							var saveBefore = resourceModel
									.getProperty("SaveBefore");
							sap.m.MessageToast.show(saveBefore);
						}
					},

					onCheckSetClick : function() {
						if (sap.ui.getCore().byId(idfldIDReg).getValue() != '') {
							sap.ui.getCore().byId(idListRelatedCheck)
									.setVisible(true);
							sap.ui.getCore().byId(idListRelatedPlace)
									.setVisible(false);
						} else {
							var saveBefore = resourceModel
									.getProperty("SaveBefore");
							sap.m.MessageToast.show(saveBefore);
						}
					},

					onAddCheckClick : function() {
						var oView = sap.ui.getCore().byId(viewRegTestDetail);
						fragAddCH = sap.ui.xmlfragment(fragAddCheckSet, oView
								.getController());
						fragAddCH.open();
					},

					onDelCheckClick : function(oCheckTable) {
						var selIndex = oCheckTable.getSelectedIndex();
						if (selIndex != -1) {
							var oView = sap.ui.getCore()
									.byId(viewRegTestDetail);
							fragDelCH = sap.ui.xmlfragment(fragDelCheckSet,
									oView.getController());
							fragDelCH.open();
						} else {
							var deleteSelectText = resourceModel
									.getProperty("DeleteSelect");
							sap.m.MessageToast.show(deleteSelectText);
						}
					},
					dialogAftercloseAddCH : function(oEvent) {
						fragAddCH.destroy();
					},
					dialogAftercloseDelCH : function(oEvent) {
						fragDelCH.destroy();
					},

					onEditCheckClick : function() {
						var oCheckTable = sap.ui.getCore().byId(
								idCheckTableToReg);
						var selIndex = oCheckTable.getSelectedIndex();

						if (selIndex != -1) {
							var boundObject = getTableSelectedObject(
									oCheckTable, selIndex);
							var idCheckSet = boundObject.id_check_set;
							var runNumber = boundObject.running_nr;

							// var oView =
							// sap.ui.getCore().byId(viewRegTestDetail);
							// var oController =
							// sap.ui.getCore().byId(controlUpdatePHFrag);
							// fragUpdCH = sap.ui.xmlfragment(fragUpdCheckSet,
							// oView.getController());
							oCtrl = new sap.ui.controller(
									controlUpdateCheckSetFrag);
							fragUpdCH = sap.ui.xmlfragment(fragUpdCheckSet,
									oCtrl);
							oCtrl.onInit();
							// sap.ui.getCore().byId(updateCheckset)
							// .setSelectedKey(idCheckSet);
							// sap.ui.getCore().byId(updateRunNumber).setValue(
							// runNumber);

							localStorage.setItem(selectedCheckSet_idRegTest,
									boundObject.id_reg_test);
							localStorage.setItem(selectedCheckSet_idCheckSet,
									boundObject.id_check_set);
							localStorage.setItem(selectedCheckSet_runningNr,
									boundObject.running_nr);
							fragUpdCH.open();
						} else {
							var editSelectText = resourceModel
									.getProperty("EditSelect");
							sap.m.MessageToast.show(editSelectText);
						}
					},

					onSaveAddCH : function(oEvent) {
						var oEntry = {};
						oEntry.id_reg_test = sap.ui.getCore().byId(idfldIDReg)
								.getValue();
						oEntry.id_check_set = sap.ui.getCore().byId(
								comboCheckSetValue).getSelectedKey();
						oEntry.running_nr = sap.ui.getCore().byId(
								inputRunNumber).getValue();
						var oModelCheckSet = sap.ui.getCore().getModel();

						if (oEntry.id_check_set != '') { // insert
							oModelCheckSet.create(entityRegSetName, oEntry);
							var addOKTxt = resourceModel.getProperty("AddOK")
							sap.m.MessageToast.show(addOKTxt); // ToDo
							// according to
							// result
						} else {
							var insertTxt = resourceModel
									.getProperty("InsertCheckSet");
							sap.m.MessageToast.show(insertTxt);
						}
						reloadModel(oUser);
						fragAddCH.close();

					},
					onCloseDialogAddCH : function() {
						fragAddCH.close();

					},
					onSaveDelCH : function(oEvent) {
						var oCheckTable = sap.ui.getCore().byId(
								idCheckTableToReg);
						var selIndex = oCheckTable.getSelectedIndex();
						var boundObject = getTableSelectedObject(oCheckTable,
								selIndex);
						var oModelCheckSet = sap.ui.getCore().getModel();

						var deleteOKText = resourceModel
								.getProperty("DeleteOK");
						var deleteFailText = resourceModel
								.getProperty("DeleteFail");

						oModelCheckSet.remove(entityRegSetName + "("
								+ sapRegTestId + "='"
								+ sap.ui.getCore().byId(idfldIDReg).getValue()
								+ "'," + sapCheckSetId + "='"
								+ boundObject.id_check_set + "',"
								+ sapRunningNr + "='" + boundObject.running_nr
								+ "')", {
							method : methodDelete,
							success : function(data) {
								sap.m.MessageToast.show(deleteOKText);
							},
							error : function(e) {
								sap.m.MessageToast.show(deleteFailText);
							}
						});
						reloadModel(oUser);
						fragDelCH.close();
					},
					onCloseDialogDelCH : function() {
						fragDelCH.close();
					},

					// Placehodlers Fragments
					onAddPlaceClick : function() {
						// if(!fragAddPH){
						var oView = sap.ui.getCore().byId(viewRegTestDetail);
						fragAddPH = sap.ui.xmlfragment(fragAddPHDialog, oView
								.getController());
						// }
						fragAddPH.open();
					},

					onDelPlaceClick : function(oPlaceTable) {
						var selIndex = oPlaceTable.getSelectedIndex();
						if (selIndex != -1) {
							var oView = sap.ui.getCore()
									.byId(viewRegTestDetail);
							fragDelPH = sap.ui.xmlfragment(fragDelPHDialog,
									oView.getController());
							fragDelPH.open();
						} else {
							var deleteSelectText = resourceModel
									.getProperty("DeleteSelect");
							sap.m.MessageToast.show(deleteSelectText);
						}
					},
					dialogAftercloseAddPH : function(oEvent) {

						fragAddPH.destroy();
					},
					dialogAftercloseDelPH : function(oEvent) {
						fragDelPH.destroy();
					},
					onEditPlaceClick : function() {
						var oPlaceTable = sap.ui.getCore().byId(
								idPlaceTableToReg);
						var selIndex = oPlaceTable.getSelectedIndex();
						if (selIndex != -1) {
							var boundObject = getTableSelectedObject(
									oPlaceTable, selIndex);

							localStorage.setItem(selectedPlObject_id_reg_test,
									boundObject.id_reg_test);
							localStorage.setItem(selectedPlObject_placeholder,
									boundObject.placeholder);
							localStorage.setItem(selectedPlObject_replace_with,
									boundObject.replace_with);

							oCtrl = new sap.ui.controller(controlUpdatePHFrag);
							fragUpdPH = sap.ui.xmlfragment(fragUpdPHDialog,
									oCtrl);
							oCtrl.onInit();

							// var oView = sap.ui.getCore()
							// .byId(viewRegTestDetail);

							// fragUpdPH = sap.ui.xmlfragment(fragUpdPHDialog,
							// oView.getController());

							// sap.ui.getCore().byId(updPlaceholder).setValue(
							// boundObject.placeholder);
							// sap.ui.getCore().byId(updReplace).setValue(
							// boundObject.replace_with);

							fragUpdPH.open();
						} else {
							var editText = resourceModel
									.getProperty("EditSelect");
							sap.m.MessageToast.show(editText);
						}
					},
					onSaveAddPH : function(oEvent) {
						var oEntry = {};
						oEntry.id_reg_test = sap.ui.getCore().byId(idfldIDReg)
								.getValue();
						oEntry.placeholder = sap.ui.getCore().byId(
								inputPlaceholder).getValue();
						oEntry.replace_with = sap.ui.getCore().byId(
								inputReplace).getValue();
						var oModelRegTest = sap.ui.getCore().getModel();

						if (oEntry.placeholder != '') { // insert
							oModelRegTest.create(entityPlaceSetName, oEntry);
							var addOKTxt = resourceModel.getProperty("AddOK")
							sap.m.MessageToast.show(addOKTxt); // ToDo
																// according to
																// result
						} else {
							var insertPlaceText = resourceModel
									.getProperty("InsertPlace");
							sap.m.MessageToast.show(insertPlaceText);
						}
						reloadModel(oUser);
						fragAddPH.close();

					},
					onCloseDialogAddPH : function() {
						fragAddPH.close();
					},
					onSaveDelPH : function(oEvent) {
						var oPlaceTable = sap.ui.getCore().byId(
								idPlaceTableToReg);
						var selIndex = oPlaceTable.getSelectedIndex();
						var boundObject = getTableSelectedObject(oPlaceTable,
								selIndex);
						var oModelPlaceSet = sap.ui.getCore().getModel();

						var deleteOKText = resourceModel
								.getProperty("DeleteOK");
						var deleteFailText = resourceModel
								.getProperty("DeleteFail");

						oModelPlaceSet.remove(entityPlaceSetName + "("
								+ sapRegTestId + "='" + boundObject.id_reg_test
								+ "'," + sapPlaceholder + "='"
								+ boundObject.placeholder + "')", {
							method : methodDelete,
							success : function(data) {
								sap.m.MessageToast.show(deleteOKText);
							},
							error : function(e) {
								sap.m.MessageToast.show(deleteFailText);
							}
						});
						reloadModel(oUser);
						fragDelPH.close();
					},
					onCloseDialogDelPH : function() {
						fragDelPH.close();
					},

					onBeforeRendering : function() {
						try {
							oUser.Login = localStorage.getItem("oUser_Login");
							oUser.Pwd = localStorage.getItem("oUser_Pwd");
							oUser.hd1user = localStorage
									.getItem("oUser_hd1user");
							oUser.hd1pwd = localStorage.getItem("oUser_hd1pwd");
							validateUser(oUser);
							reloadModel(oUser);

							sap.ui.getCore().byId(idfldIDReg).setValue(
									localStorage
											.getItem(choosenRegTest_idRegTest));
							sap.ui.getCore().byId(idFldRegNameValue).setValue(
									localStorage.getItem(choosenRegTest_name));
							sap.ui.getCore().byId(idAreaXML).setValue(
									localStorage.getItem(choosenRegTest_XML));
							sap.ui.getCore().byId(idRegActiveCheck).setChecked(localStorage.getItem(choosenRegTest_active)=="true");
							sap.ui.getCore().byId(idRegTestVariantValue).setValue(localStorage.getItem(choosenRegTest_variant));
							this.refreshRelatedTables();
						} catch (err) {
							var oRouter = sap.ui.core.routing.Router
									.getRouter(routerName);
							oRouter.navTo(routeLogin);
							var loginFirstText = resourceModel
									.getProperty("LoginFirst");
							sap.m.MessageToast.show(loginFirstText);
						}
					}
				});