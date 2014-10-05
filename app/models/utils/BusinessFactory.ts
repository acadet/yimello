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

	static buildTag(callback : Action<ITagBusiness>) : void {
		if (!TSObject.exists(BusinessFactory._tag)) {
			DAOFactory.buildTag(
				(outcome) => {
					BusinessFactory._tag = new TagBusiness(outcome);

					callback(BusinessFactory._tag);
				}
			);
		} else {
			callback(BusinessFactory._tag);
		}
	}

	static buildBookmark(callback : Action<IBookmarkBusiness>) : void {
		if (!TSObject.exists(BusinessFactory._bookmark)) {
			DAOFactory.buildBookmark(
				(outcome) => {
					BusinessFactory._bookmark = new BookmarkBusiness(outcome);

					callback(BusinessFactory._bookmark);
				}
			);
		} else {
			callback(BusinessFactory._bookmark);
		}
	}

	static buildTagBookmark(callback : Action<ITagBookmarkBusiness>) : void {
		if (!TSObject.exists(BusinessFactory._tagBk)) {
			var args : TagBookmarkBusinessArgs;

			args = new TagBookmarkBusinessArgs();

			DAOFactory.buildTag(
				(tagDAO) => {
					args.setTagDAO(tagDAO);

					DAOFactory.buildBookmark(
						(bookmarkDAO) => {
							args.setBookmarkDAO(bookmarkDAO);

							DAOFactory.buildTagBookmark(
								(tgBkDAO) => {
									args.setTagBookmarkDAO(tgBkDAO);

									InternalBusinessFactory.buildTag(
										(tagBusiness) => {
											args.setTagBusiness(tagBusiness);

											InternalBusinessFactory.buildBookmark(
												(bkBusiness) => {
													args.setBookmarkBusiness(bkBusiness);

													BusinessFactory._tagBk = new TagBookmarkBusiness(args);
													callback(BusinessFactory._tagBk);
												}
											);
										}
									);
								}
							);
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
