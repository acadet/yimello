/// <reference path="../../dependencies.ts" />

/**
 * Provides methods to manage storage of Tags
 */
interface ITagDAO {
	/**
	 * Adds a new tag into DB
	 * @param {Tag}         tag      Target
	 * @param {Action<Tag>} callback Optional callback with fresh outcome
	 */
	add(tag : Tag, callback? : Action<Tag>) : void;

	/**
	 * Updates existing bookmark
	 * @param {Tag}         tag      Target
	 * @param {Action<Tag>} callback Optional callback with fresh outcome
	 */
	update(tag : Tag, callback? : Action<Tag>) : void;

	/**
	 * Deletes tag from DB
	 * @param {Tag}             tag      Target
	 * @param {Action<boolean>} callback Optional callback with success bool
	 */
	delete(tag : Tag, callback? : Action<boolean>) : void;

	/**
	 * Gets all tags from DB
	 * @param {Action<IList<Tag>>} callback [description]
	 */
	get(callback : Action<IList<Tag>>) : void;

	/**
	 * Finds a tag using provided id
	 * @param {string}      id       Id to search
	 * @param {Action<Tag>} callback [description]
	 */
	find(id : string, callback : Action<Tag>) : void;

	/**
	 * Finds a tag using its label
	 * @param {string}      label    Label to search
	 * @param {Action<Tag>} callback [description]
	 */
	findByLabel(label : string, callback : Action<Tag>) : void;

	/**
	 * Sorts all tags by label asc
	 * @param {Action<IList<Tag>>} callback [description]
	 */
	sortByLabelAsc(callback : Action<IList<Tag>>) : void;
}
