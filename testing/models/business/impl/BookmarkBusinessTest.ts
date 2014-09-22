/// <reference path="../../../test_dependencies.ts" />

class BookmarkBusinessTest extends UnitTestClass {
	private _dao : Mocks.DAO.BookmarkDAO;
	private _business : BookmarkBusiness;

	private _setUp() : void {
		this._dao = new Mocks.DAO.BookmarkDAO();
		this._business = new BookmarkBusiness(this._dao);
	}

	private _tearDown() : void {
		this._dao = null;
		this._business = null;
	}

	BookmarkBusinessConstructorTest() : void {
		// Arrange
		var dao : IBookmarkDAO;
		var outcome : BookmarkBusiness;

		dao = new Mocks.DAO.BookmarkDAO();
	
		// Act
		outcome = new BookmarkBusiness(dao);
	
		// Assert
		this.isTrue(TSObject.exists(outcome));
	}

	//region EngineBookmark

	BookmarkBusinessEngineBookmarkTest() : void {
		// Arrange
		var b : Bookmark;

		this._setUp();
	
		b = new Bookmark();
		b
			.setId('  <foo ')
			.setTitle(' >>foo  ')
			.setURL(' http://google.fr"  ')
			.setDescription(' <<barbar ');

		// Act
		this._business.engineBookmark(b);
	
		// Assert
		this.isTrue(TSObject.exists(b));
		this.areIdentical('&lt;foo', b.getId());
		this.areIdentical('&gt;&gt;foo', b.getTitle());
		this.areIdentical('http://google.fr&quot;', b.getURL());
		this.areIdentical('&lt;&lt;barbar', b.getDescription());

		this._tearDown();
	}

	BookmarkBusinessEngineBookmarkNoTitleTest() : void {
		// Arrange
		var b : Bookmark;

		this._setUp();
		b = new Bookmark().setURL('>>foo  ');
	
		// Act
		this._business.engineBookmark(b);
	
		// Assert
		this.areIdentical('&gt;&gt;foo', b.getTitle());

		this._tearDown();
	}

	BookmarkBusinessEngineBookmarkEmptyTitleTest() : void {
		// Arrange
		var b : Bookmark;

		this._setUp();
		b = new Bookmark().setURL('>>foo  ').setTitle('');
	
		// Act
		this._business.engineBookmark(b);
	
		// Assert
		this.areIdentical('&gt;&gt;foo', b.getTitle());

		this._tearDown();
	}

	BookmarkBusinessEngineBookmarkNoDescriptionTest() : void {
		// Arrange
		var b : Bookmark;

		this._setUp();

		b = new Bookmark();
	
		// Act
		this._business.engineBookmark(b);
	
		// Assert
		this.areIdentical('', b.getDescription());

		this._tearDown();
	}

	//endregion EngineBookmark

	BookmarkBusinessAddTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b : Bookmark;

				this._setUp();

				b = new Bookmark();
				b.setTitle('> foo ').setURL('http://google.fr');
				this._dao.setAddOutcome(b);

				// Act
				this._business.add(
					b,
					(outcome) => {
						// Assert
						this.areIdentical(1, this._dao.addTimes());
						this.areIdentical(b, this._dao.addArgs()[0]);
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(b, outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	BookmarkBusinessAddBadURLTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b : Bookmark;

				this._setUp();

				b = new Bookmark();
				b.setTitle('> foo ').setURL('foo');
				this._dao.setAddOutcome(b);

				// Act
				this._business.add(
					b,
					(outcome) => { this.fail(); },
					(error) => {
						this.isTrue(TSObject.exists(error));
						
						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	// BookmarkBusinessCreateFromURLTest() : void {
	// 	UnitTestClass.queue(
	// 		() => {
	// 			// Arrange
	// 			this._setUp();

	// 		}
	// 	);
	// }
}

UnitTestClass.handle(new BookmarkBusinessTest());

// /**
//  * Tests BookmarkBusiness implementation
//  */
// class BookmarkBusinessTest extends UnitTestClass {
// 	private _business : BookmarkBusiness;

// 	constructor() {
// 		super();

// 		DataAccessObject.setDatabaseName('yimello-test');

// 		this._business = new BookmarkBusiness();
// 	}

// 	setUp() : void { }

// 	tearDown() : void {	}

// 	/**
// 	 * Tests createFromURL method
// 	 */
// 	BookmarkBusinessCreateFromURLTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var url : string = 'http://google.fr';

// 				// Act
// 				this._business.createFromURL(
// 					url,
// 					(outcome) => {
// 						// Assert
// 						this.isTrue(TSObject.exists(outcome));
// 						this.areIdentical(url, outcome.getURL());
// 						this.areIdentical('Google', outcome.getTitle());

// 						DataAccessObject.clean((success) => UnitTestClass.done());
// 					}
// 				);
// 			}
// 		);
// 	}

// 	/**
// 	 * Tests bindTags method
// 	 */
// 	BookmarkBusinessBindTagsTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var bookmark : BookmarkDAO;
// 				var t1 : TagDAO, t2 : TagDAO;
				
// 				bookmark = new BookmarkDAO();
// 				t1 = new TagDAO();
// 				t1.setLabel('foo');
// 				t2 = new TagDAO();
// 				t2.setLabel('foobar');

// 				bookmark.add(
// 					(outcome) => {
// 						bookmark = outcome;
// 						t1.add(
// 							(outcome) => {
// 								t1 = outcome;
// 								t2.add(
// 									(outcome) => {
// 										// Act
// 										var tags : IList<TagDAO>;

// 										t2 = outcome;
										
// 										tags = new ArrayList<TagDAO>();
// 										tags.add(t1);
// 										tags.add(t2);

// 										this._business.bindTags(
// 											bookmark,
// 											tags,
// 											(success) => {
// 												// Assert
// 												this.isTrue(success);

// 												ActiveRecordObject.get(
// 													DAOTables.TagBookmark,
// 													(outcome) => {
// 														var r1 : any, r2 : any;
// 														this.isTrue(TSObject.exists(outcome));

// 														this.areIdentical(2, outcome.getLength());
// 														r1 = outcome.getAt(0);
// 														r2 = outcome.getAt(1);

// 														this.areIdentical(t1.getId(), r1.tag_id);
// 														this.areIdentical(bookmark.getId(), r1.bookmark_id);
// 														this.areIdentical(t2.getId(), r2.tag_id);
// 														this.areIdentical(bookmark.getId(), r2.bookmark_id);

// 														DataAccessObject.clean((success) => UnitTestClass.done());
// 													}
// 												);
// 											}
// 										);
// 									}
// 								);
// 							}
// 						);
// 					}
// 				);
// 			}
// 		);
// 	}

// 	BookmarkBusinessUpdateTagBindingTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var b : BookmarkDAO;
// 				var t1 : TagDAO, t2 : TagDAO, t3 : TagDAO;

// 				b = new BookmarkDAO();
// 				b.setTitle('foo');
// 				t1 = new TagDAO();
// 				t1.setLabel('bar');
// 				t2 = new TagDAO();
// 				t2.setLabel('foobar');
// 				t3 = new TagDAO();
// 				t3.setLabel('foobarbar');

// 				b.add(
// 					(outcome) => {
// 						b = outcome;
// 						t1.add(
// 							(outcome) => {
// 								t1 = outcome;
// 								t2.add(
// 									(outcome) => {
// 										t2 = outcome;
// 										t3.add(
// 											(outcome) => {
// 												var oldTags : IList<TagDAO>;

// 												t3 = outcome;
// 												oldTags = new ArrayList<TagDAO>();
// 												oldTags.add(t1);
// 												oldTags.add(t2);

// 												this._business.bindTags(
// 													b,
// 													oldTags,
// 													(success) => {
// 														var newTags : IList<TagDAO>;
// 														newTags = new ArrayList<TagDAO>();
// 														newTags.add(t1);
// 														newTags.add(t3);

// 														// Act
// 														this._business.updateTagBinding(
// 															b,
// 															newTags,
// 															(success) => {
// 																// Assert
// 																this.isTrue(success);

// 																ActiveRecordObject.get(
// 																	DAOTables.TagBookmark,
// 																	(outcome) => {
// 																		var o1 : any, o2 : any;
// 																		this.areIdentical(2, outcome.getLength());

// 																		o1 = outcome.getAt(0);
// 																		o2 = outcome.getAt(1);
// 																		this.areIdentical(b.getId(), o1.bookmark_id);
// 																		this.areIdentical(b.getId(), o2.bookmark_id);

// 																		if (o1.tag_id === t1.getId()) {
// 																			this.areIdentical(t3.getId(), o2.tag_id);
// 																		} else if (o1.tag_id === t3.getId()) {
// 																			this.areIdentical(t1.getId(), o2.tag_id);
// 																		} else {
// 																			this.fail();
// 																		}

// 																		DataAccessObject.clean((s) => UnitTestClass.done());
// 																	}
// 																);
// 															}
// 														);
// 													}
// 												);
// 											}
// 										);
// 									}
// 								);
// 							}
// 						);
// 					}
// 				);
// 			}
// 		);
// 	}

// 	/**
// 	 * Tests delete method
// 	 */
// 	BookmarkBusinessDeleteTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				var bookmark : BookmarkDAO = new BookmarkDAO();

// 				bookmark.setTitle('test');

// 				bookmark.add(
// 					(outcome) => {
// 						// Bind some random tags to current bookmark
// 						var data1 : IList<any>, data2 : IList<any>;

// 						bookmark = outcome;
// 						data1 = new ArrayList<any>();
// 						data1.add('1');
// 						data1.add(bookmark.getId());
// 						data2 = new ArrayList<any>();
// 						data2.add('2');
// 						data2.add(bookmark.getId());

// 						ActiveRecordObject.insert(
// 							DAOTables.TagBookmark,
// 							data1,
// 							(success) => {
// 								ActiveRecordObject.insert(
// 									DAOTables.TagBookmark,
// 									data2,
// 									(success) => {
// 										this._business.delete(
// 											bookmark,
// 											(success) => {
// 												this.isTrue(success);

// 												BookmarkDAO.get(
// 													(outcome) => {
// 														this.areIdentical(0, outcome.getLength());

// 														ActiveRecordObject.get(
// 															DAOTables.TagBookmark,
// 															(outcome) => {
// 																this.areIdentical(0, outcome.getLength());

// 																DataAccessObject.clean((success) => UnitTestClass.done());
// 															}
// 														);
// 													}
// 												);
// 											}
// 										);
// 									}
// 								);
// 							}
// 						);
// 					}
// 				);
// 			}
// 		);
// 	}

// 	/**
// 	 * Tests SortByTitleAscForTag method
// 	 */
// 	BookmarkBusinessSortByTitleAscForTagTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var b1 : BookmarkDAO, b2 : BookmarkDAO, b3 : BookmarkDAO;
// 				var t1 : TagDAO, t2 : TagDAO;

// 				b1 = new BookmarkDAO();
// 				b1.setTitle('B');
// 				b2 = new BookmarkDAO();
// 				b2.setTitle('A');
// 				b3 = new BookmarkDAO();
// 				b3.setTitle('C');

// 				t1 = new TagDAO();
// 				t1.setLabel('a tag');
// 				t2 = new TagDAO();
// 				t2.setLabel('another tag');

// 				// First add bookmarks and tags
// 				b1.add(
// 					(outcome) => {
// 						b1 = outcome;
// 						b2.add(
// 							(outcome) => {
// 								b2 = outcome;
// 								b3.add(									
// 									(outcome) => {
// 										b3 = outcome;
// 										t1.add(
// 											(outcome) => {
// 												t1 = outcome;
// 												t2.add(
// 													(outcome) => {
// 														var data : IList<any>;

// 														t2 = outcome;
// 														data = new ArrayList<any>();
// 														data.add(t1.getId());
// 														data.add(b1.getId());

// 														// Then bind some tags to bookmarks
// 														ActiveRecordObject.insert(
// 															DAOTables.TagBookmark,
// 															data,
// 															(success) => {
// 																var data : IList<any> = new ArrayList<any>();

// 																data.add(t1.getId());
// 																data.add(b2.getId());

// 																ActiveRecordObject.insert(
// 																	DAOTables.TagBookmark,
// 																	data,
// 																	(success) => {
// 																		var data : IList<any> = new ArrayList<any>();

// 																		data.add(t2.getId());
// 																		data.add(b3.getId());

// 																		ActiveRecordObject.insert(
// 																			DAOTables.TagBookmark,
// 																			data,
// 																			(success) => {
// 																				// Act
// 																				this._business.sortByTitleAscForTag(
// 																					t1,
// 																					(outcome) => {
// 																						// Assert
// 																						this.isTrue(TSObject.exists(outcome));

// 																						this.areIdentical(2, outcome.getLength());
// 																						this.areIdentical(b2.getId(), outcome.getAt(0).getId());
// 																						this.areIdentical(b2.getTitle(), outcome.getAt(0).getTitle());
// 																						this.areIdentical(b1.getId(), outcome.getAt(1).getId());
// 																						this.areIdentical(b1.getTitle(), outcome.getAt(1).getTitle());

// 																						DataAccessObject.clean((success) => UnitTestClass.done());
// 																					}
// 																				);
// 																			}
// 																		);
// 																	}
// 																);
// 															}
// 														);
// 													}
// 												);
// 											}
// 										);
// 									}
// 								);
// 							}
// 						);
// 					}
// 				);
// 			}
// 		);
// 	}

// 	/**
// 	 * Tests add method
// 	 */
// 	BookmarkBusinessAddTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var b : BookmarkDAO;
// 				var disarmedURL : string = 'http://google.fr';
// 				var disarmedTitle : string = '&lt;script&gt;Google&lt;/script&gt;';
// 				var disarmedDescription : string = '&lt;p&gt;Trying to break down your app&lt;/p&gt;';

// 				b = new BookmarkDAO();
// 				b
// 					.setURL('http://google.fr')
// 					.setTitle('<script>Google</script>')
// 					.setDescription('<p>Trying to break down your app</p>');

// 				// Act
// 				this._business.add(
// 					b,
// 					(outcome) => {
// 						// Assert
// 						this.isTrue(TSObject.exists(outcome));
// 						this.areIdentical(disarmedURL, outcome.getURL());
// 						this.areIdentical(disarmedTitle, outcome.getTitle());
// 						this.areIdentical(disarmedDescription, outcome.getDescription());

// 						BookmarkDAO.get(
// 							(outcome) => {
// 								this.isTrue(TSObject.exists(outcome));
// 								this.areIdentical(1, outcome.getLength());
// 								this.areIdentical(disarmedURL, outcome.getAt(0).getURL());
// 								this.areIdentical(disarmedTitle, outcome.getAt(0).getTitle());
// 								this.areIdentical(disarmedDescription, outcome.getAt(0).getDescription());

// 								DataAccessObject.clean((success) => UnitTestClass.done());
// 							}
// 						);
// 					}
// 				);
// 			}
// 		);
// 	}

// 	/**
// 	 * Tests add method for an invalid URL
// 	 */
// 	BookmarkBusinessAddInvalidURLTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var b : BookmarkDAO;

// 				b = new BookmarkDAO();
// 				b.setURL('foobar');

// 				// Act
// 				Log.inform('An error about invalid url will occur below this message');
// 				this._business.add(
// 					b,
// 					(outcome) => {
// 						// Assert
// 						this.isTrue(outcome === null);

// 						BookmarkDAO.get(
// 							(outcome) => {
// 								this.isTrue(TSObject.exists(outcome));
// 								this.areIdentical(0, outcome.getLength());

// 								DataAccessObject.clean((success) => UnitTestClass.done());
// 							}
// 						);
// 					}
// 				);
// 			}
// 		);
// 	}

// 	BookmarkBusinessUpdateTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var b : BookmarkDAO;
// 				b = new BookmarkDAO();
// 				b.setTitle('foo');

// 				b.add(
// 					(outcome) => {
// 						b = outcome;

// 						b.setURL('http://google.fr');
// 						b.setTitle('<script>Harmful</script>');
// 						b.setDescription('<script>Harmful</script>');

// 						// Act
// 						this._business.update(
// 							b,
// 							(outcome) => {
// 								// Assert
// 								this.isTrue(TSObject.exists(outcome));
// 								this.areIdentical('&lt;script&gt;Harmful&lt;/script&gt;', outcome.getTitle());
// 								this.areIdentical('&lt;script&gt;Harmful&lt;/script&gt;', outcome.getDescription());

// 								DataAccessObject.clean(s => UnitTestClass.done());
// 							}
// 						);
// 					}
// 				);
// 			}
// 		);
// 	}

// 	BookmarkBusinessUpdateInvalidURLTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var b : BookmarkDAO;
// 				b = new BookmarkDAO();
// 				b.setTitle('foo');

// 				b.add(
// 					(outcome) => {
// 						b = outcome;

// 						b.setURL('foobar');
// 						b.setTitle('<script>Harmful</script>');
// 						b.setDescription('<script>Harmful</script>');
// 						Log.inform('An error about invalid url will occur below this message');

// 						// Act
// 						this._business.update(
// 							b,
// 							(outcome) => {
// 								// Assert
// 								this.areIdentical(null, outcome);

// 								BookmarkDAO.get(
// 									(outcome) => {
// 										this.areIdentical(1, outcome.getLength());
// 										this.areIdentical('foo', outcome.getAt(0).getTitle());

// 										DataAccessObject.clean(s => UnitTestClass.done());
// 									}
// 								);
// 							}
// 						);
// 					}
// 				);
// 			}
// 		);
// 	}

// 	BookmarkSortByTitleWithBoundTagsTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var b1 : BookmarkDAO, b2 : BookmarkDAO, b3 : BookmarkDAO;
// 				var t1 : TagDAO, t2 : TagDAO;

// 				b1 = new BookmarkDAO();
// 				b1.setTitle('foo');
// 				b2 = new BookmarkDAO();
// 				b2.setTitle('bar');
// 				b3 = new BookmarkDAO();
// 				b3.setTitle('foobar');
// 				t1 = new TagDAO();
// 				t1.setLabel('aaa');
// 				t2 = new TagDAO();
// 				t2.setLabel('bbb');

// 				b1.add(
// 					(outcome) => {
// 						b1 = outcome;
// 						b2.add(
// 							(outcome) => {
// 								b2 = outcome;
// 								b3.add(
// 									(outcome) => {
// 										b3 = outcome;
// 										t1.add(
// 											(outcome) => {
// 												t1 = outcome;
// 												t2.add(
// 													(outcome) => {
// 														var data : IList<any> = new ArrayList<any>();
// 														t2 = outcome;

// 														data.add(t1.getId());
// 														data.add(b1.getId());
// 														ActiveRecordObject.insert(
// 															DAOTables.TagBookmark,
// 															data,
// 															(success) => {
// 																data = new ArrayList<any>();
// 																data.add(t2.getId())
// 																data.add(b1.getId());

// 																ActiveRecordObject.insert(
// 																	DAOTables.TagBookmark,
// 																	data,
// 																	(success) => {
// 																		data = new ArrayList<any>();
// 																		data.add(t2.getId());
// 																		data.add(b2.getId());

// 																		ActiveRecordObject.insert(
// 																			DAOTables.TagBookmark,
// 																			data,
// 																			(success) => {
// 																				// Act
// 																				this._business.sortByTitleWithBoundTags(
// 																					(list) => {
// 																						// Assert
// 																						var p : Pair<BookmarkDAO, IList<TagDAO>>;
// 																						var l : IList<TagDAO>;

// 																						this.isTrue(TSObject.exists(list));
// 																						this.areIdentical(3, list.getLength());

// 																						p = list.getAt(0);
// 																						this.isTrue(TSObject.exists(p));
// 																						this.areIdentical(b2.getId(), p.getFirst().getId());
// 																						l = p.getSecond();
// 																						this.areIdentical(1, l.getLength());
// 																						this.areIdentical(t2.getId(), l.getAt(0).getId());

// 																						p = list.getAt(1);
// 																						this.isTrue(TSObject.exists(p));
// 																						this.areIdentical(b1.getId(), p.getFirst().getId());
// 																						l = p.getSecond();
// 																						this.areIdentical(2, l.getLength());
// 																						this.areIdentical(t1.getId(), l.getAt(0).getId());
// 																						this.areIdentical(t2.getId(), l.getAt(1).getId());

// 																						p = list.getAt(2);
// 																						this.isTrue(TSObject.exists(p));
// 																						this.areIdentical(b3.getId(), p.getFirst().getId());
// 																						l = p.getSecond();
// 																						this.areIdentical(0, l.getLength());

// 																						DataAccessObject.clean(s => UnitTestClass.done());
// 																					}
// 																				);
// 																			}
// 																		);
// 																	}
// 																);
// 															}
// 														);
// 													}
// 												);
// 											}
// 										);
// 									}
// 								);
// 							}
// 						);
// 					}
// 				);
// 			}
// 		);
// 	}
// }

// UnitTestClass.handle(new BookmarkBusinessTest());
