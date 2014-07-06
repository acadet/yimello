/// <reference path="../../../dependencies.ts" />

/**
 * Implementation of tag business layer
 */
class TagBusiness implements ITagBusiness {
	//region Fields
	
	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	/**
	 * Recursive function for adding a list of tags
	 * @param {IList<TagDAO>}            tags    [description]
	 * @param {number}                   index   Current index
	 * @param {IList<TagDAO>}            outcome List to use for callback
	 * @param {Action<IList<TagDAO>> =       null}        callback [description]
	 */
	private _addList(
		tags : IList<TagDAO>,
		index : number,
		outcome : IList<TagDAO>,
		callback : Action<IList<TagDAO>> = null,
		errorHandler : Action<string> = null) : void {

		if (index === tags.getLength()) {
			// Browsing has ended, trigger callback
			if (callback !== null) {
				callback(outcome);
			}
			return;
		}

		this.add(
			tags.getAt(index),
			(result) => {
				if (!TSObject.exists(result)) {
					Log.error(new BusinessException('Failed to add tag #' + index));
					if (errorHandler !== null) {
						errorHandler('An internal error has occured. Please try again');
					}
					return;
				}

				outcome.add(result);
				this._addList(tags, index + 1, outcome, callback, errorHandler);
			}
		);
	}

	private _disarmTag(tag : TagDAO) : void {
		tag.setLabel(SecurityHelper.disarm(StringHelper.trim(tag.getLabel())));
	}

	private _checkTag(tag : TagDAO, errorHandler : Action<string> = null) : boolean {
		var label : string;

		if (!TSObject.exists(tag)) {
			Log.error(new BusinessException('Provided tag is null'));
			if (errorHandler !== null) {
				errorHandler('An internal error has occured. Please try again');
			}
			return false;
		}

		label = StringHelper.trim(tag.getLabel());

		if (!TSObject.exists(tag.getLabel()) || tag.getLabel() === '') {
			Log.error(new BusinessException('Unable to add a tag: tag must have a label'));
			if (errorHandler !== null) {
				errorHandler('A tag must have a label');
			}
			return false;
		}

		return true;
	}

	//endregion Private Methods
	
	//region Public Methods

	isValueValid(value : string) : boolean {
		var s : string;

		if (!TSObject.exists(value)) {
			return false;
		}

		s = StringHelper.trim(value);
		if (s === '') {
			return false;
		}

		return true;
	}

	add(tag : TagDAO, callback : Action<TagDAO> = null, errorHandler : Action<string> = null) : void {
		if (this._checkTag(tag, errorHandler)) {
			return;
		}

		this._disarmTag(tag);

		tag.add(
			(outcome) => {
				if (!TSObject.exists(outcome)) {
					if (errorHandler !== null) {
						errorHandler('An internal error has occured. Please try again');
					}
				}
				if (callback !== null) {
					callback(outcome);
				}
			}
		);
	}
	
	addList(tags : IList<TagDAO>, callback : Action<IList<TagDAO>> = null, errorHandler : Action<string> = null) : void {
		var outcome : IList<TagDAO>;

		if (!TSObject.exists(tags)) {
			Log.error(new BusinessException('Provided tag list is null'));
			if (errorHandler !== null) {
				errorHandler('An internal error has occured. Please try again');
			}
			return;
		}

		outcome = new ArrayList<TagDAO>();

		if (tags.getLength() < 1) {
			Log.warn('No tag added: list is empty');
			if (callback !== null) {
				callback(outcome);
			}
			return;
		}

		this._addList(tags, 0, outcome, callback, errorHandler);
	}

	update(tag : TagDAO, callback : Action<TagDAO>, errorHandler : Action<string> = null) : void {
		if (this._checkTag(tag, errorHandler)) {
			return;
		}

		this._disarmTag(tag);

		tag.update(
			(outcome) => {
				if (!TSObject.exists(outcome)) {
					if (errorHandler !== null) {
						errorHandler('An internal error has occured. Please try again');
					}
					return;
				}

				if (callback !== null) {
					callback(outcome);
				}
			}
		);
	}

	delete(tag : TagDAO, callback : Action0 = null, errorHandler : Action<string> = null) : void {
		var id : string;

		if (!TSObject.exists(tag)) {
			Log.error(new BusinessException('Unable to delete: provided tag is null'));
			if (errorHandler !== null) {
				errorHandler('An internal error has occured. Please try again');
			}
			return;
		}

		id = tag.getId();
		tag.delete(
			(success) => {
				if (!success) {
					if (errorHandler !== null) {
						errorHandler('An internal error has occured. Please try again');
					}
					return;
				}

				// Foreign key constraints do not work with webSQL
				// Then, remove deps
				ActiveRecordObject.executeSQL(
					'DELETE FROM ' + DAOTables.TagBookmark + ' WHERE tag_id = "' + id + '"',
					(outcome) => {
						if (callback !== null) {
							callback();
						}
					}
				);
			}
		);
	}

	merge(tags : IList<TagDAO>, callback : Action<IList<TagDAO>> = null, errorHandler : Action<string> = null) : void {
		var newOnes : IList<any>; // tags which are not in DB
		var mergedList : IList<any>; // outcome to use for callback, will contains only tags into DB

		if (!TSObject.exists(tags)) {
			Log.error(new BusinessException('Unable to merge: provided list is null'));
			if (errorHandler !== null) {
				errorHandler('An internal error has occured. Please try again');
			}
			return;
		}

		newOnes = new ArrayList<TagDAO>();
		mergedList = new ArrayList<TagDAO>();

		TagDAO.get(
			(outcome) => {
				tags.forEach(
					(tag) => {
						var o : TagDAO;

						// Find a tag with same name
						o = outcome.findFirst(e => StringHelper.compare(e.getLabel(), tag.getLabel()));

						if (o !== null) {
							// A tag with same is already existing, nothing to do
							mergedList.add(o);
						} else {
							// New tag spotted
							newOnes.add(tag);
						}
					}
				);

				if (newOnes.getLength() > 0) {
					// Add pending tags
					this.addList(
						newOnes,
						(outcome) => {
							outcome.forEach(e => mergedList.add(e));

							if (callback !== null) {
								callback(mergedList);
							}
						},
						errorHandler
					);
				} else {
					if (callback !== null) {
						callback(mergedList);
					}
				}
			}
		);
	}

	//endregion Public Methods
	
	//endregion Methods
}
