/// <reference path="../../../../dependencies.ts" />

interface IBookmarkContextMenuListener {
	requestEdition(id : string) : void;

	requestDeletion(id : string) : void;
}
