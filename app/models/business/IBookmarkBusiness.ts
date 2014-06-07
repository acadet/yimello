/// <reference path="../../dependencies.ts" />

interface IBookmarkBusiness {
	createFromURL(url : string, callback : Action<BookmarkDAO>) : void;

	bindTags(bookmark : BookmarkDAO, tags : IList<TagDAO>, callback : Action<boolean>) : void;

	delete(bookmark : BookmarkDAO, callback : Action<boolean>) : void;
}
