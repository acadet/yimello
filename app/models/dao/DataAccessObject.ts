/// <reference path="../../dependencies.ts" />

class DataAccessObject extends TSObject {
	//region Fields
	
	private _id : string;
	private static _initialized : boolean = false;
	private static _dbName : string = 'yimello';

	//endregion Fields
	
	//region Constructors

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

	static setDatabaseName(value : string) : void {
		DataAccessObject._dbName = value;
	}

	static initialize(callback : Action<boolean>) : void {
		var dao : DataAccessObject;

		if (DataAccessObject._initialized) {
			callback(true);
			return;
		}

		dao = new DataAccessObject();

		dao.initialize(callback);
	}

	initialize(callback : Action<boolean>) : void {
		if (!DataAccessObject._initialized) {
			var tagRequest : StringBuffer;
			var bookmarkRequest : StringBuffer;
			var tagBookmarkRequest : StringBuffer;
			var config : ActiveRecordConfig =
			new ActiveRecordConfig(
				DataAccessObject._dbName
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

	static clean(callback : Action<boolean> = null) : void {
		if (!DataAccessObject._initialized) {
			Log.error(new DAOException('Unable to clean db: db has not been initialized'));
			if (callback !== null) {
				callback(false);
			}
			return;
		}

		ActiveRecordObject.executeSQL(
			'DROP TABLE ' + DAOTables.Bookmarks,
			(outcome) => {
				ActiveRecordObject.executeSQL(
					'DROP TABLE ' + DAOTables.Tags,
					(outcome) => {
						ActiveRecordObject.executeSQL(
							'DROP TABLE ' + DAOTables.TagBookmark,
							(outcome) => {
								DataAccessObject._initialized = false;
								if (callback !== null) {
									callback(true);
								}
							}
						);
					}
				);
			}
		);
	}

	//endregion Public Methods
	
	//endregion Methods
}
