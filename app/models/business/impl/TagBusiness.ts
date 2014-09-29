/// <reference path="../../../dependencies.ts" />

/**
 * Implementation of tag business layer
 */
class TagBusiness implements IInternalTagBusiness {
	//region Fields

	private _dao : ITagDAO;
	
	//endregion Fields
	
	//region Constructors

	constructor(dao : ITagDAO) {
		this._dao = dao;
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	/**
	 * Recursive function for adding a list of tags
	 * @param {IList<Tag>}            tags    [description]
	 * @param {number}                   index   Current index
	 * @param {IList<Tag>}            outcome List to use for callback
	 * @param {Action<IList<Tag>>}        callback [description]
	 */
	private _addList(
		tags : IList<Tag>,
		index : number,
		outcome : IList<Tag>,
		callback? : Action<IList<Tag>>,
		errorHandler? : Action<string>) : void {

		callback = ActionHelper.getValueOrDefault(callback);
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (index === tags.getLength()) {
			// Browsing has ended, trigger callback
			callback(outcome);
			return;
		}

		this.add(
			tags.getAt(index),
			(result) => {
				if (!TSObject.exists(result)) {
					Log.error(new BusinessException('Failed to add tag #' + index));
					errorHandler('Ouch! An internal error has occured. Please try again');
					return;
				}

				outcome.add(result);
				this._addList(tags, index + 1, outcome, callback, errorHandler);
			}
		);
	}

	private _checkTag(tag : Tag, errorHandler? : Action<string>) : boolean {

		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (!TSObject.exists(tag)) {
			Log.error(new BusinessException('Provided tag is null'));
			errorHandler('Ouch! An internal error has occured. Please try again');
			return false;
		}

		if (!this.isValueValid(tag.getLabel())) {
			Log.error(new BusinessException('Unable to add a tag: tag must have a label'));
			errorHandler('What about adding a label?');
			return false;
		}

		return true;
	}

	//endregion Private Methods
	
	//region Public Methods

	engineTag(tag : Tag) : void {
		var id : string, label : string;

		id = tag.getId();
		if (TSObject.exists(id)) {
			id = StringHelper.trim(id);
			id = SecurityHelper.disarm(id);
			tag.setId(id);
		}

		label = tag.getLabel();
		label = StringHelper.trim(label);
		label = SecurityHelper.disarm(label);
		tag.setLabel(label);
	}

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

	isNotAlreadyExisting(label : string, callback : Action<boolean>) : void {
		var t : Tag;

		t = new Tag();
		t.setLabel(label);
		this.engineTag(t);

		this._dao.findByLabel(
			t.getLabel(),
			(outcome) => {
				callback(!TSObject.exists(outcome));
			}
		);
	}

	isNotAlreadyExistingButNotProvided(label : string, tag : Tag, callback : Action<boolean>) : void {
		var t : Tag;

		t = new Tag();
		t.setLabel(label);
		this.engineTag(t);

		this._dao.findByLabel(
			t.getLabel(),
			(outcome) => {
				if (TSObject.exists(outcome)) {
					if (outcome.getId() === tag.getId()) {
						callback(true);
					} else {
						callback(false);
					}
				} else {
					callback(true);
				}
			}
		);
	}

	// compare(newLabel : string, existingLabel : string) : boolean {
	// 	var tag : Tag;

	// 	tag = new Tag();
	// 	tag.setLabel(existingLabel);
	// 	this.engineTag(tag);

	// 	return StringHelper.compare(newLabel, tag.getLabel());
	// }

	add(tag : Tag, callback? : Action<Tag>, errorHandler? : Action<string>) : void {
		callback = ActionHelper.getValueOrDefault(callback);
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (!this._checkTag(tag, errorHandler)) {
			return;
		}

		this.engineTag(tag);

		this._dao.add(
			tag,
			(outcome) => {
				if (!TSObject.exists(outcome)) {
					errorHandler('Ouch! An internal error has occured. Please try again');
					return;
				}
				callback(outcome);
			}
		);
	}
	
	addList(tags : IList<Tag>, callback? : Action<IList<Tag>>, errorHandler? : Action<string>) : void {
		var outcome : IList<Tag>;

		callback = ActionHelper.getValueOrDefault(callback);
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (!TSObject.exists(tags)) {
			Log.error(new BusinessException('Provided tag list is null'));
			errorHandler('Ouch! An internal error has occured. Please try again');
			return;
		}

		outcome = new ArrayList<Tag>();

		if (tags.getLength() < 1) {
			Log.warn('No tag added: list is empty');
			callback(outcome);
			return;
		}

		this._addList(tags, 0, outcome, callback, errorHandler);
	}

	update(tag : Tag, callback? : Action<Tag>, errorHandler? : Action<string>) : void {
		callback = ActionHelper.getValueOrDefault(callback);
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (!this._checkTag(tag, errorHandler)) {
			return;
		}

		this.engineTag(tag);

		this._dao.update(
			tag,
			(outcome) => {
				if (!TSObject.exists(outcome)) {
					errorHandler('Ouch! An internal error has occured. Please try again');
					return;
				}

				callback(outcome);
			}
		);
	}

	delete(tag : Tag, callback? : Action0, errorHandler? : Action<string>) : void {
		
		callback = ActionHelper.getValueOrDefaultNoArgs(callback);
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (!TSObject.exists(tag)) {
			Log.error(new BusinessException('Unable to delete: provided tag is null'));
			errorHandler('Ouch! An internal error has occured. Please try again');
			return;
		}

		this._dao.delete(
			tag,
			(success) => {
				if (!success) {
					errorHandler('Ouch! An internal error has occured. Please try again');
					return;
				}

				callback();
			}
		);
	}

	merge(tags : IList<Tag>, callback? : Action<IList<Tag>>, errorHandler? : Action<string>) : void {
		var newOnes : IList<Tag>; // tags which are not in DB
		var mergedList : IList<Tag>; // outcome to use for callback, will contains only tags into DB

		callback = ActionHelper.getValueOrDefault(callback);
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		if (!TSObject.exists(tags)) {
			Log.error(new BusinessException('Unable to merge: provided list is null'));
			errorHandler('Ouch! An internal error has occured. Please try again');
			return;
		}

		newOnes = new ArrayList<Tag>();
		mergedList = new ArrayList<Tag>();

		this._dao.get(
			(outcome) => {
				tags.forEach(
					(tag) => {
						var o : Tag;

						tag.setLabel(StringHelper.trim(tag.getLabel()));

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

							callback(mergedList);
						},
						errorHandler
					);
				} else {
					callback(mergedList);
				}
			}
		);
	}

	sortByLabelAsc(callback : Action<IList<Tag>>, errorHandler? : Action<string>) : void {
		errorHandler = ActionHelper.getValueOrDefault(errorHandler);

		this
			._dao
			.sortByLabelAsc(
				(outcome) => {
					if (TSObject.exists(outcome)) {
						callback(outcome);
					} else {
						Log.error(new BusinessException('Unable to sort: an error has occured when pulling'));
						errorHandler('Ouch! An internal error has occured. Please try again');
					}
				}
			);
	}

	//endregion Public Methods
	
	//endregion Methods
}
