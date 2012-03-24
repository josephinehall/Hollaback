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
        
		this.getSignupContentType = function(){
			return "multipart/form-data; " + boundary;
		};	
        
        this.getLogInContentType = function(){
            return "multipart/form-data; " + boundary;
        };
        
        this.getLoginStartRequestBoundary = function(){
            return "--0xKhTmLbOuNdArY\nContent-Disposition: form-data; name=\"hollabackposting\"; filename=\"file.bin\"\r\n\r\n \n"
        };
        
        this.getLoginEndRequestBoundary = function(){
            return "\n--0xKhTmLbOuNdArY--\r\n--%@--\r\n";
        };
	},

};