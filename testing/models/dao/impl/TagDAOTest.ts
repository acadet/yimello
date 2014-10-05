/// <reference path="../../../test_dependencies.ts" />

class TagDAOTest extends UnitTestClass {
	private _tagBkDAO : Mocks.DAO.TagBookmarkDAO;
	private _aro : Mocks.DAO.ActiveRecordObject;
	private _dao : TagDAO;

	private _setUp() : void {
		this._tagBkDAO = new Mocks.DAO.TagBookmarkDAO();
		this._aro = new Mocks.DAO.ActiveRecordObject();
		this._dao = new TagDAO(this._aro, this._tagBkDAO);
	}

	private _tearDown() : void {
		this._tagBkDAO = null;
		this._aro = null;
		this._dao = null;
	}

	TagDAOConstructorTest() : void {
		// Arrange
		var tagBkDAO : ITagBookmarkDAO;
		var aro : IActiveRecordObject;
		var outcome : TagDAO;

		tagBkDAO = new Mocks.DAO.TagBookmarkDAO();
		aro = new Mocks.DAO.ActiveRecordObject();
	
		// Act
		outcome = new TagDAO(aro, tagBkDAO);
	
		// Assert
		this.isTrue(TSObject.exists(outcome));
		this.areIdentical(aro, outcome.getARO());
	}

	TagDAOAddTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var t : Tag;

				this._setUp();

				t = new Tag();
				t.setId('useless');
				t.setLabel('foo');
				this._aro.setInsertOutcome(true);

				// Act
				this._dao.add(
					t,
					(outcome) => {
						// Assert
						this.areIdentical(1, this._aro.insertTimes());
						this.areIdentical(DAOTables.Tags, this._aro.insertArgs()[0]);
						this.areIdentical(2, this._aro.insertArgs()[1].getLength());
						this.areNotIdentical('useless', this._aro.insertArgs()[1].getAt(0));
						this.areIdentical('foo', this._aro.insertArgs()[1].getAt(1));

						this.isTrue(TSObject.exists(outcome));
						this.areNotIdentical('useless', outcome.getId());
						this.areIdentical('foo', outcome.getLabel());

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagDAOAddRawTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var t : Tag;

				this._setUp();

				t = new Tag();
				t.setId('bar');
				t.setLabel('foo');
				this._aro.setInsertOutcome(true);

				// Act
				this._dao.addRaw(
					t,
					(outcome) => {
						// Assert
						this.areIdentical(1, this._aro.insertTimes());
						this.areIdentical(DAOTables.Tags, this._aro.insertArgs()[0]);
						this.areIdentical(2, this._aro.insertArgs()[1].getLength());
						this.areIdentical('bar', this._aro.insertArgs()[1].getAt(0));
						this.areIdentical('foo', this._aro.insertArgs()[1].getAt(1));

						this.isTrue(outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagDAOUpdateTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var t : Tag;

				this._setUp();
				t = new Tag();
				t.setId('foo').setLabel('bar');

				this._aro.setUpdateOutcome(true);

				// Act
				this._dao.update(
					t,
					(outcome) => {
						// Assert
						this.areIdentical(1, this._aro.updateTimes());
						this.areIdentical(DAOTables.Tags, this._aro.updateArgs()[0]);

						this.areIdentical('id', this._aro.updateArgs()[1].getFirst());
						this.areIdentical('foo', this._aro.updateArgs()[1].getSecond());

						this.areIdentical(1, this._aro.updateArgs()[2].getLength());
						this.areIdentical('bar', this._aro.updateArgs()[2].get('label'));

						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(t, outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagDAODeleteTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var t : Tag;

				this._setUp();

				t = new Tag().setId('foo');
				this._tagBkDAO.setRemoveTagRelationsOutcome(true);
				this._aro.setDeleteOutcome(true);

				// Act
				this._dao.delete(
					t,
					(outcome) => {
						// Assert
						this.areIdentical(1, this._tagBkDAO.removeTagRelationsTimes());
						this.areIdentical(t, this._tagBkDAO.removeTagRelationsArgs()[0]);

						this.areIdentical(1, this._aro.deleteTimes());
						this.areIdentical(DAOTables.Tags, this._aro.deleteArgs()[0]);
						this.areIdentical('id', this._aro.deleteArgs()[1].getFirst());
						this.areIdentical('foo', this._aro.deleteArgs()[1].getSecond());

						this.isTrue(outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagDAOGetTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var l : IList<Tag>;

				this._setUp();

				l = new ArrayList<Tag>();
				l.add(new Tag().setId('foo'));
				l.add(new Tag().setId('bar'));
				this._aro.setGetOutcome(l);

				// Act
				this._dao.get(
					(outcome) => {
						// Assert
						this.areIdentical(1, this._aro.getTimes());
						this.areIdentical(DAOTables.Tags, this._aro.getArgs()[0]);
						this.areIdentical(Tag.fromObject, this._aro.getArgs()[2]);
						this.areIdentical(l, outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagDAOFindTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var t : Tag;

				this._setUp();

				t = new Tag().setId('foo');
				this._aro.setFindOutcome(t);

				// Act
				this._dao.find(
					'foo',
					(outcome) => {
						// Assert
						this.areIdentical(1, this._aro.findTimes());
						this.areIdentical(DAOTables.Tags, this._aro.findArgs()[0]);
						this.areIdentical('id', this._aro.findArgs()[1].getFirst());
						this.areIdentical('foo', this._aro.findArgs()[1].getSecond());
						this.areIdentical(Tag.fromObject, this._aro.findArgs()[3]);
						this.areIdentical(t, outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagDAOFindByLabelTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var t : Tag;

				this._setUp();

				t = new Tag().setLabel('foo');
				this._aro.setFindOutcome(t);

				// Act
				this._dao.findByLabel(
					'foo',
					(outcome) => {
						// Assert
						this.areIdentical(1, this._aro.findTimes());
						this.areIdentical(DAOTables.Tags, this._aro.findArgs()[0]);
						this.areIdentical('label', this._aro.findArgs()[1].getFirst());
						this.areIdentical('foo', this._aro.findArgs()[1].getSecond());
						this.areIdentical(Tag.fromObject, this._aro.findArgs()[3]);
						this.areIdentical(t, outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagDAOSortByLabelAscTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var t1 : any, t2 : any;

				this._setUp();

				t1 = {
					id : 'foo',
					label : 'bar'
				};
				t2 = {
					id : 'barbar',
					label : 'foobar'
				};
				this._aro.setExecuteSQLOutcome([t1, t2]);

				// Act
				this._dao.sortByLabelAsc(
					(outcome) => {
						// Assert
						this.areIdentical(1, this._aro.executeSQLTimes());
						this.areIdentical(
							'SELECT * FROM ' + DAOTables.Tags + ' ORDER BY LOWER(label) ASC',
							this._aro.executeSQLArgs()[0]
						);

						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(2, outcome.getLength());
						this.areIdentical('foo', outcome.getAt(0).getId());
						this.areIdentical('bar', outcome.getAt(0).getLabel());
						this.areIdentical('barbar', outcome.getAt(1).getId());
						this.areIdentical('foobar', outcome.getAt(1).getLabel());

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}
}

UnitTestClass.handle(new TagDAOTest());
