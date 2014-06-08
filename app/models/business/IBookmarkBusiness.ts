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
	 * Binds multiple tags to a bookmark
	 * @param {BookmarkDAO}     bookmark [description]
	 * @param {IList<TagDAO>}   tags     [description]
	 * @param {Action<boolean>} callback Callback with a success arg
	 */
	bindTags(bookmark : BookmarkDAO, tags : IList<TagDAO>, callback : Action<boolean>) : void;

	/**
	 * Deletes a bookmark from DB
	 * @param {BookmarkDAO}     bookmark [description]
	 * @param {Action<boolean>} callback Callback with a success arg
	 */
	delete(bookmark : BookmarkDAO, callback : Action<boolean>) : void;

	/**
	 * Sorts all bookmarks by title ascending 
	 * @param {TagDAO}                     tag      [description]
	 * @param {Action<IList<BookmarkDAO>>} callback [description]
	 */
	sortByTitleAscForTag(tag : TagDAO, callback : Action<IList<BookmarkDAO>>) : void;

	/**
	 * Adds a new bookmark into DB. 
	 * Applies security operation on it
	 * @param {BookmarkDAO}         bookmark [description]
	 * @param {Action<BookmarkDAO>} callback Callback with new bookmark as argument
	 */
	add(bookmark : BookmarkDAO, callback : Action<BookmarkDAO>) : void;
}
