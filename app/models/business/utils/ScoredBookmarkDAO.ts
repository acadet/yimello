/// <reference path="../../../dependencies.ts" />

class ScoredBookmarkDAO extends BookmarkDAO {
	//region Fields
	
	private _score : number;

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	getScore() : number {
		return this._score;
	}

	setScore(value : number) : ScoredBookmarkDAO {
		this._score = value;
		return this;
	}

	//endregion Public Methods
	
	//endregion Methods
}
