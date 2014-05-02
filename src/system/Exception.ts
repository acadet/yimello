/// <reference path="../dependencies.ts" />

class Exception extends TSObject {

	constructor(msg: string) {
		super();
		this._error = new Error(msg);
	}

	getMessage() : string {
		return this._error.message;
	}

	getStackTrace() : string {
		return this._error.stack;
	}

	private _error : any;
}