/// <reference path="../dependencies.ts" />

// TODO : test
class VersionHelper {
	//region Fields
	
	private static _target : string = 'http://yimello.adriencadet.com/version';
	private static _version : string = '0.1.0';

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	static isUpToDate(callback : Action<boolean>) : void {
		var get : GetRequest;

		get = new GetRequest(VersionHelper._target);
		get.setDataType(AjaxRequestDataType.Text);
		get.execute(
			(data, status, xhr) => {
				callback(data === VersionHelper._version);
			}
		);
	}

	//endregion Public Methods
	
	//endregion Methods
}
