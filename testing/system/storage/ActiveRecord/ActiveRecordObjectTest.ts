/// <reference path="../../../test_dependencies.ts" />

/**
 * Wraps extra data used for ARO testing
 */
module ActiveRecordObjectTestUtils {
	export class Person extends TSObject {
		id : number;
		firstName : string;
		lastName : string;

		static toPerson(o : any) : Person {
			var p : Person = new Person();
			p.id = o.id;
			p.firstName = o.firstName;
			p.lastName = o.lastName;

			return p;
		}

		fromPerson() : any {
			var o : any = {};

			o.id = this.id;
			o.firstName = this.firstName;
			o.lastName = this.lastName;

			return o;
		}

		equals(obj : any) : boolean {
			var p : Person;

			if (obj instanceof Person) {
				p = <Person> obj;

				if (this.id !== p.id) {
					return false;
				}

				if (this.firstName !== p.firstName) {
					return false;
				}

				if (this.lastName !== p.lastName) {
					return false;
				}

				return true;
			}

			return false;
		}
	}
}

module ActiveRecordObjectTestMocks {
	export class MockSQLRowSet {
		private _content : Array<any>;

		length : number;

		constructor() {
			this._content = new Array<any>();
			this.length = 0;
		}

		item(i : number) : any {
			return this._content[i];
		}

		push(o : any) : MockSQLRowSet {
			this._content.push(o);
			this.length++;
			return this;
		}
	}

	class MockSQLSet {
		rows : any;
	}

	export class MockTransaction {
		private _successOutcome : any;
		private _errorOutcome : any;
		private _mustFail : boolean;
		private _statement : string;
		private _arguments : Array<any>;

		constructor() {
			this._mustFail = false;
		}

		executeSql(
			statement : string,
			arguments : Array<any>,
			success : any,
			error : any) : void {

			this._statement = statement;
			this._arguments = arguments;

			if (this._mustFail) {
				error(this, this._errorOutcome);
			} else {
				success(this, this._successOutcome);
			}
		}

		getStatement() : string {
			return this._statement;
		}

		getArguments() : Array<any> {
			return this._arguments;
		}

		setSuccessOutcome(obj : MockSQLRowSet) : MockTransaction {
			var set : MockSQLSet;

			set = new MockSQLSet();
			set.rows = obj;
			this._successOutcome = set;

			return this;
		}

		setErrorOutcome(obj : MockSQLRowSet) : MockTransaction {
			var set : MockSQLSet;

			set = new MockSQLSet();
			set.rows = obj;
			this._errorOutcome = set;

			return this;
		}

		mustFail() : MockTransaction {
			this._mustFail = true;
			return this;
		}
	}

	export class MockDatabase implements ISQLDatabase {
		private _transaction : MockTransaction;

		transaction(success : ISQLTransactionCallback, error? : ISQLTransactionErrorCallback) : void {
			success(new SQLTransaction(this._transaction));
		}

		setTransaction(transaction : MockTransaction) : void {
			this._transaction = transaction;
		}
	}
}

/**
 * Tests ARO
 */
class ActiveRecordObjectTest extends UnitTestClass {
	private _aro : ActiveRecordObject;
	private _database : ActiveRecordObjectTestMocks.MockDatabase;
	private _transaction : ActiveRecordObjectTestMocks.MockTransaction;

	private _setUp() : void {
		this._transaction = new ActiveRecordObjectTestMocks.MockTransaction();
		this._database = new ActiveRecordObjectTestMocks.MockDatabase();
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

		database = new ActiveRecordObjectTestMocks.MockDatabase();

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

				this._transaction.setSuccessOutcome(new ActiveRecordObjectTestMocks.MockSQLRowSet().push(p1).push(p2));

				// Act
				this._aro.get(
					'foo',
					(outcome) => {
						// Assert
						this.areIdentical('SELECT * FROM foo', this._transaction.getStatement());
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(2, outcome.getLength());
						this.isTrue(ActiveRecordObjectTestUtils.Person.toPerson(p1).equals(outcome.getAt(0)));
						this.isTrue(ActiveRecordObjectTestUtils.Person.toPerson(p2).equals(outcome.getAt(1)));

						this._tearDown();
						UnitTestClass.done();
					},
					ActiveRecordObjectTestUtils.Person.toPerson
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

				this._transaction.setSuccessOutcome(new ActiveRecordObjectTestMocks.MockSQLRowSet().push(p1).push(p2));

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

				this._transaction.setSuccessOutcome(new ActiveRecordObjectTestMocks.MockSQLRowSet().push(p));

				// Act
				this._aro.find(
					'foo',
					new Pair<string, any>('id', 15),
					(outcome) => {
						// Assert
						this.areIdentical('SELECT * FROM foo WHERE id = ?', this._transaction.getStatement());
						this.areIdentical(15, this._transaction.getArguments()[0]);
						this.isTrue(TSObject.exists(outcome));
						this.isTrue(ActiveRecordObjectTestUtils.Person.toPerson(p).equals(outcome));

						this._tearDown();
						UnitTestClass.done();
					},
					ActiveRecordObjectTestUtils.Person.toPerson
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

				this._transaction.setSuccessOutcome(new ActiveRecordObjectTestMocks.MockSQLRowSet().push(p));

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
