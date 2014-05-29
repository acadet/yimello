/// <reference path="test_dependencies.ts" />

class UnitTestClass extends tsUnit.TestClass {
	//region Fields

	//endregion Fields
	
	//region Constructors

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	static handle(u : UnitTestClass) : void {
		var test : tsUnit.Test = new tsUnit.Test();

		test.addTestClass(u);
		test.showResults(document.getElementById('outcome'), test.run());
	}

	//endregion Public Methods
	
	//endregion Methods
}
