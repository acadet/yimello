/// <reference path="../../references.ts" />

class QueueTest extends UnitTestClass {
	private _queue : Queue<number>;

	setUp() : void {
		this._queue = new Queue<number>();
	}

	tearDown() : void {
		this._queue = null;
	}

	QueuePushTest() : void {
		// Arrange

		// Act
		this._queue.push(10);
		this._queue.push(45);

		// Assert
		Assert.areEqual(2, this._queue.getLength());
	}

	QueueTopTest() : void {
		// Arrange
		var i : number;

		this._queue.push(56);
		this._queue.push(45);

		// Act
		i = this._queue.top();

		// Assert
		Assert.areEqual(56, i);
	}

	QueuePopTest() : void {
		// Arrange
		var i : number;

		this._queue.push(56);
		this._queue.push(45);

		// Act
		i = this._queue.pop();

		// Assert
		Assert.areEqual(56, i);
		Assert.areEqual(1, this._queue.getLength());
	}
}
