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

	private _disarmBookmark(bookmark : BookmarkDAO) : void {
		bookmark.setURL(SecurityHelper.disarm(bookmark.getURL()));
		bookmark.setTitle(SecurityHelper.disarm(bookmark.getTitle()));
		bookmark.setDescription(SecurityHelper.disarm(bookmark.getDescription()));
	}

	private _addInScoredList(target : ScoredBookmarkDAO, list : IList<ScoredBookmarkDAO>) : void {
		for (var i = 0; i < list.getLength(); i++) {
			var e : ScoredBookmarkDAO = list.getAt(i);

			if (target.getScore() > e.getScore()) {
				list.insertAt(i, target);
				return;
			}
		}

		list.add(target);
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

		DataAccessObject.initialize(
			(success) => {
				this._bindTags(bookmark, tags, 0, callback);
			}
		);
	}

	updateTagBinding(bookmark : BookmarkDAO, tags : IList<TagDAO>, callback : Action<boolean> = null) {
		var request : StringBuffer;

		if (!TSObject.exists(bookmark)) {
			Log.error(new BusinessException('Unable to update tag binding: bookmark is null'));
			if (callback !== null) {
				callback(false);
			}
			return;
		}

		if (!TSObject.exists(tags)) {
			Log.error(new BusinessException('Unable to update tag binding: tag list is null'));
			if (callback !== null) {
				callback(false);
			}
			return;
		}

		if (tags.getLength() < 1) {
			Log.warn('No update was done: list is empty');
			if (callback !== null) {
				callback(true);
			}
			return;
		}

		request = new StringBuffer('DELETE FROM ' + DAOTables.TagBookmark + ' ');
		request.append('WHERE bookmark_id = "' + bookmark.getId() + '"');

		DataAccessObject.initialize(
			(success) => {
				ActiveRecordObject.executeSQL(
					request.toString(),
					(success) => {
						if (!success) {
							Log.error(new BusinessException('Failed to remove entries from DB'));
							if (callback !== null) {
								callback(false);
							}
							return;
						}

						this.bindTags(bookmark, tags, callback);
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

		this._disarmBookmark(bookmark);

		bookmark.add(
			(outcome) => {
				if (callback !== null) {
					callback(outcome);
				}
			}
		);
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

	sortByTitleWithBoundTags(callback : Action<IList<Pair<BookmarkDAO, IList<TagDAO>>>>) : void {
		var request : StringBuffer;

		request = new StringBuffer('SELECT bk.id AS id, bk.title AS title, bk.description AS description, ');
		request.append('bk.views AS views, outcome.tagId AS tagId, outcome.tagLabel AS tagLabel ');
		request.append('FROM ' + DAOTables.Bookmarks + ' AS bk ');
		request.append('LEFT JOIN (');
		request.append('SELECT t.id AS tagId, t.label AS tagLabel, tbk.bookmark_id AS bkId FROM ');
		request.append(DAOTables.Tags + ' AS t INNER JOIN ');
		request.append(DAOTables.TagBookmark + ' AS tbk ON ');
		request.append('t.id = tbk.tag_id) AS outcome ');
		request.append('ON bk.id = outcome.bkId ');
		request.append('ORDER BY bk.title ASC, outcome.tagLabel ASC');

		DataAccessObject.initialize(
			(success) => {
				ActiveRecordObject.executeSQL(
					request.toString(),
					(set) => {
						var pairList : IList<Pair<BookmarkDAO, IList<TagDAO>>>;
						var bk : BookmarkDAO = null;
						var l : IList<TagDAO>;
						var outcome : SQLRowSet;

						pairList = new ArrayList<Pair<BookmarkDAO, IList<TagDAO>>>();

						if (set === null) {
							callback(pairList);
							return;
						}

						outcome = set.getRows();

						for (var i = 0; i < outcome.getLength(); i++) {
							var t : TagDAO;
							var item : any = outcome.item(i);

							if (bk === null || bk.getId() !== item.id) {
								if (bk !== null) {
									var p : Pair<BookmarkDAO, IList<TagDAO>>;
									p = new Pair<BookmarkDAO, IList<TagDAO>>(bk, l);
									pairList.add(p);
								}

								bk = new BookmarkDAO();
								bk.setId(item.id);
								bk.setTitle(item.title);
								bk.setDescription(item.description);
								bk.setViews(item.views);

								l = new ArrayList<TagDAO>();
							}

							if (TSObject.exists(item.tagId)) {
								t = new TagDAO();
								t.setId(item.tagId);
								t.setLabel(item.tagLabel);
								l.add(t);
							}
						}

						if (bk !== null) {
							var p : Pair<BookmarkDAO, IList<TagDAO>>;
							p = new Pair<BookmarkDAO, IList<TagDAO>>(bk, l);
							pairList.add(p);
						}

						callback(pairList);
					}
				);
			}
		);
	}

	// TODO : test
	search(input : string, callback : Action<IList<ScoredBookmarkDAO>>) : void {
		this.sortByTitleWithBoundTags(
			(outcome) => {
				var max : number;
				var list : IList<ScoredBookmarkDAO>;
				var keywords : IList<string>;

				max = 0;
				list = new ArrayList<ScoredBookmarkDAO>();
				keywords = StringHelper.extractWords(input);

				outcome.forEach(
					(pair) => {
						var sbk : ScoredBookmarkDAO;
						var currentScore : number;
						var bk : BookmarkDAO = pair.getFirst();
						var tagList : IList<TagDAO> = pair.getSecond();

						sbk = new ScoredBookmarkDAO();
						bk.hydrateBookmark(sbk);
						currentScore = 0;

						keywords.forEach(
							(key) => {
								var r : Regex = new Regex(key, [RegexFlags.Insensitive]);

								if (r.test(sbk.getTitle())) {
									currentScore += 20;
								}
								if (r.test(sbk.getDescription())) {
									currentScore += 2;
								}

								tagList.forEach(
									(tag) => {
										if (r.test(tag.getLabel())) {
											currentScore += 10;
										}
									}
								);
							}
						);

						max = (currentScore > max) ? currentScore : max;
						sbk.setScore(currentScore);
						this._addInScoredList(sbk, list);
					}
				);

				list.forEach(
					(e) => {
						e.setScore(e.getScore() / max * 100);
					}
				);

				callback(list);
			}
		);
	}

	//endregion Public Methods
	
	//endregion Methods
}
