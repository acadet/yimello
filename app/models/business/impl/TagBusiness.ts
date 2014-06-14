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
		callback : Action<IList<TagDAO>> = null) : void {

		tags
			.getAt(index)
			.add((result) => {
					if (!TSObject.exists(result)) {
						Log.error(new BusinessException('Failed to add tag #' + index));

						if (callback !== null) {
							callback(null);
						}
						return;
					}

					index++;
					outcome.add(result);

					if (index < tags.getLength()) {
						this._addList(tags, index, outcome, callback);
					} else {
						// Browsing has ended, trigger callback
						if (callback !== null) {
							callback(outcome);
						}
					}
				}
			);
	}

	//endregion Private Methods
	
	//region Public Methods
	
	addList(tags : IList<TagDAO>, callback : Action<IList<TagDAO>> = null) : void {
		var outcome : IList<TagDAO>;

		if (!TSObject.exists(tags)) {
			Log.error(new BusinessException('Provided tag list is null'));
			if (callback !== null) {
				callback(null);
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

		this._addList(tags, 0, outcome, callback);
	}

	delete(tag : TagDAO, callback : Action<boolean> = null) : void {
		var id : string;

		if (!TSObject.exists(tag)) {
			Log.error(new BusinessException('Unable to delete: provided tag is null'));
			if (callback !== null) {
				callback(false);
			}
			return;
		}

		id = tag.getId();

		tag.delete(
			(success) => {
				if (!success) {
					Log.error(new BusinessException('Failed to delete: failed to remove tag'));
					if (callback !== null) {
						callback(false);
					}
					return;
				}

				// Foreign key constraints do not work with webSQL
				// Then, remove deps
				ActiveRecordObject.executeSQL(
					'DELETE FROM ' + DAOTables.TagBookmark + ' WHERE tag_id = "' + id + '"',
					(outcome) => {
						if (callback !== null) {
							callback(true);
						}
					}
				);
			}
		);
	}

	merge(tags : IList<TagDAO>, callback : Action<IList<TagDAO>> = null) : void {
		var newOnes : IList<any>; // tags which are not in DB
		var mergedList : IList<any>; // outcome to use for callback, will contains only tags into DB

		if (!TSObject.exists(tags)) {
			Log.error(new BusinessException('Unable to merge: provided list is null'));
			if (callback !== null) {
				callback(null);
			}
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
						}
					);
				} else {
					if (callback !== null) {
						callback(mergedList);
					}
				}
			}
		);
	}

	sortByLabelAscForBookmark(bookmark : BookmarkDAO, callback : Action<IList<TagDAO>>) : void {
		var request : StringBuffer;

		request = new StringBuffer('SELECT * FROM ' + DAOTables.Tags + ' WHERE id IN (');
		request.append('SELECT tag_id FROM ' + DAOTables.TagBookmark + ' WHERE ');
		request.append('bookmark_id = "' + bookmark.getId() + '") ');
		request.append('ORDER BY label ASC');

		DataAccessObject.initialize(
			(success) => {
				ActiveRecordObject.executeSQL(
					request.toString(),
					(outcome) => {
						callback(ActiveRecordHelper.getListFromSQLResultSet(outcome, TagDAO.fromObject));
					}
				);
			}
		);
	}

	//endregion Public Methods
	
	//endregion Methods
}
