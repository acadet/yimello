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
		var s : StringBuffer;
		var truncatedDescription : string;

		s = new StringBuffer('<li>');

		s.append(FaviconHelper.getImgTag(bookmark.getURL()).toString());
		s.append('<h3>' + bookmark.getTitle() + '</p>');
		truncatedDescription = StringHelper.truncate(bookmark.getDescription(), 50);
		s.append('<p>' + truncatedDescription + '</p>');

		e = DOMElement.fromString(s.toString());
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
		this._hide();
		this._destList.getChildren().forEach(e => e.off(DOMElementEvents.Click));
		this._destList.getChildren().forEach(e => e.remove());
	}

	private _setDefaultContent() : void {
		this._destList.setHTML('<p>No bookmarks to display :(</p>');
	}

	private _hide() : void {
		this._destList.setCss({opacity : 0});
	}

	private _show() : void {
		this._destList.animate(
			{
				opacity : 1
			},
			500
		);
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
					this._show();
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
						this._show();
					}
				}
			);
	}

	//endregion Public Methods
	
	//endregion Methods
}
