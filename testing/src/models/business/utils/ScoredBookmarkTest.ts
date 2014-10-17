/// <reference path="../../../references.ts" />

class ScoredBookmarkTest extends UnitTestClass {
	private _bookmark : ScoredBookmark;

	setUp() : void {
		this._bookmark = new ScoredBookmark();
	}

	tearDown() : void {
		this._bookmark = null;
	}

	ScoredBookmarkScoreTest() : void {
		// Arrange
		var value : number, outcome : number;

		value = 566.87;
	
		// Act
		this._bookmark.setScore(value);
		outcome = this._bookmark.getScore();
	
		// Assert
		Assert.areEqual(value, outcome);
	}
}
