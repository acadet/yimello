/// <reference path="../../../dependencies.ts" />

interface IBookmarkListListener {
	onBookmarkUpdateRequest(id : string) : void;

	onBookmarkDeletionRequest(id : string) : void;
}
