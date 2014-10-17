/// <reference path="../references.ts" />

class URLDetailsProviderTest extends UnitTestClass {
	setUp() : void {

	}

	tearDown() : void {

	}

	URLDetailsProviderGetDetailsAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var url : string;

		url = 'http://google.fr';

		// Act
		URLDetailsProvider.getDetails(
			url,
			(title, description) => {
				// Assert
				Assert.areEqual('Google', title);
				obs.success();
			},
			(type, msg) => {
				obs.fail(new Error(msg));
			}
		);
	}

	URLDetailsProviderGetDetailsBadURLAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var url : string = 'ABadUrl';

		// Act
		URLDetailsProvider.getDetails(
			url,
			(title, description) => {
				obs.fail();
			},
			(type, msg) => {
				// Assert
				Assert.areEqual(URLDetailsProviderError.BadURL, type);
				obs.success();
			}
		);
	}
}
