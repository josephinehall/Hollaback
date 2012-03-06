
function onBodyLoad()
{		
    document.addEventListener("deviceready", onDeviceReady, false);
};


//document ready wins
$(document).ready(function(){
	var pageNavigator = new hollabackApplication.pageNavigator();	
	var urlConfig = new config.urlConfiguration();
	var userInformation = new viewModel.userInformation(urlConfig);
	userInformation.read();
	if(userInformation.isSignedIn())
	{
		pageNavigator.navigateToMainMenu();
	}
	else
	{
		pageNavigator.navigateToSignupPage();
	}

	ko.validation.rules.pattern.message = 'Invalid.';
    

	ko.validation.configure({
		registerExtenders: true,
		messagesOnModified: true,
		insertMessages: true,
		parseInputAttributes: true,
		messageTemplate: null
	});

	//ko.applyBindings(new viewModel.userLocation);
	ko.applyBindings(new viewModel.loginViewModel(userInformation));

});

// PhoneGap is ready seconds
function onDeviceReady() {

  	var urlConfig = new config.urlConfiguration();

	var userInformation = new viewModel.userInformation(config);
	userInformation.read();
	userInformation.hasUserData();
	ko.applyBindings(new viewModel.userLocation);
	ko.applyBindings(new viewModel.loginViewModel(userInformation));

};

var hollabackApplication ={

	pageNavigator: function(){	
		var self = this; 
		
		self.navigateToSignupPage = function(){			
			$.mobile.changePage("views/signup.html");
		};
		
		self.navigateToMainMenu = function(){
			$.mobile.changePage("views/menu.html");
		};		
	},
};


