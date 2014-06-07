/// <reference path="test_dependencies.ts" />

class UnitTestClass extends tsUnit.TestClass {
	//region Fields

	private static _classes : IList<UnitTestClass>;

	private static _delay : number = 0;

	//endregion Fields
	
	//region Constructors

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	static getDelay() : number {
		return UnitTestClass._delay;
	}

	static increaseDelay() : void {
		UnitTestClass._delay += 300;
	}

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
	}

	//endregion Public Methods
	
	//endregion Methods
}
