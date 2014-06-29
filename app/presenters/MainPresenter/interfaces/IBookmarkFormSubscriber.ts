/// <reference path="../../../dependencies.ts" />

interface IBookmarkFormSubscriber {
	onBookmarkCancellation() : void;

	onBookmarkAddition() : void;

	onBookmarkUpdate() : void;

	onBookmarkDeletion() : void;
}
