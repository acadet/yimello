/// <reference path="../../dependencies.ts" />

/**
 * Data access object root. 
 * All entities must inherit from this class
 */
class DataAccessObject extends TSObject {
	//region Fields
	
	/**
	 * All entities have an id
	 */
	private _id : string;

	/**
	 * Signals if DB has been initialized
	 */
	private static _initialized : boolean = false;

	/**
	 * Current DB name
	 */
	private static _dbName : string = 'yimello';

	//endregion Fields
	
	//region Constructors

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	//endregion Private Methods

	//region Public Methods
	
	/**
	 * Gets id
	 * @return {string} [description]
	 */
	getId() : string {
		return this._id;
	}

	/**
	 * Sets id
	 * @param  {string}           id [description]
	 * @return {DataAccessObject}    [description]
	 */
	setId(id : string) : DataAccessObject {
		this._id = id;
		return this;
	}

	/**
	 * Sets current DB name
	 * @param {string} value [description]
	 */
	static setDatabaseName(value : string) : void {
		DataAccessObject._dbName = value;
	}

	/**
	 * Initializes database. Must be called before using ActiveRecordObject
	 * or the similar non static function
	 * @param {Action<boolean>} callback Callback with a success arg
	 */
	static initialize(callback : Action<boolean>) : void {
		var dao : DataAccessObject;

		if (DataAccessObject._initialized) {
			callback(true);
			return;
		}

		dao = new DataAccessObject();

		dao.initialize(callback);
	}

	/**
	 * Initializes database. Must be called before using ActiveRecordObject
	 * or the similar static function
	 * @param {Action<boolean>} callback Callback with a success arg
	 */
	initialize(callback : Action<boolean>) : void {
		if (!DataAccessObject._initialized) {
			var tagRequest : StringBuffer;
			var bookmarkRequest : StringBuffer;
			var tagBookmarkRequest : StringBuffer;
			var config : ActiveRecordConfig =
			new ActiveRecordConfig(
				DataAccessObject._dbName
			);

			// First init ARO and create an endpoint with DB
			ActiveRecordObject.init(config);

			// Create tag table
			tagRequest = new StringBuffer('CREATE TABLE IF NOT EXISTS ');
			tagRequest.append(DAOTables.Tags + ' (');
			tagRequest.append('id VARCHAR(36) PRIMARY KEY NOT NULL, ');
			tagRequest.append('label VARCHAR(255))');

			// Create bookmark table
			bookmarkRequest = new StringBuffer('CREATE TABLE IF NOT EXISTS ');
			bookmarkRequest.append(DAOTables.Bookmarks + ' (');
			bookmarkRequest.append('id VARCHAR(36) PRIMARY KEY NOT NULL, ');
			bookmarkRequest.append('url VARCHAR(255), ');
			bookmarkRequest.append('title VARCHAR(255), ');
			bookmarkRequest.append('description TEXT(300), ');
			bookmarkRequest.append('views INT)');

			// Create tag bookmark relation table
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

	/**
	 * Cleans whole DB. BE CAREFUL!!
	 * Deletes all entries and tables
	 * @param {Action<boolean> = null} callback Callback with a success arg
	 */
	static clean(callback : Action<boolean> = null) : void {
		ActiveRecordObject.executeSQL(
			'DROP TABLE IF EXISTS ' + DAOTables.Bookmarks,
			(outcome) => {
				ActiveRecordObject.executeSQL(
					'DROP TABLE IF EXISTS ' + DAOTables.Tags,
					(outcome) => {
						ActiveRecordObject.executeSQL(
							'DROP TABLE IF EXISTS ' + DAOTables.TagBookmark,
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
