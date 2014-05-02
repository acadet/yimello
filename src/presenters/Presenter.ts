/// <reference path="../dependencies.ts" />
class Presenter extends TSObject {

	constructor() {
		super();

		PresenterMediator.setInstance(this);

		this.onStart();

		NodeWindow.on(NodeWindowEvents.Blur, this._onPause);
		NodeWindow.on(NodeWindowEvents.Focus, this._onResume);
		NodeWindow.on(NodeWindowEvents.Close, this._onDestroy);
	}

	static currentInstance : Presenter;

	onStart() : void {

	}

	onResume() : void {

	}

	onPause() : void {

	}

	onDestroy() : void {

	}

	private _onResume() : void {
		if (!PresenterMediator.hasResumed()) {
			PresenterMediator.setResumed(true);
			PresenterMediator.getInstance().onResume();
		}
	}

	private _onPause() : void {
		PresenterMediator.setResumed(false);
		PresenterMediator.getInstance().onPause();
	}

	private _onDestroy() : void {
		PresenterMediator.getInstance().onDestroy();
		gui.Window.get().close();
	}
}