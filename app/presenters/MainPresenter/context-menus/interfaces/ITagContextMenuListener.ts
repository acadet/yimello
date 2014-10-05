/// <reference path="../../../../dependencies.ts" />

interface ITagContextMenuListener {
	requestEdition(id : string) : void;

	requestDeletion(id : string) : void;
}
