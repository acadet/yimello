/// <reference path="../../dependencies.ts" />

interface ITagBookmarkDAO {
	addRelation(tag : Tag, bookmark : Bookmark, callback? : Action<boolean>) : void;

	addMultipleTagRelations(bookmark : Bookmark, tags : IList<Tag>, callback? : Action<boolean>) : void;

	updateBookmarkRelations(bookmark : Bookmark, tags : IList<Tag>, callback? : Action<boolean>) : void;

	removeBookmarkRelations(bookmark : Bookmark, callback? : Action<boolean>) : void;

	removeTagRelations(tag : Tag, callback? : Action<boolean>) : void;

	getRaw(callback : Action<IList<any>>) : void;

	sortTagsByLabelAscForBookmark(bookmark : Bookmark, callback : Action<IList<Tag>>) : void;

	sortBookmarksByTitleAscForTag(tag : Tag, callback : Action<IList<Bookmark>>) : void;

	sortBookmarksByTitleAscWithBoundTagsByLabelAsc(callback : Action<IList<KeyValuePair<Bookmark, IList<Tag>>>>) : void;
}
