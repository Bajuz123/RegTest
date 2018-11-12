//General
var regTestVersion = "1.0.3"
var resourceModel = {}
var i18nModel = {}
var dataServiceName = "/sap/opu/odata/sap/Z_REG_TEST_SRV";
var jSONDataName = "regtest/JSON/RegTest_DATA.json";
var notificationService = "/sap/opu/odata/sap/z_reg_test_srv/";
var logoffService = "/sap/public/bc/icf/logoff";
var bundlePath = "regtest.i18n.i18n";
var columnDefaultValue = "value";
var columnDefaultCheckBoxValue = "checked";
var columnDefaultTextView = "text";
var rowDefaultValue = "rows";
var xmlType = "xml";
var filesType = "files";
var dblclickEvent = "dblclick";
var httpGet = "GET";
var httpPost = "POST";
var socket = {};

var oUser = {
	Login : "",
	Pwd : ""
};
var selectedObject = {
	id_reg_test : "",
	id_check_set : "",
	running_nr : ""
};
var selectedPlObject = {
	idRegTest : "",
	placeholder : ""
};
var choosenCheckSet = {
	idCheckSet : "",
	name : "",
	implementationClass : ""
};

// LocalStorage
var choosenRegTest_idRegTest = "choosenRegTest_idRegTest";
var choosenRegTest_name = "choosenRegTest_name";
var choosenRegTest_XML = "choosenRegTest_XML";
var choosenRegTest_active = "choosenRegTest_active";
var choosenRegTest_variant = "choosenRegTest_variant";

var selectedPlObject_id_reg_test = "selectedPlObject_id_reg_test";
var selectedPlObject_placeholder = "selectedPlObject_placeholder";
var selectedPlObject_replace_with = "selectedPlObject_replace_with";

var selectedCheckSet_idRegTest = "selectedCheckSet_idRegTest";
var selectedCheckSet_idCheckSet = "selectedCheckSet_idCheckSet";
var selectedCheckSet_runningNr = "selectedCheckSet_runningNr";

// EntityNames
var entityRegTestSetName = "/REG_TEST_SET";
var entityCheckSetSetName = "/CHCK_SET";
var entityLogSetName = "/REG_LOG_SET";
var entityPlaceSetName = "/REG_PLACE_SET";
var entityRegSetSetName = "/REG_SET_SET";
var entityRegSetName = "/REG_SET";
// Icons
var iconAdd = "sap-icon://add";
var iconDel = "sap-icon://delete";
var iconEdit = "sap-icon://edit";
var iconRefresh = "sap-icon://refresh";
var iconSave = "sap-icon://save";
var iconUndo = "sap-icon://undo";
var iconProcess = "sap-icon://process";
var iconPlaceholders = "sap-icon://x-ray";
var iconCheckSets = "sap-icon://stethoscope";
var iconUpload = "sap-icon://upload";
var iconLog = "sap-icon://log";
var iconPopup = "sap-icon://message-popup";
var iconMenu ="sap-icon://icon-menu";

//SRC IMG
var iconLangGer = "regtest/img/ger.jpg";
var iconLangSvk = "regtest/img/svk.jpg";

//Langu
var svkLangu = "sk";
var gerLangu = "de";

// Routes
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

// Views
var viewRegTestList = "idregtest.VIEW.RegTest";
var viewCheckSetList = "idregtest.VIEW.CheckSet";
var viewLogList = "idregtest.VIEW.Log";
var viewRegTestDetail = "idregtest.VIEW.RegTestDetail";
var controlUpdateCheckSetFrag = "regtest.CONTROLLER.updCheckSetFrag";
var controlUpdatePHFrag = "regtest.CONTROLLER.updPHFrag";

// Login View
var idBoxLogin = "idvBoxLogin";
var idLoginText = "idLoginText";
var idLoginName = "idLoginName";
var idBtnLogin = "idBtnLogin";
var idPwdField = "idPwdField";
var idVersion = "idVersion";

// RegTest View
var idRegTestTable = "idRegTestTable";
var idBtnAddReg = "idBtnAddReg";
var idBtnDelReg = "idBtnDelReg";
var idBtnEditReg = "idBtnEditReg";
var idMainPanel = "idMainPanel";
var idRegChoosen = "idRegChoosen";
var idBtnRunRegs = "idBtnRunRegs";

// CheckSet View
var idTableCheckSet = "idTableCheckSet";
var idBtnAddCheckSet = "idBtnAddSet";
var idBtnDelCheckSet = "idBtnDelSet";
var idBtnEditCheckSet = "idBtnEditSet";
var idMainPanelChck = "idMainPanelChck";

//CheckSetDetail View
var idCheckSetIdInput = "idCheckSetIdInput";
var idCheckSetName = "fldName";
var idCheckSetClass = "fldImplClass";
var idCheckSetBtnOKCheck = "idCheckSetBtnOKCheck";
var idCheckSetBtnBackCheck = "idchecksetBtnBackCheck";
var idcheckSetNameLabel = "idcheckSetNameLabel";
var idPanelCheckDetailName = "idPanelCheckDetailName";
var idCheckSetClassNameLabel = "idCheckSetClassNameLabel";
var idPanelCheckDetailClassName = "idPanelCheckDetailClassName";

//RegTestDetail View
var idBtnOKReg = "idBtnOKReg";
var idBtnBackReg = "idBtnBackReg";
var idBtnRun = "idBtnRun";
var idBtnRegPlace = "idBtnRegPlace";
var idBtnSet = "idBtnSet";
var idBtnXMLUpload = "idBtnXMLUpload";
var idfldIDReg = "idfldIDReg";
var idRegTestNameLabel = "idRegTestNameLabel";
var idFldRegNameValue = "idFldRegNameValue";
var idFileReaderComponent = "idFileReaderComponent";
var idPanelRegDetailName = "idPanelRegDetailName";
var idRegTestActiveLabel = "idRegTestActiveLabel";
var idRegActiveCheck = "idRegActiveCheck";
var idRegTestVariantLabel = "idRegTestVariantLabel";
var idRegTestVariantValue = "idRegTestVariantValue";
var idPanelDetailVariant = "idPanelDetailVariant";

var idRegTestXMLLabel = "idRegTestXMLLabel";
var idAreaXML = "idAreaXML";
var idPanelDetailButtons = "idPanelDetailButtons";
var idPanelRegDetailXML = "idPanelRegDetailXML";
var idPanelRegDetailXMLButton = "idPanelRegDetailXMLButton";
var idRegRelatedDetailButtons = "idRegRelatedDetailButtons";
var btnPlaceAdd = "btnPlaceAdd";
var btnPlaceDel = "btnPlaceDel";
var idListRelatedCheck = "idListRelatedCheck";
var btnCheckAdd = "btnCheckAdd";
var btnCheckDel = "btnCheckDel";

var idPlaceTableToReg = "idPlaceTableToReg";
var idListRelatedPlace = "idListRelatedPlace";

var idCheckTableToReg = "idCheckTableToReg";
var idBusyDialog = "idBusyDialog";

var idToolbar = "idToolbar";

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

// Split View
var idSplitAppControl = "idSplitAppControl";

//Fragments
var fragAddCheckSet = "regtest.fragments.addCheckSet";
var fragDelCheckSet = "regtest.fragments.delCheckSet";
var fragUpdCheckSet = "regtest.fragments.updCheckSet";

var fragAddPHDialog = "regtest.fragments.addDialog";
var fragDelPHDialog = "regtest.fragments.delDialog";
var fragUpdPHDialog = "regtest.fragments.updDialog";
var fragMessagePopover =  "regtest.fragments.MessagePopover";

var updateCheckset = "updateCheckset";
var updateRunNumber = "updateRunNumber";
var comboCheckSetValue = "ComboCheckSetValue";
var inputRunNumber = "inputRunNumber";
var updPlaceholder = "updPlaceholder";
var updReplace = "updReplace";
var inputPlaceholder = "inputPlaceholder";
var inputReplace = "inputReplace";

var addCHDialog = "addCHDialog";

//Menu
var idMenuList = "idMenuList";

//Notifications
var idBtnClearMessages = "idBtnClearMessages";
var idBtnDisplayMessages = "idBtnDisplayMessages";

//Menu
var idMenuButtonReg = "idMenuButtonReg";
var idMenuButtonCheck = "idMenuButtonCheck";
var idMenuButtonLog = "idMenuButtonLog";

var idMenuRegTest = "idMenuRegTest";
var idMenuCheckSet = "idMenuCheckSet";
var idMenuLogList = "idMenuLogList";
var idMenuLogout = "idMenuLogout";

// SAP Entity CheckSet
var sapCheckSetId = "id_check_set";
var sapCheckSetName = "name";
var sapCheckSetClass = "implementation_class";

// SAP Entity CheckSet
var sapRunId = "run_id";
var sapRegTestId = "id_reg_test";
var sapCheckSetId = "id_check_set";
var sapLogRegTestName = "reg_test_name";
var sapPartId = "id_part";
var sapMsgId = "msg_id";
var sapMsgText = "msg_text";
var sapPlaceholder = "placeholder";
var sapIdPlaceholder = "id_placeholder";
var sapRegTestName = "name";
var sapRegTestXML = "xml";
var sapRegTestActive = "active";
var sapCheckSetName = "check_set_name";
var sapRunningNr = "running_nr";
var sapReplaceWith = "replace_with";
var sapName = "name";
var sapSynchron = "flg_synchron"
var sapRunResult = "run_result";
var sapMsgType = "msg_type";
var sapRegSel = "selected";
var sapVariant = "variant";
var sapRegLogName = "reg_test_name";	

// Operations
var methodDelete = "DELETE";

//Function Import
var fiStartCredit = "START_CREDIT";
var fiRemoveNotification = "REMOVE_NOTIFICATION";