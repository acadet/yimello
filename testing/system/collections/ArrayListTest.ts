/// <reference path="../../test_dependencies.ts" />

class ArrayListTest extends UnitTestClass {
	private _list : ArrayList<number>;

	setUp() : void {
		this._list = new ArrayList<number>();
	}

	tearDown() : void {
		this._list = null;
	}

	ArrayListAddTest() : void {
		// Arrange
		var i : number = 7;
		var a : Array<number>;

		// Act
		this._list.add(i);

		// Assert
		a = this._list.toArray();
		this.isTrue(TSObject.exists(a));
		this.areIdentical(1, a.length);
		this.areIdentical(i, a[0]);
	}

	ArrayListCloneTest() : void {
		// Arrange
		var a : Array<number>, b : Array<number>;
		var clonedList : IList<number>;

		this._list.add(5);
		this._list.add(12);

		// Act
		clonedList = this._list.clone();

		// Assert
		a = this._list.toArray();
		b = clonedList.toArray();
		this.isTrue(TSObject.exists(a));
		this.isTrue(TSObject.exists(b));
		this.areIdentical(2, a.length);
		this.areIdentical(2, b.length);
		this.areIdentical(a[0], b[0]);
		this.areIdentical(a[1], b[1]);
	}

	ArrayListFindFirstTest() : void {
		// Arrange
		var i : number;

		this._list.add(5);
		this._list.add(4);
		this._list.add(6);

		// Act
		i = this._list.findFirst(x => x < 5);

		// Assert
		this.areIdentical(4, i);
	}

	ArrayListFindFirstNullTest() : void {
		// Arrange
		var i : number;

		this._list.add(5);
		this._list.add(4);
		this._list.add(6);

		// Act
		i = this._list.findFirst(x => x < 4);

		// Assert
		this.isTrue(i == null);
	}

	ArrayListForEachTest() : void {
		// Arrange
		var acc : number = 0;
		
		this._list.add(3);
		this._list.add(4);
		this._list.add(5);

		// Act
		this._list.forEach(
			(x) => {
				if (x < 5) {
					acc++;
				}
			}
		);

		// Assert
		this.areIdentical(2, acc);
	}

	ArrayListGetAtTest() : void {
		// Arrange
		var i : number;

		this._list.add(3);
		this._list.add(4);

		// Act
		i = this._list.getAt(1);

		// Assert
		this.areIdentical(4, i);
	}

	ArrayListGetLengthTest() : void {
		// Arrange
		var l : number;
		
		this._list.add(3);
		this._list.add(4);

		// Act
		l = this._list.getLength();

		// Assert
		this.areIdentical(2, l);
	}

	ArrayListGetLengthEmptyListTest() : void {
		// Arrange
		var l : number;

		// Act
		l = this._list.getLength();

		// Assert
		this.areIdentical(0, l);
	}

	ArrayListInsertAtTest() : void {
		// Arrange
		var a : Array<number>;

		this._list.add(3);
		this._list.add(5);

		// Act
		this._list.insertAt(1, 4);

		// Assert
		a = this._list.toArray();
		this.isTrue(TSObject.exists(a));
		this.areIdentical(3, a.length);
		this.areIdentical(3, a[0]);
		this.areIdentical(4, a[1]);
		this.areIdentical(5, a[2]);
	}

	ArrayListInsertAtAppendTest() : void {
		// Arrange
		var a : Array<number>;

		this._list.add(3);
		this._list.add(4);

		// Act
		this._list.insertAt(2, 5);

		// Assert
		a = this._list.toArray();
		this.isTrue(TSObject.exists(a));
		this.areIdentical(3, a.length);
		this.areIdentical(3, a[0]);
		this.areIdentical(4, a[1]);
		this.areIdentical(5, a[2]);
	}

	ArrayListInsertAtAppendEmptyListTest() : void {
		// Arrange
		var a : Array<number>;

		// Act
		this._list.insertAt(0, 5);

		// Assert
		a = this._list.toArray();
		this.isTrue(TSObject.exists(a));
		this.areIdentical(1, a.length);
		this.areIdentical(5, a[0]);
	}

	ArrayListInsertAtNegativeIndexTest() : void {
		// Arrange
		
		// Act
		this.throws(
			() => {
				this._list.insertAt(-5, 2);
			}
		);

		// Assert
	}

	ArrayListInsertAtBadIndexTest() : void {
		// Arrange
		
		// Act
		this.throws(
			() => {
				this._list.insertAt(5, 2);
			}
		);

		// Assert
	}

	ArrayListMapTest() : void {
		// Arrange
		var a : Array<number>;

		this._list.add(1);
		this._list.add(2);
		this._list.add(3);

		// Act
		this._list.map(x => x * x);

		// Assert
		a = this._list.toArray();
		this.isTrue(TSObject.exists(a));
		this.areIdentical(3, a.length);
		this.areIdentical(1, a[0]);
		this.areIdentical(4, a[1]);
		this.areIdentical(9, a[2]);
	}

	ArrayListRemoveTest() : void {
		// Arrange
		var a : Array<number>;

		this._list.add(1);
		this._list.add(2);
		this._list.add(3);

		// Act
		this._list.remove(2);

		// Assert
		a = this._list.toArray();
		this.isTrue(TSObject.exists(a));
		this.areIdentical(2, a.length);
		this.areIdentical(1, a[0]);
		this.areIdentical(3, a[1]);
	}

	ArrayListRemoveUnvalidValueTest() : void {
		// Arrange
		var a : Array<number>;

		this._list.add(1);
		this._list.add(2);
		this._list.add(3);

		// Act
		this.throws(() => this._list.remove(5));
	}

	ArrayListToArrayTest() : void {
		// Arrange
		var a : Array<number>;

		this._list.add(1);
		this._list.add(2);
		this._list.add(3);

		// Act
		a = this._list.toArray();

		// Assert
		this.isTrue(TSObject.exists(a));
		this.areIdentical(3, a.length);
		this.areIdentical(1, a[0]);
		this.areIdentical(2, a[1]);
		this.areIdentical(3, a[2]);
	}
}

UnitTestClass.handle(new ArrayListTest());
