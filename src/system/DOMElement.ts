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

	centerize(reference = new DOMElement($('body'))) : void {
		this.horizontalCenterize(reference);
		this.verticalCenterize(reference);
	}

	centerizeWithMargin(reference = new DOMElement($('body'))) : void {
		this.horizontalCenterizeWithMargin(reference);
		this.verticalCenterizeWithMargin(reference);
	}

	find(criterion: string) : IList<DOMElement> {
		var results : any = this._element.find(criterion);
		var list : IList<DOMElement> = new ArrayList<DOMElement>();
		
		results.each((i, e) => {
			list.add(DOMElement.fromJS(e));
		});

		return list;
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

	horizontalCenterize(reference = new DOMElement($('body'))) : void {
		this.setCss({
			left: (reference.getWidth() - this.getWidth()) / 2
		});
	}

	horizontalCenterizeWithMargin(reference = new DOMElement($('body'))) : void {
		this.setCss({
			marginLeft: (reference.getWidth() - this.getWidth()) / 2
		});
	}

	setCss(properties : Object) : void {
		this._element.css(properties);
	}

	toString() : string {
		return this._element.html();
	}

	verticalCenterize(reference = new DOMElement($('body'))) : void {
		this.setCss({
			top: (reference.getHeight() - this.getHeight()) / 2
		});
	}

	verticalCenterizeWithMargin(reference = new DOMElement($('body'))) : void {
		this.setCss({
			marginTop: (reference.getHeight() - this.getHeight()) / 2
		});
	}

	private _element : any;
}