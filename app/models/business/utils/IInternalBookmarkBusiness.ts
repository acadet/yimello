/// <reference path="../../../dependencies.ts" />

interface IInternalBookmarkBusiness extends IBookmarkBusiness {
	engineBookmark(bookmark : Bookmark) : void;

	// TODO : test
	isNotAlreadyExisting(url : string, callback : Action<boolean>) : void;

	// TODO : test
	isNotAlreadyExistingButNotProvided(url : string, bookmark : Bookmark, callback : Action<boolean>) : void;
}
