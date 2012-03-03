var viewModel = {

    userInformation: function() {
    	
        self.userName = ko.observable();
    	var password;
    	var emailAddress;
    	var location;
    	
        var userNameStorageKey = "userNameKey";
        var passwordStorageKey = "passwordKey";
        var emailStorageKey = "emailKey";
        var locationStorageKey = "locationKey";
          	
    	this.read = function(){
        
			userName = window.localStorage.getItem(userNameStorageKey);
			password = window.localStorage.getItem(passwordStorageKey);
			email = window.localStorage.getItem(emailStorageKey);
			location = window.localStorage.getItem(locationStorageKey);
            
		};
		
		this.save = function(){
            alert(self.userName);
            window.localStorage.setItem(userNameStorageKey, userName);
            window.localStorage.setItem(passwordStorageKey, password);
            window.localStorage.setItem(emailStorageKey, emailAddress);
            window.localStorage.setItem(locationStorageKey, location);
            
		};
		
		this.isSignedIn = function(){
            this.read()
			alert("Checking if we have user data");
            alert(window.localStorage.getItem(userNameStorageKey));
			if(userName){
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
            this.read();
        };
        
        this.signUp = function(){
            var signUpUrl = "http://testbackend.ihollaback.com/signup/";
            $.ajax({
                   type: 'POST',
                   url: signUpUrl,
                   data: data,
                   success: function(data){alert("hello" + data);},
                   error: function(data){alert("pooo" + data);},
                   dataType: dataType
                   });
        }
        
        
		
    },

    userLocation: function() {
    
    	this.getAvalibleLocations = function(){};
    },

	loginViewModel: function(userModel){
	
		self.model = userModel;
		self.userName = userModel.userName;
        self.password = ko.observable(userModel.password);
        self.emailAddress = ko.observable(userModel.emailAddress);
		
		self.signin = function() {
			self.model.save();
            
            alert(self.model.isSignedIn());
            //if all is well...
            //$.mobile.changePage("views/menu.html");
            
        };
      
        self.signout = function() {
            alert("signout");
            self.model.removeCredentials();
        };
		
	},
	

};

