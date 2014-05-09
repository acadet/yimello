/// <reference path="../dependencies.ts" />

interface URLDetailsProviderCallback {
	(title : string, description : string) : void;
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
	
	static getDetails(url : string, success : URLDetailsProviderCallback, errorHandler : Action<Exception>) : void {
		if (URLHelper.isValid(url)) {
			var request : GetRequest;

			request = new GetRequest(url);
			request.setDataType(AjaxRequestDataType.Html);
			request.setErrorHandler((xhr, status, error) => {
				errorHandler(new Exception(error));
			});
			request.execute((data, status, xhr) => {
				var title : string;
				var description : string;

				console.log($(data).get());
			});
		} else {
			errorHandler(new Exception('URL is bad formatted'));
		}
	}

	//endregion Public Methods
	
	//endregion Methods
}
