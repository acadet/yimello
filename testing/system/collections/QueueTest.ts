/// <reference path="../../test_dependencies.ts" />

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
		this.areIdentical(2, this._queue.getLength());
	}

	QueueTopTest() : void {
		// Arrange
		var i : number;

		this._queue.push(56);
		this._queue.push(45);

		// Act
		i = this._queue.top();

		// Assert
		this.areIdentical(56, i);
	}

	QueuePopTest() : void {
		// Arrange
		var i : number;

		this._queue.push(56);
		this._queue.push(45);

		// Act
		i = this._queue.top();

		// Assert
		this.areIdentical(56, i);
		this.areIdentical(1, this._queue.getLength());
	}
}
