var viewModel = {

    userInformation: function(configuration) {
    	
        self.userName = ko.observable();
        self.urlConfig = configuration;
    	var password;
    	var emailAddress;
    	var location;
    	var availableLocations;
    	var selectedLocation;
    	//var locationSelected;
    	
    	
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
            window.localStorage.setItem(userNameStorageKey, userName);
            window.localStorage.setItem(passwordStorageKey, password);
            window.localStorage.setItem(emailStorageKey, emailAddress);
            window.localStorage.setItem(locationStorageKey, location);
            //window.localStorage.setItem(locationSelectedStorageKey, locationSelected);
            
		};
		
		this.isSignedIn = function(){
            this.read()
			if(userName){
				return true;
			}else{
				alert("No user data");
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
        
        this.signUp = function(callback){
            var signuprequest = "--0xKhTmLbOuNdArY\nContent-Disposition: form-data; name=\"hollabackposting\"; filename=\"file.bin\"\r\n\r\n \n<hollaback_signup>\n<username>amytest</username>\n<password>password</password>\n<email>test@test.com</email>\n</hollaback_signup>\n--0xKhTmLbOuNdArY--\r\n--%@--\r\n";
      
  
			 var signUpUrl = "testbackend.ihollaback.com/signup/";
			 $.ajax({
		         type: 'POST',
		         url: urlConfig.getSignupUrl(),
		         data:signuprequest,
		         dataType: 'xml text',
		         contentType:urlConfig.getSignupContentType(),
		         success: function(data){alert("hello" + data);callback("winning");},
		         error: function(xhr, status, error){callback("There was an error");}
		         });
		
		    };
        
        
		
    },


	//Sets up the location options
    userLocation: function() {   
    	var self = this;
    	self.availableLocations = ko.observableArray();
    	$.ajax({
    		url: 'http://testbackend.ihollaback.com/localiPhone/',
			dataType: 'jsonp',
			success: function(data){
				var jsonText = JSON.stringify(data);
				var array = jQuery.parseJSON(jsonText);
				for(key in array) {
					self.availableLocations.push(new viewModel.location(key,0));
				}
				}
    	});
    	
        self.selectedLocation = ko.observable(); // Nothing selected by default

    },
    
    //Location Object
    location : function(name, population) {
        this.locationName = name;
        this.locationPopulation = population;    
    },

	loginViewModel: function(userModel){
	
		self.model = userModel;
		self.userName = userModel.userName;
		self.statusText;
        self.password = ko.observable(userModel.password);
        self.emailAddress = ko.observable(userModel.emailAddress);
        self.responseText = ko.observable();
		
		self.signin = function() {
			//self.model.save();
			self.responseText ="Signing In";

           // self.model.signUp(function(responseMessage){alert(responseMessage);self.responseText = responseMessage;});
            //alert(self.model.isSignedIn());
            //if all is well...
            //$.mobile.changePage("views/menu.html");
            
        };
      
        self.signout = function() {
            alert("signout");
            self.model.removeCredentials();
        };
		
	},
	
};

