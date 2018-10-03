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
							reloadModel(oUser);
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
						this.onPlaceholderClick();
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
						oEntry.Name = escapeText(sap.ui.getCore().byId(
								idFldRegNameValue).getValue());
						oEntry.XML = escapeText(sap.ui.getCore()
								.byId(idAreaXML).getValue());
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

							var creditFinishedOK = resourceModel
									.getProperty("creditFinishedOK");
							var creditFinishedFail = resourceModel
									.getProperty("creditFinishedFail");

							oDataModel.callFunction(fiStartCredit, httpGet, {
								sapRegTestId : regTestID
							}, null, function(oData, response) {
								var busyDialog = sap.ui.getCore().byId(
										idBusyDialog)
								busyDialog.close();
								sap.m.MessageToast.show(creditFinishedOK);
							}, // callback function for success
							function(oError) {
								var busyDialog = sap.ui.getCore().byId(
										idBusyDialog)
								busyDialog.close();
								sap.m.MessageToast.show(creditFinishedFail);
							}); // callback function for error
						} else {
							var saveBeforeRun = resourceModel
									.getProperty("SaveBeforeRun");
							sap.m.MessageToast.show(saveBeforeRun);
						}
					},

					onPlaceholderClick : function() {
						sap.ui.getCore().byId(idListRelatedCheck).setVisible(
								false);
						sap.ui.getCore().byId(idListRelatedPlace).setVisible(
								true);
					},

					onCheckSetClick : function() {
						sap.ui.getCore().byId(idListRelatedCheck).setVisible(
								true);
						sap.ui.getCore().byId(idListRelatedPlace).setVisible(
								false);
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
					dialogAftercloseUpdCH : function(oEvent) {
						fragUpdCH.destroy();
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

							var oView = sap.ui.getCore()
									.byId(viewRegTestDetail);

							fragUpdCH = sap.ui.xmlfragment(fragUpdCheckSet,
									oView.getController());

							sap.ui.getCore().byId(updateCheckset)
									.setSelectedKey(idCheckSet);
							// sap.ui.getCore().byId("updateCheckset").setValue(
							// idCheckSet);
							sap.ui.getCore().byId(updateRunNumber).setValue(
									runNumber);

							localStorage.setItem("selectedCheckSet_idRegTest",
									boundObject.id_reg_test);
							localStorage.setItem("selectedCheckSet_idCheckSet",
									boundObject.id_check_set);
							localStorage.setItem("selectedCheckSet_runningNr",
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
							sap.m.MessageToast.show(addOKTxt); //ToDo according to result
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
						var oCheckTable = sap.ui.getCore().byId(idCheckTableToReg);
						var id_reg_test = sap.ui.getCore().byId(idfldIDReg)
								.getValue();
						var selIndex = oCheckTable.getSelectedIndex();
						var boundObject = getTableSelectedObject(oCheckTable,
								selIndex);
						var idCheckSet = boundObject.id_check_set;
						var runNumber = boundObject.running_nr;
						var oModelCheckSet = sap.ui.getCore().getModel();
						oModelCheckSet.remove(entityRegSetName + "(id_reg_test='" //
								+ id_reg_test + "',id_check_set='" + idCheckSet
								+ "',running_nr='" + runNumber + "')", {
							method : methodDelete,
							success : function(data) {
								sap.m.MessageToast.show("Delete successfull");
							},
							error : function(e) {
								sap.m.MessageToast.show("Delete error");
							}
						});
						reloadModel(oUser);
						fragDelCH.close();
					},
					onCloseDialogDelCH : function() {
						fragDelCH.close();
					},
					onSaveUpdCH : function(oEvent) {
						var oEntry = {};
						oEntry.id_reg_test = sap.ui.getCore().byId(idfldIDReg)
								.getValue();
						oEntry.id_check_set = sap.ui.getCore().byId(
								"updateCheckset").getSelectedKey();
						oEntry.running_nr = sap.ui.getCore().byId(
								"updateRunNumber").getValue();
						var oModelPlaceSet = sap.ui.getCore().getModel();

						oModelPlaceSet.update("/REG_SET(id_reg_test='"
								+ localStorage
										.getItem("selectedCheckSet_idRegTest")
								+ "',id_check_set='"
								+ localStorage
										.getItem("selectedCheckSet_idCheckSet")
								+ "',running_nr='"
								+ localStorage
										.getItem("selectedCheckSet_runningNr")
								+ "')", oEntry, {
							success : function(data) {
								sap.m.MessageToast.show("Update successfull");
							},
							error : function(e) {
								sap.m.MessageToast.show("Update error");
							}
						})
						reloadModel(oUser);
						fragUpdCH.close();
					},
					onCloseDialogUpdCH : function() {
						fragUpdCH.close();
					},

					// Placehodlers Fragments
					onAddPlaceClick : function() {
						// if(!fragAddPH){
						var oView = sap.ui.getCore().byId(
								viewRegTestDetail);
						fragAddPH = sap.ui.xmlfragment(
								fragAddDialog, oView
										.getController());
						// }
						fragAddPH.open();
					},

					onDelPlaceClick : function(oPlaceTable) {
						var selIndex = oPlaceTable.getSelectedIndex();
						if (selIndex != -1) {
							var oView = sap.ui.getCore().byId(
									viewRegTestDetail);
							fragDelPH = sap.ui.xmlfragment(
									"regtest.fragments.delDialog", oView
											.getController());
							fragDelPH.open();
						} else {
							sap.m.MessageToast.show("Select a row to delete!");
						}
					},
					dialogAftercloseAddPH : function(oEvent) {

						fragAddPH.destroy();
					},
					dialogAftercloseDelPH : function(oEvent) {
						fragDelPH.destroy();
					},
					dialogAftercloseUpdPH : function(oEvent) {
						fragUpdPH.destroy();
					},

					onEditPlaceClick : function() {
						var oPlaceTable = sap.ui.getCore().byId(
								idPlaceTableToReg);
						var selIndex = oPlaceTable.getSelectedIndex();
						if (selIndex != -1) {
							var boundObject = getTableSelectedObject(
									oPlaceTable, selIndex);

							localStorage.setItem(
									"selectedPlObject_id_reg_test",
									boundObject.id_reg_test);
							localStorage.setItem(
									"selectedPlObject_placeholder",
									boundObject.placeholder);
							localStorage.setItem(
									"selectedPlObject_replace_with",
									boundObject.replace_with);

							fragUpdPH.open();
						} else {
							sap.m.MessageToast.show("Select a row to edit!");
						}
					},
					onSaveAddPH : function(oEvent) {
						var oEntry = {};
						oEntry.id_reg_test = sap.ui.getCore().byId(idfldIDReg)
								.getValue();
						oEntry.placeholder = sap.ui.getCore().byId(
								"inputPlaceholder").getValue();
						oEntry.replace_with = sap.ui.getCore().byId(
								"inputReplace").getValue();
						var oModelRegTest = sap.ui.getCore().getModel();

						if (oEntry.placeholder != '') { // insert
							oModelRegTest.create(entityPlaceSetName, oEntry);
							sap.m.MessageToast.show("Add successfull");

						} else {
							sap.m.MessageToast
									.show("Insert 'Placeholders' and 'Replace with'");
						}
						reloadModel(oUser);
						fragAddPH.close();

					},
					onCloseDialogAddPH : function() {
						fragAddPH.close();
					},
					onSaveDelPH : function(oEvent) {
						var oPlaceTable = sap.ui.getCore().byId(idPlaceTableToReg);
						var selIndex = oPlaceTable.getSelectedIndex();
						var boundObject = getTableSelectedObject(oPlaceTable,
								selIndex);
						var idRegTest = boundObject.id_reg_test;
						var placeholder = boundObject.placeholder;
						var oModelPlaceSet = sap.ui.getCore().getModel();
						oModelPlaceSet.remove(entityPlaceSetName + "(id_reg_test='"
								+ idRegTest + "',placeholder='" + placeholder
								+ "')", {
							method : "DELETE",
							success : function(data) {
								sap.m.MessageToast.show("Delete successfull");
							},
							error : function(e) {
								sap.m.MessageToast.show("Delete error");
							}
						});
						reloadModel(oUser);
						fragDelPH.close();
					},
					onCloseDialogDelPH : function() {
						fragDelPH.close();
					},
					onSaveUpdPH : function(oEvent) {

						var oEntry = {};
						oEntry.id_reg_test = sap.ui.getCore().byId(idfldIDReg)
								.getValue();
						oEntry.placeholder = sap.ui.getCore().byId(
								"updPlaceholder").getValue();
						oEntry.replace_with = sap.ui.getCore().byId(
								"updReplace").getValue();

						var oModelPlaceSet = sap.ui.getCore().getModel();
						oModelPlaceSet
								.update(
										entityPlaceSetName + "(id_reg_test='"
												+ localStorage
														.getItem("selectedPlObject_id_reg_test")
												+ "',placeholder='"
												+ localStorage
														.getItem("selectedPlObject_placeholder")
												+ "')",
										oEntry,
										{
											success : function(data) {
												sap.m.MessageToast
														.show("Update successfull");
											},
											error : function(e) {
												sap.m.MessageToast
														.show("Update error");
											}
										})
						reloadModel(oUser);
						fragUpdPH.close();
					},
					onCloseDialogUpdPH : function() {
						fragUpdPH.close();
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

							sap.ui
									.getCore()
									.byId(idfldIDReg)
									.setValue(
											localStorage
													.getItem("choosenRegTest_idRegTest"));
							sap.ui
									.getCore()
									.byId(idFldRegNameValue)
									.setValue(
											localStorage
													.getItem("choosenRegTest_name"));
							sap.ui.getCore().byId(idAreaXML).setValue(
									localStorage.getItem("choosenRegTest_XML"));
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