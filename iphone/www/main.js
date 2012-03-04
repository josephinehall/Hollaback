
function onBodyLoad()
{		
    document.addEventListener("deviceready", onDeviceReady, false);
}

//document ready wins
$(document).ready(function(){
	applyBindings();
});

// PhoneGap is ready seconds
function onDeviceReady() {
	applyBindings();
}

function applyBindings(){
	var userInformation = new viewModel.userInformation();
	userInformation.read();
	userInformation.hasUserData();
	//var userLocation = new viewModel.userLocation();
    
    ko.applyBindings(new viewModel.userLocation);
	ko.applyBindings(new viewModel.loginViewModel(userInformation));
	//ko.applyBindings(new viewModel.setLocationViewModel(userLocation));
	
	//ko.applyBindings (new viewModel.availableCountries);
}


