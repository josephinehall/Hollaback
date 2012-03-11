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
            window.localStorage.setItem(hasAuthenticatedStorageKey,self.hasAuthenticated)          
		};
		
		self.setLocation = function(locationName){
			self.selectedLocation = locationName;
			window.localStorage.setItem(locationStorageKey, self.selectedLocation);
		}
		
		self.isSignedIn = function(){
            return self.hasAuthenticated != undefined && self.hasAuthenticated;           
		};
		        
        self.removeCredentials = function(){
            window.localStorage.removeItem(userNameStorageKey);
            window.localStorage.removeItem(passwordStorageKey);
            window.localStorage.removeItem(emailStorageKey);
            window.localStorage.removeItem(locationStorageKey);           
            window.localStorage.removeItem(hasAuthenticatedStorageKey);
            self.read();
        };
        
        self.signUp = function(userNameToSet,passwordToSet,emailToSet,callback){
        
        	// note: this xml body is formatted as such because the server is expects this exact format. This 
        	//shoud be in future a json request over ssl. 
            var signuprequest = "--0xKhTmLbOuNdArY\nContent-Disposition: form-data; name=\"hollabackposting\"; filename=\"file.bin\"\r\n\r\n \n<hollaback_signup>\n<username>"+userNameToSet+"</username>\n<password>"+passwordToSet+"</password>\n<email>"+emailToSet+"</email>\n</hollaback_signup>\n--0xKhTmLbOuNdArY--\r\n--%@--\r\n";
      
  
			 var signUpUrl = "testbackend.ihollaback.com/signup/";
			 $.ajax({
			         type: 'POST',
			         url: urlConfig.getSignupUrl(),
			         data:signuprequest,
			         dataType: 'xml',
			         contentType:urlConfig.getSignupContentType(),
			         success: function(response){			         
							         		 var status = $(response).find('status').text();
											 var message = $(response).find('msg').text();
											 if(status == 'error')
											 {
											  	callback(message);
											 }
											 else
											 {
											  	setAuthenticationSuccessful();  	
							         			setUserInformation(userNameToSet,passwordToSet,emailToSet);
											  	callback("Sign Up Successful");
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
			 alert("hi");
		};
		
		
    }, //  -- end userInformation


    location : function(name) {
        this.locationName = name;    
    },

};

