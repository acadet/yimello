/// <reference path="../dependencies.ts" />

class DOMElement extends TSObject {

	constructor(jQueryObject : any) {
		super();

		this._element = jQueryObject;
	}

	append(content: any) : DOMElement {
		this._element.append(content);
		return this;
	}

	setCss(properties : Object) : void {
		this._element.css(properties);
	}

	findSingle(criterion : string) : DOMElement {
		return new DOMElement(this._element.find(criterion).first());
	}

	static fromJS(o : any) : DOMElement {
		return new DOMElement(jQuery(o));
	}

	static fromString(s: string) : DOMElement {
		return new DOMElement(jQuery.parseHTML(s));
	}

	getHeight(actual = false) : number {
		return this._element.outerHeight(actual);
	}

	getLeft(relative = false) : number {
		if (relative) {
			return this._element.position().left;
		} else {
			return this._element.offset().left;
		}
	}

	getTop(relative = false) : number {
		if (relative) {
			return this._element.position().top;
		} else {
			return this._element.offset().top;
		}
	}

	getWidth(actual = false) : number {
		return this._element.outerWidth(actual);
	}

	toString() : string {
		return this._element.html();
	}

	private _element : any;
}