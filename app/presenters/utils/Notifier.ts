/// <reference path="../../dependencies.ts" />

enum NotifierCodes {
	Inform,
	Warn,
	Alert
}

class Notifier {
	//region Fields

	private _timer : Timer;
	private _target : DOMElement;
	private _content : DOMElement;
	
	//endregion Fields
	
	//region Constructors

	constructor() {
		this._target = DOMTree.findSingle('.js-notifier');
		this._content = this._target.findSingle('.js-notifier-content');
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _show(msg : string, code : NotifierCodes) : void {
		if (TSObject.exists(this._timer)) {
			this._timer.stop();
		}

		this._target.setCss({
			opacity : 0,
			display : 'block',
			top : 40,
			right : -this._target.getWidth()
		});

		this._target.removeClass('inform');
		this._target.removeClass('warn');
		this._target.removeClass('alert');
		if (code === NotifierCodes.Inform) {
			this._target.addClass('inform');
		} else if (code === NotifierCodes.Warn) {
			this._target.addClass('warn');
		} else {
			this._target.addClass('alert');
		}

		this._content.setText(msg);

		this._target.animate(
			{
				opacity : 1,
				right : 30
			},
			750,
			(o) => {
				this._timer = new Timer(
					(o) => {
						this._hide();
						this._timer = null;
					},
					5000
				);
			}
		);
	}

	private _hide() : void {
		this._target.animate(
			{
				opacity : 0,
				top : -this._target.getHeight()
			},
			750,
			(o) => {
				this._target.setCss({ display : 'none'});
			}
		);
	}
	
	//endregion Private Methods
	
	//region Public Methods

	inform(msg : string) : void {
		this._show(msg, NotifierCodes.Inform);
	}

	warn(msg : string) : void {
		this._show(msg, NotifierCodes.Warn);
	}

	alert(msg : string) : void {
		this._show(msg, NotifierCodes.Alert);
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
