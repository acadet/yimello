/// <reference path="../../dependencies.ts" />

interface ITagBusiness {
	addList(tags : IList<TagDAO>, callback : Action<boolean>) : void;

	delete(tag : TagDAO, callback : Action<boolean>) : void;
}
