/// <reference path="../../dependencies.ts" />

class GetRequest extends AjaxRequest {

	constructor(url : string) {
		super(url);

		this.setType(AjaxRequestType.Get);
	}
}
