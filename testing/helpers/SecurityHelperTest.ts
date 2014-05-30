/// <reference path="../test_dependencies.ts" />

class SecurityHelperTest extends UnitTestClass {
	setUp() : void {

	}

	tearDown() : void {

	}

	SecurityHelperDisarmTest() : void {
		// Arrange
		var s : string;
		var expected : string;
		var outcome : string;

		s = '<script>alert("I\'ve broken your website!");</script>';
		expected = '&lt;script&gt;alert("I\'ve broken your website!");&lt;/script&gt;';

		// Act
		outcome = SecurityHelper.disarm(s);

		// Assert
		this.areIdentical(expected.toLowerCase(), outcome.toLowerCase());
	}
}

UnitTestClass.handle(new SecurityHelperTest());
