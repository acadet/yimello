/// <reference path="../../dependencies.ts" />

class MainPresenter
	extends Presenter
	implements IBookmarkFormSubscriber, ITagListSubscriber, IBookmarkListSubscriber {
	//region Fields
	
	/**
	 * Main view wrapper
	 */
	private _mainViewWrapper : DOMElement;

	/**
	 * Wrapper of bookmark form
	 */
	private _bookmarkFormWrapper : DOMElement;

	/**
	 * Triggers outbreak of bookmark form
	 */
	private _bookmarkAddTrigger : DOMElement;

	private _bookmarkForm : BookmarkForm;
	private _tagList : TagList;
	private _bookmarkList : BookmarkList;

	//endregion Fields
	
	//region Constructors

	constructor() {
		super();

		this._bookmarkForm = new BookmarkForm(this);
		this._tagList = new TagList(this);
		this._bookmarkList = new BookmarkList(this);
	}

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

	private _switchFromBookmarkForm() : void {
		this._bookmarkFormWrapper.animate(
			{
				left: '100%'
			},
			500
		);

		this._mainViewWrapper.animate(
			{
				left: 0
			},
			500
		);
	}

	//endregion Private Methods
	
	//region Public Methods
	
	onStart() : void {
		this._mainViewWrapper = DOMTree.findSingle('.js-main-view-wrapper');
		this._bookmarkAddTrigger = DOMTree.findSingle('.js-bookmark-add-trigger');
		this._bookmarkFormWrapper = DOMTree.findSingle('.js-bookmark-form-wrapper');

		DOMTree
			.find('form')
			.forEach(
				(e) => {
					e.on(
						DOMElementEvents.Submit,
						(arg) => {
							arg.preventDefault();
						}
					);
				}
			);

		this._bookmarkAddTrigger.on(DOMElementEvents.Click, (arg) => {
			this._bookmarkForm.resetToAdd();
			this._switchToBookmarkForm();
		});

		this._tagList.reset();
		this._bookmarkList.displayMostPopular();
	}

	//region IBookmarkFormSubscriber

	onFormCancel() : void {
		this._switchFromBookmarkForm();
	}

	onFormSave() : void {
		this._tagList.reset();
		this._bookmarkList.displayMostPopular();
		this._switchFromBookmarkForm();
	}

	//endregion IBookmarkFormSubscriber

	//region ITagListSubscriber

	onMostPopularSelection() : void {
		this._bookmarkList.displayMostPopular();
	}

	onTagSelection(tagId : string) : void {
		TagDAO.find(
			tagId,
			(outcome) => {
				this._bookmarkList.displayForTag(outcome);
			}
		);
	}

	//endregion ITagListSubscriber

	//region IBookmarkListSubscriber

	onBookmarkSelection(bookmarkId : string) : void {
		BookmarkDAO.find(
			bookmarkId,
			(outcome) => {
				this._bookmarkForm.resetToUpdate(outcome);
				this._switchToBookmarkForm();
			}
		);
	}

	//endregion IBookmarkListSubscriber

	//endregion Public Methods
	
	//endregion Methods
}
