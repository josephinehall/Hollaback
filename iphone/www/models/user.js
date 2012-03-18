var user = {

  	userInformation: function(configuration) {
    	var self = this; 	
    	var urlConfig = configuration;                	
    	var userNameStorageKey = "userNameKey";
        var passwordStorageKey = "passwordKey";
        var emailStorageKey = "emailKey";
        var locationStorageKey = "locationKey";
        var hasAuthenticatedStorageKey = "isAuthenticatedKey";
        
        self.userName;
    	self.password;
    	self.emailAddress;
    	self.selectedLocation;
    	self.hasAuthenticated;	
			
		self.read = function(){      			  
			self.userName = window.localStorage.getItem(userNameStorageKey);			
			self.password = window.localStorage.getItem(passwordStorageKey);			
			self.emailAddress = window.localStorage.getItem(emailStorageKey);		
			self.userLocation = window.localStorage.getItem(locationStorageKey);
			self.hasAuthenticated = window.localStorage.getItem(hasAuthenticatedStorageKey);
		};
    
		self.save = function(){
            window.localStorage.setItem(userNameStorageKey, self.userName);
            window.localStorage.setItem(passwordStorageKey, self.password);
            window.localStorage.setItem(emailStorageKey, self.emailAddress);
            window.localStorage.setItem(locationStorageKey, self.selectedLocation); 
            window.localStorage.setItem(hasAuthenticatedStorageKey,self.hasAuthenticated);          
		};
		
		self.setLocation = function(locationName){
			self.selectedLocation = locationName;
			window.localStorage.setItem(locationStorageKey, self.selectedLocation);
		}
		
		self.isSignedIn = function(){
            return self.hasAuthenticated != undefined && self.hasAuthenticated;           
		};
		        
        self.removeCredentials = function(){
           window.localStorage.clear();
        };
        
        self.signUp = function(userNameToSet,passwordToSet,emailToSet,callback){
              		
      		var signupMessage = new Object();
      		signupMessage.username = userNameToSet;
      		signupMessage.password = passwordToSet;
      		signupMessage.email = emailToSet;
			 $.ajax({
			         type: 'POST',
			         url: urlConfig.getSignupUrl(),
			         data: jQuery.param(signupMessage),
			         success: function(response){	
								 if(response == 'OK')
								 {
								  	setAuthenticationSuccessful();  	
				         			setUserInformation(userNameToSet,passwordToSet,emailToSet);
								  	callback("Sign Up Successful");
								 }
								 else
								 {
								  	callback(response);
								 }						         		
			         		},
			         error: function(xhr, status, error){callback("There was an error");},
			         });
			
		};
        
        self.login = function(username,password,callback){
        
            var loginMessage = new Object();
      		loginMessage.username = username;
      		loginMessage.password = password;   
      		        
            $.ajax({
                   type: 'POST',
                   url: urlConfig.getLoginUrl(),
                   data:jQuery.param(loginMessage),
                   success: function(response){			         
						   if(response == 'OK')
				           {
				               setAuthenticationSuccessful();
				               setUserInformation(username,password,"");
				               callback("Log In Successful");
				           }
				           else
				           {
				           		callback(response);
				           }
         		
	                   },
                   error: function(xhr, status, error){callback("There was an error");},
                   });
        };
		
		function setUserInformation (userNameToSet,passwordToSet,emailToSet){
			self.userName = userNameToSet;
			self.password = passwordToSet;
			self.emailAddress = emailToSet;
			self.save();
		};
				    	
    	function setAuthenticationSuccessful(){
			 self.hasAuthenticated = true;
			 window.localStorage.setItem(hasAuthenticatedStorageKey,self.hasAuthenticated)   
		};
		
		self.read();
		
    }, //  -- end userInformation


    location : function(name) {
        this.locationName = name;    
    },

};

