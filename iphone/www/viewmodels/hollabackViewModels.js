var hollabackViewModels = {
	
    menuPageViewModel: function(userInfromation) {   
    	var self = this; 	
    	self.userInformation = userInformation;
    	self.loggedInUserName = userInfromation.userName;
        
        self.signout = function(){
            alert("sigingin out");
        };
    },
    
    aboutPageViewModel: function(){
    
    },
    
    donatePageViewModel: function(){
    
    },
    
}