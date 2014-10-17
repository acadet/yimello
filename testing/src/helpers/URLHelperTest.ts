/// <reference path="../references.ts" />

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
		Assert.isTrue(isValid);
	}

	URLHelperIsValidInvalidURLTest() : void {
		// Arrange
		var s : string;
		var isValid : boolean;

		s = 'badAddress57675';

		// Act
		isValid = URLHelper.isValid(s);

		// Assert
		Assert.isFalse(isValid);
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
		Assert.areEqual(expected, outcome);
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
		Assert.areEqual(expected, outcome);
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
		Assert.areEqual(expected, outcome);
	}
}
