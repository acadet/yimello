/// <reference path="../../dependencies.ts" />

interface ITagBookmarkBusiness {
	sortTagsByLabelAscForBookmark(
		bookmark : Bookmark,
		callback : Action<IList<Tag>>,
		errorHandler? : Action<string>) : void;

	// TODO : test
	addMergeAndBind(bookmark : Bookmark, tags : IList<Tag>, callback? : Action0, errorHandler? : Action<string>) : void;

	// TODO : test
	updateMergeAndBind(bookmark : Bookmark, tags : IList<Tag>, callback? : Action0, errorHandler? : Action<string>) : void;

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

	importFromBrowser(dataTransfer : any, callback? : Action0, errorHandler? : Action<string>) : void;

	exportToBrowser(callback : Action<string>, errorHandler? : Action<string>) : void;

	search(
		input : string,
		callback : Action<SortedList<ScoredBookmark, number>>,
		errorHandler? : Action<string>) : void;

	rawBackup(callback : Action<any>, errorHandler? : Action<string>) : void;

	backup(callback? : Action0, errorHandler? : Action<string>) : void;

	importBackup(dataTransfer : any, callback? : Action0, errorHandler? : Action<string>) : void;
}
