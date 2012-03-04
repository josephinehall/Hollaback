
function onBodyLoad()
{		
    document.addEventListener("deviceready", onDeviceReady, false);
};


//document ready wins
$(document).ready(function(){
			
	var urlConfig = new config.urlConfiguration();

	var userInformation = new viewModel.userInformation(urlConfig);
	userInformation.read();
	ko.applyBindings(new viewModel.loginViewModel(userInformation));


});


// PhoneGap is ready seconds
function onDeviceReady() {

  	var urlConfig = new config.urlConfiguration();

	var userInformation = new viewModel.userInformation(config);
	use
	rInformation.read();
	userInformation.hasUserData();
	ko.applyBindings(new viewModel.loginViewModel(userInformation));
};

