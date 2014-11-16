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
