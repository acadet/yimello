/// <reference path="../../dependencies.ts" />

/**
 * Bookmark DAO
 */
class BookmarkDAO extends DataAccessObject {
	//region Fields
	
	/**
	 * URL of bookmark
	 */
	private _url : string;

	/**
	 * Title of bookmark
	 */
	private _title : string;

	/**
	 * Description of bookmark
	 */
	private _description : string;

	/**
	 * Number of times bookmark has been viewed
	 */
	private _views : number;

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	//endregion Private Methods
	
	//region Public Methods
	
	/**
	 * Returns URL
	 */
	getURL() : string {
		return this._url;
	}

	/**
	 * Sets URL
	 * @param  {string}      u [description]
	 * @return {BookmarkDAO}   [description]
	 */
	setURL(u : string) : BookmarkDAO {
		this._url = u;
		return this;
	}

	/**
	 * Returns title
	 * @return {string} [description]
	 */
	getTitle() : string {
		return this._title;
	}

	/**
	 * Sets title
	 * @param  {string}      t [description]
	 * @return {BookmarkDAO}   [description]
	 */
	setTitle(t : string) : BookmarkDAO {
		this._title = t;
		return this;
	}

	/**
	 * Returns description
	 * @return {string} [description]
	 */
	getDescription() : string {
		return this._description;
	}

	/**
	 * Sets description
	 * @param  {string}      d [description]
	 * @return {BookmarkDAO}   [description]
	 */
	setDescription(d : string) : BookmarkDAO {
		this._description = d;
		return this;
	}

	/**
	 * Gets view number
	 * @return {number} [description]
	 */
	getViews() : number {
		return this._views;
	}

	/**
	 * Sets view number
	 * @param  {number}      value [description]
	 * @return {BookmarkDAO}       [description]
	 */
	setViews(value : number) : BookmarkDAO {
		this._views = value;
		return this;
	}

	/**
	 * Transforms bookmark as a list of data. 
	 * Data are sorted to match DB organization
	 * @return {IList<any>} [description]
	 */
	toList() : IList<any> {
		var l : IList<any> = new ArrayList<any>();

		l.add(this.getId());
		l.add(this.getURL());
		l.add(this.getTitle());
		l.add(this.getDescription());
		l.add(this.getViews());

		return l;
	}

	/**
	 * Filled a bookmark from a table object
	 * @param  {any}         obj Object built by DB
	 * @return {BookmarkDAO}     [description]
	 */
	static fromObject(obj : any) : BookmarkDAO {
		var b : BookmarkDAO = new BookmarkDAO();

		b.setId(obj.id);
		b.setURL(obj.url);
		b.setTitle(obj.title);
		b.setDescription(obj.description);
		b.setViews(obj.views);

		return b;
	}

	/**
	 * Adds a new bookmark into DB
	 * @param {Action<BookmarkDAO> = null} callback Callback with new built bookmark. Id is filled
	 */
	add(callback : Action<BookmarkDAO> = null) : void {
		var l : IList<any> = new ArrayList<any>();
		var id : string = Guid.newGuid();

		l.add(id);
		l.add(this.getURL());
		l.add(this.getTitle());
		l.add(this.getDescription());
		l.add(0);

		this.initialize(
			(b) => {
				var f : Action<boolean>;
				var bookmark : BookmarkDAO;

				bookmark = new BookmarkDAO();
				bookmark.setId(id);
				bookmark.setURL(this.getURL());
				bookmark.setTitle(this.getTitle());
				bookmark.setDescription(this.getDescription());
				bookmark.setViews(this.getViews());

				f = (b) => {
					if (b) {
						callback(bookmark);
					} else {
						callback(null);
					}
				};

				ActiveRecordObject.insert(DAOTables.Bookmarks, l, f);
			}
		);
	}

	// // TODO : test
	// update(callback : Action<boolean> = null) : void {
	// 	var dict : IDictionary<string, any>;
	// 	var selector : Pair<string, string>;

	// 	dict = new Dictionary<string, any>();
	// 	selector = new Pair<string, string>('id', this.getId());

	// 	dict.add('title', this.getTitle());
	// 	dict.add('url', this.getURL());
	// 	dict.add('description', this.getDescription());

	// 	ActiveRecordObject.update(DAOTables.Bookmarks, selector, dict, callback);
	// }

	/**
	 * Deletes a bookmark from DB
	 * @param {Action<boolean> = null} callback Callback with a success arg
	 */
	delete(callback : Action<boolean> = null) : void {
		if (!TSObject.exists(this.getId()) || this.getId() === '') {
			Log.error(new DAOException('Unable to delete: an id must be specify'));
			if (callback !== null) {
				callback(false);
			}
			return;
		}

		this.initialize(
			(success) => {
				ActiveRecordObject.delete(
					DAOTables.Bookmarks,
					new Pair<string, any>('id', this.getId()),
					(b) => {
						if (callback !== null) {
							callback(b);
						}
					}
				);
			}
		);
	}

	/**
	 * Gets all bookmarks from DB
	 * @param {Action<IList<BookmarkDAO>>} callback Callback with bookmark list
	 */
	static get(callback : Action<IList<BookmarkDAO>>) : void {
		DataAccessObject.initialize(
			(success) => {
				ActiveRecordObject.get(
					DAOTables.Bookmarks,
					callback,
					BookmarkDAO.fromObject
				);
			}
		);
	}

	/**
	 * Sorts all bookmarks by desc number of views and asc title
	 * @param {Action<IList<BookmarkDAO>>} callback Callback with sorted bookmark list
	 */
	static sortByViewsDescThenByTitleAsc(callback : Action<IList<BookmarkDAO>>) : void {
		var request : StringBuffer;

		request = new StringBuffer('SELECT * FROM ' + DAOTables.Bookmarks + ' ');
		request.append('ORDER BY views DESC, title ASC');

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

	//endregion Public Methods
	
	//endregion Methods
}
