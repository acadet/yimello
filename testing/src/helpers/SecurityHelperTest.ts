/// <reference path="../references.ts" />

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
		expected = '&lt;script&gt;alert(&quot;I\'ve broken your website!&quot;);&lt;/script&gt;';

		// Act
		outcome = SecurityHelper.disarm(s);

		// Assert
		Assert.isTrue(StringHelper.compare(expected, outcome));
	}
}
