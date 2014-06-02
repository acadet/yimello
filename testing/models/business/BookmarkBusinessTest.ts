/// <reference path="../../test_dependencies.ts" />

class BookmarkBusinessTest extends UnitTestClass {
	private _business : BookmarkBusiness;

	setUp() : void {
		this._business = new BookmarkBusiness();
	}

	tearDown() : void {
		this._business = null;
	}

	BookmarkBusinessCreateFromURLTest() {
		// Arrange
		var url : string = 'http://google.fr';

		// Act
		this._business.createFromURL(
			url,
			(outcome) => {
				// Assert
				this.isTrue(TSObject.exists(outcome));
				this.areIdentical(url, outcome.getURL());
				this.areIdentical('Google', outcome.getTitle());
			}
		);
	}
}

UnitTestClass.handle(new BookmarkBusinessTest());
