/// <reference path="../../dependencies.ts" />

class BookmarkDAO extends DataAccessObject {
	//region Fields
	
	private _url : string;
	private _title : string;
	private _description : string;

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private static _fromObject(obj : any) : BookmarkDAO {
		var b : BookmarkDAO = new BookmarkDAO();

		b.setId(obj.id);
		b.setURL(obj.url);
		b.setTitle(obj.title);
		b.setDescription(obj.description);

		return b;
	}

	//endregion Private Methods
	
	//region Public Methods
	
	getURL() : string {
		return this._url;
	}

	setURL(u : string) : BookmarkDAO {
		this._url = u;
		return this;
	}

	getTitle() : string {
		return this._title;
	}

	setTitle(t : string) : BookmarkDAO {
		this._title = t;
		return this;
	}

	getDescription() : string {
		return this._description;
	}

	setDescription(d : string) : BookmarkDAO {
		this._description = d;
		return this;
	}

	toList() : IList<any> {
		var l : IList<any> = new ArrayList<any>();

		l.add(this.getId());
		l.add(this.getURL());
		l.add(this.getTitle());
		l.add(this.getDescription());

		return l;
	}

	add(callback : Action<BookmarkDAO> = null) : void {
		var l : IList<any> = new ArrayList<any>();
		var id : string = Guid.newGuid();

		l.add(id);
		l.add(this.getURL());
		l.add(this.getTitle());
		l.add(this.getDescription());

		this.initialize(
			(b) => {
				var f : Action<boolean>;
				var bookmark : BookmarkDAO;

				if (callback !== null && !b) {
					callback(null);
					return;
				}

				bookmark = new BookmarkDAO();
				bookmark.setId(id);
				bookmark.setURL(this.getURL());
				bookmark.setTitle(this.getTitle());
				bookmark.setDescription(this.getDescription());

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

	// TODO : test
	update(callback : Action<boolean> = null) : void {
		var dict : IDictionary<string, any>;
		var selector : Pair<string, string>;

		dict = new Dictionary<string, any>();
		selector = new Pair<string, string>('id', this.getId());

		dict.add('title', this.getTitle());
		dict.add('url', this.getURL());
		dict.add('description', this.getDescription());

		ActiveRecordObject.update(DAOTables.Bookmarks, selector, dict, callback);
	}

	delete(callback : Action<boolean> = null) : void {
		this.initialize(
			(success) => {
				if (TSObject.exists(this.getId())) {
					ActiveRecordObject.delete(
						DAOTables.Bookmarks,
						new Pair<string, any>('id', this.getId()),
						(b) => {
							if (callback !== null) {
								callback(b);
							}
						}
					);
				} else {
					Log.error(new DAOException('Unable to delete: an id must be specify'));
					if (callback !== null) {
						callback(false);
					}
				}
			}
		);
	}

	static get(callback : Action<IList<BookmarkDAO>>) : void {
		DataAccessObject.initialize(
			(success) => {
				ActiveRecordObject.get<BookmarkDAO>(
					DAOTables.Bookmarks,
					callback,
					BookmarkDAO._fromObject
				);
			}
		);
	}

	//endregion Public Methods
	
	//endregion Methods
}
