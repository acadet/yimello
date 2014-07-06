/// <reference path="../../../dependencies.ts" />

/**
 * Implemntation of business layer for bookmarks
 */
class BookmarkBusiness implements IBookmarkBusiness {
	//region Fields
	
	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _disarmBookmark(bookmark : BookmarkDAO) : void {
		bookmark.setURL(SecurityHelper.disarm(bookmark.getURL()));
		bookmark.setTitle(SecurityHelper.disarm(bookmark.getTitle()));
		bookmark.setDescription(SecurityHelper.disarm(bookmark.getDescription()));
	}

	private _checkBookmark(bookmark : BookmarkDAO, errorHandler : Action<string> = null) : boolean {
		if (!TSObject.exists(bookmark)) {
			Log.error(new BusinessException('Unable to add: no bookmark provided'));
			if (errorHandler !== null) {
				errorHandler('An internal error has occured. Please try again');
			}
			return false;
		}

		if (!URLHelper.isValid(bookmark.getURL())) {
			Log.error(new BusinessException('Failed to save: url is not valid'));
			if (errorHandler !== null) {
				errorHandler('URL is invalid');
			}
			return false;
		}

		if (!TSObject.exists(bookmark.getTitle()) || bookmark.getTitle() === '') {
			bookmark.setTitle(bookmark.getURL());
		}

		if (!TSObject.exists(bookmark.getDescription())) {
			bookmark.setDescription('');
		}

		return true;
	}

	private _addList(
		current : number,
		bookmarks : IList<BookmarkDAO>,
		outcome : IList<BookmarkDAO>,
		callback : Action<IList<BookmarkDAO>> = null,
		errorHandler : Action<string> = null) {
		var b : BookmarkDAO;

		if (current === bookmarks.getLength()) {
			if (callback !== null) {
				callback(outcome);
			}
			return;
		}

		b = bookmarks.getAt(current);
		this.add(
			b,
			(bk) => {
				outcome.add(bk);
				this._addList(current + 1, bookmarks, outcome, callback, errorHandler);
			},
			errorHandler
		);
	}

	//endregion Private Methods
	
	//region Public Methods
	
	createFromURL(
		url : string,
		callback : Action<BookmarkDAO> = null,
		errorHandler : Action<string> = null,
		warningHandler : Action<string> = null) : void {
		var disarmedURL : string;

		disarmedURL = SecurityHelper.disarm(url);

		// Use helper to get extra data
		URLDetailsProvider.getDetails(
			disarmedURL,
			(title, description) => {
				var bookmark : BookmarkDAO;

				bookmark = new BookmarkDAO();
				bookmark.setURL(disarmedURL);
				bookmark.setTitle(title);
				bookmark.setDescription(description);

				// Add finally new bookmark
				this.add(
					bookmark,
					(outcome) => {
						if (callback !== null) {
							callback(outcome);
						}
					}
				);
			},
			(type, error) => {
				if (type === URLDetailsProviderError.BadURL) {
					Log.error(new BusinessException('Unable to create bookmark: provided URL is invalid'));
					if (errorHandler !== null) {
						errorHandler('URL is invalid');
					}
				} else if (type === URLDetailsProviderError.Ajax) {
					var bookmark : BookmarkDAO;

					bookmark = new BookmarkDAO();
					bookmark.setURL(disarmedURL);

					Log.warn('No data has been pulled: failed to reach target');
					if (warningHandler !== null) {
						warningHandler('Unable to connect website. You should check your Internet connection.');
					}
					this.add(
						bookmark,
						(outcome) => {
							if (callback !== null) {
								callback(outcome);
							}
						},
						errorHandler
					);
				}
			}
		);
	}

	add(bookmark : BookmarkDAO, callback : Action<BookmarkDAO> = null, errorHandler : Action<string> = null) : void {
		if (!this._checkBookmark(bookmark, errorHandler)) {
			return;
		}

		this._disarmBookmark(bookmark);

		bookmark.add(
			(outcome) => {
				if (!TSObject.exists(outcome)) {
					if (errorHandler !== null) {
						errorHandler('An internal error has occured. Please try again');
					}
					return;
				}
				if (callback !== null) {
					callback(outcome);
				}
			}
		);
	}

	// TODO : test
	addList(
		bookmarks : IList<BookmarkDAO>,
		callback : Action<IList<BookmarkDAO>> = null,
		errorHandler : Action<string> = null) : void {

		if (!TSObject.exists(bookmarks)) {
			Log.error(new BusinessException('Unable to add list: provided list is null'));
			if (errorHandler !== null) {
				errorHandler('An internal error has occured. Please try again');
			}
			return;
		}

		if (bookmarks.getLength() === 0) {
			Log.warn('Provided list is empty, nothing was added');
			if (callback !== null) {
				callback(new ArrayList<BookmarkDAO>());
			}
			return;
		}

		this._addList(0, bookmarks, new ArrayList<BookmarkDAO>(), callback, errorHandler);
	}

	update(bookmark : BookmarkDAO, callback : Action<BookmarkDAO> = null, errorHandler : Action<string> = null) : void {
		if (!this._checkBookmark(bookmark, errorHandler)) {
			return;
		}

		this._disarmBookmark(bookmark);

		bookmark.update(
			(outcome) => {
				if (!TSObject.exists(outcome)) {
					if (errorHandler !== null) {
						errorHandler('An internal error has occured. Please try again');
					}
				}
				if (callback !== null) {
					callback(outcome);
				}
			}
		);
	}

	delete(bookmark : BookmarkDAO, callback : Action0 = null, errorHandler : Action<string> = null) : void {
		var id : string;

		if (!TSObject.exists(bookmark)) {
			Log.error(new BusinessException('Unable to delete: provided bookmark is null'));
			if (errorHandler !== null) {
				errorHandler('An internal error has occured. Please try again');
			}
			return;
		}

		id = bookmark.getId();
		bookmark.delete(
			(success) => {
				if (!success) {
					if (errorHandler !== null) {
						errorHandler('An internal has occured. Please try again');
					}
					return;
				}

				// Foreign keys constraints are not working with webSQL
				// Then, removing dependencies are needed
				ActiveRecordObject.executeSQL(
					'DELETE FROM ' + DAOTables.TagBookmark + ' WHERE bookmark_id = "' + id + '"',
					(outcome) => {
						if (callback !== null) {
							callback();
						}
					}
				);
			}
		);
	}

	//endregion Public Methods
	
	//endregion Methods
}
