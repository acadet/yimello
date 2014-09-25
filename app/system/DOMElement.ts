/// <reference path="../dependencies.ts" />

class DOMElementEvents {
	static Blur : string = 'blur';
	static Click : string = 'click';
	static DragOver : string = 'dragover';
	static DragEnd : string = 'dragend';
	static Drop : string = 'drop';
	static Focus : string = 'focus';
	static FocusOut : string = 'focusout';
	static KeyDown : string = 'keydown';
	static KeyUp : string = 'keyup';
	static MouseEnter : string = 'mouseenter';
	static MouseLeave : string = 'mouseleave';
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
		this._isMetaKey = eventObject.metaKey;
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

	getOriginalEvent() : any {
		return this._eventObject.originalEvent;
	}

	preventDefault() : void {
		this._eventObject.preventDefault();
	}

	isMetaKey() : boolean {
		return this._isMetaKey;
	}

	private _eventObject : any;
	private _target : DOMElement;
	private _pageX : number;
	private _pageY : number;
	private _which : number;
	private _isMetaKey : boolean;
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
		this._element.animate(
			prop,
			duration,
			() => {
				if (callback !== null) {
					callback(this);
				}
			}
		);
	}

	animateEasing(prop : Object, duration : number, easing : string, callback : DOMElementAnimationCallback = null) : void {
		this._element.animate(
			prop,
			duration,
			easing,
			() => {
				if (callback !== null) {
					callback(this);
				}
			}
		);
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

	focus() : void {
		this._element.focus();
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

	getCss(key : string) : any {
		return this._element.css(key);
	}

	getData(key : string) : string {
		return this._element.attr('data-' + key);
	}

	getHeight(actual = false) : number {
		return this._element.outerHeight(actual);
	}

	getHTML() : string {
		return this._element.html();
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

	hide(effect : string, duration : number, callback : DOMElementAnimationCallback = null) : void {
		this._element.hide({
			effect : effect,
			duration : duration,
			complete : () => {
				if (callback !== null) {
					callback(this);
				}
			}
		});
	}

	hideEasing(effect : string, duration : number, easing : string, callback : DOMElementAnimationCallback = null) : void {
		this._element.hide({
			effect : effect,
			duration : duration,
			easing : easing,
			complete : () => {
				if (callback !== null) {
					callback(this);
				}
			}
		});
	}

	hideDrop(duration : number, direction : string, callback : DOMElementAnimationCallback = null) {
		this._element.hide({
			effect : 'drop',
			direction : direction,
			duration : duration,
			complete : () => {
				if (callback !== null) {
					callback(this);
				}
			}
		});
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

	on(event : DOMElementEvents, handler : DOMElementEventHandler) : DOMElement {
		this._element.on(event, (e) => {
			handler(new DOMElementEventObject(e));
		});
		return this;
	}

	parent(selector = null) : DOMElement {
		return new DOMElement(this._element.parent(selector).first());
	}

	prepend(e : DOMElement) : void {
		this._element.prepend(e);
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

	show(effect : string, duration : number, callback : DOMElementAnimationCallback = null) : void {
		this._element.show({
			effect : effect,
			duration : duration,
			complete : () => {
				if (callback !== null) {
					callback(this);
				}
			}
		});
	}

	showEasing(effect : string, duration : number, easing : string, callback : DOMElementAnimationCallback = null) {
		this._element.show({
			effect : effect,
			duration : duration,
			easing : easing,
			complete : () => {
				if (callback !== null) {
					callback(this);
				}
			}
		});
	}

	showDrop(duration : number, direction : string, callback : DOMElementAnimationCallback = null) : void {
		this._element.show({
			effect : 'drop',
			duration : duration,
			complete : () => {
				if (callback !== null) {
					callback(this);
				}
			},
			direction : direction
		});
	}

	showDropEasing(duration : number, easing : string, direction : string, callback : DOMElementAnimationCallback = null) : void {
		this._element.show({
			effect : 'drop',
			duration : duration,
			easing : easing,
			complete : () => {
				if (callback !== null) {
					callback(this);
				}
			},
			direction : direction
		});
	}

	toJQuery() : any {
		return this._element;
	}

	toString() : string {
		return this._element.prop('outerHTML');
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