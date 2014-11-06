/// <reference path="../../../references.ts" />

class TagDAOTest extends UnitTestClass {

	private _tagBkDAO : Mocks.DAO.TagBookmarkDAO;
	private _aro : Mocks.DAO.ActiveRecordObject;
	private _dao : TagDAO;

	setUp() : void {
		this._tagBkDAO = new Mocks.DAO.TagBookmarkDAO();
		this._aro = new Mocks.DAO.ActiveRecordObject();
		this._dao = new TagDAO(this._aro, this._tagBkDAO);
	}

	tearDown() : void {
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
		Assert.isNotNull(outcome);
		Assert.areEqual(aro, outcome.getARO());
	}

	TagDAOAddAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var t : Tag;

		t = new Tag();
		t.setId('useless');
		t.setLabel('foo');
		this._aro.setInsertOutcome(true);

		// Act
		this._dao.add(
			t,
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._aro.insertTimes());
				Assert.areEqual(DAOTables.Tags, this._aro.insertArgs()[0]);
				Assert.areEqual(2, this._aro.insertArgs()[1].getLength());
				Assert.areNotEqual('useless', this._aro.insertArgs()[1].getAt(0));
				Assert.areEqual('foo', this._aro.insertArgs()[1].getAt(1));

				Assert.isNotNull(outcome);
				Assert.areNotEqual('useless', outcome.getId());
				Assert.areEqual('foo', outcome.getLabel());

				obs.success();
			}
		);
	}

	TagDAOAddRawAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var t : Tag;

		t = new Tag();
		t.setId('bar');
		t.setLabel('foo');
		this._aro.setInsertOutcome(true);

		// Act
		this._dao.addRaw(
			t,
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._aro.insertTimes());
				Assert.areEqual(DAOTables.Tags, this._aro.insertArgs()[0]);
				Assert.areEqual(2, this._aro.insertArgs()[1].getLength());
				Assert.areEqual('bar', this._aro.insertArgs()[1].getAt(0));
				Assert.areEqual('foo', this._aro.insertArgs()[1].getAt(1));

				Assert.isTrue(outcome);

				obs.success();
			}
		);
	}

	TagDAOUpdateAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var t : Tag;

		t = new Tag();
		t.setId('foo').setLabel('bar');

		this._aro.setUpdateOutcome(true);

		// Act
		this._dao.update(
			t,
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._aro.updateTimes());
				Assert.areEqual(DAOTables.Tags, this._aro.updateArgs()[0]);

				Assert.areEqual('id', this._aro.updateArgs()[1].getKey());
				Assert.areEqual('foo', this._aro.updateArgs()[1].getValue());

				Assert.areEqual(1, this._aro.updateArgs()[2].getSize());
				Assert.areEqual('bar', this._aro.updateArgs()[2].get('label'));

				Assert.isNotNull(outcome);
				Assert.areEqual(t, outcome);

				obs.success();
			}
		);
	}

	TagDAODeleteAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var t : Tag;

		t = new Tag().setId('foo');
		this._tagBkDAO.setRemoveTagRelationsOutcome(true);
		this._aro.setDeleteOutcome(true);

		// Act
		this._dao.delete(
			t,
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._tagBkDAO.removeTagRelationsTimes());
				Assert.areEqual(t, this._tagBkDAO.removeTagRelationsArgs()[0]);

				Assert.areEqual(1, this._aro.deleteTimes());
				Assert.areEqual(DAOTables.Tags, this._aro.deleteArgs()[0]);
				Assert.areEqual('id', this._aro.deleteArgs()[1].getKey());
				Assert.areEqual('foo', this._aro.deleteArgs()[1].getValue());

				Assert.isTrue(outcome);

				obs.success();
			}
		);
	}

	TagDAOGetAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var l : IList<Tag>;

		l = new ArrayList<Tag>();
		l.add(new Tag().setId('foo'));
		l.add(new Tag().setId('bar'));
		this._aro.setGetOutcome(l);

		// Act
		this._dao.get(
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._aro.getTimes());
				Assert.areEqual(DAOTables.Tags, this._aro.getArgs()[0]);
				Assert.areEqual(Tag.fromObject, this._aro.getArgs()[2]);
				Assert.areEqual(l, outcome);

				obs.success();
			}
		);
	}

	TagDAOFindAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var t : Tag;

		t = new Tag().setId('foo');
		this._aro.setFindOutcome(t);

		// Act
		this._dao.find(
			'foo',
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._aro.findTimes());
				Assert.areEqual(DAOTables.Tags, this._aro.findArgs()[0]);
				Assert.areEqual('id', this._aro.findArgs()[1].getKey());
				Assert.areEqual('foo', this._aro.findArgs()[1].getValue());
				Assert.areEqual(Tag.fromObject, this._aro.findArgs()[3]);
				Assert.areEqual(t, outcome);

				obs.success();
			}
		);
	}

	TagDAOFindByLabelAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var t : Tag;

		t = new Tag().setLabel('foo');
		this._aro.setFindOutcome(t);

		// Act
		this._dao.findByLabel(
			'foo',
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._aro.findTimes());
				Assert.areEqual(DAOTables.Tags, this._aro.findArgs()[0]);
				Assert.areEqual('label', this._aro.findArgs()[1].getKey());
				Assert.areEqual('foo', this._aro.findArgs()[1].getValue());
				Assert.areEqual(Tag.fromObject, this._aro.findArgs()[3]);
				Assert.areEqual(t, outcome);

				obs.success();
			}
		);
	}

	TagDAOSortByLabelAscAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var t1 : any, t2 : any;

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
				Assert.areEqual(1, this._aro.executeSQLTimes());
				Assert.areEqual(
					'SELECT * FROM ' + DAOTables.Tags + ' ORDER BY LOWER(label) ASC',
					this._aro.executeSQLArgs()[0]
				);

				Assert.isNotNull(outcome);
				Assert.areEqual(2, outcome.getLength());
				Assert.areEqual('foo', outcome.getAt(0).getId());
				Assert.areEqual('bar', outcome.getAt(0).getLabel());
				Assert.areEqual('barbar', outcome.getAt(1).getId());
				Assert.areEqual('foobar', outcome.getAt(1).getLabel());

				obs.success();
			}
		);
	}
}
