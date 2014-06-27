/// <reference path="../../dependencies.ts" />

class BookmarkList {
	//region Fields
	
	private _subscriber : IBookmarkListSubscriber;

	private _destList : DOMElement;
	private _wrapper : DOMElement;

	private _defaultContent : DOMElement;
	private _isDefaultContentCurrent : boolean;
	private _isPressingMetaKey : boolean;

	//endregion Fields
	
	//region Constructors
	
	constructor(sub : IBookmarkListSubscriber) {
		this._subscriber = sub;
		this._wrapper = DOMTree.findSingle('.js-bookmark-wrapper');
		this._destList = this._wrapper.findSingle('.js-bookmark-list');
		this._defaultContent = this._wrapper.findSingle('.js-default-content');
		this._isDefaultContentCurrent = false;
		this._isPressingMetaKey = false;

		DOMTree.getDocument().on(
			DOMElementEvents.KeyDown,
			(e) => {
				this._isPressingMetaKey = e.isMetaKey();
			}
		);

		DOMTree.getDocument().on(
			DOMElementEvents.KeyUp,
			(e) => {
				this._isPressingMetaKey = false;
			}
		);
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
		s.append('<h3>' + bookmark.getTitle() + '</h3>');
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
							if (this._isPressingMetaKey) {
								BookmarkDAO.find(
									e.getData('id'),
									(outcome) => {
										outcome.setViews(outcome.getViews() + 1);
										outcome.update();
										NodeWindow.openExternal(outcome.getURL());
									}
								);
								this._isPressingMetaKey = false;
							} else {
								this._subscriber.onBookmarkSelection(e.getData('id'));
							}
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
		if (this._isDefaultContentCurrent) {
			return;
		}

		this._destList.setCss({ display : 'none' });
		this._defaultContent.setCss({ display : 'block' });
		this._isDefaultContentCurrent = true;
	}

	private _removeDefaultContent() : void {
		if (!this._isDefaultContentCurrent) {
			return;
		}

		this._destList.setCss({ display : 'block' });
		this._defaultContent.setCss({ display : 'none' });
		this._isDefaultContentCurrent = false;
	}

	private _hide() : void {
		this._wrapper.setCss({opacity : 0});
	}

	private _show() : void {
		this._wrapper.animate(
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
					this._removeDefaultContent();
					outcome.forEach(
						(e) => {
							this._destList.append(this._buildDOMBookmark(e));
						}
					);
					this._subscribeTriggers();
				}
				this._show();
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
						this._removeDefaultContent();
						outcome.forEach(
							(e) => {
								this._destList.append(this._buildDOMBookmark(e));
							}
						);
						this._subscribeTriggers();
					}
					this._show();
				}
			);
	}

	unfocus() : void {
		this._isPressingMetaKey = false;
	}

	//endregion Public Methods
	
	//endregion Methods
}
