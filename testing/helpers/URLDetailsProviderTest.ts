/// <reference path="../test_dependencies.ts" />

class URLDetailsProviderTest extends UnitTestClass {
	setUp() : void {

	}

	tearDown() : void {

	}

	URLDetailsProviderGetDetailsTest() : void {
		// Arrange
		var url : string;

		url = 'http://google.fr';

		// Act
		URLDetailsProvider.getDetails(
			url,
			(title, description) => {
				// Assert
				this.areIdentical('Google', title);
			},
			(type, msg) => {
				Log.error(
					new Exception(
						'Error occured in URLDetailsProvider with type ' + type + ' and following message: ' + msg
					)
				);
				this.fail();
			}
		);
	}

	URLDetailsProviderGetDetailsBadURLTest() : void {
		// Arrange
		var url : string = 'ABadUrl';

		// Act
		URLDetailsProvider.getDetails(
			url,
			(title, description) => {
				this.fail();
			},
			(type, msg) => {
				// Assert
				this.areIdentical(URLDetailsProviderError.BadURL, type);
			}
		);
	}
}

UnitTestClass.handle(new URLDetailsProviderTest());
