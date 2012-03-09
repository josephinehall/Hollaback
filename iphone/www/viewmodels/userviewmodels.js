var userViewModels = {

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

