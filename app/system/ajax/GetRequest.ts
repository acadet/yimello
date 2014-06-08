/// <reference path="../../dependencies.ts" />

/**
 * A GET request
 */
class GetRequest extends AjaxRequest {

	constructor(url : string) {
		super(url);

		this.setType(AjaxRequestType.GET);
	}
}
