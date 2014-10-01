/// <reference path="../../dependencies.ts" />

/**
 * Business layer for tags
 */
interface ITagBusiness {
	isValueValid(value : string) : boolean;

	// compare(newLabel : string, exisitingLabel : string) : boolean;

	add(tag : Tag, callback? : Action<Tag>, errorHandler? : Action<string>) : void;

	/**
	 * Adds a list of tags into DB
	 * @param {IList<Tag>}         tags     [description]
	 * @param {Action<IList<Tag>>} callback Callback with new tags as argument
	 */
	addList(tags : IList<Tag>, callback? : Action<IList<Tag>>, errorHandler? : Action<string>) : void;

	// TODO : test
	update(tag : Tag, callback? : Action<Tag>, errorHandler? : Action<string>) : void;

	/**
	 * Deletes a tag from DB
	 * @param {Tag}          tag      [description]
	 * @param {Action<boolean>} callback Callback with a succeed arg
	 */
	delete(tag : Tag, callback? : Action0, errorHandler? : Action<string>) : void;

	// TODO : test
	find(id : string, callback : Action<Tag>, errorHandler? : Action<string>) : void;

	/**
	 * From specified tag list, adds new ones into DB and do nothing
	 * with other ones. Used labels to compare
	 * @param {IList<Tag>}         tags     [description]
	 * @param {Action<IList<Tag>>} callback Callback with new tags updated. All tags are into DB
	 */
	merge(tags : IList<Tag>, callback? : Action<IList<Tag>>, errorHandler? : Action<string>) : void;

	sortByLabelAsc(callback : Action<IList<Tag>>, errorHandler? : Action<string>) : void;
}
