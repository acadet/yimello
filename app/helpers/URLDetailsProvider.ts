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
	
	/**
	 * Returns title and description from a webpage using its url
	 * @param {string}                         url          [description]
	 * @param {URLDetailsProviderCallback}     success      [description]
	 * @param {URLDetailsProviderErrorHandler} errorHandler [description]
	 */
	static getDetails(
		url : string,
		success : URLDetailsProviderCallback,
		errorHandler : URLDetailsProviderErrorHandler) : void {

		if (URLHelper.isValid(url)) {
			var request : GetRequest;

			request = new GetRequest(url);
			request.setDataType(AjaxRequestDataType.HTML);

			// In case of ajax errors, only report it
			request.setErrorHandler((xhr, status, error) => {
				errorHandler(URLDetailsProviderError.Ajax, error);
			});

			request.execute((data, status, xhr) => {
				var title : string;
				var description : string;
				var r1 : Regex, r2 : Regex;

				// Grab title from title tags
				r1 = new Regex('\<title\>(.*)\<\/title\>', [RegexFlags.Insensitive]);
				title = r1.execute(data);

				if (TSObject.exists(title) && title !== '') {
					title = SecurityHelper.disarm(title);
				}

				// Grab description from meta data
				r2 = new Regex(
					'\<meta name\=\"description\" content\=\"(.*)\"',
					[RegexFlags.Insensitive]
				);
				description = r2.execute(data);

				if (TSObject.exists(description) && description !== '') {
					description = SecurityHelper.disarm(description);
				}

				success(title, description);
			});
		} else {
			errorHandler(URLDetailsProviderError.BadURL, 'URL is bad formatted');
		}
	}

	//endregion Public Methods
	
	//endregion Methods
}
