
function hollabackStartup(){    		
	hollabackApplication.bootstrapper.run();
};

$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.mobile.allowCrossDomainPages = true;
    $.mobile.pushStateEnabled = false;
});



$('#indexPage').live('pageinit',function(event,ui){

	ko.validation.rules.pattern.message = 'Invalid.';
		ko.validation.configure({
			registerExtenders: true,
			messagesOnModified: true,
			insertMessages: true,
			parseInputAttributes: true,
			messageTemplate: null
		});
		hollabackStartup();	 	 	
		var loginViewModel = hollabackApplication.bootstrapper.getLoginViewModel();	
	 	ko.applyBindings(loginViewModel,this);
	 		 
});

$('#indexPage').live('pagebeforeshow',function(event,ui){
       	hollabackApplication.bootstrapper.resetLoginViewModel();			 
});



 $('#locationPage').live('pageinit', function(event, ui){
       	var userInformation = hollabackApplication.bootstrapper.getUserInformation()
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

		var userInformation = hollabackApplication.bootstrapper.getUserInformation()
        var userSignUpPage = new userViewModels.signUpViewModel(userInformation);
        ko.applyBindings(userSignUpPage,this);
		
});

 $('#menuPage').live('pageinit', function(event, ui){  
 		var urlConfig = new config.urlConfiguration();
        var userInformation = new user.userInformation(urlConfig);
        var menuPageViewModel = new hollabackViewModels.menuPageViewModel(userInformation);
       	ko.applyBindings(menuPageViewModel,this);
});


var hollabackApplication ={
		
		bootstrapper: (function(){
		
		/*private variables and methods (not accessible directly through the  mySingleton namespace): */
		
		var running = false;
		var bootstrapper; 
		var pageNavigator;
		var userInformation;;
		var userLoginViewModel
		
		function isRunning(){
            return running;
		}
		
		function run(){
			running = true;
			pageNavigator = new hollabackApplication.pageNavigator();	
			var urlConfig = new config.urlConfiguration();
			userInformation = new user.userInformation(urlConfig);
			userLoginViewModel = new userViewModels.loginViewModel(userInformation);	
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
			},
			
			getUserInformation:function(){
				userInformation.read();
				return userInformation;
			},
			
			getLoginViewModel:function(){
				return userLoginViewModel;
			},
			
			resetLoginViewModel:function(){
				userLoginViewModel.reset();
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


