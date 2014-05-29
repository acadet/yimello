/// <reference path="../dependencies.ts" />

class Exception extends TSObject {

	//region Fields
	
	private _error : any;

	//endregion Fields
	
	//region Constructors
	
	constructor(msg : string, name : string = 'Exception') {
		super();

		this._error = new Error(msg);
		this._error.name = name;
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	getMessage() : string {
		return this._error.message;
	}

	getName() : string {
		return this._error.name;
	}

	getStackTrace() : string  {
		return this._error.stack;
	}

	toString() : string {
		return this._error.name + ': ' + this._error.message;
	}

	//endregion Public Methods
	
	//endregion Methods
}
