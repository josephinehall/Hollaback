var hollabackViewModels = {
	
    menuPageViewModel: function() {   
    	var self = this; 	
    	self.loggedInUserName = ko.observable('Amy');
        
        self.signout = function(){
            alert("sigingin out");
        };
    },
    
    aboutPageViewModel: function(){
    
    },
    
    donatePageViewModel: function(){
    
    },
    
}