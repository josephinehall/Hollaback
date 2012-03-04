var viewModel = {

    userInformation: function() {
    	
        self.userName = ko.observable();
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
			//locationSelected = window.localStorage.getItem(locationStorageKey);
		};
		
		this.save = function(){
            alert(self.userName);
            window.localStorage.setItem(userNameStorageKey, userName);
            window.localStorage.setItem(passwordStorageKey, password);
            window.localStorage.setItem(emailStorageKey, emailAddress);
            window.localStorage.setItem(locationStorageKey, location);
            //window.localStorage.setItem(locationSelectedStorageKey, locationSelected);
            
		};
		
		this.hasUserData = function(){
			alert("Checking if we have user data");
			if(userName && password && emailAddress && location){
				alert("Got the user data");
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
            self.read();
        };
        
        
		
    },


	//Sets up the location options
    userLocation: function() {
    	//create a dummy array for the moment
    	self.availableLocations = ko.observableArray([
            new viewModel.location("UK", 65000000),
            new viewModel.location("USA", 320000000),
            new viewModel.location("Sweden", 29000000)
        ]);
        self.selectedLocation = ko.observable(); // Nothing selected by default
		    
/*
    	this.getAvalibleLocations = function(){
    		alert("Got locations");
    		//here is where you want to use jquery to get the json from the server and store it internally to this obj
    		self.locations ="hi i am the result";
    	};
*/
    },
    
    //Location Object
    location : function(name, population) {
        this.locationName = name;
        this.locationPopulation = population;    
    },

	loginViewModel: function(userModel){
	
		self.model = userModel;
		self.userName = userModel.userName;
        self.password = ko.observable(userModel.password);
        self.emailAddress = ko.observable(userModel.emailAddress);
		
		self.signin = function() {
			self.model.save();
            //if all is well...
            $.mobile.changePage("views/menu.html");
            
        };
      
        self.signout = function() {
            alert("signout");
            self.model.removeCredentials();
        };
		
	},
	
};

