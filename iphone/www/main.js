
function onBodyLoad()
{		
    document.addEventListener("deviceready", onDeviceReady, false);
};

function hollabackStartup(){    		
	hollabackApplication.bootstrapper.run();
};

$('#indexPage').live('pageinit',function(event,ui){
	 	hollabackStartup();		 
	});

 $('#locationPage').live('pageinit', function(event, ui){
        var urlConfig = new config.urlConfiguration();
        var userInformation = new user.userInformation(urlConfig);
        var locationPageViewModel = new userViewModels.userLocationViewModel(userInformation);
       	ko.applyBindings(locationPageViewModel,this);
  	});


// PhoneGap is ready seconds
function onDeviceReady() {
    //hollabackStartup();	
};


var hollabackApplication ={
		
		bootstrapper: (function(){
		
		/*private variables and methods (not accessible directly through the  mySingleton namespace): */
		
		var running = false;
		var bootstrapper; 
		function isRunning(){
            return running;
		}
		
		function run(){
			running = true;
			var pageNavigator = new hollabackApplication.pageNavigator();	
			var urlConfig = new config.urlConfiguration();
			var userInformation = new user.userInformation(urlConfig);
			userInformation.read();
			if(userInformation.isSignedIn())
			{
				pageNavigator.navigateToMainMenu();
			}
			else
			{
				pageNavigator.navigateToLocationSignUp();
			}
		}
		
		/* public variables and methods (can access private vars and methods ) */
		return {
			run:function(){
				if(!isRunning()){	
					run();
				}
			},
		}
		})(),
	


	pageNavigator: function(){	
		var self = this; 
		
		self.navigateToLocationSignUp = function(){
			$.mobile.changePage("views/location.html");
		};
				
		self.navigateToSignupPage = function(){			
			$.mobile.changePage("views/signup.html");
		};
		
		self.navigateToMainMenu = function(){
			$.mobile.changePage("views/menu.html");
		};
		
		self.navigateToMap = function(){
			$.mobile.changePage("views/map.html");
		};		
	},
};


