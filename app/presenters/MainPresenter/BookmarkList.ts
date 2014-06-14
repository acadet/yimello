/// <reference path="../../dependencies.ts" />

class BookmarkList {
	//region Fields
	
	private _subscriber : IBookmarkListSubscriber;

	private _destList : DOMElement;

	//endregion Fields
	
	//region Constructors
	
	constructor(sub : IBookmarkListSubscriber) {
		this._subscriber = sub;

		this._destList = DOMTree.findSingle('.js-bookmark-list');
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private _buildDOMBookmark(bookmark : BookmarkDAO) : DOMElement {
		var e : DOMElement;

		e = DOMElement.fromString('<li>' + bookmark.getTitle() + '</li>');
		e.setData('id', bookmark.getId());


		return e;
	}

	private _subscribeTriggers() : void {
		this._destList
			.getChildren()
			.forEach(
				(e) => {
					e.on(
						DOMElementEvents.Click,
						(arg) => {
							this._subscriber.onBookmarkSelection(e.getData('id'));
						}
					);
				}
			);
	}

	private _reset() : void {
		this._destList.getChildren().forEach(e => e.off(DOMElementEvents.Click));
		this._destList.setHTML('');
	}

	private _setDefaultContent() : void {
		this._destList.setHTML('<p>No bookmarks to display :(</p>');
	}

	//endregion Private Methods
	
	//region Public Methods
	
	displayMostPopular() : void {
		this._reset();

		BookmarkDAO.sortByViewsDescThenByTitleAsc(
			(outcome) => {
				if (outcome.getLength() < 1) {
					this._setDefaultContent();
				} else {
					outcome.forEach(
						(e) => {
							this._destList.append(this._buildDOMBookmark(e));
						}
					);
					this._subscribeTriggers();
				}
			}
		);
	}

	displayForTag(tag : TagDAO) : void {
		this._reset();

		PresenterMediator
			.getBookmarkBusiness()
			.sortByTitleAscForTag(
				tag,
				(outcome) => {
					if (outcome.getLength() < 1) {
						this._setDefaultContent();
					} else {
						outcome.forEach(
							(e) => {
								this._destList.append(this._buildDOMBookmark(e));
							}
						);
						this._subscribeTriggers();
					}
				}
			);
	}

	//endregion Public Methods
	
	//endregion Methods
}
