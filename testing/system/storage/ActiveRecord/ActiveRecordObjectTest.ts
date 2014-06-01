/// <reference path="../../../test_dependencies.ts" />

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

class ActiveRecordObjectTest extends UnitTestClass {
	private _config : ActiveRecordConfig;
	private _period : number;
	private _delay : number;

	constructor() {
		super();

		this._period = 1000;
		this._delay = 0;
	}

	setUp() : void {
		if (!TSObject.exists(this._config)) {
			this._config = new ActiveRecordConfig(
				'yimello-test',
				'1.0',
				1 * 1024
			);

			ActiveRecordObject.init(this._config);
		}
	}

	tearDown(): void {
		this._delay += this._period;
	}

	ActiveRecordObjectGetWithConverterTest() : void {
		var timer : Timer;

		timer = new Timer(
			(o) => {
				// Arrange
				var createRequest : StringBuffer;
				var insertRequest1 : StringBuffer, insertRequest2 : StringBuffer;

				createRequest = new StringBuffer('CREATE TABLE people (');
				createRequest.append('id INT PRIMARY KEY NOT NULL, ');
				createRequest.append('firstName VARCHAR(255), ');
				createRequest.append('lastName VARCHAR(255))');

				insertRequest1 = new StringBuffer('INSERT INTO people VALUES(');
				insertRequest1.append('1, "Al", "Pacino")');

				insertRequest2 = new StringBuffer('INSERT INTO people VALUES(');
				insertRequest2.append('2, "Sean", "Connery")');

				ActiveRecordObject.executeSQL(
					'DROP TABLE IF EXISTS people',
					(r) => {
						ActiveRecordObject.executeSQL(
							createRequest.toString(),
							(r) => {
								ActiveRecordObject.executeSQL(
									insertRequest1.toString(),
									(r) => {
										ActiveRecordObject.executeSQL(
											insertRequest2.toString(),
											(r) => {
												// Act
												
												ActiveRecordObject.get(
													'people',
													(outcome) => {
														// Assert
														var p1 : ActiveRecordObjectTestUtils.Person;
														var p2 : ActiveRecordObjectTestUtils.Person;

														this.isTrue(TSObject.exists(outcome));
														this.areIdentical(2, outcome.getLength());

														p1 = new ActiveRecordObjectTestUtils.Person();
														p1.id = 1;
														p1.firstName = 'Al';
														p1.lastName = 'Pacino';
														this.isTrue(p1.equals(outcome.getAt(0)));

														p2 = new ActiveRecordObjectTestUtils.Person();
														p2.id = 2;
														p2.firstName = 'Sean';
														p2.lastName = 'Connery';
														this.isTrue(p2.equals(outcome.getAt(1)));

														ActiveRecordObject.executeSQL('DROP TABLE people');
													},
													ActiveRecordObjectTestUtils.Person.toPerson
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
			this._delay
		);
	}

	ActiveRecordObjectGetWithoutConverterTest() : void {
		this.fail();
	}

	ActiveRecordObjectInsertTest() : void {
		var timer : Timer;

		timer = new Timer(
			(o) => {
				// Arrange
				var data : IList<any>;
				var createRequest : StringBuffer;
				var expectedPerson : ActiveRecordObjectTestUtils.Person;

				expectedPerson = new ActiveRecordObjectTestUtils.Person();
				expectedPerson.id = 1;
				expectedPerson.firstName = 'Timothy';
				expectedPerson.lastName = 'Dalton';

				data = new ArrayList<any>();
				data.add(expectedPerson.id);
				data.add(expectedPerson.firstName);
				data.add(expectedPerson.lastName);

				createRequest = new StringBuffer('CREATE TABLE people (');
				createRequest.append('id INT PRIMARY KEY NOT NULL, ');
				createRequest.append('firstName VARCHAR(255), ');
				createRequest.append('lastName VARCHAR(255))');

				ActiveRecordObject.executeSQL(
					'DROP TABLE IF EXISTS people',
					(r) => {
						ActiveRecordObject.executeSQL(
							createRequest.toString(),
							(r) => {
								// Act
								ActiveRecordObject.insert(
									'people',
									data,
									(outcome) => {
										// Assert
										this.isTrue(outcome);

										ActiveRecordObject.executeSQL(
											'SELECT * FROM people',
											(outcome) => {
												var set : SQLRowSet;

												this.isTrue(TSObject.exists(outcome));

												set = outcome.getRows();
												this.isTrue(TSObject.exists(set));
												this.areIdentical(1, set.getLength());

												this.isTrue(
													expectedPerson.equals(ActiveRecordObjectTestUtils.Person.toPerson(set.item(0))));

												ActiveRecordObject.executeSQL('DROP TABLE people');
											}
										);
									}
								);
							}
						);
					}
				);
			},
			this._delay
		);
	}

	ActiveRecordObjectUpdateTest() : void {
		var timer : Timer;

		timer = new Timer(
			(o) => {
				// Arrange
				var createRequest : StringBuffer;
				var insertRequest : StringBuffer;
				var selector : Pair<string, any>;
				var data : IDictionary<string, any>;
				var expectedPerson : ActiveRecordObjectTestUtils.Person;

				createRequest = new StringBuffer('CREATE TABLE people (');
				createRequest.append('id INT PRIMARY KEY NOT NULL, ');
				createRequest.append('firstName VARCHAR(255), ');
				createRequest.append('lastName VARCHAR(255))');

				insertRequest = new StringBuffer('INSERT INTO people VALUES ');
				insertRequest.append('(1, "Sam", "Neill")');

				selector = new Pair<string, any>('id', 1);

				data = new Dictionary<string, any>();
				data.add('firstName', 'Harvey');
				data.add('lastName', 'Keitel');

				expectedPerson = new ActiveRecordObjectTestUtils.Person();
				expectedPerson.id = 1;
				expectedPerson.firstName = 'Harvey';
				expectedPerson.lastName = 'Keitel';

				ActiveRecordObject.executeSQL(
					'DROP TABLE IF EXISTS people',
					(r) => {
						ActiveRecordObject.executeSQL(
							createRequest.toString(),
							(r) => {
								ActiveRecordObject.executeSQL(
									insertRequest.toString(),
									(r) => {
										// Act
										ActiveRecordObject.update(
											'people',
											selector,
											data,
											(outcome) => {
												// Assert
												this.isTrue(outcome);

												ActiveRecordObject.executeSQL(
													'SELECT * FROM people',
													(outcome) => {
														var set : SQLRowSet;

														this.isTrue(TSObject.exists(outcome));

														set = outcome.getRows();
														this.isTrue(TSObject.exists(set));
														this.areIdentical(1, set.getLength());

														this.isTrue(
															expectedPerson.equals(
																ActiveRecordObjectTestUtils.Person.toPerson(set.item(0))
															)
														);

														ActiveRecordObject.executeSQL('DROP TABLE people');
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
			this._delay
		);
	}

	ActiveRecordObjectDeleteTest() : void {
		var timer : Timer;

		timer = new Timer(
			(o) => {
				// Arrange
				ActiveRecordObject.executeSQL(
					'DROP TABLE IF EXISTS people',
					(r) => {
						var createRequest : StringBuffer;

						createRequest = new StringBuffer('CREATE TABLE IF NOT EXISTS people ');
						createRequest.append('(id INTEGER PRIMARY KEY NOT NULL, ');
						createRequest.append('name VARCHAR(255) NOT NULL)');

						ActiveRecordObject.executeSQL(
							createRequest.toString(),
							(r) => {
								var insertRequest : StringBuffer;

								insertRequest = new StringBuffer('INSERT INTO people VALUES ');
								insertRequest.append('(1, "Bruce Willis")');

								ActiveRecordObject.executeSQL(
									insertRequest.toString(),
									(r) => {
										// Act
										ActiveRecordObject.delete(
											'people',
											new Pair<string, any>('id', 1),
											(outcome) => {
												// Assert
												this.isTrue(outcome);

												ActiveRecordObject.executeSQL('DROP TABLE people');
											}
										);
									}
								);
							}
						);
					}
				);
			},
			this._delay
		);
	}
}

UnitTestClass.handle(new ActiveRecordObjectTest());
