/// <reference path="../../dependencies.ts" />

class DataAccessObject extends TSObject {
	//region Fields
	
	private _id : string;
	private static _initialized : boolean = false;
	private _dbName : string;

	//endregion Fields
	
	//region Constructors
	
	constructor(dbName : string = 'yimello') {
		super();

		this._dbName = dbName;
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	//endregion Private Methods

	//region Public Methods
	
	getId() : string {
		return this._id;
	}

	setId(id : string) : DataAccessObject {
		this._id = id;
		return this;
	}

	initialize(callback : Action<boolean>) : void {
		if (!DataAccessObject._initialized) {
			var tagRequest : StringBuffer;
			var bookmarkRequest : StringBuffer;
			var tagBookmarkRequest : StringBuffer;
			var config : ActiveRecordConfig =
			new ActiveRecordConfig(
				this._dbName
			);

			ActiveRecordObject.init(config);

			tagRequest = new StringBuffer('CREATE TABLE IF NOT EXISTS ');
			tagRequest.append(DAOTables.Tags + ' (');
			tagRequest.append('id VARCHAR(36) PRIMARY KEY NOT NULL, ');
			tagRequest.append('label VARCHAR(255))');

			bookmarkRequest = new StringBuffer('CREATE TABLE IF NOT EXISTS ');
			bookmarkRequest.append(DAOTables.Bookmarks + ' (');
			bookmarkRequest.append('id VARCHAR(36) PRIMARY KEY NOT NULL, ');
			bookmarkRequest.append('url VARCHAR(255), ');
			bookmarkRequest.append('title VARCHAR(255), ');
			bookmarkRequest.append('description TEXT(300))');

			tagBookmarkRequest = new StringBuffer('CREATE TABLE IF NOT EXISTS ');
			tagBookmarkRequest.append(DAOTables.TagBookmark + ' (');
			tagBookmarkRequest.append('tag_id VARCHAR(36) NOT NULL, ');
			tagBookmarkRequest.append('bookmark_id VARCHAR(36) NOT NULL, ');
			tagBookmarkRequest.append('PRIMARY KEY (tag_id, bookmark_id))');

			ActiveRecordObject.executeSQL(
				tagRequest.toString(),
				(r) => {
					ActiveRecordObject.executeSQL(
						bookmarkRequest.toString(),
						(r) => {
							ActiveRecordObject.executeSQL(
								tagBookmarkRequest.toString(),
								(r) => {
									callback(true);
								}
							);
						}
					);
				}
			);

			DataAccessObject._initialized = true;
		} else {
			callback(true);
		}
	}

	//endregion Public Methods
	
	//endregion Methods
}
