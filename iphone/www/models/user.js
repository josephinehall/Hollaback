var user = {

  	userInformation: function(configuration) {
    	var self = this; 	
    	var urlConfig = configuration;                	
    	var userNameStorageKey = "userNameKey";
        var passwordStorageKey = "passwordKey";
        var emailStorageKey = "emailKey";
        var localHollabackStorageKey = "locationKey";
        var hasAuthenticatedStorageKey = "isAuthenticatedKey";
        
        self.userName;
    	self.password;
    	self.emailAddress;
    	self.localHollaback;
    	self.hasAuthenticated;	
			
		self.read = function(){      			  
			self.userName = window.localStorage.getItem(userNameStorageKey);			
			self.password = window.localStorage.getItem(passwordStorageKey);			
			self.emailAddress = window.localStorage.getItem(emailStorageKey);		
			self.localHollaback = window.localStorage.getItem(localHollabackStorageKey);
			self.hasAuthenticated = window.localStorage.getItem(hasAuthenticatedStorageKey);
		};
    
		self.save = function(){
            window.localStorage.setItem(userNameStorageKey, self.userName);
            window.localStorage.setItem(passwordStorageKey, self.password);
            window.localStorage.setItem(emailStorageKey, self.emailAddress);
            window.localStorage.setItem(localHollabackStorageKey, self.localHollaback); 
            window.localStorage.setItem(hasAuthenticatedStorageKey,self.hasAuthenticated)          
		};
		
		self.setLocation = function(location){
			self.localHollaback = location;
			window.localStorage.setItem(localHollabackStorageKey, self.localHollaback);
		};
		
		self.hasLocation = function(){
			return self.localHollaback != undefined && self.localHollaback;
		};
		
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
        
        self.sendPasswordResetRequest = function(){
            alert("sdf");
        	var emailBody = "mailto:password@ihollaback.org?&subject=Doh!%20I%20forgot%20my%20Hollaback!%20password.&body=Dear%20Hollaback!%0a%0aUsername:%20(replace%20with%20username)%0a%0aI'm%20sending%20you%20this%20email%20because%20I%20forgot%20my%20password.%20I%20heard%20that%20you%20guys%20don't%20have%20a%20password%20retrieval%20function%20automated%20yet%20so%20you'll%20have%20to%20retrieve%20my%20password%20by%20hand.%20Sorry%20about%20that.%20To%20make%20it%20easy%20on%20you,%20I'm%20sending%20this%20from%20the%20email%20account%20that%20is%20registered%20with%20Hollaback!.%0a%0aThanks%0ame";
        	window.open(emailBody);
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

