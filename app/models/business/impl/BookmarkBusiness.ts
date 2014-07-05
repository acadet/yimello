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

	private _addList(
		current : number,
		bookmarks : IList<BookmarkDAO>,
		outcome : IList<BookmarkDAO>,
		callback : Action<IList<BookmarkDAO>> = null) {
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
				this._addList(current + 1, bookmarks, outcome, callback);
			}
		);
	}

	//endregion Private Methods
	
	//region Public Methods
	
	createFromURL(url : string, callback : Action<BookmarkDAO> = null) : void {
		var disarmedURL : string;

		disarmedURL = SecurityHelper.disarm(url);

		// Use helper to get extra data
		URLDetailsProvider.getDetails(
			disarmedURL,
			(title, description) => {
				var bookmark : BookmarkDAO;

				bookmark = new BookmarkDAO();
				bookmark.setURL(disarmedURL);
				bookmark.setTitle(SecurityHelper.disarm(title));
				bookmark.setDescription(SecurityHelper.disarm(description));

				// Add finally new bookmark
				bookmark.add(
					(outcome) => {
						if (callback !== null) {
							callback(outcome);
						}
					}
				);
			},
			(type, error) => {
				var msg : StringBuffer;

				msg = new StringBuffer('An error occured when getting url details ');
				msg.append('with type ' + type);
				msg.append(' and following message: ' + error);

				Log.error(new BusinessException(msg.toString()));

				if (callback !== null) {
					callback(null);
				}
			}
		);
	}

	add(bookmark : BookmarkDAO, callback : Action<BookmarkDAO> = null) : void {
		if (!URLHelper.isValid(bookmark.getURL())) {
			Log.error(new BusinessException('Failed to save: url is not valid - ' + bookmark.getURL()));
			if (callback !== null) {
				callback(null);
			}
			return;
		}

		if (!TSObject.exists(bookmark.getTitle()) || bookmark.getTitle() === '') {
			bookmark.setTitle(bookmark.getURL());
		}

		if (!TSObject.exists(bookmark.getDescription())) {
			bookmark.setDescription('');
		}

		this._disarmBookmark(bookmark);

		bookmark.add(
			(outcome) => {
				if (callback !== null) {
					callback(outcome);
				}
			}
		);
	}

	// TODO : test
	addList(bookmarks : IList<BookmarkDAO>, callback : Action<IList<BookmarkDAO>> = null) : void {
		if (!TSObject.exists(bookmarks)) {
			Log.error(new BusinessException('Unable to add list: provided list is null'));
			if (callback !== null) {
				callback(null);
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

		this._addList(0, bookmarks, new ArrayList<BookmarkDAO>(), callback);
	}

	update(bookmark : BookmarkDAO, callback : Action<BookmarkDAO> = null) : void {
		if (!URLHelper.isValid(bookmark.getURL())) {
			Log.error(new BusinessException('Failed to save: url is not valid'));
			if (callback !== null) {
				callback(null);
			}
			return;
		}

		this._disarmBookmark(bookmark);

		bookmark.update(
			(outcome) => {
				if (callback !== null) {
					callback(outcome);
				}
			}
		);
	}

	delete(bookmark : BookmarkDAO, callback : Action<boolean> = null) : void {
		var id : string;

		if (!TSObject.exists(bookmark)) {
			Log.error(new BusinessException('Unable to delete: provided bookmark is null'));
			if (callback !== null) {
				callback(false);
			}
			return;
		}

		id = bookmark.getId();
		bookmark.delete(
			(success) => {
				if (!success) {
					Log.error(new BusinessException('Failed to delete: failed to remove bookmark'));
					if (callback !== null) {
						callback(false);
					}
					return;
				}

				// Foreign keys constraints are not working with webSQL
				// Then, removing dependencies are needed
				ActiveRecordObject.executeSQL(
					'DELETE FROM ' + DAOTables.TagBookmark + ' WHERE bookmark_id = "' + id + '"',
					(outcome) => {
						if (callback !== null) {
							callback(true);
						}
					}
				);
			}
		);
	}

	//endregion Public Methods
	
	//endregion Methods
}
