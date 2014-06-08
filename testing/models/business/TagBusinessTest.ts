/// <reference path="../../test_dependencies.ts" />

class TagBusinessTest extends UnitTestClass {
	private _business : TagBusiness;

	constructor() {
		super();

		DataAccessObject.setDatabaseName('yimello-test');
		this._business = new TagBusiness();
	}

	setUp() : void {
	}

	tearDown() : void {
		UnitTestClass.increaseDelay();
	}

	TagBusinessAddListTest() : void {
		var timer : Timer;

		timer = new Timer(
			(o) => {
				// Arrange
				var tagList : IList<TagDAO>;
				var t1 : TagDAO, t2 : TagDAO;

				tagList = new ArrayList<TagDAO>();
				t1 = new TagDAO();
				t1.setLabel('foo');
				t2 = new TagDAO();
				t2.setLabel('foobar');

				tagList.add(t1);
				tagList.add(t2);

				// Act
				this._business.addList(
					tagList,
					(outcome) => {
						// Assert
						this.isTrue(TSObject.exists(outcome));
						
						this.areIdentical(2, outcome.getLength());
						this.areNotIdentical(t1.getId(), outcome.getAt(0).getId());
						this.areIdentical(t1.getLabel(), outcome.getAt(0).getLabel());
						this.areNotIdentical(t2.getId(), outcome.getAt(1).getId());
						this.areIdentical(t2.getLabel(), outcome.getAt(1).getLabel());

						DataAccessObject.clean();
					}
				);
			},
			UnitTestClass.getDelay()
		);
	}

	TagBusinessDeleteTest() : void {
		var timer : Timer;

		timer = new Timer(
			(o) => {
				// Arrange
				var data1 : IList<any>, data2 : IList<any>;
				var t : TagDAO;

				t = new TagDAO();
				t.setId('1');
				data1 = new ArrayList<any>();
				data1.add(t.getId());
				data1.add('1');
				data2 = new ArrayList<any>();
				data2.add(t.getId());
				data2.add('2');

				DataAccessObject.initialize(
					(success) => {
						ActiveRecordObject.insert(
							DAOTables.Tags,
							t.toList(),
							(success) => {
								ActiveRecordObject.insert(
									DAOTables.TagBookmark,
									data1,
									(success) => {
										ActiveRecordObject.insert(
											DAOTables.TagBookmark,
											data2,
											(success) => {
												// Act
												this._business.delete(
													t,
													(success) => {
														// Assert
														this.isTrue(success);

														TagDAO.get(
															(outcome) => {
																this.areIdentical(0, outcome.getLength());

																ActiveRecordObject.get(
																	DAOTables.TagBookmark,
																	(outcome) => {
																		this.areIdentical(0, outcome.getLength());
																		DataAccessObject.clean();
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
			},
			UnitTestClass.getDelay()
		);
	}

	TagBusinessMergeTest() : void {
		var timer : Timer;

		timer = new Timer(
			(o) => {
				// Arrange
				var t1 : TagDAO, t2 : TagDAO, t3 : TagDAO;
				var tags : IList<TagDAO>;

				t1 = new TagDAO();
				t1.setLabel('foo');
				t2 = new TagDAO();
				t2.setLabel('foobar');
				t3 = new TagDAO();
				t3.setLabel('foobarbar');

				tags = new ArrayList<TagDAO>();
				tags.add(t1);
				tags.add(t2);
				tags.add(t3);

				t1.add(
					(outcome) => {
						t1 = outcome;
						t2.add(
							(outcome) => {
								t2 = outcome;
								// Act
								this._business.merge(
									tags,
									(outcome) => {
										// Assert
										var u1 : TagDAO, u2 : TagDAO;

										this.isTrue(TSObject.exists(outcome));
										this.areIdentical(3, outcome.getLength());

										u1 = outcome.findFirst(e => StringHelper.compare(e.getId(), t1.getId()));
										u2 = outcome.findFirst(e => StringHelper.compare(e.getId(), t2.getId()));
										this.isTrue(TSObject.exists(u1));
										this.isTrue(TSObject.exists(u2));
										this.areIdentical(t1.getLabel(), u1.getLabel());
										this.areIdentical(t2.getLabel(), u2.getLabel());

										DataAccessObject.clean();
									}
								);
							}
						);
					}
				);
			},
			UnitTestClass.getDelay()
		);
	}
}

UnitTestClass.handle(new TagBusinessTest());
