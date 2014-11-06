/// <reference path="../../../references.ts" />

class TagBusinessTest extends UnitTestClass {
	private _dao : Mocks.DAO.TagDAO;
	private _business : TagBusiness;

	setUp() : void {
		this._dao = new Mocks.DAO.TagDAO();
		this._business = new TagBusiness(this._dao);
	}

	tearDown() : void {
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
		Assert.isNotNull(outcome);
	}

	TagBusinessEngineTagTest() : void {
		// Arrange
		var t : Tag;

		t = new Tag().setId(' >> foo < ').setLabel('" bar   ');
	
		// Act
		this._business.engineTag(t);
	
		// Assert
		Assert.isNotNull(t);
		Assert.areEqual('&gt;&gt; foo &lt;', t.getId());
		Assert.areEqual('&quot; bar', t.getLabel());
	}

	//region isValueValid

	TagBusinessIsValueValidTest() : void {
		// Arrange
		var value : string;
		var isValid : boolean;
		value = '  foo  ';
	
		// Act
		isValid = this._business.isValueValid(value);
	
		// Assert
		Assert.isTrue(isValid);
	}

	TagBusinessIsValueValidNullStringTest() : void {
		// Arrange
		var value : string;
		var isValid : boolean;

		value = undefined;
	
		// Act
		isValid = this._business.isValueValid(value);
	
		// Assert
		Assert.isFalse(isValid);
	}

	TagBusinessIsValueValidEmptyStringTest() : void {
		// Arrange
		var value : string;
		var isValid : boolean;

		value = '    ';
	
		// Act
		isValid = this._business.isValueValid(value);
	
		// Assert
		Assert.isFalse(isValid);
	}

	//endregion isValueValid

	TagBusinessIsNotAlreadyExistingAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		this._dao.setFindByLabelOutcome(null);

		// Act
		this._business.isNotAlreadyExisting(
			'  foo< ',
			(success) => {
				// Assert
				Assert.areEqual(1, this._dao.findByLabelTimes());
				Assert.areEqual('foo&lt;', this._dao.findByLabelArgs()[0]);
				Assert.isTrue(success);

				obs.success();
			}
		);
	}

	TagBusinessAddAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var t : Tag;

		t = new Tag().setLabel('  > foo ');
		this._dao.setAddOutcome(t);

		// Act
		this._business.add(
			t,
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._dao.addTimes());
				Assert.areEqual(t, this._dao.addArgs()[0]);
				Assert.areEqual('&gt; foo', t.getLabel());
				Assert.isNotNull(outcome);
				Assert.areEqual(t, outcome);

				obs.success();
			}
		);
	}

	TagBusinessAddBadLabelAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var t : Tag;

		t = new Tag().setLabel('  ');
		this._dao.setAddOutcome(t);

		// Act
		this._business.add(
			t,
			(outcome) => {
				obs.fail();
			},
			(error) => {
				// Assert
				Assert.areEqual(0, this._dao.addTimes());
				Assert.isNotNull(error);

				obs.success();
			}
		);
	}

	TagBusinessAddListAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var l : IList<Tag>;

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
				Assert.areEqual(3, this._dao.addTimes());
				Assert.isNotNull(outcome);
				Assert.areEqual(3, outcome.getLength());
				Assert.areEqual('foo', l.getAt(0).getLabel());
				Assert.areEqual('bar', l.getAt(1).getLabel());
				Assert.areEqual('&gt; foobar', l.getAt(2).getLabel());

				obs.success();
			}
		);
	}

	TagBusinessUpdateAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var t : Tag;

		t = new Tag();
		t.setId(' > foo').setLabel('  bar  ');
		this._dao.setUpdateOutcome(t);

		// Act
		this._business.update(
			t,
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._dao.updateTimes());
				Assert.areEqual(t, this._dao.updateArgs()[0]);
				Assert.areEqual('&gt; foo', t.getId());
				Assert.areEqual('bar', t.getLabel());
				Assert.isNotNull(outcome);
				Assert.areEqual(t, outcome);

				obs.success();
			}
		);
	}

	TagBusinessUpdateNullTagAsyncTest(obs : IOscarObserver) : void {
		// Arrange

		// Act
		this._business.update(
			undefined,
			(outcome) => {
				obs.fail();
			},
			(error) => {
				// Assert
				Assert.areEqual(0, this._dao.updateTimes());
				Assert.isNotNull(error);

				obs.success();
			}
		);
	}

	TagBusinessDeleteAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var t : Tag;

		t = new Tag().setId('foo');
		this._dao.setDeleteOutcome(true);

		// Act
		this._business.delete(
			t,
			() => {
				// Assert
				Assert.areEqual(1, this._dao.deleteTimes());
				Assert.areEqual(t, this._dao.deleteArgs()[0]);

				obs.success();
			}
		);
	}

	TagBusinessMergeAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var t1 : Tag, t2 : Tag, t3 : Tag;
		var input : IList<any>, existing : IList<any>;

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
				Assert.areEqual(1, this._dao.getTimes());
				Assert.areEqual(1, this._dao.addTimes());
				Assert.areEqual(t3, this._dao.addArgs()[0]);

				Assert.isNotNull(outcome);
				Assert.areEqual(3, outcome.getLength());
				Assert.isNotNull(outcome.find(e => e.getId() === 'foo'));
				Assert.isNotNull(outcome.find(e => e.getId() === 'bar'));
				Assert.isNotNull(outcome.find(e => e.getId() === 'foobar'));

				obs.success();
			}
		);
	}

	TagBusinessSortByLabelAscAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var l : IList<Tag>;

		l = new ArrayList<Tag>();
		l.add(new Tag().setId('foo'));
		l.add(new Tag().setId('bar'));

		this._dao.setSortByLabelAscOutcome(l);

		// Act
		this._business.sortByLabelAsc(
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._dao.sortByLabelAscTimes());
				Assert.isNotNull(outcome);
				Assert.areEqual(l, outcome);

				obs.success();
			}
		);
	}
}
