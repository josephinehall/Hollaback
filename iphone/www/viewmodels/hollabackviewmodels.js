var hollabackViewModels = {
	
    menuPageViewModel: function(userInformation) {   
    	var self = this; 	
    	self.userInformation = userInformation;
    	self.loggedInUserName = ko.observable(userInformation.userName);
        
        self.signout = function(){
           self.userInformation.removeCredentials();
		   $.mobile.changePage("#indexPage");   
        };
        
        self.reset = function(){
        	self.loggedInUserName(userInformation.userName)
        };
    },
    
    aboutPageViewModel: function(){
    
    },
    
    donatePageViewModel: function(){
    
    },
    
}