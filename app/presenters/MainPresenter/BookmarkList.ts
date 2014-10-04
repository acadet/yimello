/// <reference path="../../dependencies.ts" />

enum BookmarkListStates {
	MostPopular,
	Tag,
	Search
}

class BookmarkList implements IBookmarkContextMenuListener {
	//region Fields

	private _listener : IBookmarkListListener;

	private _source : DOMElement;
	private _defaultContent : DOMElement;
	private _ctxtMenu : BookmarkContextMenu;

	private _state : BookmarkListStates;
	private _currentTag : Tag;

	private _currentLabel : DOMElement;
	
	//endregion Fields
	
	//region Constructors

	constructor(listener : IBookmarkListListener) {
		this._listener = listener;
		this._source = DOMTree.findSingle('.js-bookmark-list');
		this._defaultContent = DOMTree.findSingle('.js-default-bookmark-list');
		this._ctxtMenu = new BookmarkContextMenu(this);
		this._currentLabel = DOMTree.findSingle('.js-current-tag');
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _setCurrentLabel(value : string) : void {
		this._currentLabel.setText(value);
	}

	private _build(values : IList<Bookmark>) : void {
		if (values.getLength() === 0) {
			this._defaultContent.setCss({ display : 'block'});
			this._source.setHTML('');
			return;
		} else {
			this._defaultContent.setCss({ display : 'none'});
		}

		this._source.setHTML(BookmarkTemplate.build(values));
		this
			._source
			.find('li')
			.forEach(
				(e) => {
					e.on(
						DOMElementEvents.MouseDown,
						(args) => {
							if (args.getWhich() === 1) {
								BusinessFactory.buildBookmark(
									(business) => {
										business.find(
											e.getData('id'),
											(bookmark) => {
												bookmark.setViews(bookmark.getViews() + 1);
												business.update(bookmark);
												NodeWindow.openExternal(bookmark.getURL());
												this.refresh();
											}
										);
									}
								);
							} else if (args.getWhich() === 3) {
								this._ctxtMenu.show(e.getData('id'), e.getData('url'), args.getPageY(), args.getPageX());
							}
						}
					);
				}
			);
	}
	
	//endregion Private Methods
	
	//region Public Methods

	sortMostPopular() : void {
		this._state = BookmarkListStates.MostPopular;
		this._setCurrentLabel('Most popular');
		BusinessFactory.buildBookmark(
			(business) => {
				business.sortByViewsDescThenByTitleAsc(
					(outcome) => {
						this._build(outcome);
					}
				);
			}
		);
	}

	sortForTag(tag : Tag) : void {
		this._state = BookmarkListStates.Tag;
		this._setCurrentLabel(tag.getLabel());
		this._currentTag = tag;
		BusinessFactory.buildTagBookmark(
			(business) => {
				business.sortBookmarksByTitleAscForTag(
					tag,
					(outcome) => {
						this._build(outcome);
					}
				);
			}
		);
	}

	search(input : string) : void {
		this._state = BookmarkListStates.Search;
		this._setCurrentLabel('Search Results');
		BusinessFactory.buildTagBookmark(
			(business) => {
				business.search(
					input,
					(outcome) => {
						var values : IList<Bookmark>;

						values = new ArrayList<Bookmark>();
						outcome.forEach(
							(e) => {
								if (e.getScore() > 0.05) {
									values.add(e);
								}
							}
						);

						this._build(values);
					}
				);
			}
		);
	}

	refresh() : void {
		switch (this._state) {
			case BookmarkListStates.MostPopular:
				this.sortMostPopular();
				break;
			case BookmarkListStates.Tag:
				this.sortForTag(this._currentTag);
				break;
			default:
				break;
		}
	}

	//region IBookmarkContextMenuListener

	requestEdition(id : string) : void {
		this._listener.onBookmarkUpdateRequest(id);
	}

	requestDeletion(id : string) : void {
		this._listener.onBookmarkDeletionRequest(id);
	}

	//endregion IBookmarkContextMenuListener
	
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
