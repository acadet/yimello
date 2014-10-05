/// <reference path="../../../dependencies.ts" />

class OverlayMenu {
	//region Fields

	private _target : DOMElement;
	private _isVisible : boolean;
	
	//endregion Fields
	
	//region Constructors

	constructor(target : DOMElement) {
		this._target = target;
		this._isVisible = false;

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
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	show() : void {
		if (this._isVisible) {
			return;
		}

		this._isVisible = true;
		this._target.setCss({ display : 'block'});
		this._target.animate(
			{
				opacity : 1
			},
			250
		);
	}

	hide() : void {
		if (!this._isVisible) {
			return;
		}

		this._isVisible = false;
		this._target.animate(
			{
				opacity : 0
			},
			250,
			(e) => {
				this._target.setCss({display : 'none'});
			}
		);
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
