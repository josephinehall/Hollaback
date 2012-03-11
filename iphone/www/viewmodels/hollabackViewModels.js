var hollabackViewModels = {
	
    menuPageViewModel: function(userInformation) {   
    	var self = this; 	
    	self.userInformation = userInformation;
    	self.loggedInUserName = userInformation.userName;
        
        self.signout = function(){
            alert("sigingin out");
        };
    },
    
    aboutPageViewModel: function(){
    
    },
    
    donatePageViewModel: function(){
    
    },
    
}