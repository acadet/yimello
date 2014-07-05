/// <reference path="../../dependencies.ts" />

class PresenterMediator extends TSObject {
	//region Fields
	
	private static _currentInstance : Presenter;
	private static _hasResumed : boolean;
	private static _tagBusiness : ITagBusiness;
	private static _bookmarkBusiness : IBookmarkBusiness;
	private static _tagBookmarkBusiness : ITagBookmarkBusiness;

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	static getInstance() : Presenter {
		return PresenterMediator._currentInstance;
	}

	static setInstance(p : Presenter) : void {
		PresenterMediator._currentInstance = p;
		PresenterMediator._hasResumed = false;
	}

	static hasResumed() : boolean {
		return PresenterMediator._hasResumed;
	}

	static setResumed(b : boolean) : void {
		PresenterMediator._hasResumed = b;
	}

	static getBookmarkBusiness() : IBookmarkBusiness {
		if (!TSObject.exists(PresenterMediator._bookmarkBusiness)) {
			PresenterMediator._bookmarkBusiness = new BookmarkBusiness();
		}

		return PresenterMediator._bookmarkBusiness;
	}

	static getTagBusiness() : ITagBusiness {
		if (!TSObject.exists(PresenterMediator._tagBusiness)) {
			PresenterMediator._tagBusiness = new TagBusiness();
		}

		return PresenterMediator._tagBusiness;
	}

	static getTagBookmarkBusiness() : ITagBookmarkBusiness {
		if (!TSObject.exists(PresenterMediator._tagBookmarkBusiness)) {
			PresenterMediator._tagBookmarkBusiness = new TagBookmarkBusiness();
		}

		return PresenterMediator._tagBookmarkBusiness;
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
