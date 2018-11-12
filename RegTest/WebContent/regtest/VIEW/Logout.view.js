sap.ui.jsview("regtest.VIEW.Logout", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf regtest.Logout
	*/ 
	getControllerName : function() {
		return "regtest.CONTROLLER.Logout";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf regtest.Logout
	*/ 
	createContent : function(oController) {
		sap.ui.getCore().setModel(null);
		localStorage.removeItem("oUser_Login");
		localStorage.removeItem("oUser_Pwd");

		
       $.ajax({
           type: "GET",
           url: getUrl( logoffService ),  //Clear SSO cookies: SAP Provided service to do that
        }).done(function(data){ //Now clear the authentication header stored in the browser
//                            if (!document.execCommand("ClearAuthenticationCache")) {
//                                 //"ClearAuthenticationCache" will work only for IE. Below code for other browsers
//                                 $.ajax({
//                                               type: "GET",
//                                               url: getUrl(dataServiceName), //any URL to a Gateway service
//                                               username: 'dummy', //dummy credentials: when request fails, will clear the authentication header
//                                               password: 'dummy',
//                                               statusCode: { 401: function() {
//                                                         //This empty handler function will prevent authentication pop-up in chrome/firefox
//                                               } },
//                                               error: function() {
//                                                    alert('reached error of wrong username password')
//                                               }
//                                });
//                            }
        })

				
		return new sap.m.Page({
			title: "{i18n>Bye}",
			content: [			
			]
		});
	}

});