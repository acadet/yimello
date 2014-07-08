/// <reference path="../../dependencies.ts" />

enum NotificationMessageTypes {
	Inform,
	Warning,
	Error
}

class NotificationMessage {
	//region Fields
	
	private _wrapper : DOMElement;
	private _messageItem : DOMElement;
	private _topPosition : number;
	private _rightPosition : number;

	//endregion Fields
	
	//region Constructors
	
	constructor() {
		this._wrapper = DOMTree.findSingle('.js-error-message');
		this._messageItem = this._wrapper.findSingle('p');
		this._topPosition = this._wrapper.getCss('top');
		this._rightPosition = this._wrapper.getCss('right');
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private _show(msg : string, type : NotificationMessageTypes) : void {
		this._messageItem.setText(msg);
		this._wrapper.removeClass('error');
		this._wrapper.removeClass('warning');

		if (type === NotificationMessageTypes.Error) {
			this._wrapper.addClass('error');
		} else if (type === NotificationMessageTypes.Warning) {
			this._wrapper.addClass('warning');
		}

		rightPosition = this._wrapper.getCss('right');

		this._wrapper.setCss({
			right : -this._wrapper.getWidth(),
			display : 'block',
			opacity : 0,
			zIndex : 999
		});

		this._wrapper.animate(
			{
				right : this._rightPosition,
				opacity : 1
			},
			750,
			(e) => {
				var t : Timer;
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
		this._wrapper.animate(
			{
				top : -this._wrapper.getHeight(),
				opacity : 0,
			},
			750,
			(e) => {
				this._wrapper.setCss({
					zIndex : 0,
					display : 'none',
					top : this._topPosition,
					right : this._rightPosition
				});
			}
		);
	}

	//endregion Private Methods
	
	//region Public Methods
	
	alert(msg : string) : void {
		this._show(msg, NotificationMessageTypes.Error);
	}

	warn(msg : string) : void {
		this._show(msg, NotificationMessageTypes.Warning);
	}

	inform(msg : string) : void {
		this._show(msg, NotificationMessageTypes.Inform);
	}

	//endregion Public Methods
	
	//endregion Methods
}
