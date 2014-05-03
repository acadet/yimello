/// <reference path="../dependencies.ts" />
class Presenter extends TSObject {

	constructor() {
		super();

		PresenterMediator.setInstance(this);

		this._onStart();

		NodeWindow.on(NodeWindowEvents.Blur, this._onPause);
		NodeWindow.on(NodeWindowEvents.Focus, this._onResume);
		NodeWindow.on(NodeWindowEvents.Close, this._onDestroy);
		NodeWindow.on(NodeWindowEvents.Move, () => {
			PresenterMediator.getInstance().onDestroy.call(PresenterMediator.getInstance());
		});
	}

	static currentInstance : Presenter;

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
		gui.Window.get().close();
	}
}