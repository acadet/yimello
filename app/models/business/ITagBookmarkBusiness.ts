/// <reference path="../../dependencies.ts" />

interface ITagBookmarkBusiness {
	sortTagsByLabelAscForBookmark(
		bookmark : Bookmark,
		callback : Action<IList<Tag>>,
		errorHandler? : Action<string>) : void;

	/**
	 * Binds multiple tags to a bookmark
	 */
	bindTags(bookmark : Bookmark, tags : IList<Tag>, callback? : Action0, errorHandler? : Action<string>) : void;

	updateTagBinding(
		bookmark : Bookmark,
		tags : IList<Tag>,
		callback? : Action0,
		errorHandler? : Action<string>) : void;

	/**
	 * Sorts all bookmarks by title ascending 
	 * @param {TagDAO}                     tag      [description]
	 * @param {Action<IList<BookmarkDAO>>} callback [description]
	 */
	sortBookmarksByTitleAscForTag(
		tag : Tag,
		callback : Action<IList<Bookmark>>,
		errorHandler? : Action<string>) : void;

	sortBookmarksByTitleWithBoundTags(callback : Action<IList<Pair<Bookmark, IList<Tag>>>>) : void;

	importFromBrowser(dataTransfer : any, callback? : Action0, errorHandler? : Action<string>) : void;

	search(input : string, callback : Action<IList<ScoredBookmark>>) : void;

	backup(callback? : Action0, errorHandler? : Action<string>) : void;

	importBackup(dataTransfer : any, callback? : Action0, errorHandler? : Action<string>) : void;
}
