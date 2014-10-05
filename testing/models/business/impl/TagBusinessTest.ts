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

	TagBusinessIsNotAlreadyExistingTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				this._setUp();
				this._dao.setFindByLabelOutcome(null);

				// Act
				this._business.isNotAlreadyExisting(
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

	TagBusinessMergeTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var t1 : Tag, t2 : Tag, t3 : Tag;
				var input : IList<any>, existing : IList<any>;

				this._setUp();

				t1 = new Tag().setId('foo').setLabel('Al Pacino');
				t2 = new Tag().setId('bar').setLabel('Keanu Reeves');
				t3 = new Tag().setId('foobar').setLabel('Robert De Niro');

				input = new ArrayList<Tag>();
				input.add(t1);
				input.add(t2);
				input.add(t3);
				existing = new ArrayList<Tag>();
				existing.add(t1);
				existing.add(t2);

				this._dao.setGetOutcome(existing);
				this._dao.setAddOutcome(t3);

				// Act
				this._business.merge(
					input,
					(outcome) => {
						// Assert
						this.areIdentical(1, this._dao.getTimes());
						this.areIdentical(1, this._dao.addTimes());
						this.areIdentical(t3, this._dao.addArgs()[0]);

						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(3, outcome.getLength());
						this.isTrue(TSObject.exists(outcome.findFirst(e => e.getId() === 'foo')));
						this.isTrue(TSObject.exists(outcome.findFirst(e => e.getId() === 'bar')));
						this.isTrue(TSObject.exists(outcome.findFirst(e => e.getId() === 'foobar')));

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBusinessSortByLabelAscTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var l : IList<Tag>;

				this._setUp();

				l = new ArrayList<Tag>();
				l.add(new Tag().setId('foo'));
				l.add(new Tag().setId('bar'));

				this._dao.setSortByLabelAscOutcome(l);

				// Act
				this._business.sortByLabelAsc(
					(outcome) => {
						// Assert
						this.areIdentical(1, this._dao.sortByLabelAscTimes());
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(l, outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}
}

UnitTestClass.handle(new TagBusinessTest());
