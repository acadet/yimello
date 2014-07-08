/// <reference path="../../../dependencies.ts" />

class MainPresenterMediator {
	//region Fields
	
	private static _notificationItem;

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private static _init() : void {
		if (!TSObject.exists(MainPresenterMediator._notificationItem)) {
			MainPresenterMediator._notificationItem = new NotificationMessage();
		}
	}

	//endregion Private Methods
	
	//region Public Methods
	
	static showError(msg : string) : void {
		MainPresenterMediator._init();
		MainPresenterMediator._notificationItem.alert(msg);
	}

	static showWarning(msg : string) : void {
		MainPresenterMediator._init();
		MainPresenterMediator._notificationItem.warn(msg);
	}

	static showNotification(msg : string) : void {
		MainPresenterMediator._init();
		MainPresenterMediator._notificationItem.inform(msg);
	}

	//endregion Public Methods
	
	//endregion Methods
}
