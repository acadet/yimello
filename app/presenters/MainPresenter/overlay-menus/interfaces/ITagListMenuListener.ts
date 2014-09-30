/// <reference path="../../../../dependencies.ts" />

interface ITagListMenuListener {
	onMostPopularSelection() : void;

	onTagSelection(t : Tag) : void;

	onTagEditionRequest(id : string) : void;

	onTagDeletionRequest(id : string) : void;
}
