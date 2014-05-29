/// <reference path="../../dependencies.ts" />

class PresenterMediator extends TSObject {

	static getInstance() : Presenter {
		return PresenterMediator._currentInstance;
	}

	static setInstance(p : Presenter) : void {
		PresenterMediator._currentInstance = p;
		PresenterMediator._hasResumed = false;
	}

	static hasResumed() : boolean {
		return PresenterMediator._hasResumed;
	}

	static setResumed(b : boolean) : void {
		PresenterMediator._hasResumed = b;
	}

	private static _currentInstance : Presenter;
	private static _hasResumed : boolean;
}