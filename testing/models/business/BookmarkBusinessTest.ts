/// <reference path="../../test_dependencies.ts" />

/**
 * Tests BookmarkBusiness implementation
 */
class BookmarkBusinessTest extends UnitTestClass {
	private _business : BookmarkBusiness;

	constructor() {
		super();

		DataAccessObject.setDatabaseName('yimello-test');

		this._business = new BookmarkBusiness();
	}

	setUp() : void { }

	tearDown() : void {	}

	/**
	 * Tests createFromURL method
	 */
	BookmarkBusinessCreateFromURLTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var url : string = 'http://google.fr';

				// Act
				this._business.createFromURL(
					url,
					(outcome) => {
						// Assert
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(url, outcome.getURL());
						this.areIdentical('Google', outcome.getTitle());

						DataAccessObject.clean((success) => UnitTestClass.done());
					}
				);
			}
		);
	}

	/**
	 * Tests bindTags method
	 */
	BookmarkBusinessBindTagsTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var bookmark : BookmarkDAO;
				var t1 : TagDAO, t2 : TagDAO;
				
				bookmark = new BookmarkDAO();
				t1 = new TagDAO();
				t2 = new TagDAO();

				bookmark.add(
					(outcome) => {
						bookmark = outcome;
						t1.add(
							(outcome) => {
								t1 = outcome;
								t2.add(
									(outcome) => {
										// Act
										var tags : IList<TagDAO>;

										t2 = outcome;
										
										tags = new ArrayList<TagDAO>();
										tags.add(t1);
										tags.add(t2);

										this._business.bindTags(
											bookmark,
											tags,
											(success) => {
												// Assert
												this.isTrue(success);

												ActiveRecordObject.get(
													DAOTables.TagBookmark,
													(outcome) => {
														var r1 : any, r2 : any;
														this.isTrue(TSObject.exists(outcome));

														this.areIdentical(2, outcome.getLength());
														r1 = outcome.getAt(0);
														r2 = outcome.getAt(1);

														this.areIdentical(t1.getId(), r1.tag_id);
														this.areIdentical(bookmark.getId(), r1.bookmark_id);
														this.areIdentical(t2.getId(), r2.tag_id);
														this.areIdentical(bookmark.getId(), r2.bookmark_id);

														DataAccessObject.clean((success) => UnitTestClass.done());
													}
												);
											}
										);
									}
								);
							}
						);
					}
				);
			}
		);
	}

	/**
	 * Tests delete method
	 */
	BookmarkBusinessDeleteTest() : void {
		UnitTestClass.queue(
			() => {
				var bookmark : BookmarkDAO = new BookmarkDAO();

				bookmark.setTitle('test');

				bookmark.add(
					(outcome) => {
						// Bind some random tags to current bookmark
						var data1 : IList<any>, data2 : IList<any>;

						bookmark = outcome;
						data1 = new ArrayList<any>();
						data1.add('1');
						data1.add(bookmark.getId());
						data2 = new ArrayList<any>();
						data2.add('2');
						data2.add(bookmark.getId());

						ActiveRecordObject.insert(
							DAOTables.TagBookmark,
							data1,
							(success) => {
								ActiveRecordObject.insert(
									DAOTables.TagBookmark,
									data2,
									(success) => {
										this._business.delete(
											bookmark,
											(success) => {
												this.isTrue(success);

												BookmarkDAO.get(
													(outcome) => {
														this.areIdentical(0, outcome.getLength());

														ActiveRecordObject.get(
															DAOTables.TagBookmark,
															(outcome) => {
																this.areIdentical(0, outcome.getLength());

																DataAccessObject.clean((success) => UnitTestClass.done());
															}
														);
													}
												);
											}
										);
									}
								);
							}
						);
					}
				);
			}
		);
	}

	/**
	 * Tests SortByTitleAscForTag method
	 */
	BookmarkBusinessSortByTitleAscForTagTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b1 : BookmarkDAO, b2 : BookmarkDAO, b3 : BookmarkDAO;
				var t1 : TagDAO, t2 : TagDAO;

				b1 = new BookmarkDAO();
				b1.setTitle('B');
				b2 = new BookmarkDAO();
				b2.setTitle('A');
				b3 = new BookmarkDAO();
				b3.setTitle('C');

				t1 = new TagDAO();
				t1.setLabel('a tag');
				t2 = new TagDAO();
				t2.setLabel('another tag');

				// First add bookmarks and tags
				b1.add(
					(outcome) => {
						b1 = outcome;
						b2.add(
							(outcome) => {
								b2 = outcome;
								b3.add(									
									(outcome) => {
										b3 = outcome;
										t1.add(
											(outcome) => {
												t1 = outcome;
												t2.add(
													(outcome) => {
														var data : IList<any>;

														t2 = outcome;
														data = new ArrayList<any>();
														data.add(t1.getId());
														data.add(b1.getId());

														// Then bind some tags to bookmarks
														ActiveRecordObject.insert(
															DAOTables.TagBookmark,
															data,
															(success) => {
																var data : IList<any> = new ArrayList<any>();

																data.add(t1.getId());
																data.add(b2.getId());

																ActiveRecordObject.insert(
																	DAOTables.TagBookmark,
																	data,
																	(success) => {
																		var data : IList<any> = new ArrayList<any>();

																		data.add(t2.getId());
																		data.add(b3.getId());

																		ActiveRecordObject.insert(
																			DAOTables.TagBookmark,
																			data,
																			(success) => {
																				// Act
																				this._business.sortByTitleAscForTag(
																					t1,
																					(outcome) => {
																						// Assert
																						this.isTrue(TSObject.exists(outcome));

																						this.areIdentical(2, outcome.getLength());
																						this.areIdentical(b2.getId(), outcome.getAt(0).getId());
																						this.areIdentical(b2.getTitle(), outcome.getAt(0).getTitle());
																						this.areIdentical(b1.getId(), outcome.getAt(1).getId());
																						this.areIdentical(b1.getTitle(), outcome.getAt(1).getTitle());

																						DataAccessObject.clean((success) => UnitTestClass.done());
																					}
																				);
																			}
																		);
																	}
																);
															}
														);
													}
												);
											}
										);
									}
								);
							}
						);
					}
				);
			}
		);
	}

	/**
	 * Tests add method
	 */
	BookmarkBusinessAddTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b : BookmarkDAO;
				var disarmedURL : string = 'http://google.fr';
				var disarmedTitle : string = '&lt;script&gt;Google&lt;/script&gt;';
				var disarmedDescription : string = '&lt;p&gt;Trying to break down your app&lt;/p&gt;';

				b = new BookmarkDAO();
				b
					.setURL('http://google.fr')
					.setTitle('<script>Google</script>')
					.setDescription('<p>Trying to break down your app</p>');

				// Act
				this._business.add(
					b,
					(outcome) => {
						// Assert
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(disarmedURL, outcome.getURL());
						this.areIdentical(disarmedTitle, outcome.getTitle());
						this.areIdentical(disarmedDescription, outcome.getDescription());

						BookmarkDAO.get(
							(outcome) => {
								this.isTrue(TSObject.exists(outcome));
								this.areIdentical(1, outcome.getLength());
								this.areIdentical(disarmedURL, outcome.getAt(0).getURL());
								this.areIdentical(disarmedTitle, outcome.getAt(0).getTitle());
								this.areIdentical(disarmedDescription, outcome.getAt(0).getDescription());

								DataAccessObject.clean((success) => UnitTestClass.done());
							}
						);
					}
				);
			}
		);
	}

	/**
	 * Tests add method for an invalid URL
	 */
	BookmarkBusinessAddInvalidURLTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b : BookmarkDAO;

				b = new BookmarkDAO();
				b.setURL('foobar');

				// Act
				Log.inform('An error about invalid url will occur below this message');
				this._business.add(
					b,
					(outcome) => {
						// Assert
						this.isTrue(outcome === null);

						BookmarkDAO.get(
							(outcome) => {
								this.isTrue(TSObject.exists(outcome));
								this.areIdentical(0, outcome.getLength());

								DataAccessObject.clean((success) => UnitTestClass.done());
							}
						);
					}
				);
			}
		);
	}
}

UnitTestClass.handle(new BookmarkBusinessTest());
