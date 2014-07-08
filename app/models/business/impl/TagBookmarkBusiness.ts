/// <reference path="../../../dependencies.ts" />

class TagBookmarkBusiness implements ITagBookmarkBusiness {
	//region Fields
	
	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private _browseDLNode(
		node : DOMElement,
		currentTags : IList<TagDAO>,
		collection : IList<Pair<BookmarkDAO, IList<TagDAO>>>)
		: void
	{
		var i : number;
		var collectedTags : IList<TagDAO>;

		node
			.find('> DT > A')
			.forEach(
				(a) => {
					var b : BookmarkDAO;

					b = new BookmarkDAO();
					b.setURL(a.getAttribute('href'));
					b.setTitle(a.getText());

					collection.add(new Pair<BookmarkDAO, IList<TagDAO>>(b, currentTags));
				}
			);

		collectedTags = new ArrayList<TagDAO>();
		node
			.find('> DT > H3')
			.forEach(
				(e) => {
					var t : TagDAO;
					t = new TagDAO();
					t.setLabel(e.getText());
					collectedTags.add(t);
				}
			);

		i = 0;
		node
			.find('> DT > DL')
			.forEach(
				(e) => {
					var l : IList<TagDAO>;

					l = currentTags.clone();
					l.add(collectedTags.getAt(i));
					this._browseDLNode(e, l, collection);
					i++;
				}
			);
	}

	private _addRecursiveBookmark(
		index : number,
		coll : IList<Pair<BookmarkDAO, IList<TagDAO>>>,
		callback : Action0 = null,
		errorHandler : Action<string> = null) : void {
		var p : Pair<BookmarkDAO, IList<TagDAO>>;

		if (index === coll.getLength()) {
			if (callback !== null) {
				callback();
			}
			return;
		}

		p = coll.getAt(index);
		BusinessMediator
			.getTagBusiness()
			.merge(
				p.getSecond(),
				(outcome) => {
					var tags : IList<TagDAO> = outcome;

					BusinessMediator
						.getBookmarkBusiness()
						.add(
							p.getFirst(),
							(outcome) => {
								this.bindTags(
									outcome,
									tags,
									() => {
										this._addRecursiveBookmark(index + 1, coll, callback, errorHandler);
									},
									errorHandler
								);
							},
							errorHandler
						);
				},
				errorHandler
			);
	}

	/**
	 * Recursive function for binding a list of tags to a bookmark
	 * @param {BookmarkDAO}        bookmark [description]
	 * @param {IList<TagDAO>}      tags     [description]
	 * @param {number}             index    Current index in tag list
	 * @param {Action<boolean> =        null}        callback [description]
	 */
	private _bindTags(
		bookmark : BookmarkDAO,
		tags : IList<TagDAO>,
		index : number,
		callback : Action0 = null,
		errorHandler : Action<string> = null) : void {
		var t : TagDAO;
		var data : IList<any>;

		if (index === tags.getLength()) {
			// Browsing has ended, trigger the callback
			if (callback !== null) {
				callback();
			}
			return;
		}

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
					if (errorHandler !== null) {
						errorHandler('An internal error has occured. Please try again');
					}
				} else {
					this._bindTags(bookmark, tags, index + 1, callback);
				}
			}
		);
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

	private _addCouple(currentIndex : number, list : Array<any>, callback : Action0 = null) : void {
		var e : any;
		var data : IList<any>;

		if (currentIndex === list.length) {
			if (callback !== null) {
				callback();
			}
		}

		e = list[currentIndex];
		data = new ArrayList<any>();
		data.add(e['tag_id']);
		data.add(e['bookmark_id']);
		DataAccessObject.initialize(
			(success) => {
				ActiveRecordObject.insert(
					DAOTables.TagBookmark,
					data,
					(success) => {
						this._addCouple(currentIndex + 1, list, callback);
					}
				);
			}
		);
	}

	private _addBKList(currentIndex : number, list : Array<any>, callback : Action0 = null) : void {
		var e : any;
		var data : IList<any>;

		if (currentIndex === list.length) {
			if (callback !== null) {
				callback();
			}
		}

		e = list[currentIndex];
		data = BookmarkDAO.fromObject(e).toList();
		DataAccessObject.initialize(
			(success) => {
				ActiveRecordObject.insert(
					DAOTables.Bookmarks,
					data,
					(success) => {
						this._addBKList(currentIndex + 1, list, callback);
					}
				);
			}
		);
		
	}

	private _addTagList(currentIndex : number, list : Array<any>, callback : Action0 = null) : void {
		var e : any;
		var data : IList<any>;

		if (currentIndex === list.length) {
			if (callback !== null) {
				callback();
			}
		}

		e = list[currentIndex];
		data = TagDAO.fromObject(e).toList();
		DataAccessObject.initialize(
			(success) => {
				ActiveRecordObject.insert(
					DAOTables.Tags,
					data,
					(success) => {
						this._addTagList(currentIndex + 1, list, callback);
					}
				);
			}
		);
	}

	//endregion Private Methods
	
	//region Public Methods
	
	sortTagsByLabelAscForBookmark(
		bookmark : BookmarkDAO,
		callback : Action<IList<TagDAO>>,
		errorHandler : Action<string> = null) : void {
		var request : StringBuffer;

		if (!TSObject.exists(bookmark)) {
			Log.error(new BusinessException('Unable to sort tags: provided bookmark is null'));
			if (errorHandler !== null) {
				errorHandler('An internal error has occured. Please try again');
			}
			return;
		}

		request = new StringBuffer('SELECT * FROM ' + DAOTables.Tags + ' WHERE id IN (');
		request.append('SELECT tag_id FROM ' + DAOTables.TagBookmark + ' WHERE ');
		request.append('bookmark_id = "' + bookmark.getId() + '") ');
		request.append('ORDER BY label ASC');

		DataAccessObject.initialize(
			(success) => {
				ActiveRecordObject.executeSQL(
					request.toString(),
					(outcome) => {
						callback(ActiveRecordHelper.getListFromSQLResultSet(outcome, TagDAO.fromObject));
					}
				);
			}
		);
	}

	bindTags(
		bookmark : BookmarkDAO,
		tags : IList<TagDAO>,
		callback : Action0 = null,
		errorHandler : Action<string> = null) : void {

		if (!TSObject.exists(bookmark)) {
			Log.error(new BusinessException('Unable to bind: provided bookmark is null'));
			if (errorHandler !== null) {
				errorHandler('An internal error has occured. Please try again');
			}
			return;
		}

		if (!TSObject.exists(tags)) {
			Log.error(new BusinessException('Unable to bind: provided tag list is null'));
			if (errorHandler !== null) {
				errorHandler('An internal error has occured. Please try again');
			}
			return;
		}

		if (tags.getLength() < 1) {
			Log.warn('No tags bound: provided list is empty');
			if (callback !== null) {
				callback();
			}
			return;
		}

		DataAccessObject.initialize(
			(success) => {
				this._bindTags(bookmark, tags, 0, callback, errorHandler);
			}
		);
	}

	updateTagBinding(
		bookmark : BookmarkDAO,
		tags : IList<TagDAO>,
		callback : Action0 = null,
		errorHandler : Action<string> = null) : void {
		var request : StringBuffer;

		if (!TSObject.exists(bookmark)) {
			Log.error(new BusinessException('Unable to bind: provided bookmark is null'));
			if (errorHandler !== null) {
				errorHandler('An internal error has occured. Please try again');
			}
			return;
		}

		if (!TSObject.exists(tags)) {
			Log.error(new BusinessException('Unable to bind: provided tag list is null'));
			if (errorHandler !== null) {
				errorHandler('An internal error has occured. Please try again');
			}
			return;
		}

		if (tags.getLength() < 1) {
			Log.warn('No tags bound: provided list is empty');
			if (callback !== null) {
				callback();
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
							if (errorHandler !== null) {
								errorHandler('An internal error has occured. Please try again');
							}
							return;
						}

						this.bindTags(bookmark, tags, callback, errorHandler);
					}
				);
			}
		);
	}

	sortBookmarksByTitleAscForTag(
		tag : TagDAO,
		callback : Action<IList<BookmarkDAO>>,
		errorHandler : Action<string> = null) : void {
		var request : StringBuffer;

		if (!TSObject.exists(tag)) {
			Log.error(new BusinessException('Unable to sort bookmarks: provided tag is null'));
			if (errorHandler !== null) {
				errorHandler('An internal error has occured. Please try again');
			}
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

	// TODO : test
	sortBookmarksByTitleWithBoundTags(callback : Action<IList<Pair<BookmarkDAO, IList<TagDAO>>>>) : void {
		var request : StringBuffer;

		request = new StringBuffer('SELECT bk.id AS id, bk.url as url, bk.title AS title, bk.description AS description, ');
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
								bk.setURL(item.url);
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
	importFromBrowser(dataTransfer : any, callback : Action0 = null, errorHandler : Action<string> = null) : void {
		var reader : FileReader;

		if (dataTransfer.files.length < 1) {
			Log.error(new BusinessException('No import: there is no file'));
			if (errorHandler !== null) {
				errorHandler('An error has occured while importing your file.');
			}
			return;
		}

		// TODO : add more tests to file reading
		reader = new FileReader();
		reader.onload =
			(e) => {
				var dlRoot : DOMElement;
				var coll : IList<Pair<BookmarkDAO, IList<TagDAO>>>;
				var tags : IList<TagDAO>;
				var defaultTag : TagDAO;

				defaultTag = new TagDAO();
				defaultTag.setLabel('Imported');
				tags = new ArrayList<TagDAO>();
				tags.add(defaultTag);

				dlRoot =
					DOMElement
						.fromString('<ROOT>' + reader.result + '</ROOT>')
						.findSingle('> DL');
				coll = new ArrayList<Pair<BookmarkDAO, IList<TagDAO>>>();
				this._browseDLNode(dlRoot, tags, coll);
				this._addRecursiveBookmark(
					0,
					coll,
					callback,
					errorHandler
				);
			};
		reader.readAsText(dataTransfer.files[0]);
	}

	// TODO : test
	search(input : string, callback : Action<IList<ScoredBookmarkDAO>>) : void {
		this.sortBookmarksByTitleWithBoundTags(
			(outcome) => {
				var max : number;
				var list : IList<ScoredBookmarkDAO>;
				var keywords : IList<string>;

				max = 0.0;
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
						currentScore = 0.0;

						keywords.forEach(
							(key) => {
								var r : Regex = new Regex(key, [RegexFlags.Insensitive]);

								if (r.test(sbk.getTitle())) {
									currentScore += 20.0;
								}
								if (r.test(sbk.getDescription())) {
									currentScore += 2.0;
								}

								tagList.forEach(
									(tag) => {
										if (r.test(tag.getLabel())) {
											currentScore += 10.0;
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

				if (max !== 0) {
					list.forEach(
						(e) => {
							e.setScore(e.getScore() / max);
						}
					);
				}
				callback(list);
			}
		);
	}

	// TODO : test
	backup(callback : Action0 = null, errorHandler : Action<string> = null) : void {
		var bks : IList<BookmarkDAO>;
		var tags : IList<TagDAO>;
		var tgBk : IList<any>;

		BookmarkDAO.get(
			(outcome) => {
				if (outcome === null) {
					Log.warn('No bookmarks to backup');
					bks = new ArrayList<BookmarkDAO>();
				} else {
					bks = outcome;
				}

				TagDAO.get(
					(outcome) => {
						if (outcome === null) {
							Log.warn('No tags to backup');
							tags = new ArrayList<TagDAO>();
						} else {
							tags = outcome;
						}

						ActiveRecordObject.get(
							DAOTables.TagBookmark,
							(outcome) => {
								var result : any = {};

								if (outcome === null) {
									Log.warn('No relations to backup');
									tgBk = new ArrayList<any>();
								} else {
									tgBk = outcome;
								}

								result[DAOTables.Tags] = new Array<any>();
								tags.forEach(e => result[DAOTables.Tags].push(e.toJSON()));
								result[DAOTables.Bookmarks] = new Array<any>();
								bks.forEach(e => result[DAOTables.Bookmarks].push(e.toJSON()));
								result[DAOTables.TagBookmark] = new Array<any>();
								tgBk.forEach(e => result[DAOTables.TagBookmark].push(e));

								FileAPI.writeFile(
									"backup.json",
									JSON.stringify(result),
									(error) => {
										if (error) {
											Log.error(new BusinessException(error));
											if (errorHandler !== null) {
												errorHandler('An internal error has occured. Please try again');
											}
										} else {
											if (callback !== null) {
												callback();
											}
										}
									}
								);
							}
						);
					}
				);
			}
		);
	}

	// TODO : test
	importBackup(dataTransfer : any, callback : Action0 = null, errorHandler : Action<string> = null) : void {
		var reader : FileReader;

		if (dataTransfer.files.length < 1) {
			Log.error(new BusinessException('Unable to import: no file provided'));
			if (errorHandler !== null) {
				errorHandler('An error has occured while importing your file.');
			}
			return;
		}

		// TODO : add more tests on reader
		reader = new FileReader();
		reader.onload =
			(e) => {
				var data : any;
				var rawTags : Array<any>, rawBks : Array<any>, tgBks : Array<any>;

				data = JSON.parse(reader.result);
				rawTags = data[DAOTables.Tags];
				rawBks = data[DAOTables.Bookmarks];
				tgBks = data[DAOTables.TagBookmark];

				this._addTagList(
					0,
					rawTags,
					() => {
						this._addBKList(
							0,
							rawBks,
							() => {
								this._addCouple(
									0,
									tgBks,
									() => {
										if (callback !== null) {
											callback();
										}
									}
								);
							}
						);
					}
				);
			};
		
		reader.readAsText(dataTransfer.files[0]);
	}

	//endregion Public Methods
	
	//endregion Methods
}
