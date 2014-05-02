/// <reference path="../dependencies.ts" />

class TourPresenter extends Presenter {

	constructor() {
	    super();
	}

	onStart() : void {
		this._slides = DOMTree.findSingle('.slides');
		this._slideCursors = DOMTree.findSingle('.slide-cursors');

		this._slides.find('.slide').map((e) => {
			e.centerizeWithMargin(this._slides);
		});
	}

	private _slides : DOMElement;
	private _slideCursors : DOMElement;
}