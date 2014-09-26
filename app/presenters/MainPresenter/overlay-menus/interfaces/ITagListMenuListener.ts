/// <reference path="../../../../dependencies.ts" />

interface ITagListMenuListener {
	onMostPopularSelection() : void;

	onTagSelection(t : Tag) : void;
}
