/// <reference path="../../dependencies.ts" />

class BookmarkDAO extends DataAccessObject {
	//region Fields
	
	private _url : string;
	private _title : string;
	private _description : string;

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	getURL() : string {
		return this._url;
	}

	setURL(u : string) : BookmarkDAO {
		this._url = u;
		return this;
	}

	getTitle() : string {
		return this._title;
	}

	setTitle(t : string) : BookmarkDAO {
		this._title = t;
		return this;
	}

	getDescription() : string {
		return this._description;
	}

	setDescription(d : string) : BookmarkDAO {
		this._description = d;
		return this;
	}

	//endregion Public Methods
	
	//endregion Methods
}
