/// <reference path="../../dependencies.ts" />

interface IBookmarkBusiness {
	createFromURL(url : string, callback : Action<BookmarkDAO>) : void;
}
