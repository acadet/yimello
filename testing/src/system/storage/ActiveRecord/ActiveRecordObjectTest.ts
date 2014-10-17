/// <reference path="../../../references.ts" />

class ActiveRecordObjectTest extends UnitTestClass {
	private _aro : ActiveRecordObject;
	private _database : Mocks.ARO.Database;
	private _transaction : Mocks.ARO.Transaction;

	setUp() : void {
		this._transaction = new Mocks.ARO.Transaction();
		this._database = new Mocks.ARO.Database();
		this._database.setTransaction(this._transaction);
		this._aro = new ActiveRecordObject(this._database);
	}

	tearDown(): void {
		this._transaction = null;
		this._database = null;
		this._aro = null;
	}

	ActiveRecordObjectConstructorTest() : void {
		// Arrange
		var aro : ActiveRecordObject;
		var database : ISQLDatabase;

		database = new Mocks.ARO.Database();

		// Act
		aro = new ActiveRecordObject(database);

		// Assert
		Assert.isNotNull(aro);
	}

	ActiveRecordObjectGetAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var p1 : any = {}, p2 : any = {};

		p1.id = 1;
		p1.firstName = 'Al';
		p1.lastName = 'Pacino';

		p2.id = 2;
		p2.firstName = 'Sean';
		p2.lastName = 'Connery';

		this._transaction.setSuccessOutcome(new Mocks.ARO.SQLRowSet().push(p1).push(p2));

		// Act
		this._aro.get(
			'foo',
			(outcome) => {
				// Assert
				Assert.areEqual('SELECT * FROM foo', this._transaction.getStatement());
				Assert.isNotNull(outcome);
				Assert.areEqual(2, outcome.getLength());
				Assert.isTrue(Mocks.Utils.Person.toPerson(p1).equals(outcome.getAt(0)));
				Assert.isTrue(Mocks.Utils.Person.toPerson(p2).equals(outcome.getAt(1)));

				obs.success();
			},
			Mocks.Utils.Person.toPerson
		);
	}

	ActiveRecordObjectGetWithoutConverterAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var p1 : any = {}, p2 : any = {};

		p1.id = 1;
		p1.firstName = 'Al';
		p1.lastName = 'Pacino';

		p2.id = 2;
		p2.firstName = 'Sean';
		p2.lastName = 'Connery';

		this._transaction.setSuccessOutcome(new Mocks.ARO.SQLRowSet().push(p1).push(p2));

		// Act
		this._aro.get(
			'foo',
			(outcome) => {
				// Assert
				Assert.areEqual('SELECT * FROM foo', this._transaction.getStatement());
				Assert.isNotNull(outcome);
				Assert.areEqual(2, outcome.getLength());
				Assert.areEqual(p1, outcome.getAt(0));
				Assert.areEqual(p2, outcome.getAt(1));

				obs.success();
			}
		);
	}

	ActiveRecordObjectFindAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var p : any = {};

		p.id = 15;
		p.firstName = 'Al';
		p.lastName = 'Pacino';

		this._transaction.setSuccessOutcome(new Mocks.ARO.SQLRowSet().push(p));

		// Act
		this._aro.find(
			'foo',
			new Pair<string, any>('id', 15),
			(outcome) => {
				// Assert
				Assert.areEqual('SELECT * FROM foo WHERE LOWER(id) = LOWER(?)', this._transaction.getStatement());
				Assert.areEqual(15, this._transaction.getArguments()[0]);
				Assert.isNotNull(outcome);
				Assert.isTrue(Mocks.Utils.Person.toPerson(p).equals(outcome));

				obs.success();
			},
			Mocks.Utils.Person.toPerson
		);
	}

	ActiveRecordObjectFindWithoutConverterAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var p : any = {};

		p.id = 15;
		p.firstName = 'Al';
		p.lastName = 'Pacino';

		this._transaction.setSuccessOutcome(new Mocks.ARO.SQLRowSet().push(p));

		// Act
		this._aro.find(
			'foo',
			new Pair<string, any>('id', 15),
			(outcome) => {
				// Assert
				Assert.areEqual('SELECT * FROM foo WHERE LOWER(id) = LOWER(?)', this._transaction.getStatement());
				Assert.areEqual(15, this._transaction.getArguments()[0]);
				Assert.isNotNull(outcome);
				Assert.areEqual(p, outcome);
				
				obs.success();
			}
		);
	}

	ActiveRecordObjectInsertAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var data : IList<any>;

		data = new ArrayList<any>();
		data.add(2);
		data.add('Hello!');
		data.add('Bye!');

		// Act
		this._aro.insert(
			'bar',
			data,
			(success) => {
				// Assert
				Assert.isTrue(success);
				Assert.areEqual('INSERT INTO bar VALUES (?, ?, ?)', this._transaction.getStatement());
				Assert.areEqual(data.toArray(), this._transaction.getArguments());
				
				obs.success();
			}
		);
	}

	ActiveRecordObjectUpdateAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var data : IDictionary<string, any>;

		data = new Dictionary<string, any>();
		data.add('first_name', 'Robert');
		data.add('last_name', 'De Niro');

		// Act
		this._aro.update(
			'people',
			new Pair<string, any>('id', 15),
			data,
			(success) => {
				// Assert
				Assert.isTrue(success);
				Assert.areEqual(
					'UPDATE people SET first_name = ?, last_name = ? WHERE id = ?',
					this._transaction.getStatement()
				);

				Assert.areEqual(3, this._transaction.getArguments().length);
				Assert.areEqual('Robert', this._transaction.getArguments()[0]);
				Assert.areEqual('De Niro', this._transaction.getArguments()[1]);
				Assert.areEqual(15, this._transaction.getArguments()[2]);
				
				obs.success();
			}
		);
	}

	ActiveRecordObjectDeleteAsyncTest(obs : IOscarObserver) : void {
		// Arrange

		// Act
		this._aro.delete(
			'foobar',
			new Pair<string, any>('id', 15),
			(success) => {
				// Assert
				Assert.isTrue(success);
				Assert.areEqual('DELETE FROM foobar WHERE id = ?', this._transaction.getStatement());
				Assert.areEqual(15, this._transaction.getArguments()[0]);
				
				obs.success();
			}
		);
	}
}
