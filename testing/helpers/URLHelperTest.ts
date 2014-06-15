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

	URLHelperBuildAbsoluteTest() : void {
		// Arrange
		var url : string = 'http://google.fr/';
		var s : string = 'favicon.ico';
		var expected : string = 'http://google.fr/favicon.ico';
		var outcome : string;

		// Act
		outcome = URLHelper.buildAbsolute(s, url);

		// Assert
		this.areIdentical(expected, outcome);
	}

	URLHelperBuildAbsoluteWithoutSlashTest() : void {
		// Arrange
		var url : string = 'http://google.fr';
		var s : string = 'favicon.ico';
		var expected : string = 'http://google.fr/favicon.ico';
		var outcome : string;

		// Act
		outcome = URLHelper.buildAbsolute(s, url);

		// Assert
		this.areIdentical(expected, outcome);
	}

	URLHelperBuildAbsoluteAlreadyAbsoluteTest() : void {
		// Arrange
		var url : string = 'http://google.fr/';
		var s : string = 'http://google.fr/favicon.ico';
		var expected : string = 'http://google.fr/favicon.ico';
		var outcome : string;

		// Act
		outcome = URLHelper.buildAbsolute(s, url);

		// Assert
		this.areIdentical(expected, outcome);
	}
}

UnitTestClass.handle(new URLHelperTest());
