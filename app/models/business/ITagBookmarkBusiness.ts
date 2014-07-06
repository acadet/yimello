/// <reference path="../../dependencies.ts" />

interface ITagBookmarkBusiness {
	sortTagsByLabelAscForBookmark(
		bookmark : BookmarkDAO,
		callback : Action<IList<TagDAO>>,
		errorHandler? : Action<string>) : void;

	/**
	 * Binds multiple tags to a bookmark
	 */
	bindTags(bookmark : BookmarkDAO, tags : IList<TagDAO>, callback? : Action0, errorHandler? : Action<string>) : void;

	updateTagBinding(
		bookmark : BookmarkDAO,
		tags : IList<TagDAO>,
		callback? : Action0,
		errorHandler? : Action<string>) : void;

	/**
	 * Sorts all bookmarks by title ascending 
	 * @param {TagDAO}                     tag      [description]
	 * @param {Action<IList<BookmarkDAO>>} callback [description]
	 */
	sortBookmarksByTitleAscForTag(
		tag : TagDAO,
		callback : Action<IList<BookmarkDAO>>,
		errorHandler? : Action<string>) : void;

	sortBookmarksByTitleWithBoundTags(callback : Action<IList<Pair<BookmarkDAO, IList<TagDAO>>>>) : void;

	importFromBrowser(dataTransfer : any, callback? : Action0, errorHandler? : Action<string>) : void;

	search(input : string, callback : Action<IList<ScoredBookmarkDAO>>) : void;

	backup(callback? : Action0, errorHandler? : Action<string>) : void;

	importBackup(dataTransfer : any, callback? : Action0, errorHandler? : Action<string>) : void;
}
