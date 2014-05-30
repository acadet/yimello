/// <reference path="../test_dependencies.ts" />

class URLHelperTest extends UnitTestClass {
	setUp() : void {

	}

	tearDown() : void {

	}

	URLHelperIsValidTest() : void {
		// Arrange
		var s : string;
		var isValid : boolean;

		s = 'http://adriencadet.com';

		// Act
		isValid = URLHelper.isValid(s);

		// Assert
		this.isTrue(isValid);
	}

	URLHelperIsValidInvalidURLTest() : void {
		// Arrange
		var s : string;
		var isValid : boolean;

		s = 'badAddress57675';

		// Act
		isValid = URLHelper.isValid(s);

		// Assert
		this.isFalse(isValid);
	}
}

UnitTestClass.handle(new URLHelperTest());
