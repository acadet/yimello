/// <reference path="../dependencies.ts" />

class ExceptionHandler extends TSObject {

	static throw(e : Exception) : void {
		throw e.toError();
	}
}