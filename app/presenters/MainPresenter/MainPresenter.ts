/// <reference path="../../dependencies.ts" />

class MainPresenter
	extends YimelloPresenter
	implements
		IBookmarkFormSubscriber,
		ITagListSubscriber,
		IBookmarkListSubscriber,
		IMenuControlSubscriber {
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

	private _searchField : DOMElement;

	private _bookmarkForm : BookmarkForm;
	private _tagList : TagList;
	private _bookmarkList : BookmarkList;
	private _menu : MenuControl;

	private _searchTimer : Timer;

	//endregion Fields
	
	//region Constructors

	constructor() {
		super();

		this._bookmarkForm = new BookmarkForm(this);
		this._tagList = new TagList(this);
		this._bookmarkList = new BookmarkList(this);
		this._menu = new MenuControl(this);
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private _setTagListHeight() : void {
		var e : DOMElement, f : DOMElement;

		e = DOMTree.findSingle('.js-icon-wrapper');
		f = DOMTree.findSingle('.js-panel-wrapper');

		DOMTree
			.findSingle('.js-tag-list-wrapper')
			.setCss({
				top : 30 + e.getHeight(),
				height : f.getHeight() - 30 - e.getHeight()
			});
	}

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

	private _afterBookmarkEdition() : void {
		this._tagList.resetList(
			() => {
				if (this._tagList.isMostPopularSelected()) {
					this._bookmarkList.displayMostPopular();
				} else if (this._tagList.isSearchTabSelected()) {
					this._bookmarkList.displayForSeachInput(this._searchField.getValue());
				} else {
					this.onTagSelection(this._tagList.getCurrentTagId());
				}
			}
		);
		

		this._switchFromBookmarkForm();
		this._searchField.setValue('');
	}

	private _afterTagEdition() : void {
		this._tagList.resetList();
	}

	//endregion Private Methods
	
	//region Public Methods
	
	onStart() : void {
		this._mainViewWrapper = DOMTree.findSingle('.js-main-view-wrapper');
		this._bookmarkAddTrigger = DOMTree.findSingle('.js-bookmark-add-trigger');
		this._bookmarkFormWrapper = DOMTree.findSingle('.js-bookmark-form-wrapper');
		this._searchField = DOMTree.findSingle('.js-search-engine form input[name="searchField"]');

		this._setTagListHeight();

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

		this._searchField.on(
			DOMElementEvents.KeyUp,
			(arg) => {
				var value : string = this._searchField.getValue();

				if (TSObject.exists(this._searchTimer)) {
					this._searchTimer.stop();
				}

				if (value.length >= 3) {
					this._searchTimer = new Timer(
						(o) => {
							this._tagList.enableSearchTab();
							this._bookmarkList.displayForSeachInput(value);
						},
						500
					);
				} else if (value === '') {
					this._tagList.disableSearchTab();
					if (this._tagList.isMostPopularSelected() || this._tagList.isSearchTabSelected()) {
						this._bookmarkList.displayMostPopular();
						this._tagList.selectMostPopular();
					} else {
						this.onTagSelection(this._tagList.getCurrentTagId());
					}
					this._tagList.resetList();
				}
			}
		);

		this._tagList.resetList(() => this._tagList.selectMostPopular());
		this._bookmarkList.displayMostPopular();
	}

	onPause() : void {
		this._bookmarkList.unfocus();
	}
	
	//region IBookmarkFormSubscriber

	onBookmarkCancellation() : void {
		this._switchFromBookmarkForm();
	}

	onBookmarkAddition() : void {
		this.showNotification('Yes! A new buddy is joining us :)');
		this._afterBookmarkEdition();
	}

	onBookmarkUpdate() : void {
		this.showNotification('All your changes have been saved');
		this._afterBookmarkEdition();
	}

	onBookmarkDeletion() : void {
		this.showNotification('Bye bye old chap :(');
		this._afterBookmarkEdition();
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

	onSearchTabSelection() : void {
		this._bookmarkList.displayForSeachInput(this._searchField.getValue());
	}

	onTagDeletion() : void {
		this._bookmarkList.displayMostPopular();
		this._tagList.resetList(() => this._tagList.selectMostPopular());
		this._searchField.setValue('');
		this.showNotification('See you mate :(');
	}

	askingForTagUpdate(tagId : string) : void {
		TagDAO.find(
			tagId,
			(outcome) => {
				this._menu.prepareForTagUpdate(outcome);
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

	//region IMenuControlSubscriber

	onTagAddition() : void {
		this._afterTagEdition();
		this.showNotification('Hello my friend!');
	}

	onTagUpdate() : void {
		this._afterTagEdition();
		this.showNotification('Alright, everything was stored');
	}

	onTagCancellation() : void {
		// Nothing to do
	}

	//endregion IMenuControlSubscriber

	//endregion Public Methods
	
	//endregion Methods
}
