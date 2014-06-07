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
					(success) => {
						// Assert
						this.isTrue(success);

						TagDAO.get(
							(outcome) => {
								this.isTrue(TSObject.exists(outcome));
								this.areIdentical(2, outcome.getLength());
								this.areNotIdentical(t1.getId(), outcome.getAt(0).getId());
								this.areIdentical(t1.getLabel(), outcome.getAt(0).getLabel());
								this.areNotIdentical(t2.getId(), outcome.getAt(1).getId());
								this.areIdentical(t2.getLabel(), outcome.getAt(1).getLabel());

								DataAccessObject.clean();
							}
						);
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
				var t : TagDAO;
				var data1 : IList<any>, data2 : IList<any>;

				t = new TagDAO();
				t.setId('1');
				data1 = new ArrayList<any>();
				data1.add(t.getId());
				data1.add('1');
				data2 = new ArrayList<any>();
				data2.add(t.getId());
				data2.add('2');

				t.add(
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
			},
			UnitTestClass.getDelay()
		);
	}
}

UnitTestClass.handle(new TagBusinessTest());
