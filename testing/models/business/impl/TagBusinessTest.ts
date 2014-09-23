/// <reference path="../../../test_dependencies.ts" />

class TagBusinessTest extends UnitTestClass {
	private _dao : Mocks.DAO.TagDAO;
	private _business : TagBusiness;

	private _setUp() : void {
		this._dao = new Mocks.DAO.TagDAO();
		this._business = new TagBusiness(this._dao);
	}

	private _tearDown() : void {
		this._dao = null;
		this._business = null;
	}

	TagBusinessConstructorTest() : void {
		// Arrange
		var dao : ITagDAO;
		var outcome : TagBusiness;

		dao = new Mocks.DAO.TagDAO();
	
		// Act
		outcome = new TagBusiness(dao);
	
		// Assert
		this.isTrue(TSObject.exists(outcome));
	}

	TagBusinessEngineTagTest() : void {
		// Arrange
		var t : Tag;

		this._setUp();

		t = new Tag().setId(' >> foo < ').setLabel('" bar   ');
	
		// Act
		this._business.engineTag(t);
	
		// Assert
		this.isTrue(TSObject.exists(t));
		this.areIdentical('&gt;&gt; foo &lt;', t.getId());
		this.areIdentical('&quot; bar', t.getLabel());

		this._tearDown();
	}

	//region isValueValid

	TagBusinessIsValueValidTest() : void {
		// Arrange
		var value : string;
		var isValid : boolean;

		this._setUp();

		value = '  foo  ';
	
		// Act
		isValid = this._business.isValueValid(value);
	
		// Assert
		this.isTrue(isValid);

		this._tearDown();
	}

	TagBusinessIsValueValidNullStringTest() : void {
		// Arrange
		var value : string;
		var isValid : boolean;

		this._setUp();

		value = undefined;
	
		// Act
		isValid = this._business.isValueValid(value);
	
		// Assert
		this.isFalse(isValid);

		this._tearDown();
	}

	TagBusinessIsValueValidEmptyStringTest() : void {
		// Arrange
		var value : string;
		var isValid : boolean;

		this._setUp();

		value = '    ';
	
		// Act
		isValid = this._business.isValueValid(value);
	
		// Assert
		this.isFalse(isValid);

		this._tearDown();
	}

	//endregion isValueValid

	TagBusinessIsAlreadyExistingTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				this._setUp();
				this._dao.setFindByLabelOutcome(null);

				// Act
				this._business.isAlreadyExisting(
					'  foo< ',
					(success) => {
						// Assert
						this.areIdentical(1, this._dao.findByLabelTimes());
						this.areIdentical('foo&lt;', this._dao.findByLabelArgs()[0]);
						this.isTrue(success);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBusinessAddTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var t : Tag;

				this._setUp();

				t = new Tag().setLabel('  > foo ');
				this._dao.setAddOutcome(t);

				// Act
				this._business.add(
					t,
					(outcome) => {
						// Assert
						this.areIdentical(1, this._dao.addTimes());
						this.areIdentical(t, this._dao.addArgs()[0]);
						this.areIdentical('&gt; foo', t.getLabel());
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(t, outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBusinessAddBadLabelTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var t : Tag;

				this._setUp();

				t = new Tag().setLabel('  ');
				this._dao.setAddOutcome(t);

				// Act
				this._business.add(
					t,
					(outcome) => {
						this.fail();
					},
					(error) => {
						// Assert
						this.areIdentical(0, this._dao.addTimes());
						this.isTrue(TSObject.exists(error));

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBusinessAddListTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var l : IList<Tag>;

				this._setUp();

				l = new ArrayList<Tag>();
				l.add(new Tag().setLabel(' foo'));
				l.add(new Tag().setLabel('bar  '));
				l.add(new Tag().setLabel('> foobar  '));

				this._dao.setAddOutcome(new Tag());

				// Act
				this._business.addList(
					l,
					(outcome) => {
						// Assert
						this.areIdentical(3, this._dao.addTimes());
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(3, outcome.getLength());
						this.areIdentical('foo', l.getAt(0).getLabel());
						this.areIdentical('bar', l.getAt(1).getLabel());
						this.areIdentical('&gt; foobar', l.getAt(2).getLabel());

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBusinessUpdateTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var t : Tag;

				this._setUp();

				t = new Tag();
				t.setId(' > foo').setLabel('  bar  ');
				this._dao.setUpdateOutcome(t);

				// Act
				this._business.update(
					t,
					(outcome) => {
						// Assert
						this.areIdentical(1, this._dao.updateTimes());
						this.areIdentical(t, this._dao.updateArgs()[0]);
						this.areIdentical('&gt; foo', t.getId());
						this.areIdentical('bar', t.getLabel());
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(t, outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBusinessUpdateNullTagTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange

				this._setUp();

				// Act
				this._business.update(
					undefined,
					(outcome) => {
						this.fail();
					},
					(error) => {
						// Assert
						this.areIdentical(0, this._dao.updateTimes());
						this.isTrue(TSObject.exists(error));

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBusinessDeleteTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var t : Tag;

				this._setUp();

				t = new Tag().setId('foo');
				this._dao.setDeleteOutcome(true);

				// Act
				this._business.delete(
					t,
					() => {
						// Assert
						this.areIdentical(1, this._dao.deleteTimes());
						this.areIdentical(t, this._dao.deleteArgs()[0]);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}
}

UnitTestClass.handle(new TagBusinessTest());

// /**
//  * Tests TagBusiness implementation
//  */
// class TagBusinessTest extends UnitTestClass {
// 	private _business : TagBusiness;

// 	constructor() {
// 		super();

// 		DataAccessObject.setDatabaseName('yimello-test');
// 		this._business = new TagBusiness();
// 	}

// 	setUp() : void {
// 	}

// 	tearDown() : void {
// 	}

// 	/**
// 	 * Tests add list method
// 	 */
// 	TagBusinessAddListTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var tagList : IList<TagDAO>;
// 				var t1 : TagDAO, t2 : TagDAO;

// 				tagList = new ArrayList<TagDAO>();
// 				t1 = new TagDAO();
// 				t1.setLabel('foo');
// 				t2 = new TagDAO();
// 				t2.setLabel('foobar');

// 				tagList.add(t1);
// 				tagList.add(t2);

// 				// Act
// 				this._business.addList(
// 					tagList,
// 					(outcome) => {
// 						// Assert
// 						this.isTrue(TSObject.exists(outcome));
						
// 						this.areIdentical(2, outcome.getLength());
// 						this.areNotIdentical(t1.getId(), outcome.getAt(0).getId());
// 						this.areIdentical(t1.getLabel(), outcome.getAt(0).getLabel());
// 						this.areNotIdentical(t2.getId(), outcome.getAt(1).getId());
// 						this.areIdentical(t2.getLabel(), outcome.getAt(1).getLabel());

// 						TagDAO.get(
// 							(outcome) => {
// 								this.isTrue(TSObject.exists(outcome));
						
// 								this.areIdentical(2, outcome.getLength());
// 								this.areNotIdentical(t1.getId(), outcome.getAt(0).getId());
// 								this.areIdentical(t1.getLabel(), outcome.getAt(0).getLabel());
// 								this.areNotIdentical(t2.getId(), outcome.getAt(1).getId());
// 								this.areIdentical(t2.getLabel(), outcome.getAt(1).getLabel());

// 								DataAccessObject.clean((success) => UnitTestClass.done());
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
// 	TagBusinessDeleteTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var data1 : IList<any>, data2 : IList<any>;
// 				var t : TagDAO;

// 				t = new TagDAO();
// 				t.setId('1');
// 				t.setLabel('foo');
// 				data1 = new ArrayList<any>();
// 				data1.add(t.getId());
// 				data1.add('1');
// 				data2 = new ArrayList<any>();
// 				data2.add(t.getId());
// 				data2.add('2');

// 				// Add a tag, then create couples in tag-bookmark table
// 				DataAccessObject.initialize(
// 					(success) => {
// 						ActiveRecordObject.insert(
// 							DAOTables.Tags,
// 							t.toList(),
// 							(success) => {
// 								ActiveRecordObject.insert(
// 									DAOTables.TagBookmark,
// 									data1,
// 									(success) => {
// 										ActiveRecordObject.insert(
// 											DAOTables.TagBookmark,
// 											data2,
// 											(success) => {
// 												// Act
// 												this._business.delete(
// 													t,
// 													(success) => {
// 														// Assert
// 														this.isTrue(success);

// 														TagDAO.get(
// 															(outcome) => {
// 																this.areIdentical(0, outcome.getLength());

// 																ActiveRecordObject.get(
// 																	DAOTables.TagBookmark,
// 																	(outcome) => {
// 																		this.areIdentical(0, outcome.getLength());
// 																		DataAccessObject.clean((success) => UnitTestClass.done());
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
// 	 * Tests merge method
// 	 */
// 	TagBusinessMergeTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var t1 : TagDAO, t2 : TagDAO, t3 : TagDAO;
				
// 				t1 = new TagDAO();
// 				t1.setLabel('foo');
// 				t2 = new TagDAO();
// 				t2.setLabel('foobar');
// 				t3 = new TagDAO();
// 				t3.setLabel('foobarbar');

// 				// First, add 2 tags into DB
// 				t1.add(
// 					(outcome) => {
// 						t1 = outcome;
// 						t2.add(
// 							(outcome) => {
// 								var tags : IList<TagDAO>;

// 								t2 = outcome;

// 								tags = new ArrayList<TagDAO>();
// 								tags.add(t1);
// 								tags.add(t2);
// 								tags.add(t3);
								
// 								// Act
// 								this._business.merge(
// 									tags,
// 									(outcome) => {
// 										// Assert
// 										// Result must contain two already existing tags
// 										// and a new one
// 										var u1 : TagDAO, u2 : TagDAO;

// 										this.isTrue(TSObject.exists(outcome));
// 										this.areIdentical(3, outcome.getLength());

// 										u1 = outcome.findFirst(e => e.getId() === t1.getId());
// 										u2 = outcome.findFirst(e => e.getId() === t2.getId());
// 										this.isTrue(TSObject.exists(u1));
// 										this.isTrue(TSObject.exists(u2));
// 										this.areIdentical(t1.getLabel(), u1.getLabel());
// 										this.areIdentical(t2.getLabel(), u2.getLabel());

// 										DataAccessObject.clean((success) => UnitTestClass.done());
// 									}
// 								);
// 							}
// 						);
// 					}
// 				);
// 			}
// 		);
// 	}

// 	TagBusinessSortByLabelAscForBookmarkTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var b : BookmarkDAO;
// 				var t1 : TagDAO, t2 : TagDAO, t3 : TagDAO;

// 				b = new BookmarkDAO();
// 				b.setTitle('foo');
// 				t1 = new TagDAO();
// 				t1.setLabel('C');
// 				t2 = new TagDAO();
// 				t2.setLabel('A');
// 				t3 = new TagDAO();
// 				t3.setLabel('B');

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
// 												var data : IList<any>;
// 												t3 = outcome;
// 												data = new ArrayList<any>();
// 												data.add(t1.getId());
// 												data.add(b.getId());

// 												ActiveRecordObject.insert(
// 													DAOTables.TagBookmark,
// 													data,
// 													(success) => {
// 														var data : IList<any> = new ArrayList<any>();
// 														data.add(t2.getId());
// 														data.add(b.getId());

// 														ActiveRecordObject.insert(
// 															DAOTables.TagBookmark,
// 															data,
// 															(success) => {
// 																var data : IList<any> = new ArrayList<any>();
// 																data.add(t3.getId());
// 																data.add(b.getId());

// 																ActiveRecordObject.insert(
// 																	DAOTables.TagBookmark,
// 																	data,
// 																	(success) => {
// 																		// Act
// 																		this._business.sortByLabelAscForBookmark(
// 																			b,
// 																			(outcome) => {
// 																				// Assert
// 																				this.isTrue(TSObject.exists(outcome));
// 																				this.areIdentical(3, outcome.getLength());
// 																				this.areIdentical(t2.getId(), outcome.getAt(0).getId());
// 																				this.areIdentical(t3.getId(), outcome.getAt(1).getId());
// 																				this.areIdentical(t1.getId(), outcome.getAt(2).getId());

// 																				DataAccessObject.clean((s) => UnitTestClass.done());
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

// UnitTestClass.handle(new TagBusinessTest());
