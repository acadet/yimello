/// <reference path="../../dependencies.ts" />

class BookmarkList {
	//region Fields

	private _source : DOMElement;
	
	//endregion Fields
	
	//region Constructors

	constructor() {
		this._source = DOMTree.findSingle('.js-bookmark-list');
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	sortMostPopular() : void {
		BusinessFactory.buildBookmark(
			(business) => {
				business.sortByViewsDescThenByTitleAsc(
					(outcome) => {
						outcome.forEach((e) => this._source.append(BookmarkTemplate.build(e)));
					}
				);
			}
		);
	}
	
	//endregion Public Methods
	
	//endregion Methods
}

// class BookmarkList {
// 	//region Fields
	
// 	private _subscriber : IBookmarkListSubscriber;

// 	private _destList : DOMElement;
// 	private _wrapper : DOMElement;

// 	private _defaultContent : DOMElement;
// 	private _isDefaultContentCurrent : boolean;
// 	private _keyboardEventObj : DOMElementEventObject;

// 	//endregion Fields
	
// 	//region Constructors
	
// 	constructor(sub : IBookmarkListSubscriber) {
// 		this._subscriber = sub;
// 		this._wrapper = DOMTree.findSingle('.js-bookmark-wrapper');
// 		this._destList = this._wrapper.findSingle('.js-bookmark-list');
// 		this._defaultContent = this._wrapper.findSingle('.js-default-content');
// 		this._isDefaultContentCurrent = false;

// 		DOMTree
// 			.getDocument()
// 			.on(
// 				DOMElementEvents.KeyDown,
// 				(e) => {
// 					this._keyboardEventObj = e;
// 				}
// 			);

// 		DOMTree
// 			.getDocument()
// 			.on(
// 				DOMElementEvents.KeyUp,
// 				(e) => {
// 					this._keyboardEventObj = null;
// 				}
// 			);
// 	}

// 	//endregion Constructors
	
// 	//region Methods
	
// 	//region Private Methods
	
// 	private _buildDOMBookmark(bookmark : Bookmark) : DOMElement {
// 		var e : DOMElement;
// 		var s : StringBuffer;
// 		var truncatedDescription : string;

// 		s = new StringBuffer('<li>');

// 		s.append(FaviconHelper.getImgTag(bookmark.getURL()).toString());
// 		s.append('<h3>' + bookmark.getTitle() + '</h3>');
// 		truncatedDescription = StringHelper.truncate(bookmark.getDescription(), 50);
// 		s.append('<p>' + truncatedDescription + '</p>');

// 		e = DOMElement.fromString(s.toString());
// 		e.setData('id', bookmark.getId());

// 		return e;
// 	}

// 	private _buildDOMSearchResult(bookmark : ScoredBookmark) : DOMElement {
// 		var e : DOMElement;
// 		var s : StringBuffer;
// 		var score : string;

// 		score = NumberHelper.toString(Math.round(bookmark.getScore() * 100));

// 		s = new StringBuffer('<li class="search-result">');
// 		s.append('<div class="details-wrapper">');
// 		s.append('<div class="header-wrapper">');
// 		s.append(FaviconHelper.getImgTag(bookmark.getURL()).toString());
// 		s.append('<h3>' + bookmark.getTitle() + '</h3></div>');
// 		s.append('<p>' + bookmark.getDescription() + '</p>');
// 		s.append('</div><div class="score-wrapper">');
// 		s.append('<h4 class="');
// 		if (bookmark.getScore() >= 0.9) {
// 			s.append('accurate');
// 		} else if (0.75 <= bookmark.getScore() && bookmark.getScore() < 0.9) {
// 			s.append('high');
// 		} else if (0.5 <= bookmark.getScore() && bookmark.getScore() < 0.75) {
// 			s.append('medium');
// 		} else {
// 			s.append('low');
// 		}
// 		s.append('">' + score + '%</h4></div>');
// 		s.append('</li>');


// 		e = DOMElement.fromString(s.toString());
// 		e.setData('id', bookmark.getId());

// 		return e;
// 	}

// 	private _subscribeTriggers() : void {
// 		this._destList
// 			.getChildren()
// 			.forEach(
// 				(e) => {
// 					e.on(
// 						DOMElementEvents.Click,
// 						(arg) => {
// 							if (TSObject.exists(this._keyboardEventObj)) {
// 								if (this._keyboardEventObj.getWhich() === 17
// 									|| this._keyboardEventObj.isMetaKey()) {
// 									this._keyboardEventObj = null;

// 									BusinessFactory.buildBookmark(
// 										(business) => {
// 											business.find(
// 												e.getData('id'),
// 												(outcome) => {
// 													outcome.setViews(outcome.getViews() + 1);
// 													// TODO: test errors
// 													business.update(outcome);
// 													NodeWindow.openExternal(outcome.getURL());
// 												}
// 											);
// 										}
// 									);
// 								}
// 							} else {
// 								this._subscriber.onBookmarkSelection(e.getData('id'));
// 							}
// 						}
// 					);
// 				}
// 			);
// 	}

// 	private _reset() : void {
// 		this._hide();
// 		this._destList.getChildren().forEach(e => e.off(DOMElementEvents.Click));
// 		this._destList.getChildren().forEach(e => e.remove());
// 	}

// 	private _setDefaultContent() : void {
// 		if (this._isDefaultContentCurrent) {
// 			return;
// 		}

// 		this._destList.setCss({ display : 'none' });
// 		this._defaultContent.setCss({ display : 'block' });
// 		this._isDefaultContentCurrent = true;
// 	}

// 	private _removeDefaultContent() : void {
// 		if (!this._isDefaultContentCurrent) {
// 			return;
// 		}

// 		this._destList.setCss({ display : 'block' });
// 		this._defaultContent.setCss({ display : 'none' });
// 		this._isDefaultContentCurrent = false;
// 	}

// 	private _hide() : void {
// 		this._wrapper.setCss({opacity : 0});
// 	}

// 	private _show() : void {
// 		this._wrapper.animate(
// 			{
// 				opacity : 1
// 			},
// 			500
// 		);
// 	}

// 	//endregion Private Methods
	
// 	//region Public Methods
	
// 	displayMostPopular() : void {
// 		this._reset();

// 		BusinessFactory.buildBookmark(
// 			(business) => {
// 				business.sortByViewsDescThenByTitleAsc(
// 					(outcome) => {
// 						if (outcome.getLength() < 1) {
// 							this._setDefaultContent();
// 						} else {
// 							this._removeDefaultContent();
// 							outcome.forEach(
// 								(e) => {
// 									this._destList.append(this._buildDOMBookmark(e));
// 								}
// 							);
// 							this._subscribeTriggers();
// 						}
// 						this._show();
// 					}
// 				);
// 			}
// 		);
// 	}

// 	displayForTag(tag : Tag) : void {
// 		this._reset();

// 		BusinessFactory.buildTagBookmark(
// 			(business) => {
// 				business.sortBookmarksByTitleAscForTag(
// 					tag,
// 					(outcome) => {
// 						if (outcome.getLength() < 1) {
// 							this._setDefaultContent();
// 						} else {
// 							this._removeDefaultContent();
// 							outcome.forEach(
// 								(e) => {
// 									this._destList.append(this._buildDOMBookmark(e));
// 								}
// 							);
// 							this._subscribeTriggers();
// 						}
// 						this._show();
// 					}
// 				);
// 			}
// 		);
// 	}

// 	displayForSeachInput(value : string) : void {
// 		this._reset();

// 		BusinessFactory.buildTagBookmark(
// 			(business) => {
// 				business.search(
// 					value,
// 					(outcome) => {
// 						if (outcome.getLength() < 1) {
// 							this._setDefaultContent();
// 						} else {
// 							this._removeDefaultContent();
// 							outcome.forEach(
// 								(e) => {
// 									this._destList.append(this._buildDOMSearchResult(e));
// 								}
// 							);
// 							this._subscribeTriggers();
// 						}
// 						this._show();
// 					}
// 				);
// 			}
// 		);
// 	}

// 	unfocus() : void {
// 		this._keyboardEventObj = null;
// 	}

// 	//endregion Public Methods
	
// 	//endregion Methods
// }
