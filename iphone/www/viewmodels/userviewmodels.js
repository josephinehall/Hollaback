var userViewModels = {

    userLocationViewModel: function(userInformation, hollabackChapters) {   
    	var self = this;
    	self.userInformation = userInformation;  
        self.selectedLocation = ko.observable().extend({required: { message: 'Please select your local hollaback.' }});        
    	self.availableLocations = ko.observableArray();	
    	self.errors = ko.validation.group(self);
    	
    	hollabackChapters.getAllChapters(function(chapters){
    		self.availableLocations(chapters)
    	});
    	
        self.setLocation = function(){
        	var isValid = modelIsValid();
        	if(isValid)
        	{      		
        		userInformation.setLocation(self.selectedLocation());
        		$.mobile.changePage("#signupPage");
        	}else
        	{
        		showErrors();
        	}
        };
        
      	function modelIsValid(){
        	return self.errors().length == 0;
        };
        
        function showErrors(){
        	try
			{			
        		navigator.notification.alert(getErrorMessage(), function(){}, "Ooops");
			}
			catch(err)
			{
				alert(getErrorMessage());
			}
        }
        
        function getErrorMessage(){
        	var message = "";
        	for (i=0;i < self.errors().length;i++)
			{
				message += self.errors()[i] + "\n";
			}
			return message;
        };

    },
    
    loginViewModel: function(userModel){
    	var self = this;
    	self.userModel = userModel;
       	self.userName = ko.observable(userModel.userName).extend({required: { message: 'Please supply your user name.' }})
														 .extend({validation: {
														        validator: function (val, min) {
														            return val.length >= min;
														        },
														        message: 'User name must be at least 5 characters.',
														        params: 5
														    	}
															})
														  .extend({validation: {
														        validator: function (val, max) {
														            return val.length < max;
														        },
														        message: 'User name must be less than 15 characters.',
														        params: 15
														    	}
															});
    	self.password = ko.observable(userModel.password).extend({required: { message: 'Please supply your password.' }})
														 .extend({validation: {
														        validator: function (val, min) {
														            return val.length >= min;
														        },
														        message: 'Password must be at least 6 characters.',
														        params: 6
														    	}
															});
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
    		$.mobile.changePage("#forgotPasswordPage");
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
        		showErrors();
        	}
			return isValid;
        };
        
        function modelIsValid(){
        	return self.errors().length == 0;
        };
        
        function showErrors(){
        	try
			{			
        		navigator.notification.alert(getErrorMessage(), function(){}, "Ooops","Ok let's try again");
			}
			catch(err)
			{
				alert(getErrorMessage());
			}
        }
        
        function getErrorMessage(){
        	var message = "";
        	for (i=0;i < self.errors().length;i++)
			{
				message += self.errors()[i] + "\n";
			}
			return message;
        };
    	
    },
    
	signUpViewModel: function(userModel){
		var self = this; 	
		self.model = userModel;
		self.userName = ko.observable(userModel.userName).extend({required: { message: 'Please supply your user name.' }})
														 .extend({validation: {
														        validator: function (val, min) {
														            return val.length >= min;
														        },
														        message: 'User name must be at least 5 characters.',
														        params: 5
														    	}
															})
														  .extend({validation: {
														        validator: function (val, max) {
														            return val.length < max;
														        },
														        message: 'User name must be less than 15 characters.',
														        params: 15
														    	}
															});
    	self.password = ko.observable(userModel.password).extend({required: { message: 'Please supply your password.' }})
														 .extend({validation: {
														        validator: function (val, min) {
														            return val.length >= min;
														        },
														        message: 'Password must be at least 6 characters.',
														        params: 6
														    	}
															});
		self.confirmPassword = ko.observable().extend({validation: { 
													   validator: function (val, other) {return val == other();},
													   message: 'Passwords do not match.',
													   params: self.password }});
													   
    	self.emailAddress = ko.observable(userModel.emailAddress).extend({required: { message: 'Please supply your email address.' }})
    	self.confirmEmail = ko.observable().extend({validation: { 
													   validator: function (val, other) {return val == other();},
													   message: 'Emails do not match.',
													   params: self.emailAddress }});
        self.responseText = ko.observable();    
    	self.errors = ko.validation.group(self);
		
		self.signin = function() {		
			var isValid = validateLoginCredentials();	
			if(isValid){
				self.responseText("Signing In");
		        self.model.signUp(self.userName(),self.password(), self.emailAddress(),function(message){userSignedIn(message)});
            }
        };
        
        function userSignedIn(message){
        	self.responseText(message);

        	if(self.model.isSignedIn()){
				$.mobile.changePage("#menuPage");
        	}
        }; 
        
        function validateLoginCredentials(){     	
        	var isValid = modelIsValid();
        	if (!isValid) {    		 
            	showErrors();
        	}
			return isValid;
        };
      
        function modelIsValid(){
        	return self.errors().length == 0;
        };
        
          function showErrors(){
        	try
			{			
        		navigator.notification.alert(getErrorMessage(), function(){}, "Ooops","Ok lets try again");
			}
			catch(err)
			{
				alert(getErrorMessage());
			}
        };
        
        function getErrorMessage(){
        	var message = "";
        	for (i=0;i < self.errors().length;i++)
			{
				message += self.errors()[i] + "\n";
			}
			return message;
        };

		
	},
	
	forgotPasswordViewModel: function(userModel){
		var self = this; 	
		self.model = userModel;
		
		self.sendEmail = function() {	
			self.model.sendPasswordResetRequest();
        };

	},

};

