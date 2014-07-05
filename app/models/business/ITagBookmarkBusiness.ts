/// <reference path="../../dependencies.ts" />

interface ITagBookmarkBusiness {
	sortTagsByLabelAscForBookmark(bookmark : BookmarkDAO, callback : Action<IList<TagDAO>>) : void;

	/**
	 * Binds multiple tags to a bookmark
	 * @param {BookmarkDAO}     bookmark [description]
	 * @param {IList<TagDAO>}   tags     [description]
	 * @param {Action<boolean>} callback Callback with a success arg
	 */
	bindTags(bookmark : BookmarkDAO, tags : IList<TagDAO>, callback : Action<boolean>) : void;

	updateTagBinding(bookmark : BookmarkDAO, tags : IList<TagDAO>, callback : Action<boolean>) : void;

	/**
	 * Sorts all bookmarks by title ascending 
	 * @param {TagDAO}                     tag      [description]
	 * @param {Action<IList<BookmarkDAO>>} callback [description]
	 */
	sortBookmarksByTitleAscForTag(tag : TagDAO, callback : Action<IList<BookmarkDAO>>) : void;

	sortBookmarksByTitleWithBoundTags(callback : Action<IList<Pair<BookmarkDAO, IList<TagDAO>>>>) : void;

	importFromBrowser(dataTransfer : any, callback : Action<boolean>) : void;

	search(input : string, callback : Action<IList<ScoredBookmarkDAO>>) : void;

	backup(callback : Action<boolean>) : void;

	importBackup(dataTransfer : any, callback : Action<boolean>) : void;
}
