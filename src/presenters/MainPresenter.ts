/// <reference path="../dependencies.ts" />

class MainPresenter extends Presenter {
	//region Fields
	
	private _mainViewWrapper : DOMElement;
	private _bookmarkFormWrapper : DOMElement;
	private _bookmarkAddTrigger : DOMElement;
	private _urlInput : DOMElement;

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private _switchToBookmarkForm() : void {
		this._mainViewWrapper.animate(
			{
				left: '-100%'
			},
			500
		);

		this._bookmarkFormWrapper.animate(
			{
				left: 0
			},
			500
		);
	}

	//endregion Private Methods
	
	//region Public Methods
	
	onStart() : void {
		this._mainViewWrapper = DOMTree.findSingle('#js-main-view-wrapper');
		this._bookmarkFormWrapper = DOMTree.findSingle('#js-bookmark-form-wrapper');
		this._bookmarkAddTrigger = DOMTree.findSingle('#js-bookmark-add-trigger');
		this._urlInput = this._bookmarkFormWrapper.findSingle('input[name="url"]');

		this._bookmarkAddTrigger.on(DOMElementEvents.Click, (arg) => {
			this._switchToBookmarkForm();
		});

		this._urlInput.on(DOMElementEvents.Blur, (arg) => {
			URLDetailsProvider.getDetails(
				this._urlInput.getValue(),
				null,
				(e) => {
					throw e.toError();
				}
			);
		});
	}

	onDestroy() : void {
		this._bookmarkAddTrigger.off(DOMElementEvents.Click);
	}

	//endregion Public Methods
	
	//endregion Methods
}
