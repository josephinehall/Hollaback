var shareViewModels = {
	shareStoryViewModel: function(){
		var self = this;     
        self.bystanderFlag = ko.observable("firstPerson");
	 }
    }
     
    // ... then later ...
    //shareStoryViewModel.bystander; will contain the value that is selected by the user
