var userViewModels = {

	//Sets up the location options
    userLocationViewModel: function(userInformation) {   
    	var self = this;
    	var userInformation = userInformation;
    	self.availableLocations = ko.observableArray();
    	$.ajax({
    		url: 'http://testbackend.ihollaback.com/localiPhone/',
			dataType: 'jsonp',
			success: function(data){
				var jsonText = JSON.stringify(data);
				var array = jQuery.parseJSON(jsonText);
				for(key in array) {
					self.availableLocations.push(new user.location(key));
				}
				}
    	});
    	
        self.selectedLocation = ko.observable(); // Nothing selected by default
        
        self.setLocation = ko.computed(function(){
        	userInformation.setLocation(self.selectedLocation());
        });
    },
    
    loginViewModel: function(userModel){
    	var self = this;
    	self.userModel = userModel;
       	self.userName = ko.observable(userModel.userName).extend({ required: true });
    	self.password = ko.observable(userModel.password).extend({ required: true });
    	self.statusText = ko.observable();  	
    	self.errors = ko.validation.group(self);
    	
    	self.login = function(){
    		var isValid = validateLoginCredentials();	
    		if(isValid){
				self.statusText("Logging in");
				self.userModel.login(self.userName(),self.password(),function(message){userLoggedIn(message)});
    		}
    	};
    	
    	self.forgotPassword = function(){
    		alert("forgot password");
    	};
    	
    	self.signup = function(){	
			$.mobile.changePage("#locationPage");
    	};
    	
    	self.reset = function(){
    		self.userModel.read();
    		self.statusText(null);
    		self.errors = ko.validation.group(self);
    	
    		self.userName(self.userModel.userName);
    		self.password(self.userModel.password);
    	};
    	
    	function userLoggedIn(message){
    		self.statusText(message);
    		if(self.userModel.isSignedIn()){
    			$.mobile.loadPage("#menuPage");
				$.mobile.changePage("#menuPage");
        	}
    	};
    	    	
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
    
	signUpViewModel: function(userModel){
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

        	if(self.model.isSignedIn()){
				$.mobile.changePage("#menuPage");
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

