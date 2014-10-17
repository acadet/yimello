/// <reference path="../dependencies.ts" />

// TODO : test
class VersionHelper {
	//region Fields
	
	private static _target : string = 'http://yimello.adriencadet.com/version';
	private static _version : string = '0.3.1';

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	static isUpToDate(callback : Action<boolean>, errorHandler : Action<string> = null) : void {
		var get : GetRequest;

		if (Environment.isOnline()) {
			get = new GetRequest(VersionHelper._target);
			get.setDataType(AjaxRequestDataType.Text);
			get.setErrorHandler(
				(xhr, status, error) => {
					if (TSObject.exists(errorHandler)) {
						errorHandler(error);
					}
				}
			);
			get.execute(
				(data, status, xhr) => {
					callback(data === VersionHelper._version);
				}
			);
		} else {
			if (TSObject.exists(errorHandler)) {
				errorHandler('Unable to check version: no connection was spotted');
			}
		}
	}

	//endregion Public Methods
	
	//endregion Methods
}
