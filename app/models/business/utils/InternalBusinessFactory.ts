/// <reference path="../../../dependencies.ts" />

class InternalBusinessFactory {
	//region Fields

	private static _tag : IInternalTagBusiness;

	private static _bookmark : IInternalBookmarkBusiness;
	
	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	static buildTag(callback : Action<IInternalTagBusiness>) : void {
		if (!TSObject.exists(InternalBusinessFactory._tag)) {
			DAOFactory.buildTag(
				(outcome) => {
					InternalBusinessFactory._tag = new TagBusiness(outcome);

					callback(InternalBusinessFactory._tag);
				}
			);
		} else {
			callback(InternalBusinessFactory._tag);
		}
	}

	static buildBookmark(callback : Action<IInternalBookmarkBusiness>) : void {
		if (!TSObject.exists(InternalBusinessFactory._bookmark)) {
			DAOFactory.buildBookmark(
				(outcome) => {
					InternalBusinessFactory._bookmark = new BookmarkBusiness(outcome);

					callback(InternalBusinessFactory._bookmark);
				}
			);
		} else {
			callback(InternalBusinessFactory._bookmark);
		}
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
