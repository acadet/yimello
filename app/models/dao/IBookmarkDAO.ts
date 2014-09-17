/// <reference path="../../dependencies.ts" />

/**
 * Available methods to manage storage of Bookmarks
 */
interface IBookmarkDAO {

	/**
	 * Adds a new bookmark into DB
	 * @param {Bookmark}         bookmark Target
	 * @param {Action<Bookmark>} callback Optional callback with fresh bookmark
	 */
	add(bookmark : Bookmark, callback? : Action<Bookmark>) : void;

	/**
	 * Updates existing bookmark in DB
	 * @param {Bookmark}         bookmark Target
	 * @param {Action<Bookmark>} callback Optional callback with fresh bookmark
	 */
	update(bookmark : Bookmark, callback? : Action<Bookmark>) : void;

	/**
	 * Deletes a bookmark from DB
	 * @param {Bookmark}        bookmark Target
	 * @param {Action<boolean>} callback Optional callback with success bool
	 */
	delete(bookmark : Bookmark, callback? : Action<boolean>) : void;

	/**
	 * Gets all bookmarks from DB
	 * @param {Action<IList<Bookmark>>} callback [description]
	 */
	get(callback : Action<IList<Bookmark>>) : void;

	/**
	 * Finds a bookmark using provided id
	 * @param {string}           id       [description]
	 * @param {Action<Bookmark>} callback [description]
	 */
	find(id : string, callback : Action<Bookmark>) : void;
	
	/**
	 * Sorts all bookmarks by desc number of views and asc title
	 * @param {Action<IList<Bookmark>>} callback [description]
	 */
	sortByViewsDescThenByTitleAsc(callback : Action<IList<Bookmark>>) : void;

	/**
	 * Sorts bookmarks by title asc
	 * @param {Action<IList<Bookmark>>} callback [description]
	 */
	sortByTitleAsc(callback : Action<IList<Bookmark>>) : void;
}
