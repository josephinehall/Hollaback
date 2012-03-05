
function onBodyLoad()
{		
    document.addEventListener("deviceready", onDeviceReady, false);
};


//document ready wins
$(document).ready(function(){
		
	var urlConfig = new config.urlConfiguration();

	var userInformation = new viewModel.userInformation(urlConfig);
	userInformation.read();
	ko.validation.rules.pattern.message = 'Invalid.';
    

	ko.validation.configure({
		registerExtenders: true,
		messagesOnModified: true,
		insertMessages: true,
		parseInputAttributes: true,
		messageTemplate: null
	});

	
	ko.applyBindings(new viewModel.loginViewModel(userInformation));


});


// PhoneGap is ready seconds
function onDeviceReady() {
};

