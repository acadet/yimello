/// <reference path="../../dependencies.ts" />

class ErrorMessage {
	//region Fields
	
	private _wrapper : DOMElement;
	private _messageItem : DOMElement;

	//endregion Fields
	
	//region Constructors
	
	constructor() {
		this._wrapper = DOMTree.findSingle('.js-error-message');
		this._messageItem = this._wrapper.findSingle('p');
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private _show(msg : string, error : boolean = true) : void {
		this._messageItem.setText(msg);
		this._wrapper.removeClass('error');
		this._wrapper.removeClass('warning');

		if (error) {
			this._wrapper.addClass('error');
		} else {
			this._wrapper.addClass('warning');
		}

		this._wrapper.showDrop(
			750,
			'right',
			(e) => {
				var t : Timer;

				this._messageItem.animate(
					{
						opacity : 1
					},
					500
				);

				t = new Timer(
					(o) => {
						this._hide();
					},
					5000
				);
			}
		);
		
	}

	private _hide() : void {
		this._messageItem.animate(
			{
				opacity : 0
			},
			250,
			(e) => {
				this._wrapper.hideDrop(
					750,
					'up',
					(e) => {
						this._wrapper.setCss({ zIndex : 0});
					}
				);
			}
		);
	}

	//endregion Private Methods
	
	//region Public Methods
	
	showForError(msg : string) : void {
		this._show(msg, true);
	}

	showForWarning(msg : string) : void {
		this._show(msg, false);
	}

	//endregion Public Methods
	
	//endregion Methods
}
