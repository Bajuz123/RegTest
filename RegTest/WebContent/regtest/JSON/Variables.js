//General
var resourceModel = {}
var i18nModel = {}
var dataServiceName = "/sap/opu/odata/sap/Z_REG_TEST_SRV";
var jSONDataName = "regtest/JSON/RegTest_DATA.json";
var bundlePath = "regtest.i18n.i18n";
var columnDefaultValue = "value";
var selectedObject = {id_reg_test:"", id_check_set:"",running_nr:""};
var selectedPlObject = {idRegTest:"", placeholder:""};

//EntityNames
var entityRegTestSetName = "/REG_TEST_SET";
var entityCheckSetSetName = "/CHCK_SET";
var entityLogSetName = "/REG_LOG_SET";
var entityPlaceSetName = "/REG_PLACE_SET";
var entityRegSetSetName = "/REG_SET_SET";
//Icons
var iconAdd = "sap-icon://add";
var iconDel = "sap-icon://delete";
var iconEdit = "sap-icon://edit";
var iconRefresh = "sap-icon://refresh";

//Routes
var routeRegTestList = "RegTest";
var routeRegTestDetail = "RegTestDetail";
var routeCheckSetList = "CheckSet";
var routeCheckSetDetail = "CheckSetDetail";
var routeLogList = "Log";
var routeLogin = "Login";
var routeLogout = "Logout";
var routeMenu = "Menu";
var routeSplit = "SplitAppControl";
var routerName = "appRouter";

// Login View
var idBoxLogin = "idvBoxLogin";
var idLoginText = "idLoginText";
var idLoginName = "idLoginName";
var idBtnLogin = "idBtnLogin";
var idPwdField = "idPwdField";

// CheckSet View
var idTableCheckSet = "idTableCheckSet";
var idBtnAddCheckSet = "idBtnAddSet";
var idBtnDelCheckSet = "idBtnDelSet";
var idBtnEditCheckSet = "idBtnEditSet";
var idMainPanelChck = "idMainPanelChck";
var idCheckSetIDField = "idCheckSetIdField";
var idCheckSetName = "fldName";
var idCheckSetClass = "fldImplClass";

// Log View
var idLogPanel = "idLogPanel";
var idRunIdText = "idRunIdText";
var idRunIdValue = "idRunIdValue";
var maxValue = "max";
var idLogPanelRunId = "idLogPanelRunId";
var idRegTestName = "idRegTestName";
var idRegTestNameValue = "idRegTestNameValue";
var idRegTestIDPanel = "idRegTestIDPanel";
var idBtnRefresh = "idBtnRefresh";
var idLogTable = "idLogTable";

// SAP Entity CheckSet
var sapCheckSetId = "id_check_set";
var sapCheckSetName = "name";
var sapCheckSetClass = "implementation_class";

//SAP Entity CheckSet
var sapRunId = "run_id";
var sapRegTestId = "id_reg_test";
var sapRegTestName = "reg_test_name";
var sapPartId = "id_part";
var sapMsgId = "msg_id";
var sapMsgText = "msg_text";
var sapIdPlaceholder = "id_placeholder";

//Operations
var methodDelete = "DELETE";