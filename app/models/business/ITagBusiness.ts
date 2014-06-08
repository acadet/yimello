/// <reference path="../../dependencies.ts" />

interface ITagBusiness {
	addList(tags : IList<TagDAO>, callback : Action<IList<TagDAO>>) : void;

	delete(tag : TagDAO, callback : Action<boolean>) : void;

	merge(tags : IList<TagDAO>, callback : Action<IList<TagDAO>>) : void;
}
