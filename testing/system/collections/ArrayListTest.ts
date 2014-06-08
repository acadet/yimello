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
}

UnitTestClass.handle(new ArrayListTest());
