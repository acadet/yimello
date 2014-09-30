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

		callback = ActionHelper.getValueOrDefaultNoArgs(callback);
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

		callback = ActionHelper.getValueOrDefaultNoArgs(callback);

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

		callback = ActionHelper.getValueOrDefaultNoArgs(callback);

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

		callback = ActionHelper.getValueOrDefaultNoArgs(callback);

		if (currentIndex === list.length) {
			callback();
			return;
		}

		tag = Tag.fromObject(list[currentIndex]);
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
	}

	addMergeAndBind(bookmark : Bookmark, tags : IList<Tag>, callback? : Action0, errorHandler? : Action<string>) : void {
		this
			._args
			.getBookmarkBusiness()
			.add(
				bookmark,
				(outcome) => {
					var bk : Bookmark;

					bk = outcome;

					this
						._args
						.getTagBusiness()
						.merge(
							tags,
							(outcome) => {
								this.bindTags(bk, outcome, callback, errorHandler);
							},
							errorHandler
						);
				},
				errorHandler
			);
	}

	updateMergeAndBind(bookmark : Bookmark, tags : IList<Tag>, callback? : Action0, errorHandler? : Action<string>) : void {
		this
			._args
			.getBookmarkBusiness()
			.update(
				bookmark,
				(outcome) => {
					var bk : Bookmark;

					bk = outcome;

					this
						._args
						.getTagBusiness()
						.merge(
							tags,
							(outcome) => {
								this.updateTagBinding(bk, outcome, callback, errorHandler);
							},
							errorHandler
						);
				},
				errorHandler
			);
	}

	bindTags(
		bookmark : Bookmark,
		tags : IList<Tag>,
		callback? : Action0,
		errorHandler? : Action<string>) : void {

		callback = ActionHelper.getValueOrDefaultNoArgs(callback);
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (!TSObject.exists(bookmark)) {
			Log.error(new BusinessException('Unable to bind: provided bookmark is null'));
			errorHandler('Ouch! An internal error has occured. Please try again');
			return;
		}

		if (!TSObject.exists(tags)) {
			Log.error(new BusinessException('Unable to bind: provided tag list is null'));
			errorHandler('Ouch! An internal error has occured. Please try again');
			return;
		}

		if (tags.getLength() < 1) {
			Log.warn('No tags bound: provided list is empty');
			callback();
			return;
		}

		this
			._args
			.getTagBookmarkDAO()
			.addMultipleTagRelations(
				bookmark,
				tags,
				(success) => {
					if (success) {
						callback();
					} else {
						Log.error(new BusinessException('Unable to bind tags: an error has occured when adding relations'));
						errorHandler('Ouch! An internal error has occured. Please try again');
					}
				}
			);
	}

	updateTagBinding(
		bookmark : Bookmark,
		tags : IList<Tag>,
		callback? : Action0,
		errorHandler? : Action<string>) : void {

		callback = ActionHelper.getValueOrDefaultNoArgs(callback);
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (!TSObject.exists(bookmark)) {
			Log.error(new BusinessException('Unable to bind: provided bookmark is null'));
			errorHandler('Ouch! An internal error has occured. Please try again');
			return;
		}

		if (!TSObject.exists(tags)) {
			Log.error(new BusinessException('Unable to bind: provided tag list is null'));
			errorHandler('Ouch! An internal error has occured. Please try again');
			return;
		}

		if (tags.getLength() < 1) {
			Log.warn('No tags bound: provided list is empty');
			callback();
			return;
		}

		this
			._args
			.getTagBookmarkDAO()
			.updateBookmarkRelations(
				bookmark,
				tags,
				(success) => {
					if (success) {
						callback();
					} else {
						Log.error(new BusinessException('Unable to bind: an error occured when updating'));
						errorHandler('Ouch! An internal error has occured. Please try again');
					}
				}
			);
	}

	sortBookmarksByTitleAscForTag(
		tag : Tag,
		callback : Action<IList<Bookmark>>,
		errorHandler? : Action<string>) : void {
		
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (!TSObject.exists(tag)) {
			Log.error(new BusinessException('Unable to sort bookmarks: provided tag is null'));
			errorHandler('Ouch! An internal error has occured. Please try again');
			return;
		}

		this
			._args
			.getTagBookmarkDAO()
			.sortBookmarksByTitleAscForTag(
				tag,
				(outcome) => {
					if (TSObject.exists(outcome)) {
						callback(outcome);
					} else {
						Log.error(new BusinessException('Unable to sort bookmarks: an error has occured when sorting'));
						errorHandler('Ouch! An internal error has occured. Please try again');
					}
				}
			);
	}

	// TODO : test
	importFromBrowser(dataTransfer : any, callback? : Action0, errorHandler? : Action<string>) : void {
		var reader : FileReader;

		callback = ActionHelper.getValueOrDefaultNoArgs(callback);
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (dataTransfer.files.length < 1) {
			Log.error(new BusinessException('No import: there is no file'));
			errorHandler('Ouch! An internal error has occured. Please try again');
			return;
		}

		// TODO : add more tests to file reading
		reader = new FileReader();
		reader.onload =
			(e) => {
				var dlRoot : DOMElement;
				var coll : IList<Pair<Bookmark, IList<Tag>>>;
				var tags : IList<Tag>;
				var defaultTag : Tag;

				defaultTag = new Tag();
				defaultTag.setLabel('Imported');
				tags = new ArrayList<Tag>();
				tags.add(defaultTag);

				dlRoot =
					DOMElement
						.fromString('<ROOT>' + reader.result + '</ROOT>')
						.findSingle('> DL');
				coll = new ArrayList<Pair<Bookmark, IList<Tag>>>();
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
	search(input : string, callback : Action<IList<ScoredBookmark>>, errorHandler? : Action<string>) : void {
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		this
			._args
			.getTagBookmarkDAO()
			.sortBookmarksByTitleAscWithBoundTagsByLabelAsc(
				(outcome) => {
					var max : number;
					var list : IList<ScoredBookmark>;
					var keywords : IList<string>;

					if (!TSObject.exists(outcome)) {
						Log.error(new BusinessException('Unable to search: an error has occured when getting data'));
						errorHandler('Ouch! An internal error has occured. Please try again');
						return;
					}

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
							bk.hydrate(sbk);
							currentScore = 0.0;

							keywords.forEach(
								(key) => {
									var r : Regex = new Regex(key, [RegexFlags.Insensitive]);

									if (r.test(sbk.getTitle())) {
										currentScore += 20.0;
									}
									if (r.test(sbk.getURL())) {
										currentScore += 10.0;
									}
									if (r.test(sbk.getDescription())) {
										currentScore += 5.0;
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

	rawBackup(callback : Action<any>, errorHandler? : Action<string>) : void {
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		this
			._args
			.getBookmarkDAO()
			.get(
				(outcome) => {
					var bks : IList<Bookmark>;

					if (!TSObject.exists(outcome)) {
						Log.warn('No bookmarks to backup');
						bks = new ArrayList<Bookmark>();
					} else {
						bks = outcome;
					}

					this
						._args
						.getTagDAO()
						.get(
							(outcome) => {
								var tags : IList<Tag>;

								if (!TSObject.exists(outcome)) {
									Log.warn('No tags to backup');
									tags = new ArrayList<Tag>();
								} else {
									tags = outcome;
								}

								this
									._args
									.getTagBookmarkDAO()
									.getRaw(
										(outcome) => {
											var tgBk : IList<any>;
											var result : any = {};

											if (!TSObject.exists(outcome)) {
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

											callback(result);
										}
									);
							}
						);
				}
			);
	}

	// TODO : test
	backup(callback? : Action0, errorHandler? : Action<string>) : void {
		callback = ActionHelper.getValueOrDefaultNoArgs(callback);
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);
		
		this.rawBackup(
			(result) => {
				FileAPI.writeFile(
					"backup.json",
					JSON.stringify(result),
					(error) => {
						if (error) {
							Log.error(new BusinessException(error));
							errorHandler('Ouch! An internal error has occured. Please try again');
						} else {
							callback();
						}
					}
				);
			},
			errorHandler
		);
	}

	// TODO : test
	importBackup(dataTransfer : any, callback? : Action0, errorHandler? : Action<string>) : void {
		var reader : FileReader;

		callback = ActionHelper.getValueOrDefaultNoArgs(callback);
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (dataTransfer.files.length < 1) {
			Log.error(new BusinessException('Unable to import: no file provided'));
			errorHandler('Whoops! An error has occured while importing your file. Please try again');
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
										callback();
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
