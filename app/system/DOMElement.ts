/// <reference path="../dependencies.ts" />

class DOMElementEvents {
	static Blur : string = 'blur';
	static Click : string = 'click';
	static KeyDown : string = 'keydown';
	static Submit : string = 'submit';
}

class DOMElementEventObject extends TSObject {

	constructor(eventObject : any) {
		super();

		this._eventObject = eventObject;
		this._target = DOMElement.fromJS(eventObject.target);
		this._pageX = eventObject.pageX;
		this._pageY = eventObject.pageY;
		this._which = eventObject.which;
	}

	getTarget() : DOMElement {
		return this._target;
	}

	getPageX() : number {
		return this._pageX;
	}

	getPageY() : number {
		return this._pageY;
	}

	getWhich() : number {
		return this._which;
	}

	preventDefault() : void {
		this._eventObject.preventDefault();
	}

	private _eventObject : any;
	private _target : DOMElement;
	private _pageX : number;
	private _pageY : number;
	private _which : number;
}

interface DOMElementEventHandler {
	(arg : DOMElementEventObject) : void;
}

interface DOMElementAnimationCallback {
	(arg : DOMElement) : void;
}

class DOMElementException extends Exception {

}

class DOMElement extends TSObject {

	constructor(jQueryObject : any) {
		super();

		this._element = jQueryObject;
	}

	addClass(value : string) : DOMElement {
		this._element.addClass(value);
		return this;
	}

	animate(prop : Object, duration : number, callback : DOMElementAnimationCallback = null) : void {
		this._element.animate(prop, duration, () => {
			if (callback != null) {
				callback(this);
			}
		});
	}

	append(e : DOMElement) : DOMElement {
		this._element.append(e.toJQuery());
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
		var parse : any = jQuery.parseHTML(s);
		var o : any;

		if (parse == null) {
			ExceptionHandler.throw(
				new DOMElementException('Unable to create DOMElement from string: parse has failed'));
		}

		if (parse.length > 1) {
			ExceptionHandler.throw(
				new DOMElementException(
					'Unable to create DOMElement from string: specified string contains more than a single element'));
		}

		o = parse[0];

		return DOMElement.fromJS(o);
	}

	getAttribute(key : string) : string {
		return this._element.attr(key);
	}

	getBottom(relative = false) : number {
		return this.getTop(relative) + this.getHeight();
	}

	getChildren(selector : string = null) : IList<DOMElement> {
		var outcome : any = this._element.children(selector);
		var list : IList<DOMElement> = new ArrayList<DOMElement>();

		outcome.each((i, e) => {
			list.add(DOMElement.fromJS(e));
		});

		return list;
	}

	getData(key : string) : string {
		return this._element.attr('data-' + key);
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

	getRight(relative = false) : number {
		return this.getLeft(relative) + this.getWidth();
	}

	getTagName() : string {
		return this._element.get(0).localName;
	}

	getText() : string {
		return this._element.text();
	}

	getTop(relative = false) : number {
		if (relative) {
			return this._element.position().top;
		} else {
			return this._element.offset().top;
		}
	}

	getValue() : string {
		return this._element.val();
	}

	getWidth(actual = false) : number {
		return this._element.outerWidth(actual);
	}

	hasClass(c : string) : boolean {
		return this._element.hasClass(c);
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

	off(event : DOMElementEvents) : void {
		this._element.off(event);
	}

	on(event : DOMElementEvents, handler : DOMElementEventHandler) : void {
		this._element.on(event, (e) => {
			handler(new DOMElementEventObject(e));
		});
	}

	parent(selector = null) : DOMElement {
		return new DOMElement(this._element.parent(selector).first());
	}

	remove() : void {
		this._element.remove();
	}

	removeClass(value : string) : DOMElement {
		this._element.removeClass(value);
		return this;
	}

	setAttribute(key : string, value : string) : void {
		this._element.attr(key, value);
	}

	setCss(properties : Object) : DOMElement {
		this._element.css(properties);
		return this;
	}

	setData(key : string, value : string) : void {
		this._element.attr('data-' + key, value);
	}

	setHTML(value : string) : void {
		this._element.html(value);
	}

	setText(text : string) : void {
		this._element.text(text);
	}

	setValue(value : string) : void {
		this._element.val(value);
	}

	toJQuery() : any {
		return this._element;
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