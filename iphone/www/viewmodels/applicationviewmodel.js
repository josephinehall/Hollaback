var model = {

    userInformation: function() {
    	
    	var userName;
    	var password;
    	var emailAddress;
    	var location;
    	
        var userNameStorageKey = "userNameKey";
        var passwordStorageKey = "passwordKey";
        var emailStorageKey = "emailKey";
        var locationStorageKey = "locationKey";
        
    	this.getUserName = function(){
    		return userName;
    	};
    	
    	this.setUserName = function(newUserName){
    		alert(newUserName);
    		userName = newUserName;
    	}
    	
    	this.read = function(){
			userName = window.localStorage.getItem(userNameStorageKey);
			password = window.localStorage.getItem(passwordStorageKey);
			email = window.localStorage.getItem(emailStorageKey);
			location = window.localStorage.getItem(locationStorageKey);;
		};
		
		this.save = function(){
            window.localStorage.setItem(userNameStorageKey, userName);
            window.localStorage.setItem(passwordStorageKey, password);
            window.localStorage.setItem(emailStorageKey, emailAddress);
            window.localStorage.setItem(locationStorageKey, location);
            
		};
		
		this.hasUserData = function(){
			alert("Checking if we have user data");
			if(userName && password && emailAddress && location){
				return true;
			}else{
				return false;
			}
		};
        
        this.removeCredentials = function(){
            window.localStorage.removeItem(userNameStorageKey);
            window.localStorage.removeItem(passwordStorageKey);
            window.localStorage.removeItem(emailStorageKey);
            window.localStorage.removeItem(locationStorageKey);
        };
        
        
		
    },

    userLocation: function() {
    
    	this.getAvalibleLocations = function(){};
    }
};

var viewModel ={

	loginViewModel: function(userModel){
	
		self.model = userModel;
		self.userName = ko.observable(userModel.getUserName());
		
		self.submitUserInformation = function() {
			alert("validate before submit");
			self.model.setUserName(self.userName());
			self.model.save();
        };

		
	},
	

};

