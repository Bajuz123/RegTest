sap.ui.controller("regtest.CONTROLLER.Log",
		{
			/**
			 * Called when a controller is instantiated and its View controls
			 * (if available) are already created. Can be used to modify the
			 * View before it is displayed, to bind event handlers and do other
			 * one-time initialization.
			 * 
			 * @memberOf regtest.VIEW.Log
			 */
			onRefresh : function() {
				var oLogTable = sap.ui.getCore().byId(idLogTable);
				var oRegTestName = sap.ui.getCore().byId(idRegTestNameValue)
						.getValue();
				var oRunID = sap.ui.getCore().byId(idRunIdValue).getValue();

				if (oRegTestName != "") {
					var oRegIDFilter = new sap.ui.model.Filter({
						path : sapRegTestName,
						operator : sap.ui.model.FilterOperator.Contains,
						value1 : oRegTestName
					});
				} else {
					var oRegIDFilter = new sap.ui.model.Filter({
						path : sapLogRegTestName,
						operator : sap.ui.model.FilterOperator.Contains,
						value1 : ''
					});
				}

				if ((oRunID != '')) {
					var oRunIDFilter = new sap.ui.model.Filter({
						path : sapRunId,
						operator : sap.ui.model.FilterOperator.EQ,
						value1 : oRunID
					})
				} else {
					var oRunIDFilter = new sap.ui.model.Filter({
						path : sapRunId,
						operator : sap.ui.model.FilterOperator.Contains,
						value1 : ''
					})
				}

				var oPartIDFilter = new sap.ui.model.Filter({
					path : sapPartId,
					operator : sap.ui.model.FilterOperator.Contains,
					value1 : ''
				})

				var filtersReg = new sap.ui.model.Filter({
					filters : [ oRegIDFilter, oRunIDFilter, oPartIDFilter ],
					and : true
				});

				debugger;
				oLogTable.getBinding(rowDefaultValue).filter(filtersReg,
						sap.ui.model.FilterType.Application);
			},
			onBeforeRendering : function() {
				try {
					oUser.Login = localStorage.getItem("oUser_Login");
					oUser.Pwd = localStorage.getItem("oUser_Pwd");
					oUser.hd1user = localStorage.getItem("oUser_hd1user");
					oUser.hd1pwd = localStorage.getItem("oUser_hd1pwd");
					validateUser(oUser);
					reloadModel(oUser);
					debugger;
					this.onRefresh();
				} catch (err) {
					var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
					oRouter.navTo(routeLogin);
					var loginFirstText = resourceModel.getProperty("LoginFirst");
					sap.m.MessageToast.show(loginFirstText);
				}
			}
		});