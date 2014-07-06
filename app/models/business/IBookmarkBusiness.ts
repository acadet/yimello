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
		callback? : Action<BookmarkDAO>,
		errorHandler? : Action<string>,
		warningHandler? : Action<string>) : void;

	/**
	 * Adds a new bookmark into DB. 
	 * Applies security operation on it
	 * @param {BookmarkDAO}         bookmark [description]
	 * @param {Action<BookmarkDAO>} callback Callback with new bookmark as argument
	 */
	add(bookmark : BookmarkDAO, callback? : Action<BookmarkDAO>, errorHandler? : Action<string>) : void;

	addList(bookmarks : IList<BookmarkDAO>, callback? : Action<IList<BookmarkDAO>>, errorHandler? : Action<string>) : void;

	update(bookmark : BookmarkDAO, callback? : Action<BookmarkDAO>, errorHandler? : Action<string>) : void;

	/**
	 * Deletes a bookmark from DB
	 * @param {BookmarkDAO}     bookmark [description]
	 * @param {Action<boolean>} callback Callback with a success arg
	 */
	delete(bookmark : BookmarkDAO, callback? : Action0, errorHandler? : Action<string>) : void;
}
