var viewModel = {

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
			userName = window.localStorage.getItem(userNameStorageKey);			
			password = window.localStorage.getItem(passwordStorageKey);			
			emailAddress = window.localStorage.getItem(emailStorageKey);		
			userLocation = window.localStorage.getItem(locationStorageKey);
			hasAuthenticated = window.localStorage.getItem(hasAuthenticatedStorageKey);
		};
    
		self.save = function(){
            window.localStorage.setItem(userNameStorageKey, userName);
            window.localStorage.setItem(passwordStorageKey, password);
            window.localStorage.setItem(emailStorageKey, emailAddress);
            window.localStorage.setItem(locationStorageKey, selectedLocation); 
            window.localStorage.setItem(hasAuthenticatedStorageKey,hasAuthenticated)          
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
			 window.localStorage.setItem(hasAuthenticatedStorageKey,hasAuthenticated)   
		};
		
		
    }, //  -- end userInformation



	//Sets up the location options
    userLocationViewModel: function(userInformation) {   
    	var self = this;
    	var userInformation = userInformation;
        alert('h');
    	self.availableLocations = ko.observableArray();
    	$.ajax({
    		url: 'http://testbackend.ihollaback.com/localiPhone/',
			dataType: 'jsonp',
			success: function(data){
				var jsonText = JSON.stringify(data);
				var array = jQuery.parseJSON(jsonText);
				for(key in array) {
					self.availableLocations.push(new viewModel.location(key));
				}
				}
    	});
    	
        self.selectedLocation = ko.observable(); // Nothing selected by default
        
        self.setLocation = ko.computed(function(){
        	userInformation.setLocation(self.selectedLocation());
        });
    },
    
    location : function(name) {
        this.locationName = name;    
    },

	loginViewModel: function(userModel){
		var self = this; 	
		self.model = userModel;
		self.userName = ko.observable(userModel.userName).extend({ required: true });
    	self.password = ko.observable(userModel.password).extend({ required: true });
    	self.emailAddress = ko.observable(userModel.emailAddress).extend({ required: true });
        self.responseText = ko.observable();    
    	self.errors = ko.validation.group(self);
		
		self.signin = function() {		
			var isValid = validateLoginCredentials();	
			if(isValid){
				self.responseText("Signing In");
		        self.model.signUp(self.userName(),self.password(), self.emailAddress(),function(message){userSignedIn(message)});
            }
        };
      
        self.signout = function() {
            self.model.removeCredentials();
        };
        
        function userSignedIn(message){
        	self.responseText(message);
        	$.mobile.changePage("menu.html");

        	if(self.model.isSignedIn()){
        		$.mobile.changePage("views/menu.html");
        	}

        }
       
        
        function validateLoginCredentials(){     	
        	var isValid = modelIsValid();
        	if (!isValid) {
            	self.errors.showAllMessages();
        	}
			return isValid;
        }
        
        function modelIsValid(){
        	return self.errors().length == 0;
        }
		
	},

};

