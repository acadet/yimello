/// <reference path="../../dependencies.ts" />

/**
 * Business layer for bookmarks
 */
interface IBookmarkBusiness {
	/**
	 * Creates a bookmark from an URL
	 */
	createFromURL(
		url : string,
		callback? : Action<Bookmark>,
		errorHandler? : Action<string>,
		warningHandler? : Action<string>) : void;

	/**
	 * Adds a new bookmark into DB. 
	 * Applies security operation on it
	 * @param {Bookmark}         bookmark [description]
	 * @param {Action<Bookmark>} callback Callback with new bookmark as argument
	 */
	add(bookmark : Bookmark, callback? : Action<Bookmark>, errorHandler? : Action<string>) : void;

	//addList(bookmarks : IList<Bookmark>, callback? : Action<IList<Bookmark>>, errorHandler? : Action<string>) : void;

	update(bookmark : Bookmark, callback? : Action<Bookmark>, errorHandler? : Action<string>) : void;

	/**
	 * Deletes a bookmark from DB
	 * @param {BookmarkDAO}     bookmark [description]
	 * @param {Action<boolean>} callback Callback with a success arg
	 */
	delete(bookmark : Bookmark, callback? : Action0, errorHandler? : Action<string>) : void;

	find(id : string, callback : Action<Bookmark>, errorHandler? : Action<string>) : void;

	sortByViewsDescThenByTitleAsc(callback : Action<IList<Bookmark>>, errorHandler? : Action<string>) : void;
}
