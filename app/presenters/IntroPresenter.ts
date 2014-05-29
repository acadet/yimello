/// <reference path="../dependencies.ts" />

class IntroPresenter extends Presenter {

	constructor() {
		super();
	}

	onStart() : void {
		var t : Timer;

		DOMTree.findSingle('.intro-strap').centerize();

		t = new Timer((o) => {
			NodeWindow.moveTo('tour.html');
		}, 3000);
	}
}