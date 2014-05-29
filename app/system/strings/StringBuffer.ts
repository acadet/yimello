/// <reference path="../../dependencies.ts" />

class StringBuffer extends TSObject {
	constructor(first = '') {
		super();
		
		this._content = new Array<string>();
		this._content.push(first);
	}

	append(s: string) : StringBuffer {
		this._content.push(s);
		return this;
	}

	toString() : string {
		var result : string = '';

		for(var i = 0; i < this._content.length; i++) {
			result += this._content[i];
		}

		return result;
	}

	private _content : Array<string>;
}