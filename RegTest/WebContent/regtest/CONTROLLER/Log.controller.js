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
						path : sapLogRegTestName,
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

				oLogTable.getBinding(rowDefaultValue).filter(filtersReg,
						sap.ui.model.FilterType.Application);
			},
			onBeforeRendering : function() {
				if (!localStorage.getItem("oUser_Login") || !localStorage.getItem("oUser_Pwd")) {
					var oRouter = sap.ui.core.routing.Router.getRouter(routerName);
					oRouter.navTo(routeLogin);
					var loginFirstText = resourceModel.getProperty("LoginFirst");
					sap.m.MessageToast.show(loginFirstText);
				}
				this.onRefresh();
			}
		});