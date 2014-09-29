/// <reference path="../../../dependencies.ts" />

class ContextMenu {
	//region Fields

	private _target : DOMElement;
	
	//endregion Fields
	
	//region Constructors

	constructor(target : DOMElement) {
		this._target = target;

		DOMTree
			.getDocument()
			.on(
				DOMElementEvents.KeyDown,
				(args) => {
					if (args.getWhich() === 27) {
						this.hide();
					}
				}
			);
		this._target.on(
			DOMElementEvents.ClickOut,
			(args) => {
				this.hide();
			}
		);
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	_show(top : number, left : number) : void {
		if (this._target.hasClass('visible')) {
			return;
		}

		this._target.addClass('visible');
		this._target.setCss({
			top : top,
			left : left
		});
	}

	hide() : void {
		if (!this._target.hasClass('visible')) {
			return;
		}

		this._target.removeClass('visible');
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
