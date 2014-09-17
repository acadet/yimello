/// <reference path="../../dependencies.ts" />

class BusinessFactory {
	//region Fields

	private static _tag : ITagBusiness;

	private static _bookmark : IBookmarkBusiness;

	private static _tagBk : ITagBookmarkBusiness;
	
	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	public buildTag(callback : Action<ITagBusiness>) : void {
		if (!TSObject.exists(BusinessFactory._tag)) {
			new DAOFactory().buildTag(
				(outcome) => {
					BusinessFactory._tag = new TagBusiness(outcome);

					callback(BusinessFactory._tag);
				}
			);
		} else {
			callback(BusinessFactory._tag);
		}
	}

	public buildBookmark(callback : Action<IBookmarkBusiness>) : void {
		if (!TSObject.exists(BusinessFactory._bookmark)) {
			new DAOFactory().buildBookmark(
				(outcome) => {
					BusinessFactory._bookmark = new BookmarkBusiness(outcome);

					callback(BusinessFactory._bookmark);
				}
			);
		} else {
			callback(BusinessFactory._bookmark);
		}
	}

	public buildTagBookmark(callback : Action<ITagBookmarkBusiness>) : void {
		if (!TSObject.exists(BusinessFactory._tagBk)) {
			var factory : DAOFactory;

			factory = new DAOFactory();

			factory.buildTag(
				(tagDAO) => {
					factory.buildBookmark(
						(bookmarkDAO) => {
							BusinessFactory._tagBk = new TagBookmarkBusiness(tagDAO, bookmarkDAO);

							callback(BusinessFactory._tagBk);
						}
					);
				}
			);
		} else {
			callback(BusinessFactory._tagBk);
		}
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
