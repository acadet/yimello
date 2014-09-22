/// <reference path="../../../test_dependencies.ts" />

class ActiveRecordObjectTest extends UnitTestClass {
	private _aro : ActiveRecordObject;
	private _database : Mocks.ARO.Database;
	private _transaction : Mocks.ARO.Transaction;

	private _setUp() : void {
		this._transaction = new Mocks.ARO.Transaction();
		this._database = new Mocks.ARO.Database();
		this._database.setTransaction(this._transaction);
		this._aro = new ActiveRecordObject(this._database);
	}

	private _tearDown(): void {
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
		this.isTrue(TSObject.exists(aro));
	}

	ActiveRecordObjectGetTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var p1 : any = {}, p2 : any = {};

				this._setUp();

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
						this.areIdentical('SELECT * FROM foo', this._transaction.getStatement());
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(2, outcome.getLength());
						this.isTrue(Mocks.Utils.Person.toPerson(p1).equals(outcome.getAt(0)));
						this.isTrue(Mocks.Utils.Person.toPerson(p2).equals(outcome.getAt(1)));

						this._tearDown();
						UnitTestClass.done();
					},
					Mocks.Utils.Person.toPerson
				);
			}
		);
	}

	ActiveRecordObjectGetWithoutConverterTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var p1 : any = {}, p2 : any = {};

				this._setUp();

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
						this.areIdentical('SELECT * FROM foo', this._transaction.getStatement());
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(2, outcome.getLength());
						this.areIdentical(p1, outcome.getAt(0));
						this.areIdentical(p2, outcome.getAt(1));

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	ActiveRecordObjectFindTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var p : any = {};

				this._setUp();

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
						this.areIdentical('SELECT * FROM foo WHERE id = ?', this._transaction.getStatement());
						this.areIdentical(15, this._transaction.getArguments()[0]);
						this.isTrue(TSObject.exists(outcome));
						this.isTrue(Mocks.Utils.Person.toPerson(p).equals(outcome));

						this._tearDown();
						UnitTestClass.done();
					},
					Mocks.Utils.Person.toPerson
				);
			}
		);
	}

	ActiveRecordObjectFindWithoutConverterTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var p : any = {};

				this._setUp();

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
						this.areIdentical('SELECT * FROM foo WHERE id = ?', this._transaction.getStatement());
						this.areIdentical(15, this._transaction.getArguments()[0]);
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(p, outcome);
						
						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	ActiveRecordObjectInsertTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var data : IList<any>;

				this._setUp();

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
						this.isTrue(success);
						this.areIdentical('INSERT INTO bar VALUES (?, ?, ?)', this._transaction.getStatement());
						this.areIdentical(data.toArray(), this._transaction.getArguments());
						
						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	ActiveRecordObjectUpdateTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var data : IDictionary<string, any>;

				this._setUp();

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
						this.isTrue(success);
						this.areIdentical(
							'UPDATE people SET first_name = ?, last_name = ? WHERE id = ?',
							this._transaction.getStatement()
						);

						this.areIdentical(3, this._transaction.getArguments().length);
						this.areIdentical('Robert', this._transaction.getArguments()[0]);
						this.areIdentical('De Niro', this._transaction.getArguments()[1]);
						this.areIdentical(15, this._transaction.getArguments()[2]);
						
						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	ActiveRecordObjectDeleteTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				this._setUp();

				// Act
				this._aro.delete(
					'foobar',
					new Pair<string, any>('id', 15),
					(success) => {
						// Assert
						this.isTrue(success);
						this.areIdentical('DELETE FROM foobar WHERE id = ?', this._transaction.getStatement());
						this.areIdentical(15, this._transaction.getArguments()[0]);
						
						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}
}

UnitTestClass.handle(new ActiveRecordObjectTest());
