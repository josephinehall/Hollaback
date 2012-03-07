
function onBodyLoad()
{		
    document.addEventListener("deviceready", onDeviceReady, false);
};


//document ready wins
$(document).ready(function(){

	var boostrapper = new hollabackApplication.bootstrapper();
	boostrapper.run();

});

// PhoneGap is ready seconds
function onDeviceReady() {

	var boostrapper = new hollabackApplication.bootstrapper();
	boostrapper.run();
	
};

var hollabackApplication ={

	bootstrapper: function(){
		var self = this;
		
		self.run = function(){
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
		};
	},

	pageNavigator: function(){	
		var self = this; 
		
		self.navigateToSignupPage = function(){			
			$.mobile.changePage("views/signup.html");
		};
		
		self.navigateToMainMenu = function(){
			$.mobile.changePage("views/menu.html");
		};
		
		self.navigateToMap = function(){
			$.mobile.changePage("views/map.html");
		};		
	},
};


