/// <reference path="../../../dependencies.ts" />

/**
 * An implementation of IBookmarkDAO
 */
class BookmarkDAO extends DataAccessObject implements IBookmarkDAO {
	//region Fields

	private _tagBkDAO : ITagBookmarkDAO;
	
	//endregion Fields
	
	//region Constructors

	constructor(aro : IActiveRecordObject, tagBookmarkDAO : ITagBookmarkDAO) {
		super(aro);

		this._tagBkDAO = tagBookmarkDAO;
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	add(bookmark : Bookmark, callback? : Action<Bookmark>) : void {
		var f : Action<boolean>;
		var outcome : Bookmark;
		var l : IList<any>;
		var id : string;

		callback = ActionHelper.getValueOrDefault(callback);

		id = Guid.newGuid();

		l = new ArrayList<any>();
		l.add(id);
		l.add(bookmark.getURL());
		l.add(bookmark.getTitle());
		l.add(bookmark.getDescription());
		l.add(0);

		outcome = new Bookmark();
		bookmark.hydrate(outcome);
		outcome.setId(id);

		f = (b) => {
			if (b) {
				callback(outcome);
			} else {
				callback(null);
			}
		};

		this.getARO().insert(DAOTables.Bookmarks, l, f);
	}

	addRaw(bookmark : Bookmark, callback? : Action<boolean>) : void {
		var data : IList<any>;

		callback = ActionHelper.getValueOrDefault(callback);

		data = new ArrayList<any>();
		data.add(bookmark.getId());
		data.add(bookmark.getURL());
		data.add(bookmark.getTitle());
		data.add(bookmark.getDescription());
		data.add(bookmark.getViews());

		this
			.getARO()
			.insert(
				DAOTables.Bookmarks,
				data,
				callback
			);
	}

	update(bookmark : Bookmark, callback? : Action<Bookmark>) : void {
		var dict : IDictionary<string, any>;
		var selector : Pair<string, any>;

		callback = ActionHelper.getValueOrDefault(callback);

		if (!TSObject.exists(bookmark.getId()) || bookmark.getId() === '') {
			Log.error(new DAOException('Unable to update: no id was specified'));
			callback(null);
			return;
		}

		dict = new Dictionary<string, any>();
		dict.add('url', bookmark.getURL());
		dict.add('title', bookmark.getTitle());
		dict.add('description', bookmark.getDescription());
		dict.add('views', bookmark.getViews());

		selector = new Pair<string, any>('id', bookmark.getId());

		this.getARO().update(
			DAOTables.Bookmarks,
			selector,
			dict,
			(success) => {
				if (success) {
					callback(bookmark);
				} else {
					Log.error(new DAOException('An error occured when updating bookmark'));
					callback(bookmark);
				}
			}
		);
	}

	delete(bookmark : Bookmark, callback? : Action<boolean>) : void {
		callback = ActionHelper.getValueOrDefault(callback);

		if (!TSObject.exists(bookmark.getId()) || bookmark.getId() === '') {
			Log.error(new DAOException('Unable to delete: an id must be specify'));
			callback(false);
			return;
		}

		// Foreign keys constraints are not working with webSQL
		// Then, removing dependencies are needed
		this
			._tagBkDAO
			.removeBookmarkRelations(
				bookmark,
				(success1) => {
					this
						.getARO()
						.delete(
							DAOTables.Bookmarks,
							new Pair<string, any>('id', bookmark.getId()),
							(success2) => {
								callback(success1 && success2);
							}
						);
				}
			);
	}

	get(callback : Action<IList<Bookmark>>) : void {
		this.getARO().get(DAOTables.Bookmarks, callback, Bookmark.fromObject);
	}

	find(id : string, callback : Action<Bookmark>) : void {
		this
			.getARO()
			.find(
				DAOTables.Bookmarks,
				new Pair<string, any>('id', id),
				callback,
				Bookmark.fromObject
			);
	}

	findByURL(url : string, callback : Action<Bookmark>) : void {
		this
			.getARO()
			.find(
				DAOTables.Bookmarks,
				new Pair<string, any>('url', url),
				callback,
				Bookmark.fromObject
			);
	}

	sortByViewsDescThenByTitleAsc(callback : Action<IList<Bookmark>>) : void {
		var request : StringBuffer;

		request = new StringBuffer('SELECT * FROM ' + DAOTables.Bookmarks + ' ');
		request.append('ORDER BY views DESC, LOWER(title) ASC');

		this
			.getARO()
			.executeSQL(
				request.toString(),
				(outcome) => {
					callback(ActiveRecordHelper.getListFromSQLResultSet(outcome, Bookmark.fromObject));
				}
			);
	}

	sortByTitleAsc(callback : Action<IList<Bookmark>>) : void {
		var request : StringBuffer;

		request = new StringBuffer('SELECT * FROM ' + DAOTables.Bookmarks + ' ');
		request.append('ORDER BY LOWER(title) ASC');

		this
			.getARO()
			.executeSQL(
				request.toString(),
				(outcome) => {
					callback(ActiveRecordHelper.getListFromSQLResultSet(outcome, Bookmark.fromObject));
				}
			);
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
