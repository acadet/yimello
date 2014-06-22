/// <reference path="../../dependencies.ts" />

interface ITagListSubscriber {
	onMostPopularSelection() : void;

	onTagSelection(tagId : string) : void;

	onTagDeletion() : void;

	onTagUpdate(tagId : string) : void;
}
