sap.ui
		.controller("regtest.CONTROLLER.RegTest",
				{

					/**
					 * Called when a controller is instantiated and its View
					 * controls (if available) are already created. Can be used
					 * to modify the View before it is displayed, to bind event
					 * handlers and do other one-time initialization.
					 * 
					 * @memberOf regtest.RegTest
					 */
					// onInit : function() {
					// },
					/*
					 * onDblClick : function() { oTable =
					 * sap.ui.getCore().byId('idRegTest'); //
					 * oTable.setSelectedIndex(window.selectedIndex);
					 * this._oDialog =
					 * sap.ui.xmlfragment("com.tutorial.fragments.addDialog",this);
					 * this._oDialog.open(); //
					 * sap.m.MessageToast.show("ondoubleclick"); },
					 */

					onAddRegClick : function() {
						var oRouter = sap.ui.core.routing.Router
								.getRouter("appRouter");
						oRouter.navTo("RegTestDetail");
						sap.ui.getCore().byId("fldIDReg").setValue("");
						var oRegDetailView = sap.ui.getCore().byId(
								"idregtest.VIEW.RegTestDetail");
						oRegDetailView.getController().refreshRelatedTables();
					},

					onDelRegClick : function(oRegTable) {
						var selIndex = oRegTable.getSelectedIndex();

						if (selIndex != -1) {
							var boundObject = getTableSelectedObject(oRegTable,
									selIndex);
							var idRegTest = boundObject.id_reg_test;
							var oModelRegTest = sap.ui.getCore().getModel();
							oModelRegTest.remove("/REG_TEST_SET(id_reg_test='"
									+ idRegTest + "')", {
								method : "DELETE",
								success : function(data) {
									sap.m.MessageToast
											.show("Delete successfull");
								},
								error : function(e) {
									sap.m.MessageToast.show("Delete error");
								}
							});
							reloadModel(oUser);
							var oRouter = sap.ui.core.routing.Router
									.getRouter("appRouter");
							oRouter.navTo("RegTest");
						} else {
							sap.m.MessageToast.show("Select a row to delete!");
						}
					},

					onEditRegClick : function(oRegTable) {
						var selIndex = oRegTable.getSelectedIndex();
						if (selIndex != -1) {
							var boundObject = getTableSelectedObject(oRegTable,
									selIndex);

							var oRouter = sap.ui.core.routing.Router
									.getRouter("appRouter");
							oRouter.navTo("RegTestDetail");

							sap.ui.getCore().byId("fldIDReg").setValue(
									boundObject.id_reg_test);
							sap.ui.getCore().byId("fldRegName").setValue(
									boundObject.Name);
							sap.ui.getCore().byId("areaXML").setValue(
									boundObject.XML);

							var oRegDetailView = sap.ui.getCore().byId(
									"idregtest.VIEW.RegTestDetail");
							oRegDetailView.getController()
									.refreshRelatedTables();
						} else {
							sap.m.MessageToast.show("Select a row to edit!");
						}
					},

					/**
					 * Similar to onAfterRendering, but this hook is invoked
					 * before the controller's View is re-rendered (NOT before
					 * the first rendering! onInit() is used for that one!).
					 * 
					 * @memberOf regtest.RegTest
					 */
					onBeforeRendering : function() {
						try {
							oUser = localStorage.getItem("oUser");
							validateUser(oUser);
							reloadModel(oUser);
						} catch (err) {
							var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
							oRouter.navTo(routeLogin);
							var loginFirstText = resourceModel.getProperty("LoginFirst");
							sap.m.MessageToast.show(loginFirstText);
						}
					}
				});