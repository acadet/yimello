/// <reference path="../../../dependencies.ts" />

class TagBookmarkDAO extends DataAccessObject implements ITagBookmarkDAO {
	//region Fields
	
	//endregion Fields
	
	//region Constructors

	constructor(aro : IActiveRecordObject) {
		super(aro);
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _addMultipleTagRelations(
		currentIndex : number,
		bookmark : Bookmark,
		tags : IList<Tag>,
		callback? : Action<boolean>) : void {

		callback = ActionHelper.getValueOrDefault(callback);

		if (currentIndex === tags.getLength()) {
			callback(true);
			return;
		}

		this.addRelation(
			tags.getAt(currentIndex),
			bookmark,
			(success) => {
				if (success) {
					this._addMultipleTagRelations(currentIndex + 1, bookmark, tags, callback);
				} else {
					callback(false);
				}
			}
		);
	}
	
	//endregion Private Methods
	
	//region Public Methods

	addRelation(tag : Tag, bookmark : Bookmark, callback? : Action<boolean>) : void {
		var data : IList<any>;

		callback = ActionHelper.getValueOrDefault(callback);

		if (!TSObject.exists(tag.getId()) || tag.getId() === '') {
			Log.error(new DAOException('Unable to add relation: no id provided'));
			callback(false);
			return;
		}

		data = new ArrayList<any>();
		data.add(tag.getId());
		data.add(bookmark.getId());

		this
			.getARO()
			.insert(
				DAOTables.TagBookmark,
				data,
				callback
			);
	}

	addMultipleTagRelations(bookmark : Bookmark, tags : IList<Tag>, callback? : Action<boolean>) : void {
		callback = ActionHelper.getValueOrDefault(callback);

		if (!TSObject.exists(bookmark)) {
			Log.error(new DAOException('Unable to add multiple tag relations: no bookmark provided'));
			callback(false);
			return;
		}

		if (!TSObject.exists(tags)) {
			Log.error(new DAOException('Unable to add multiple tag relations: no tags provided'));
			callback(false);
			return;
		}

		if (tags.getLength() < 1) {
			Log.warn('No relations added, no tags were provided');
			callback(true);
			return;
		}

		this._addMultipleTagRelations(0, bookmark, tags, callback);
	}

	updateBookmarkRelations(bookmark : Bookmark, tags : IList<Tag>, callback? : Action<boolean>) : void {
		callback = ActionHelper.getValueOrDefault(callback);

		if (!TSObject.exists(bookmark)) {
			Log.error(new DAOException('Unable to update bookmark relations: no bookmark provided'));
			callback(false);
			return;
		}

		if (!TSObject.exists(tags)) {
			Log.error(new DAOException('Unable to update bookmark relations: no tags provided'));
			callback(false);
			return;
		}

		this.removeBookmarkRelations(
			bookmark,
			(success) => {
				if (!success) {
					Log.error(new DAOException('Unable to update bookmark relations: an error has occured when deleting'));
					callback(false);
					return;
				}

				this.addMultipleTagRelations(bookmark, tags, callback);
			}
		);
	}

	removeBookmarkRelations(bookmark : Bookmark, callback? : Action<boolean>) : void {
		var selector : KeyValuePair<string, any>;

		callback = ActionHelper.getValueOrDefault(callback);

		if (!TSObject.exists(bookmark)) {
			Log.error(new DAOException('Unable to remove bookmark relations: no bookmark provided'));
			callback(false);
			return;
		}

		selector = new KeyValuePair<string, any>('bookmark_id', bookmark.getId());
		this
			.getARO()
			.delete(
				DAOTables.TagBookmark,
				selector,
				(success) => {
					if (!success) {
						Log.error(new DAOException('Unable to remove bookmark relations: an error has occured when deleting'));
						callback(false);
					} else {
						callback(true);
					}
				}
			);
	}

	removeTagRelations(tag : Tag, callback? : Action<boolean>) : void {
		var selector : KeyValuePair<string, any>;

		callback = ActionHelper.getValueOrDefault(callback);

		if (!TSObject.exists(tag)) {
			Log.error(new DAOException('Unable to remove tag relations: no tag provided'));
			callback(false);
			return;
		}

		selector = new KeyValuePair<string, any>('tag_id', tag.getId());
		this
			.getARO()
			.delete(
				DAOTables.TagBookmark,
				selector,
				(success) => {
					if (!success) {
						Log.error(new DAOException('Unable to remove tag relations: an error has occured when deleting'));
						callback(false);
					} else {
						callback(true);
					}
				}
			);
	}

	getRaw(callback : Action<IList<any>>) : void {
		this
			.getARO()
			.get(
				DAOTables.TagBookmark,
				callback
			);
	}

	sortTagsByLabelAscForBookmark(bookmark : Bookmark, callback : Action<IList<Tag>>) : void {
		var request : StringBuffer;

		if (!TSObject.exists(bookmark)) {
			Log.error(new DAOException('Unable to sort tags: no bookmark provided'));
			callback(null);
			return;
		}

		request = new StringBuffer('SELECT * FROM ' + DAOTables.Tags + ' WHERE id IN (');
		request.append('SELECT tag_id FROM ' + DAOTables.TagBookmark + ' WHERE ');
		request.append('bookmark_id = "' + bookmark.getId() + '") ');
		request.append('ORDER BY LOWER(label) ASC');

		this
			.getARO()
			.executeSQL(
				request.toString(),
				(outcome) => {
					callback(ActiveRecordHelper.getListFromSQLResultSet(outcome, Tag.fromObject));
				}
			);
	}

	sortBookmarksByTitleAscForTag(tag : Tag, callback : Action<IList<Bookmark>>) : void {
		var request : StringBuffer;

		if (!TSObject.exists(tag)) {
			Log.error(new DAOException('Unable to sort bookmarks: no tag provided'));
			callback(null);
			return;
		}

		request = new StringBuffer('SELECT * FROM ' + DAOTables.Bookmarks + ' WHERE id IN ');
		request.append('(SELECT bookmark_id FROM ' + DAOTables.TagBookmark + ' ');
		request.append('WHERE tag_id = "' + tag.getId() + '") ');
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

	sortBookmarksByTitleAscWithBoundTagsByLabelAsc(callback : Action<IList<KeyValuePair<Bookmark, IList<Tag>>>>) : void {
		var request : StringBuffer;

		request = new StringBuffer('SELECT bk.id AS id, bk.url as url, bk.title AS title, bk.description AS description, ');
		request
			.append('bk.views AS views, outcome.tagId AS tagId, outcome.tagLabel AS tagLabel ')
			.append('FROM ' + DAOTables.Bookmarks + ' AS bk ')
			.append('LEFT JOIN (')
			.append('SELECT t.id AS tagId, t.label AS tagLabel, tbk.bookmark_id AS bkId FROM ')
			.append(DAOTables.Tags + ' AS t INNER JOIN ')
			.append(DAOTables.TagBookmark + ' AS tbk ON ')
			.append('t.id = tbk.tag_id) AS outcome ')
			.append('ON bk.id = outcome.bkId ')
			.append('ORDER BY LOWER(bk.title) ASC, LOWER(outcome.tagLabel) ASC');

		this
			.getARO()
			.executeSQL(
				request.toString(),
				(set) => {
					var pairList : IList<KeyValuePair<Bookmark, IList<Tag>>>;
					var bk : Bookmark = null;
					var l : IList<Tag>;
					var outcome : SQLRowSet;
					var p : KeyValuePair<Bookmark, IList<Tag>>;

					pairList = new ArrayList<KeyValuePair<Bookmark, IList<Tag>>>();

					if (!TSObject.exists(set)) {
						callback(pairList);
						return;
					}

					outcome = set.getRows();

					for (var i = 0; i < outcome.getLength(); i++) {
						var t : Tag;
						var item : any = outcome.item(i);

						if (bk === null || bk.getId() !== item.id) {
							if (bk !== null) {
								p = new KeyValuePair<Bookmark, IList<Tag>>(bk, l);
								pairList.add(p);
							}

							bk = new Bookmark();
							bk.setId(item.id);
							bk.setURL(item.url);
							bk.setTitle(item.title);
							bk.setDescription(item.description);
							bk.setViews(item.views);

							l = new ArrayList<Tag>();
						}

						if (TSObject.exists(item.tagId)) {
							t = new Tag();
							t.setId(item.tagId);
							t.setLabel(item.tagLabel);
							l.add(t);
						}
					}

					if (bk !== null) {
						p = new KeyValuePair<Bookmark, IList<Tag>>(bk, l);
						pairList.add(p);
					}

					callback(pairList);
				}
			);
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
