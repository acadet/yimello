/// <reference path="../../../dependencies.ts" />

class BusinessMediator {
	//region Fields
	
	private static _bookmarkBusiness : IBookmarkBusiness;
	private static _tagBusiness : ITagBusiness;
	private static _tagBookmarkBusiness : ITagBookmarkBusiness;

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	static getBookmarkBusiness() : IBookmarkBusiness {
		if (!TSObject.exists(BusinessMediator._bookmarkBusiness)) {
			this._bookmarkBusiness = new BookmarkBusiness();
		}
		return BusinessMediator._bookmarkBusiness;
	}

	static getTagBusiness() : ITagBusiness {
		if (!TSObject.exists(BusinessMediator._tagBusiness)) {
			this._tagBusiness = new TagBusiness();
		}

		return BusinessMediator._tagBusiness;
	}

	static getTagBookmarkBusiness() : ITagBookmarkBusiness {
		if (!TSObject.exists(BusinessMediator._tagBookmarkBusiness)) {
			this._tagBookmarkBusiness = new TagBookmarkBusiness();
		}

		return BusinessMediator._tagBookmarkBusiness;
	}

	//endregion Public Methods
	
	//endregion Methods
}
