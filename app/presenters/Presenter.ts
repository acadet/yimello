/// <reference path="../dependencies.ts" />

class Presenter extends TSObject {

	//region Fields
	
	//endregion Fields
	
	//region Constructors
	
	constructor() {
		super();

		PresenterMediator.setInstance(this);

		NodeWindow.on(NodeWindowEvents.Blur, this._onPause);
		NodeWindow.on(NodeWindowEvents.Focus, this._onResume);
		NodeWindow.on(NodeWindowEvents.Close, this._onDestroy);
		NodeWindow.on(NodeWindowEvents.Move, () => {
			PresenterMediator.getInstance().onDestroy.call(PresenterMediator.getInstance());
		});

		var timer : Timer = new Timer(
			(o) => {
				this._onStart();
			},
			10
		);
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private _onStart() : void {
		this.onStart();
		this.onLoad();
	}

	private _onResume() : void {
		if (!PresenterMediator.hasResumed()) {
			PresenterMediator.setResumed(true);
			PresenterMediator.getInstance().onResume.call(PresenterMediator.getInstance());
		}
	}

	private _onPause() : void {
		PresenterMediator.setResumed(false);
		PresenterMediator.getInstance().onPause.call(PresenterMediator.getInstance());
	}

	private _onDestroy() : void {
		PresenterMediator.getInstance().onDestroy.call(PresenterMediator.getInstance());
		NodeWindow.close();
	}

	//endregion Private Methods
	
	//region Public Methods
	
	onStart() : void {

	}

	onLoad() : void {
		DOMTree.findSingle('body').animate({
			opacity: 1
		}, 500);
	}

	onResume() : void {

	}

	onPause() : void {

	}

	onDestroy() : void {

	}

	//endregion Public Methods
	
	//endregion Methods
}
