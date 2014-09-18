/// <reference path="../../../dependencies.ts" />

interface IInternalBookmarkBusiness implements IBookmarkBusiness {
	engineBookmark(bookmark : BookmarkDAO) : void;
}
