
document.addEventListener("deviceready", hollabackStartup, false);

function hollabackStartup() {
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
	   var hollbackchapters = hollabackApplication.bootstrapper.getHollabackChapers();
       var locationPageViewModel = new userViewModels.userLocationViewModel(userInformation,hollbackchapters);
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

$('#mapPage').live('pageinit',function(event,ui){
		var mapPageViewModel =  hollabackApplication.bootstrapper.getHollabackMapViewModel();	
		ko.applyBindings(mapPageViewModel, this);
});

$('#mapPage').live('pagebeforeshow',function(event,ui){
		var mapPageViewModel =  hollabackApplication.bootstrapper.getHollabackMapViewModel();	
		mapPageViewModel.resetMap();
});

$('#congratsPage').live('pageinit',function(event,ui){
       	hollabackApplication.bootstrapper.resetShareViewModel();			 
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
		var hollabackChapters;
		var userLocation;
		var hollabackMapViewModel;
		
		function isRunning(){
            return running;
		}
		
		function run(){
			running = true;
			var urlConfig = new config.urlConfiguration();
			userLocation = new hollabackLocation.usersLocation();
			userInformation = new user.userInformation(urlConfig);
			userLoginViewModel = new userViewModels.loginViewModel(userInformation);
			menuPageViewModel =	new hollabackViewModels.menuPageViewModel(userInformation);
			storyInformation = new story.storyInformation(urlConfig,userInformation);
			hollabackChapters = new hollabackLocation.hollabackChapters(urlConfig);
			hollabackMapViewModel = new hollabackViewModels.mapPageViewModel(userLocation,hollabackChapters);
			
			if(userInformation.isSignedIn())
			{
				$.mobile.changePage("#menuPage");
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
			
			getHollabackChapers: function(){
				return hollabackChapters;
			},
			
			getUserLocation: function(){
				return userLocation;
			},
			
			getHollabackMapViewModel: function(){
				return hollabackMapViewModel;
			},
			
			resetShareViewModel: function (){
				storyInformation.clearStory();
			},
		}
		})(),

};


