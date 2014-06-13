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
	
	/**
	 * Recursive function for binding a list of tags to a bookmark
	 * @param {BookmarkDAO}        bookmark [description]
	 * @param {IList<TagDAO>}      tags     [description]
	 * @param {number}             index    Current index in tag list
	 * @param {Action<boolean> =        null}        callback [description]
	 */
	private _bindTags(bookmark : BookmarkDAO, tags : IList<TagDAO>, index : number, callback : Action<boolean> = null) : void {
		var t : TagDAO;
		var data : IList<any>;

		t = tags.getAt(index);
		data = new ArrayList<any>();
		data.add(t.getId());
		data.add(bookmark.getId());

		// Insert new couple into table
		ActiveRecordObject.insert(
			DAOTables.TagBookmark,
			data,
			(success) => {
				if (!success) {
					Log.error(new BusinessException('Failed to insert values'));
					if (callback !== null) {
						callback(false);
					}
				} else {
					index++;

					if (index < tags.getLength()) {
						this._bindTags(bookmark, tags, index, callback);
					} else {
						// Browsing has ended, trigger the callback
						if (callback !== null) {
							callback(true);
						}
					}
				}
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

	bindTags(bookmark : BookmarkDAO, tags : IList<TagDAO>, callback : Action<boolean> = null) : void {
		if (!TSObject.exists(bookmark)) {
			Log.error(new BusinessException('Provided bookmark cannot be null'));
			if (callback !== null) {
				callback(false);
			}
			return;
		}

		if (!TSObject.exists(tags)) {
			Log.error(new BusinessException('Provided tags cannot be null'));
			if (callback != null) {
				callback(false);
			}
			return;
		}

		if (tags.getLength() < 1) {
			Log.warn('No tags bound: provided list is empty');
			if (callback !== null) {
				callback(true);
			}
			return;
		}

		this._bindTags(bookmark, tags, 0, callback);
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

	sortByTitleAscForTag(tag : TagDAO, callback : Action<IList<BookmarkDAO>>) : void {
		var request : StringBuffer;

		if (!TSObject.exists(tag)) {
			Log.error(new BusinessException('Unable to sort: provided tag is null'));
			callback(null);
			return;
		}

		// Avoid join, use in condition
		request = new StringBuffer('SELECT * FROM ' + DAOTables.Bookmarks + ' WHERE id IN ');
		request.append('(SELECT bookmark_id FROM ' + DAOTables.TagBookmark + ' ');
		request.append('WHERE tag_id = "' + tag.getId() + '") ');
		request.append('ORDER BY title ASC');

		DataAccessObject.initialize(
			(success) => {
				ActiveRecordObject.executeSQL(
					request.toString(),
					(outcome) => {
						callback(ActiveRecordHelper.getListFromSQLResultSet(outcome, BookmarkDAO.fromObject));
					}
				);
			}
		);
	}

	add(bookmark : BookmarkDAO, callback : Action<BookmarkDAO> = null) : void {
		if (!URLHelper.isValid(bookmark.getURL())) {
			Log.error(new BusinessException('Failed to save: url is not valid'));
			if (callback !== null) {
				callback(null);
			}
			return;
		}

		// Apply security operation
		bookmark.setURL(SecurityHelper.disarm(bookmark.getURL()));
		bookmark.setTitle(SecurityHelper.disarm(bookmark.getTitle()));
		bookmark.setDescription(SecurityHelper.disarm(bookmark.getDescription()));

		bookmark.add(
			(outcome) => {
				if (callback !== null) {
					callback(outcome);
				}
			}
		);
	}

	//endregion Public Methods
	
	//endregion Methods
}
