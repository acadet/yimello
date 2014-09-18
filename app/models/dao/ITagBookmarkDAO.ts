/// <reference path="../../dependencies.ts" />

interface ITagBookmarkDAO {
	addRelation(tag : Tag, bookmark : Bookmark, callback? : Action<boolean>) : void;

	removeBookmarkRelations(bookmark : Bookmark, callback? : Action<boolean>) : void;

	removeTagRelations(tag : Tag, callback? : Action<boolean>) : void;

	sortTagsByLabelAscForBookmark(bookmark : Bookmark, callback : Action<IList<Tag>>) : void;
}
