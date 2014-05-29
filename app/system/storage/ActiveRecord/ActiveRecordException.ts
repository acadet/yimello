/// <reference path="../../../dependencies.ts" />

class ActiveRecordException extends Exception {
	constructor(msg : string) {
		super(msg, 'ActiveRecordException');
	}
}
