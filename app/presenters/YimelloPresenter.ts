/// <reference path="../dependencies.ts" />

class YimelloPresenter extends Presenter {
	//region Fields
	
	private _errorMessage : ErrorMessage;

	//endregion Fields
	
	//region Constructors
	
	constructor() {
		super();

		this._errorMessage = new ErrorMessage();

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
	
	getErrorMessage() : ErrorMessage {
		return this._errorMessage;
	}

	showError(msg : string) : void {
		this.getErrorMessage().showForError(msg);
	}

	showWarning(msg : string) : void {
		this.getErrorMessage().showForWarning(msg);
	}

	//endregion Public Methods
	
	//endregion Methods
}
