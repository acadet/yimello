/// <reference path="test_dependencies.ts" />

class UnitTestClass extends tsUnit.TestClass {
	//region Fields

	private static _classes : IList<UnitTestClass>;

	private static _queue : Queue<Action0>;

	//endregion Fields
	
	//region Constructors

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private static _executeQueueFunc(f : Action0) : void {
		DataAccessObject.clean((s) => f());
	}

	//endregion Private Methods
	
	//region Public Methods

	static handle(u : UnitTestClass) : void {
		if (!TSObject.exists(UnitTestClass._classes)) {
			UnitTestClass._classes = new ArrayList<UnitTestClass>();
		}
		UnitTestClass._classes.add(u);
	}

	static run() : void {
		var test : tsUnit.Test = new tsUnit.Test();

		if (TSObject.exists(UnitTestClass._classes)) {
			UnitTestClass._classes.forEach((e) => {
				test.addTestClass(e);
			});
		}
		
		test.showResults(document.getElementById('outcome'), test.run());
		if (TSObject.exists(UnitTestClass._queue)) {
			if (UnitTestClass._queue.getLength() > 0) {
				UnitTestClass._executeQueueFunc(UnitTestClass._queue.pop());
			}
		}
	}

	static queue(f : Action0) : void {
		if (!TSObject.exists(UnitTestClass._queue)) {
			UnitTestClass._queue = new Queue<Action0>();
		}

		UnitTestClass._queue.push(f);
	}

	static done() : void {
		if (!TSObject.exists(UnitTestClass._queue)) {
			Log.error(new Exception('Unable to call done: no functions have been queued'));
			return;
		}

		if (UnitTestClass._queue.getLength() > 0) {
			UnitTestClass._executeQueueFunc(UnitTestClass._queue.pop());
		} else {
			Log.inform('Last test was done');
		}
	}

	//endregion Public Methods
	
	//endregion Methods
}
