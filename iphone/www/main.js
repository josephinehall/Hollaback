
function onBodyLoad()
{		
    document.addEventListener("deviceready", onDeviceReady, false);
}

//document ready wins
$(document).ready(function(){

	$.get('http://testbackend.ihollaback.com/local/', function(data) {
    	alert(data[0]);
	},'jsonp');
                 
            var signuprequest =escape("<hollaback_signup><username>test</username><password>cock</password><email>cock@cock.com</email></hollaback_signup>");     
                  
                  var signUpUrl = "http://testbackend.ihollaback.com/signup/";
                  $.ajax({
                         type: 'POST',
                         url: signUpUrl,
                         data:signuprequest,
                         success: function(data){alert("hello" + data);},
                         error: function(data){alert("pooo" + data);},
                         dataType: 'xml'
                         });


	var userInformation = new viewModel.userInformation();
	userInformation.read();
//	userInformation.hasUserData();
//	
//	
	ko.applyBindings(new viewModel.loginViewModel(userInformation));

});


// PhoneGap is ready seconds
function onDeviceReady() {

   	var userInformation = new viewModel.userInformation();
	userInformation.read();
	userInformation.hasUserData();
    
	ko.applyBindings(new viewModel.loginViewModel(userInformation));
}

