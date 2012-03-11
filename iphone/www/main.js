
function onBodyLoad()
{		
    document.addEventListener("deviceready", onDeviceReady, false);
};

function hollabackStartup(){    		
	hollabackApplication.bootstrapper.run();
};


$('#indexPage').live('pageinit',function(event,ui){
		ko.validation.rules.pattern.message = 'Invalid.';
		ko.validation.configure({
			registerExtenders: true,
			messagesOnModified: true,
			insertMessages: true,
			parseInputAttributes: true,
			messageTemplate: null
		});
		var urlConfig = new config.urlConfiguration();
        var userInformation = new user.userInformation(urlConfig);
		var loginViewModel = new userViewModels.loginViewModel(userInformation);
	 	ko.applyBindings(loginViewModel,this);	
		hollabackStartup();	 
	
	 		 
});

$('#indexPage').live('pagebeforeshow',function(event,ui){
	//	var urlConfig = new config.urlConfiguration();
    //    var userInformation = new user.userInformation(urlConfig);
	//	var loginViewModel = new userViewModels.loginViewModel(userInformation);
	// 	ko.applyBindings(loginViewModel,this);	
	//	hollabackStartup();	 		 
});



 $('#locationPage').live('pageinit', function(event, ui){
        var urlConfig = new config.urlConfiguration();
        var userInformation = new user.userInformation(urlConfig);
        var locationPageViewModel = new userViewModels.userLocationViewModel(userInformation);
       	ko.applyBindings(locationPageViewModel,this);
});

$("#signupPage").live("pageinit",function(event){
		ko.validation.rules.pattern.message = 'Invalid.';
		ko.validation.configure({
			registerExtenders: true,
			messagesOnModified: true,
			insertMessages: true,
			parseInputAttributes: true,
			messageTemplate: null
		});

		var urlConfig = new config.urlConfiguration();
        var userInformation = new user.userInformation(urlConfig);
        var userSignUpPage = new userViewModels.signUpViewModel(userInformation);
        ko.applyBindings(userSignUpPage,this);
		
});

 $('#menuPage').live('pageinit', function(event, ui){  
 		var urlConfig = new config.urlConfiguration();
        var userInformation = new user.userInformation(urlConfig);
        var menuPageViewModel = new hollabackViewModels.menuPageViewModel(userInformation);
       	ko.applyBindings(menuPageViewModel,this);
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
		var pageNavigator;
		
		function isRunning(){
            return running;
		}
		
		function run(){
			running = true;
			pageNavigator = new hollabackApplication.pageNavigator();	
			var urlConfig = new config.urlConfiguration();
			var userInformation = new user.userInformation(urlConfig);
			if(userInformation.isSignedIn())
			{
				pageNavigator.navigateToMainMenu();
			}
		}
		
		/* public variables and methods (can access private vars and methods ) */
		return {
			run:function(){
				if(!isRunning()){	
					run();
				}
			},
			
			getPageNavigator:function(){
				return pageNavigator;
			}
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


