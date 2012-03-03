
function onBodyLoad()
{		
    document.addEventListener("deviceready", onDeviceReady, false);
}

//document ready wins
$(document).ready(function(){
//	var userInformation = new model.userInformation();
//	userInformation.read();
//	userInformation.hasUserData();
//	
//	
//	ko.applyBindings(new viewModel.loginViewModel(userInformation));

});


// PhoneGap is ready seconds
function onDeviceReady() {
   	var userInformation = new model.userInformation();
	userInformation.read();
	userInformation.hasUserData();
    
	ko.applyBindings(new viewModel.loginViewModel(userInformation));
}

