/// <reference path="../dependencies.ts" />

class YimelloPresenter extends Presenter {
	//region Fields
	
	private _bookmarkBusiness : IBookmarkBusiness;
	private _tagBusiness : ITagBusiness;

	//endregion Fields
	
	//region Constructors
	
	constructor() {
		super();

		this._bookmarkBusiness = new BookmarkBusiness();
		this._tagBusiness = new TagBusiness();
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	getBookmarkBusiness() : IBookmarkBusiness {
		return this._bookmarkBusiness;
	}

	getTagBusiness() : ITagBusiness {
		return this._tagBusiness;
	}

	//endregion Public Methods
	
	//endregion Methods
}
