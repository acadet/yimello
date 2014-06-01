/// <reference path="../dependencies.ts" />

class YimelloPresenter extends Presenter {
	//region Fields
	
	private _bookmarkBusiness : IBookmarkBusiness;

	//endregion Fields
	
	//region Constructors
	
	constructor() {
		super();

		this._bookmarkBusiness = new BookmarkBusiness();
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	getBookmarkBusiness() : IBookmarkBusiness {
		return this._bookmarkBusiness;
	}

	//endregion Public Methods
	
	//endregion Methods
}
