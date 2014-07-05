/// <reference path="../../dependencies.ts" />

/**
 * Business layer for bookmarks
 */
interface IBookmarkBusiness {
	/**
	 * Creates a bookmark from an URL
	 * @param {string}              url      [description]
	 * @param {Action<BookmarkDAO>} callback Callback with new bookmark as argument
	 */
	createFromURL(url : string, callback : Action<BookmarkDAO>) : void;

	/**
	 * Adds a new bookmark into DB. 
	 * Applies security operation on it
	 * @param {BookmarkDAO}         bookmark [description]
	 * @param {Action<BookmarkDAO>} callback Callback with new bookmark as argument
	 */
	add(bookmark : BookmarkDAO, callback : Action<BookmarkDAO>) : void;

	addList(bookmarks : IList<BookmarkDAO>, callback : Action<IList<BookmarkDAO>>) : void;

	update(bookmark : BookmarkDAO, callback : Action<BookmarkDAO>) : void;

	/**
	 * Deletes a bookmark from DB
	 * @param {BookmarkDAO}     bookmark [description]
	 * @param {Action<boolean>} callback Callback with a success arg
	 */
	delete(bookmark : BookmarkDAO, callback : Action<boolean>) : void;
}
