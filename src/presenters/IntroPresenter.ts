/// <reference path="../dependencies.ts" />

import Patchwork = PatchworkModule.Patchwork;

class IntroPresenter extends Presenter {

	constructor() {
		super();

		this._reset();
	}

	private _reset() : void {
		Patchwork.build();
	}
}