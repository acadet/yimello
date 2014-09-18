/// <reference path="../../../dependencies.ts" />

class TagBookmarkBusiness implements ITagBookmarkBusiness {
	//region Fields

	private _args : TagBookmarkBusinessArgs;
	
	//endregion Fields
	
	//region Constructors

	constructor(args : TagBookmarkBusinessArgs) {
		this._args = args;
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private _browseDLNode(
		node : DOMElement,
		currentTags : IList<Tag>,
		collection : IList<Pair<Bookmark, IList<Tag>>>)
		: void
	{
		var i : number;
		var collectedTags : IList<Tag>;

		node
			.find('> DT > A')
			.forEach(
				(a) => {
					var b : Bookmark;

					b = new Bookmark();
					b.setURL(a.getAttribute('href'));
					b.setTitle(a.getText());

					collection.add(new Pair<Bookmark, IList<Tag>>(b, currentTags));
				}
			);

		collectedTags = new ArrayList<Tag>();
		node
			.find('> DT > H3')
			.forEach(
				(e) => {
					var t : Tag;
					t = new Tag();
					t.setLabel(e.getText());
					collectedTags.add(t);
				}
			);

		i = 0;
		node
			.find('> DT > DL')
			.forEach(
				(e) => {
					var l : IList<Tag>;

					l = currentTags.clone();
					l.add(collectedTags.getAt(i));
					this._browseDLNode(e, l, collection);
					i++;
				}
			);
	}

	private _addRecursiveBookmark(
		index : number,
		coll : IList<Pair<Bookmark, IList<Tag>>>,
		callback? : Action0,
		errorHandler? : Action<string>) : void {
		var p : Pair<Bookmark, IList<Tag>>;

		callback = ActionHelper.getValueOrDefault(callback);
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (index === coll.getLength()) {
			callback();
			return;
		}

		p = coll.getAt(index);
		this
			._args
			.getTagBusiness()
			.merge(
				p.getSecond(),
				(outcome) => {
					var tags : IList<Tag> = outcome;

					this
						._args
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
	 * @param {Bookmark}        bookmark [description]
	 * @param {IList<Tag>}      tags     [description]
	 * @param {number}             index    Current index in tag list
	 * @param {Action<boolean>}        callback [description]
	 */
	private _bindTags(
		bookmark : Bookmark,
		tags : IList<Tag>,
		index : number,
		callback? : Action0,
		errorHandler? : Action<string>) : void {
		var t : Tag;

		callback = ActionHelper.getValueOrDefault(callback);
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (index === tags.getLength()) {
			// Browsing has ended, trigger the callback
			callback();
			return;
		}

		t = tags.getAt(index);

		// Insert new couple into DB
		this
			._args
			.getTagBookmarkDAO()
			.addRelation(
				t,
				bookmark,
				(success) => {
					if (!success) {
						errorHandler('Ouch! An internal error has occured. Please try again');
					} else {
						this._bindTags(bookmark, tags, index + 1, callback);
					}
				}
			);
	}

	private _addInScoredList(target : ScoredBookmark, list : IList<ScoredBookmark>) : void {
		for (var i = 0; i < list.getLength(); i++) {
			var e : ScoredBookmark = list.getAt(i);

			if (target.getScore() > e.getScore()) {
				list.insertAt(i, target);
				return;
			}
		}

		list.add(target);
	}

	private _addCouple(currentIndex : number, list : Array<any>, callback? : Action0) : void {
		var e : any;
		var t : Tag;
		var bk : Bookmark;

		callback = ActionHelper.getValueOrDefault(callback);

		if (currentIndex === list.length) {
			callback();
			return;
		}

		e = list[currentIndex];
		t = new Tag();
		t.setId(e.tag_id);
		bk = new Bookmark();
		bk.setId(e.bookmark_id);

		this
			._args
			.getTagBookmarkDAO()
			.addRelation(
				t,
				bk,
				(success) => {
					this._addCouple(currentIndex + 1, list, callback);
				}
			);
	}

	private _addBKList(currentIndex : number, list : Array<any>, callback? : Action0) : void {
		var bookmark : Bookmark;

		callback = ActionHelper.getValueOrDefault(callback);

		if (currentIndex === list.length) {
			callback();
			return;
		}

		bookmark = Bookmark.fromObject(list[currentIndex]);
		this._args.getBookmarkBusiness().engineBookmark(bookmark);

		this
			._args
			.getBookmarkDAO()
			.addRaw(
				bookmark,
				(success) => {
					this._addBKList(currentIndex + 1, list, callback);
				}
			);
	}

	private _addTagList(currentIndex : number, list : Array<any>, callback? : Action0) : void {
		var tag : Tag;

		callback = ActionHelper.getValueOrDefault(callback);

		if (currentIndex === list.length) {
			callback();
			return;
		}

		tag = TagDAO.fromObject(list[currentIndex]);
		this._args.getTagBusiness().engineTag(tag);

		this
			._args
			.getTagDAO()
			.addRaw(
				tag,
				(success) => {
					this._addTagList(currentIndex + 1, list, callback);
				}
			);
	}

	//endregion Private Methods
	
	//region Public Methods
	
	sortTagsByLabelAscForBookmark(
		bookmark : Bookmark,
		callback : Action<IList<Tag>>,
		errorHandler? : Action<string>) : void {

		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (!TSObject.exists(bookmark)) {
			Log.error(new BusinessException('Unable to sort tags: provided bookmark is null'));
			errorHandler('Ouch! An internal error has occured. Please try again');
			return;
		}

		this
			._args
			.getTagBookmarkDAO()
			.sortTagsByLabelAscForBookmark(
				bookmark,
				(outcome) => {
					if (TSObject.exists(outcome)) {
						callback(outcome);
					} else {
						Log.error(new BusinessException('Unable to sort tags: no outcome was returned'));
						errorHandler('Ouch! An internal error has occured. Please try again');
					}
				}
			);

		// request = new StringBuffer('SELECT * FROM ' + DAOTables.Tags + ' WHERE id IN (');
		// request.append('SELECT tag_id FROM ' + DAOTables.TagBookmark + ' WHERE ');
		// request.append('bookmark_id = "' + bookmark.getId() + '") ');
		// request.append('ORDER BY LOWER(label) ASC');

		// DataAccessObject.initialize(
		// 	(success) => {
		// 		ActiveRecordObject.executeSQL(
		// 			request.toString(),
		// 			(outcome) => {
		// 				callback(ActiveRecordHelper.getListFromSQLResultSet(outcome, TagDAO.fromObject));
		// 			}
		// 		);
		// 	}
		// );
	}

	bindTags(
		bookmark : BookmarkDAO,
		tags : IList<TagDAO>,
		callback : Action0 = null,
		errorHandler : Action<string> = null) : void {

		if (!TSObject.exists(bookmark)) {
			Log.error(new BusinessException('Unable to bind: provided bookmark is null'));
			if (errorHandler !== null) {
				errorHandler('Ouch! An internal error has occured. Please try again');
			}
			return;
		}

		if (!TSObject.exists(tags)) {
			Log.error(new BusinessException('Unable to bind: provided tag list is null'));
			if (errorHandler !== null) {
				errorHandler('Ouch! An internal error has occured. Please try again');
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
				errorHandler('Ouch! An internal error has occured. Please try again');
			}
			return;
		}

		if (!TSObject.exists(tags)) {
			Log.error(new BusinessException('Unable to bind: provided tag list is null'));
			if (errorHandler !== null) {
				errorHandler('Ouch! An internal error has occured. Please try again');
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
								errorHandler('Ouch! An internal error has occured. Please try again');
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
				errorHandler('Ouch! An internal error has occured. Please try again');
			}
			return;
		}

		// Avoid join, use in condition
		request = new StringBuffer('SELECT * FROM ' + DAOTables.Bookmarks + ' WHERE id IN ');
		request.append('(SELECT bookmark_id FROM ' + DAOTables.TagBookmark + ' ');
		request.append('WHERE tag_id = "' + tag.getId() + '") ');
		request.append('ORDER BY LOWER(title) ASC');

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
		request.append('ORDER BY LOWER(bk.title) ASC, LOWER(outcome.tagLabel) ASC');

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
				errorHandler('Ouch! An internal error has occured. Please try again');
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
	search(input : string, callback : Action<IList<Bookmark>>) : void {
		this.sortBookmarksByTitleWithBoundTags(
			(outcome) => {
				var max : number;
				var list : IList<ScoredBookmark>;
				var keywords : IList<string>;

				max = 0.0;
				list = new ArrayList<ScoredBookmark>();
				keywords = StringHelper.extractWords(input);

				outcome.forEach(
					(pair) => {
						var sbk : ScoredBookmark;
						var currentScore : number;
						var bk : Bookmark = pair.getFirst();
						var tagList : IList<Tag> = pair.getSecond();

						sbk = new ScoredBookmark();
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
												errorHandler('Ouch! An internal error has occured. Please try again');
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
				errorHandler('Whoops! An error has occured while importing your file. Please try again');
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
