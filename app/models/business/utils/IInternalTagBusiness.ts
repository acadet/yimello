/// <reference path="../../../dependencies.ts" />

interface IInternalTagBusiness extends ITagBusiness {
	engineTag(tag : Tag) : void;

	// TODO : test
	isNotAlreadyExisting(label : string, callback : Action<boolean>) : void;

	// TODO : test
	isNotAlreadyExistingButNotProvided(label : string, tag : Tag, callback : Action<boolean>) : void;
}
