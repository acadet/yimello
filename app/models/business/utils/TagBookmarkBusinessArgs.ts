/// <reference path="../../../dependencies.ts" />

class TagBookmarkBusinessArgs {
	//region Fields

	private _tagDao : ITagDAO;

	private _bookmarkDAO : IBookmarkDAO;

	private _tagBookmarkDAO : ITagBookmarkDAO;

	private _tagBusiness : IInternalTagBusiness;

	private _bookmarkBusiness : IInternalBookmarkBusiness;
	
	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	getTagDAO() : ITagDAO {
		return this._tagDao;
	}

	setTagDAO(value : ITagDAO) : TagBookmarkBusinessArgs {
		this._tagDao = value;
		return this;
	}

	getBookmarkDAO() : IBookmarkDAO {
		return this._bookmarkDAO;
	}

	setBookmarkDAO(value : IBookmarkDAO) : TagBookmarkBusinessArgs {
		this._bookmarkDAO = value;
		return this;
	}

	getTagBookmarkDAO() : ITagBookmarkDAO {
		return this._tagBookmarkDAO;
	}

	setTagBookmarkDAO(value : ITagBookmarkDAO) : TagBookmarkBusinessArgs {
		this._tagBookmarkDAO = value;
		return this;
	}

	getTagBusiness() : IInternalTagBusiness {
		return this._tagBusiness;
	}

	setTagBusiness(value : IInternalTagBusiness) : TagBookmarkBusinessArgs {
		this._tagBusiness = value;
		return this;
	}

	getBookmarkBusiness() : IInternalBookmarkBusiness {
		return this._bookmarkBusiness;
	}

	setBookmarkBusiness(value : IInternalBookmarkBusiness) : TagBookmarkBusinessArgs {
		this._bookmarkBusiness = value;
		return this;
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
