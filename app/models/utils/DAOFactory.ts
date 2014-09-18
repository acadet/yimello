/// <reference path="../../dependencies.ts" />

class DAOFactory {
	//region Fields

	private static _aro : IActiveRecordObject;

	private static _bookmark : IBookmarkDAO;

	private static _tag : ITagDAO;
	
	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	static _init(callback : Action0) : void {
		var tagRequest : StringBuffer;
		var bookmarkRequest : StringBuffer;
		var tagBookmarkRequest : StringBuffer;
		var config : ActiveRecordConfig;

		if (TSObject.exists(DAOFactory._aro)) {
			return callback();
		}

		config = new ActiveRecordConfig(
			'yimello',
			'1.0',
			50 * 1024 * 1024
		);

		// Create tag table
		tagRequest = new StringBuffer('CREATE TABLE IF NOT EXISTS ');
		tagRequest.append(DAOTables.Tags + ' (');
		tagRequest.append('id VARCHAR(36) NOT NULL, ');
		tagRequest.append('label VARCHAR(255) NOT NULL, ');
		tagRequest.append('PRIMARY KEY (id, label))');

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

		DataAccessObject._aro = AROFactory.build(config);

		DataAccessObject._aro.executeSQL(
			tagRequest.toString(),
			(o) => {
				DataAccessObject._aro.executeSQL(
					bookmarkRequest.toString(),
					(o) => {
						DataAccessObject._aro.executeSQL(
							tagBookmarkRequest.toString(),
							(o) => {
								DAOFactory._initialized = true;
								callback();
							}
						);
					}
				);
			}
		);
	}
	
	//endregion Private Methods
	
	//region Public Methods

	static buildBookmark(callback : Action<IBookmarkDAO>) : void {
		DAOFactory._init(
			() => {
				if (!TSObject.exists(DAOFactory._bookmark)) {
					DAOFactory._bookmark = new BookmarkDAO(DataAccessObject._aro);
				}
				callback(DAOFactory._bookmark);
			}
		);
	}

	static buildTag(callback : Action<ITagDAO>) : void {
		DAOFactory._init(
			() => {
				if (!TSObject.exists(DAOFactory._tag)) {
					DAOFactory._tag = new TagDAO(DataAccessObject._aro);
				}
				callback(DAOFactory._tag);
			}
		);
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
