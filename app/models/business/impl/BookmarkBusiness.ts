/// <reference path="../../../dependencies.ts" />

class BookmarkBusiness implements IBookmarkBusiness {
	//region Fields
	
	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	createFromURL(url : string, callback : Action<BookmarkDAO> = null) : void {
		URLDetailsProvider.getDetails(
			url,
			(title, description) => {
				var bookmark : BookmarkDAO;

				bookmark = new BookmarkDAO();
				bookmark.setTitle(SecurityHelper.disarm(title));
				bookmark.setDescription(SecurityHelper.disarm(description));
				// TODO
			},
			(type, error) => {
				var msg : StringBuffer;

				msg = new StringBuffer('An error occured when getting url details ');
				msg.append('with type ' + type);
				msg.append(' and following message: ' + msg);

				Log.error(new BusinessException(msg.toString()));

				if (callback !== null) {
					callback(null);
				}
			}
		);
	}

	//endregion Public Methods
	
	//endregion Methods
}
