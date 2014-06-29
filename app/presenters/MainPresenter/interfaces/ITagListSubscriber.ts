/// <reference path="../../../dependencies.ts" />

interface ITagListSubscriber {
	onMostPopularSelection() : void;

	onTagSelection(tagId : string) : void;

	onSearchTabSelection() : void;

	onTagDeletion() : void;

	askingForTagUpdate(tagId : string) : void;
}
