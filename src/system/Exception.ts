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

	toError() : any {
		return this._error;
	}

	private _error : any;
}