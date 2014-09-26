// /// <reference path="../../../dependencies.ts" />

// class SubMenu {
// 	//region Fields
	
// 	private _target : DOMElement;
// 	private _over : boolean;
// 	private _displayed : boolean;
// 	private _owner : ISubMenuOwner;

// 	//endregion Fields
	
// 	//region Constructors
	
// 	constructor(target : DOMElement, owner : ISubMenuOwner) {
// 		this._target = target;
// 		this._owner = owner;
// 		this._over = false;
// 		this._displayed = false;

// 		this._target
// 			.on(
// 				DOMElementEvents.MouseEnter,
// 				(e) => {
// 					this._over = true;
// 				}
// 			)
// 			.on(
// 				DOMElementEvents.MouseLeave,
// 				(e) => {
// 					this._over = false;
// 				}
// 			);
// 	}

// 	//endregion Constructors
	
// 	//region Methods
	
// 	//region Private Methods
	
// 	//endregion Private Methods
	
// 	//region Public Methods
	
// 	show() : void {
// 		this._target.centerize();
// 		this._target.showDrop(
// 			500,
// 			'up'
// 		);
// 		this._displayed = true;
// 	}

// 	hide() : void {
// 		this._target.hideDrop(
// 			500,
// 			'up'
// 		);
// 		this._displayed = false;
// 	}

// 	isHovering() : boolean {
// 		return this._over;
// 	}

// 	isDisplayed() : boolean {
// 		return this._displayed;
// 	}

// 	getTarget() : DOMElement {
// 		return this._target;
// 	}

// 	getOwner() : ISubMenuOwner {
// 		return this._owner;
// 	}

// 	//endregion Public Methods
	
// 	//endregion Methods
// }
