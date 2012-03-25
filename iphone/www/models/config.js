var config = {

	urlConfiguration: function() {
		
		self.backendPrefix = "http://testbackend.ihollaback.com/";
		self.boundary ="boundary=0xKhTmLbOuNdArY";
	
		this.getSignupUrl = function(){		
			return backendPrefix +"signupv2/";         
		};
		
        this.getLoginUrl = function(){
            return backendPrefix + "authenticatev2/";
        };
        
        this.getHollabackChaptersUrl = function(){
        	return backendPrefix + "localiPhone/";
        };
                
        this.getStoryUrl = function(){
            return backendPrefix + "incomingv2/";
        };
        
        this.getStoryContentType = function(){
        	return "multipart/form-data" + boundary;
        };
	},

};