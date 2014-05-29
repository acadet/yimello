/// <reference path="../dependencies.ts" />

class MainPresenter extends Presenter {
	//region Fields
	
	private _mainViewWrapper : DOMElement;
	private _bookmarkFormWrapper : DOMElement;
	private _bookmarkAddTrigger : DOMElement;
	private _urlInput : DOMElement;
	private _titleInput : DOMElement;
	private _descriptionInput : DOMElement;
	private _tagsInput : DOMElement;

	private _tagList : DOMElement;

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

	private _addTag(value : string) : void {
		var e : DOMElement;

		console.log('here :'  + value);

		if (!TSObject.exists(this._tagList)) {
			this._tagList = this._bookmarkFormWrapper.findSingle('.tags');
		}

		e = DOMElement.fromString('<li>' + value + '</li>');
		this._tagList.append(e);
	}

	//endregion Private Methods
	
	//region Public Methods
	
	onStart() : void {
		this._mainViewWrapper = DOMTree.findSingle('#js-main-view-wrapper');
		this._bookmarkFormWrapper = DOMTree.findSingle('#js-bookmark-form-wrapper');
		this._bookmarkAddTrigger = DOMTree.findSingle('#js-bookmark-add-trigger');
		this._urlInput = this._bookmarkFormWrapper.findSingle('input[name="url"]');
		this._titleInput = this._bookmarkFormWrapper.findSingle('input[name="title"]');
		this._descriptionInput = this._bookmarkFormWrapper.findSingle('textarea[name="description"]');
		this._tagsInput = this._bookmarkFormWrapper.findSingle('input[name="tags"]');

		this._bookmarkAddTrigger.on(DOMElementEvents.Click, (arg) => {
			this._switchToBookmarkForm();
			});

		this._bookmarkFormWrapper
		.findSingle('form')
		.on(DOMElementEvents.Submit, (arg) => {
			arg.preventDefault();
			});

		this._urlInput.on(DOMElementEvents.Blur, (arg) => {
			URLDetailsProvider.getDetails(
				this._urlInput.getValue(),
				(title, description) => {
					if (TSObject.exists(title)) {
						this._titleInput.setValue(title);
					}

					if (TSObject.exists(description)) {
						this._descriptionInput.setValue(description);
					}
					},
					(type, msg) => {
						ExceptionHandler.throw(
							new Exception('An error has occured with type ' + type + ' and following message: ' + msg)
							);
					}
					);
			});

		this._tagsInput.on(DOMElementEvents.KeyDown, (arg) => {
			if (arg.getWhich() === 13) {
				this._addTag(arg.getTarget().getValue());
				this._tagsInput.setValue('');
			}
			});
	}

	onDestroy() : void {
		this._bookmarkAddTrigger.off(DOMElementEvents.Click);
	}

	//endregion Public Methods
	
	//endregion Methods
}
