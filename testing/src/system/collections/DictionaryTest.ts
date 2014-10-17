/// <reference path="../../references.ts" />

class DictionaryTest extends UnitTestClass {
	private _dict : Dictionary<string, Mocks.Utils.Person>;

	setUp() : void {
		this._dict = new Dictionary<string, Mocks.Utils.Person>();
	}

	tearDown() : void {
		this._dict = null;
	}

	DictionaryAddTest() : void {
		// Arrange
		var p1 : Mocks.Utils.Person, p2 : Mocks.Utils.Person;

		p1 = new Mocks.Utils.Person('Bruce', 'Willis');
		p2 = new Mocks.Utils.Person('Mickey', 'Rourke');

		// Act
		this._dict.add(p1.lastName, p1);
		this._dict.add(p2.lastName, p2);

		// Assert
		Assert.areEqual(2, this._dict.getLength());
		Assert.isTrue(p1.equals(this._dict.get(p1.lastName)));
		Assert.isTrue(p2.equals(this._dict.get(p2.lastName)));
	}

	DictionaryCloneTest() : void {
		// Arrange
		var p1 : Mocks.Utils.Person, p2 : Mocks.Utils.Person;
		var outcome : IDictionary<string, Mocks.Utils.Person>;

		p1 = new Mocks.Utils.Person('Bruce', 'Willis');
		p2 = new Mocks.Utils.Person('Mickey', 'Rourke');
		this._dict.add(p1.lastName, p1);
		this._dict.add(p2.lastName, p2);

		// Act
		outcome = this._dict.clone();

		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual(this._dict.getLength(), outcome.getLength());
		Assert.areEqual(this._dict.get(p1.lastName), outcome.get(p1.lastName));
		Assert.areEqual(this._dict.get(p2.lastName), outcome.get(p2.lastName));
	}

	DictionaryContainsKeyTest() : void {
		// Arrange
		var p : Mocks.Utils.Person;
		var b : boolean;

		p = new Mocks.Utils.Person('Al', 'Pacino');
		this._dict.add(p.lastName, p);

		// Act
		b = this._dict.containsKey('Pacino');

		// Assert
		Assert.isTrue(b);
	}

	DictionaryContainsKeyMissingKeyTest() : void {
		// Arrange
		var p : Mocks.Utils.Person;
		var b : boolean;

		p = new Mocks.Utils.Person('Al', 'Pacino');
		this._dict.add(p.lastName, p);

		// Act
		b = this._dict.containsKey('foo');

		// Assert
		Assert.isFalse(b);
	}

	DictionaryForEachTest() : void {
		// Arrange
		var acc : StringBuffer;
		var p1 : Mocks.Utils.Person, p2 : Mocks.Utils.Person, p3 : Mocks.Utils.Person, p4 : Mocks.Utils.Person;

		p1 = new Mocks.Utils.Person('John', 'Lennon');
		p2 = new Mocks.Utils.Person('Paul', 'McCartney');
		p3 = new Mocks.Utils.Person('Ringo', 'Starr');
		p4 = new Mocks.Utils.Person('George', 'Harrison');
		this._dict.add(p1.lastName, p1);
		this._dict.add(p2.lastName, p2);
		this._dict.add(p3.lastName, p3);
		this._dict.add(p4.lastName, p4);

		acc = new StringBuffer();

		// Act
		this._dict.forEach((k, v) => acc.append(v.firstName));

		// Assert
		Assert.isTrue(StringHelper.compare('JohnPaulRingoGeorge', acc.toString()));
	}

	DictionaryGetTest()  : void {
		// Arrange
		var p : Mocks.Utils.Person, outcome : Mocks.Utils.Person;

		p = new Mocks.Utils.Person('Samuel L.', 'Jackson');
		this._dict.add(p.lastName, p);

		// Act
		outcome = this._dict.get(p.lastName);

		// Assert
		Assert.isTrue(p.equals(outcome));
	}

	DictionaryGetFailTest() : void {
		// Arrange
		var p : Mocks.Utils.Person, outcome : Mocks.Utils.Person;

		p = new Mocks.Utils.Person('Samuel L.', 'Jackson');
		this._dict.add(p.lastName, p);

		// Act & Assert
		Assert.throws(
			() => {
				outcome = this._dict.get('foo');
			}
		);
	}

	DictionaryGetLengthTest() : void {
		// Arrange
		var p1 : Mocks.Utils.Person, p2 : Mocks.Utils.Person, p3 : Mocks.Utils.Person, p4 : Mocks.Utils.Person;
		var n : number;

		p1 = new Mocks.Utils.Person('John', 'Lennon');
		p2 = new Mocks.Utils.Person('Paul', 'McCartney');
		p3 = new Mocks.Utils.Person('Ringo', 'Starr');
		p4 = new Mocks.Utils.Person('George', 'Harrison');
		this._dict.add(p1.lastName, p1);
		this._dict.add(p2.lastName, p2);
		this._dict.add(p3.lastName, p3);
		this._dict.add(p4.lastName, p4);

		// Act
		n = this._dict.getLength();

		// Assert
		Assert.areEqual(4, n);
	}

	DictionaryGetLengthEmptyListTest() : void {
		// Arrange
		var n : number;

		// Act
		n = this._dict.getLength();

		// Assert
		Assert.areEqual(0, n);
	}
}
