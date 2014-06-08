/// <reference path="../../dependencies.ts" />

class MainPresenter extends Presenter {
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
	 * Triggers outbreak bookmark form
	 * @type {DOMElement}
	 */
	private _bookmarkAddTrigger : DOMElement;

	/**
	 * List where all tags are displayed (left pannel)
	 */
	private _tagList : DOMElement;

	private _mostPopularTrigger : DOMElement;

	private _bookmarkList : DOMElement;

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

	private _setCurrentBookmarks(bookmarks : IList<BookmarkDAO>) : void {
		if (!TSObject.exists(this._bookmarkList)) {
			this._bookmarkList = this._mainViewWrapper.findSingle('.js-bookmark-list');
		}

		this._bookmarkList.setHTML('');
		bookmarks.forEach(
			(b) => {
				var e : DOMElement;
				e = DOMElement.fromString('<li>' + b.getTitle() + '</li>');

				this._bookmarkList.append(e);
			}
		);
	}

	private _hydrateTagList() : void {
		if (!TSObject.exists(this._tagList)) {
			this._tagList = this._mainViewWrapper.findSingle('.js-tag-list');
		}

		if (TSObject.exists(this._mostPopularTrigger)) {
			this._mostPopularTrigger.off(DOMElementEvents.Click);
		}

		this._mostPopularTrigger = DOMElement.fromString('<li>Most popular</li>');
		this._mostPopularTrigger.addClass('js-most-popular');

		this._tagList.setHTML('');
		this._tagList.append(this._mostPopularTrigger);

		TagDAO.sortByLabelAsc(
			(outcome) => {
				outcome.forEach(
					(tag) => {
						var e : DOMElement;
						e = DOMElement.fromString('<li>' + tag.getLabel() + '</li>');
						e.setData('id', tag.getId());
						this._tagList.append(e);
					}
				);
			}
		);
	}

	//endregion Private Methods
	
	//region Public Methods
	
	onStart() : void {
		this._mainViewWrapper = DOMTree.findSingle('.js-main-view-wrapper');
		this._bookmarkFormWrapper = DOMTree.findSingle('.js-bookmark-form-wrapper');
		this._bookmarkAddTrigger = DOMTree.findSingle('.js-bookmark-add-trigger');	

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
			this._switchToBookmarkForm();
		});
	}

	//endregion Public Methods
	
	//endregion Methods
}
