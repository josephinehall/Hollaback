var hollabackViewModels = {
	
    menuPageViewModel: function(userInformation) {   
    	var self = this; 	
    	self.userInformation = userInformation;
    	self.loggedInUserName = userInformation.userName;
        
        self.signout = function(){
           self.userInformation.removeCredentials();
		   $.mobile.changePage("#indexPage");   
        };
    }
    
}