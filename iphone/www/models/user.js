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
           window.localStorage.clear();
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
        
        self.login = function(username,password,callback){
                        
            // note: this xml body is formatted as such because the server is expects this exact format. This 
        	//shoud be in future a json request over ssl. 
            var loginRequest = urlConfig.getLoginStartRequestBoundary() +"<hollaback_aut>\n<username>"+username+"</username>\n<password>"+password+"</password>\n</hollaback_aut>" + urlConfig.getLoginEndRequestBoundary();
            
            $.ajax({
                   type: 'POST',
                   url: urlConfig.getLoginUrl(),
                   data:loginRequest,
                   dataType: 'text',
                   contentType:urlConfig.getLogInContentType(),
                   success: function(response){			         
		                  parseLoginResponse(response,username,password,callback);		         		
	                   },
                   error: function(xhr, status, error){parseLoginResponse(xhr.responseText,callback);},
                   });
        };
        
        
        //this function exists because the back end server does not respect http response headers and 
        //real world content types. Jquery fails to parse the response because it has no root node, and 
        //is not wellformed xml
        //so  check to see if this is actually a response.
        function parseLoginResponse(response,username,password, callback){
        	if(response)
        	{
        		
        	   var trimmedResponse = $.trim(response);
        	   var realXml = "<response>"+trimmedResponse+"</response>";//wrap to make well formed xml
        	   xmlDoc = $.parseXML(realXml);
           	   var status = $(xmlDoc).find('status').text();
	           var message = $(xmlDoc).find('msg').text();
	           if(status == 'error')
	           {
	               callback(message);
	           }
	           else if(status == 'okay')
	           {
	               setAuthenticationSuccessful();
                   setUserInformation(username,password,"");
	               callback("Log In Successful");
	           }
	           else
	           {
	           		callback("There was an error");
	           }
	         }
	         else
	         {
	         	callback("There was an error");
	         }
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

