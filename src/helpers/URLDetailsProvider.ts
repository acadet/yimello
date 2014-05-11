/// <reference path="../dependencies.ts" />

enum URLDetailsProviderError {
	BadURL,
	NoMedata,
	Ajax
}

interface URLDetailsProviderCallback {
	(title : string, description : string) : void;
}

interface URLDetailsProviderErrorHandler {
	(type : URLDetailsProviderError, msg : string) : void;
}

class URLDetailsProvider extends TSObject {
	//region Fields
	
	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	//endregion Private Methods
	
	//region Public Methods
	
	static getDetails(url : string, success : URLDetailsProviderCallback, errorHandler : URLDetailsProviderErrorHandler) : void {
		if (URLHelper.isValid(url)) {
			var request : GetRequest;

			request = new GetRequest(url);
			request.setDataType(AjaxRequestDataType.Html);
			request.setErrorHandler((xhr, status, error) => {
				errorHandler(URLDetailsProviderError.Ajax, error);
			});
			request.execute((data, status, xhr) => {
				var title : string;
				var description : string;
				var r1 : Regex, r2 : Regex;

				r1 = new Regex('\<title\>(.*)\<\/title\>', [RegexFlags.Insensitive]);
				title = r1.execute(data);

				r2 = new Regex(
					'\<meta name\=\"description\" content\=\"(.*)\"',
					[RegexFlags.Insensitive]);
				description = r2.execute(data);

				success(title, description);
			});
		} else {
			errorHandler(URLDetailsProviderError.BadURL, 'URL is bad formatted');
		}
	}

	//endregion Public Methods
	
	//endregion Methods
}
