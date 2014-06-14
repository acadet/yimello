/// <reference path="../../test_dependencies.ts" />

module DictionaryTestUtils {
	export class Person extends TSObject {
		firstName : string;
		lastName : string;

		constructor(firstName : string = null, lastName : string = null) {
			super();

			this.firstName = firstName;
			this.lastName = lastName;
		}

		equals(p : Person) {
			return StringHelper.compare(this.firstName, p.firstName)
			&& StringHelper.compare(this.lastName, p.lastName);
		}
	}
}

import Person = DictionaryTestUtils.Person;

class DictionaryTest extends UnitTestClass {
	private _dict : Dictionary<string, Person>;

	setUp() : void {
		this._dict = new Dictionary<string, Person>();
	}

	tearDown() : void {
		this._dict = null;
	}

	DictionaryAddTest() : void {
		// Arrange
		var p1 : Person, p2 : Person;

		p1 = new Person('Bruce', 'Willis');
		p2 = new Person('Mickey', 'Rourke');

		// Act
		this._dict.add(p1.lastName, p1);
		this._dict.add(p2.lastName, p2);

		// Assert
		this.areIdentical(2, this._dict.getLength());
		this.isTrue(p1.equals(this._dict.get(p1.lastName)));
		this.isTrue(p2.equals(this._dict.get(p2.lastName)));
	}

	DictionaryCloneTest() : void {
		// Arrange
		var p1 : Person, p2 : Person;
		var outcome : IDictionary<string, Person>;

		p1 = new Person('Bruce', 'Willis');
		p2 = new Person('Mickey', 'Rourke');
		this._dict.add(p1.lastName, p1);
		this._dict.add(p2.lastName, p2);

		// Act
		outcome = this._dict.clone();

		// Assert
		this.isTrue(TSObject.exists(outcome));
		this.areIdentical(this._dict.getLength(), outcome.getLength());
		this.areIdentical(this._dict.get(p1.lastName), outcome.get(p1.lastName));
		this.areIdentical(this._dict.get(p2.lastName), outcome.get(p2.lastName));
	}

	DictionaryContainsKeyTest() : void {
		// Arrange
		var p : Person;
		var b : boolean;

		p = new Person('Al', 'Pacino');
		this._dict.add(p.lastName, p);

		// Act
		b = this._dict.containsKey(p.lastName);

		// Assert
		this.isTrue(b);
	}

	DictionaryContainsKeyMissingKeyTest() : void {
		// Arrange
		var p : Person;
		var b : boolean;

		p = new Person('Al', 'Pacino');
		this._dict.add(p.lastName, p);

		// Act
		b = this._dict.containsKey('foo');

		// Assert
		this.isFalse(b);
	}

	DictionaryForEachTest() : void {
		// Arrange
		var acc : StringBuffer;
		var p1 : Person, p2 : Person, p3 : Person, p4 : Person;

		p1 = new Person('John', 'Lennon');
		p2 = new Person('Paul', 'McCartney');
		p3 = new Person('Ringo', 'Starr');
		p4 = new Person('George', 'Harrison');
		this._dict.add(p1.lastName, p1);
		this._dict.add(p2.lastName, p2);
		this._dict.add(p3.lastName, p3);
		this._dict.add(p4.lastName, p4);

		acc = new StringBuffer();

		// Act
		this._dict.forEach((k, v) => acc.append(v.firstName));

		// Assert
		this.isTrue(StringHelper.compare('JohnPaulRingoGeorge', acc.toString()));
	}

	DictionaryGetTest()  : void {
		// Arrange
		var p : Person, outcome : Person;

		p = new Person('Samuel L.', 'Jackson');
		this._dict.add(p.lastName, p);

		// Act
		outcome = this._dict.get(p.lastName);

		// Assert
		this.isTrue(p.equals(outcome));
	}

	DictionaryGetFailTest() : void {
		// Arrange
		var p : Person, outcome : Person;

		p = new Person('Samuel L.', 'Jackson');
		this._dict.add(p.lastName, p);

		// Act & Assert
		this.throws(
			() => {
				outcome = this._dict.get('foo');
			}
		);
	}

	DictionaryGetLengthTest() : void {
		// Arrange
		var p1 : Person, p2 : Person, p3 : Person, p4 : Person;
		var n : number;

		p1 = new Person('John', 'Lennon');
		p2 = new Person('Paul', 'McCartney');
		p3 = new Person('Ringo', 'Starr');
		p4 = new Person('George', 'Harrison');
		this._dict.add(p1.lastName, p1);
		this._dict.add(p2.lastName, p2);
		this._dict.add(p3.lastName, p3);
		this._dict.add(p4.lastName, p4);

		// Act
		n = this._dict.getLength();

		// Assert
		this.areIdentical(4, n);
	}

	DictionaryGetLengthEmptyListTest() : void {
		// Arrange
		var n : number;

		// Act
		n = this._dict.getLength();

		// Assert
		this.areIdentical(0, n);
	}
}

UnitTestClass.handle(new DictionaryTest());
