/// <reference path="../../../dependencies.ts" />

interface ISearchBarListener {
	onSearchRequest(input : string) : void;

	onSearchCancel() : void;
}
