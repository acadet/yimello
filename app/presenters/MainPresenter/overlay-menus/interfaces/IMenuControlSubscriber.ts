/// <reference path="../../../../dependencies.ts" />

interface IMenuControlSubscriber {
	onTagAddition() : void;

	onTagUpdate() : void;

	onTagCancellation() : void;
}
