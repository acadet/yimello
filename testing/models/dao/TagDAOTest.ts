/// <reference path="../../test_dependencies.ts" />

class TagDAOTest extends UnitTestClass {
	private _dao : TagDAO;

	constructor() {
		super();

		DataAccessObject.setDatabaseName('yimello-test');
	}

	setUp() : void {
		this._dao = new TagDAO();
	}

	tearDown() : void {
		this._dao = null;
	}

	TagDAOLabelTest() : void {
		// Arrange
		var label : string = 'A label';

		// Act
		this._dao.setLabel(label);

		// Assert
		this.areIdentical(label, this._dao.getLabel());
	}

	TagDAOToListTest() : void {
		// Arrange
		var id : string = '1';
		var label : string = 'foo';
		var tag : TagDAO = new TagDAO();
		var outcome : IList<any>;

		tag.setId(id);
		tag.setLabel(label);

		// Act
		outcome = tag.toList();

		// Assert
		this.isTrue(TSObject.exists(outcome));
		this.areIdentical(2, outcome.getLength());
		this.areIdentical(id, outcome.getAt(0));
		this.areIdentical(label, outcome.getAt(1));
	}

	TagDAOAddTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var tag : TagDAO;

				tag = new TagDAO();
				tag.setLabel('foo');

				// Act
				tag.add(
					(outcome) => {
						// Assert
						this.isTrue(TSObject.exists(outcome));

						this.areNotIdentical(tag.getId(), outcome.getId());
						this.areIdentical(tag.getLabel(), outcome.getLabel());

						DataAccessObject.clean((success) => UnitTestClass.done());
					}
				);
			}
		);
	}

	TagDAODeleteTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var tag : TagDAO;

				tag = new TagDAO();
				tag.setId('1');
				tag.setLabel('foo');

				DataAccessObject.initialize(
					(success) => {
						ActiveRecordObject.insert(
							DAOTables.Tags,
							tag.toList(),
							(success) => {
								// Act
								tag.delete(
									(success) => {
										// Assert
										this.isTrue(success);
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

	TagDAOGetTest() : void {
		UnitTestClass.queue(
			() => {
				var t1 : TagDAO, t2 : TagDAO;

				t1 = new TagDAO();
				t1.setId('1');
				t1.setLabel('foo');
				t2 = new TagDAO();
				t2.setId('2');
				t2.setLabel('foobar');

				DataAccessObject.initialize(
					(success) => {
						ActiveRecordObject.insert(
							DAOTables.Tags,
							t1.toList(),
							(success) => {
								ActiveRecordObject.insert(
									DAOTables.Tags,
									t2.toList(),
									(success) => {
										TagDAO.get(
											(outcome) => {
												this.isTrue(TSObject.exists(outcome));

												this.areIdentical(2, outcome.getLength());
												this.areIdentical(t1.getId(), outcome.getAt(0).getId());
												this.areIdentical(t1.getLabel(), outcome.getAt(0).getLabel());
												this.areIdentical(t2.getId(), outcome.getAt(1).getId());
												this.areIdentical(t2.getLabel(), outcome.getAt(1).getLabel());

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

	TagDAOSortByLabelAscTest() : void {
		UnitTestClass.queue(
			() => {
				var t1 : TagDAO, t2 : TagDAO, t3 : TagDAO;

				t1 = new TagDAO();
				t1
					.setLabel('C')
					.setId('1');
				t2 = new TagDAO();
				t2
					.setLabel('A')
					.setId('2');
				t3 = new TagDAO();
				t3
					.setLabel('B')
					.setId('3');

				DataAccessObject.initialize(
					(success) => {
						ActiveRecordObject.insert(
							DAOTables.Tags,
							t1.toList(),
							(success) => {
								ActiveRecordObject.insert(
									DAOTables.Tags,
									t2.toList(),
									(success) => {
										ActiveRecordObject.insert(
											DAOTables.Tags,
											t3.toList(),
											(success) => {
												TagDAO.sortByLabelAsc(
													(outcome) => {
														this.isTrue(TSObject.exists(outcome));
														this.areIdentical(3, outcome.getLength());
														this.areIdentical(t2.getLabel(), outcome.getAt(0).getLabel());
														this.areIdentical(t3.getLabel(), outcome.getAt(1).getLabel());
														this.areIdentical(t1.getLabel(), outcome.getAt(2).getLabel());

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
}

UnitTestClass.handle(new TagDAOTest());
