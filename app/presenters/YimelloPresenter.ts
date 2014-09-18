/// <reference path="../dependencies.ts" />

class YimelloPresenter extends Presenter {
	//region Fields
	
	private _notificationItem : NotificationMessage;

	//endregion Fields
	
	//region Constructors
	
	constructor() {
		super();

		this._notificationItem = new NotificationMessage();

		DOMTree
			.findSingle('.js-exit-trigger')
			.on(
				DOMElementEvents.Click,
				(e) => {
					NodeWindow.close();
				}
			);

		DOMTree
			.findSingle('.js-minimize-trigger')
			.on(
				DOMElementEvents.Click,
				(e) => {
					NodeWindow.minimize();
				}
			);
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	onStart() : void {
		super.onStart();
		DOMTree.findSingle('.js-body').animate(
			{
				opacity : 1
			},
			500
		);
	}

	showError(msg : string) : void {
		this._notificationItem.alert(msg);
	}

	showWarning(msg : string) : void {
		this._notificationItem.warn(msg);
	}

	showNotification(msg : string) : void {
		this._notificationItem.inform(msg);
	}

	//endregion Public Methods
	
	//endregion Methods
}
