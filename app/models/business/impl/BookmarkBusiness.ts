/// <reference path="../../../dependencies.ts" />

/**
 * Implemntation of business layer for bookmarks
 */
class BookmarkBusiness implements IInternalBookmarkBusiness {
	//region Fields

	private _dao : IBookmarkDAO;
	
	//endregion Fields
	
	//region Constructors

	constructor(dao : IBookmarkDAO) {
		this._dao = dao;
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _checkBookmark(bookmark : Bookmark, errorHandler? : Action<string>) : boolean {
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (!TSObject.exists(bookmark)) {
			Log.error(new BusinessException('Unable to add: no bookmark provided'));
			errorHandler('Ouch! An internal error has occured. Please try again');
			return false;
		}

		if (!URLHelper.isValid(bookmark.getURL())) {
			Log.error(new BusinessException('Failed to save: url is not valid'));
			errorHandler('Ow! Your URL is invalid. Please check it again');
			return false;
		}

		return true;
	}

	// private _addList(
	// 	current : number,
	// 	bookmarks : IList<Bookmark>,
	// 	outcome : IList<Bookmark>,
	// 	callback? : Action<IList<Bookmark>>,
	// 	errorHandler? : Action<string>) : void {
	// 	var b : BookmarkDAO;

	// 	callback = ActionHelper.getValueOrDefault(callback);
	// 	errorHandler = ActionHelper.getValueOrDefault(errorHandler);

	// 	if (current === bookmarks.getLength()) {
	// 		callback(outcome);
	// 		return;
	// 	}

	// 	b = bookmarks.getAt(current);
	// 	this.add(
	// 		b,
	// 		(bk) => {
	// 			outcome.add(bk);
	// 			this._addList(current + 1, bookmarks, outcome, callback, errorHandler);
	// 		},
	// 		errorHandler
	// 	);
	// }

	//endregion Private Methods
	
	//region Public Methods

	engineBookmark(bookmark : Bookmark) : void {
		var id : string, url : string, title : string, description : string;

		id = bookmark.getId();
		if (TSObject.exists(id)) {
			id = StringHelper.trim(id);
			id = SecurityHelper.disarm(id);
			bookmark.setId(id);
		}

		url = bookmark.getURL();
		url = StringHelper.trim(url);
		url = SecurityHelper.disarm(url);
		bookmark.setURL(url);

		title = bookmark.getTitle();
		if (!TSObject.exists(title) || title === '') {
			bookmark.setTitle(bookmark.getURL());
		} else {
			title = StringHelper.trim(title);
			title = SecurityHelper.disarm(title);
			if (title === '') {
				bookmark.setTitle(bookmark.getURL());
			} else {
				bookmark.setTitle(title);
			}
		}
		
		description = bookmark.getDescription();
		if (!TSObject.exists(description)) {
			description = '';
		} else {
			description = StringHelper.trim(description);
			description = SecurityHelper.disarm(description);
		}
		bookmark.setDescription(description);
	}
	
	createFromURL(
		url : string,
		callback? : Action<Bookmark>,
		errorHandler? : Action<string>,
		warningHandler? : Action<string>) : void {
		var disarmedURL : string;

		callback = ActionHelper.getValueOrDefault(callback);
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);
		warningHandler = ActionHelper.getValueOrDefault(warningHandler);

		disarmedURL = SecurityHelper.disarm(url);

		// Use helper to get extra data
		URLDetailsProvider.getDetails(
			disarmedURL,
			(title, description) => {
				var bookmark : Bookmark;

				bookmark = new Bookmark();
				bookmark.setURL(disarmedURL);
				bookmark.setTitle(title);
				bookmark.setDescription(description);

				// Add finally new bookmark
				this.add(
					bookmark,
					(outcome) => {
						callback(outcome);
					}
				);
			},
			(type, error) => {
				if (type === URLDetailsProviderError.BadURL) {
					Log.error(new BusinessException('Unable to create bookmark: provided URL is invalid'));
					errorHandler('Ouch! Your URL is invalid. Please check it again');
				} else if (type === URLDetailsProviderError.Ajax) {
					var bookmark : Bookmark;

					bookmark = new Bookmark();
					bookmark.setURL(disarmedURL);

					Log.warn('No data has been pulled: failed to reach target');
					warningHandler('Hem... I was not able to connect website. You should check your Internet connection.');
					this.add(
						bookmark,
						(outcome) => {
							callback(outcome);
						},
						errorHandler
					);
				} else {
					Log.error(new BusinessException('Unable to create bookmark: an unknown error has occured ' + error));
					errorHandler('Ouch! An internal error has occured. Please try again');
				}
			}
		);
	}

	add(bookmark : Bookmark, callback? : Action<Bookmark>, errorHandler? : Action<string>) : void {
		callback = ActionHelper.getValueOrDefault(callback);
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (!this._checkBookmark(bookmark, errorHandler)) {
			return;
		}

		this.engineBookmark(bookmark);

		this._dao.add(
			bookmark,
			(outcome) => {
				if (!TSObject.exists(outcome)) {
					errorHandler('Ouch! An internal error has occured. Please try again');
					return;
				}
				callback(outcome);
			}
		);
	}

	// TODO : test
	// addList(
	// 	bookmarks : IList<Bookmark>,
	// 	callback? : Action<IList<Bookmark>>,
	// 	errorHandler? : Action<string>) : void {

	// 	callback = ActionHelper.getValueOrDefault(callback);
	// 	errorHandler = ActionHelper.getValueOrDefault(errorHandler);

	// 	if (!TSObject.exists(bookmarks)) {
	// 		Log.error(new BusinessException('Unable to add list: provided list is null'));
	// 		errorHandler('Ouch! An internal error has occured. Please try again');
	// 		return;
	// 	}

	// 	if (bookmarks.getLength() === 0) {
	// 		Log.warn('Provided list is empty, nothing was added');
	// 		callback(new ArrayList<Bookmark>());
	// 		return;
	// 	}

	// 	this._addList(0, bookmarks, new ArrayList<Bookmark>(), callback, errorHandler);
	// }

	update(bookmark : Bookmark, callback? : Action<Bookmark>, errorHandler? : Action<string>) : void {
		callback = ActionHelper.getValueOrDefault(callback);
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (!this._checkBookmark(bookmark, errorHandler)) {
			return;
		}

		this.engineBookmark(bookmark);

		this._dao.update(
			bookmark,
			(outcome) => {
				if (!TSObject.exists(outcome)) {
					errorHandler('Ouch! An internal error has occured. Please try again');
				}
				callback(outcome);
			}
		);
	}

	delete(bookmark : Bookmark, callback? : Action0, errorHandler? : Action<string>) : void {
		var id : string;

		callback = ActionHelper.getValueOrDefaultNoArgs(callback);
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (!TSObject.exists(bookmark)) {
			Log.error(new BusinessException('Unable to delete: provided bookmark is null'));
			errorHandler('Ouch! An internal error has occured. Please try again');
			return;
		}

		id = bookmark.getId();
		this._dao.delete(
			bookmark,
			(success) => {
				if (!success) {
					errorHandler('Ouch! An internal error has occured. Please try again');
					return;
				}

				callback();
			}
		);
	}

	find(id : string, callback : Action<Bookmark>, errorHandler? : Action<string>) : void {
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		this
			._dao
			.find(
				id,
				(outcome) => {
					if (TSObject.exists(outcome)) {
						callback(outcome);
					} else {
						Log.error(new BusinessException('No bookmark found with id: ' + id));
						errorHandler('Ouch! An internal error has occured. Please try again');
					}
				}
			);
	}

	sortByViewsDescThenByTitleAsc(callback : Action<IList<Bookmark>>, errorHandler? : Action<string>) : void {
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		this
			._dao
			.sortByViewsDescThenByTitleAsc(
				(outcome) => {
					if (TSObject.exists(outcome)) {
						callback(outcome);
					} else {
						Log.error(new BusinessException('Unable to sort: an error has occured when pulling'));
						errorHandler('Ouch! An internal error has occured. Please try again');
					}
				}
			);
	}

	//endregion Public Methods
	
	//endregion Methods
}
