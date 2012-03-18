
function hollabackStartup(){    		
	hollabackApplication.bootstrapper.run();
};


$('#indexPage').live('pageinit',function(event,ui){

	ko.validation.rules.pattern.message = 'Invalid.';
		ko.validation.configure({
			registerExtenders: true,
			messagesOnModified: true,
			insertMessages: false,
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
       var userInformation = hollabackApplication.bootstrapper.getUserInformation();
       var locationPageViewModel = new userViewModels.userLocationViewModel(userInformation);
       ko.applyBindings(locationPageViewModel,this);
});

$("#signupPage").live("pageinit",function(event){
		var userInformation = hollabackApplication.bootstrapper.getUserInformation();
        var userSignUpPage = new userViewModels.signUpViewModel(userInformation);
        ko.applyBindings(userSignUpPage,this);
});

$("#forgotPasswordPage").live("pageinit",function(event){
		var userInformation = hollabackApplication.bootstrapper.getUserInformation();
        var forgotPasswordViewModel = new userViewModels.forgotPasswordViewModel(userInformation);
        ko.applyBindings(forgotPasswordViewModel,this);
});

 $('#menuPage').live('pageinit', function(event, ui){  
        var menuPageViewModel = hollabackApplication.bootstrapper.getMenuPageViewModel();	
       	ko.applyBindings(menuPageViewModel,this);
});

 $('#menuPage').live('pagebeforeshow', function(event, ui){  
		hollabackApplication.bootstrapper.resetMenuPageViewModel();
});

 $('#shareStoryPage').live('pageinit', function(event, ui){
		var storyInformation = hollabackApplication.bootstrapper.getStoryInformation();
 		var shareStoryViewModel = new shareViewModels.shareStoryViewModel(storyInformation);
 		ko.applyBindings(shareStoryViewModel, this);
 });


var hollabackApplication ={
		
		bootstrapper: (function(){
		
		/*private variables and methods (not accessible directly through the  mySingleton namespace): */
		
		var running = false;
		var bootstrapper; 
		var pageNavigator;
		var userInformation;
		var userLoginViewModel;
		var menuPageViewModel;
		var storyInformation;
		
		function isRunning(){
            return running;
		}
		
		function run(){
			running = true;
			pageNavigator = new hollabackApplication.pageNavigator();	
			var urlConfig = new config.urlConfiguration();
			userInformation = new user.userInformation(urlConfig);
			userLoginViewModel = new userViewModels.loginViewModel(userInformation);
			menuPageViewModel =	new hollabackViewModels.menuPageViewModel(userInformation);
			storyInformation = new story.storyInformation(urlConfig,userInformation);
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
			
			getMenuPageViewModel:function(){
				return menuPageViewModel;
			},

			
			resetMenuPageViewModel:function(){
				menuPageViewModel.reset();
			},
			
			getStoryInformation:function(){
				storyInformation.read();
				return storyInformation;
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


