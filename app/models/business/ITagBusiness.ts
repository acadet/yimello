/// <reference path="../../dependencies.ts" />

/**
 * Business layer for tags
 */
interface ITagBusiness {

	isValueValid(value : string) : boolean;

	add(tag : TagDAO, callback? : Action<TagDAO>, errorHandler? : Action<string>) : void;

	/**
	 * Adds a list of tags into DB
	 * @param {IList<TagDAO>}         tags     [description]
	 * @param {Action<IList<TagDAO>>} callback Callback with new tags as argument
	 */
	addList(tags : IList<TagDAO>, callback? : Action<IList<TagDAO>>, errorHandler? : Action<string>) : void;

	// TODO : test
	update(tag : TagDAO, callback? : Action<TagDAO>, errorHandler? : Action<string>) : void;

	/**
	 * Deletes a tag from DB
	 * @param {TagDAO}          tag      [description]
	 * @param {Action<boolean>} callback Callback with a succeed arg
	 */
	delete(tag : TagDAO, callback? : Action0, errorHandler? : Action<string>) : void;

	/**
	 * From specified tag list, adds new ones into DB and do nothing
	 * with other ones. Used labels to compare
	 * @param {IList<TagDAO>}         tags     [description]
	 * @param {Action<IList<TagDAO>>} callback Callback with new tags updated. All tags are into DB
	 */
	merge(tags : IList<TagDAO>, callback? : Action<IList<TagDAO>>, errorHandler? : Action<string>) : void;
}
