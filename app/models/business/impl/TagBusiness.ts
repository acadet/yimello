/// <reference path="../../../dependencies.ts" />

class TagBusiness implements ITagBusiness {
	//region Fields
	
	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private _addList(
		tags : IList<TagDAO>,
		index : number,
		outcome : IList<TagDAO>,
		callback : Action<IList<TagDAO>> = null) : void {

		tags
			.getAt(index)
			.add((result) => {
					if (!TSObject.exists(result) && callback !== null) {
						Log.error(new BusinessException('Failed to add tag #' + index));
						callback(null);
						return;
					}

					index++;
					outcome.add(result);

					if (index < tags.getLength()) {
						this._addList(tags, index, outcome, callback);
					} else {
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

				ActiveRecordObject.executeSQL(
					'DELETE FROM ' + DAOTables.TagBookmark + ' WHERE tag_id = ' + id,
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
		var newOnes : IList<any>;
		var mergedList : IList<any>;

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

						o = outcome.findFirst(
							(e) => {
								return StringHelper.compare(e.getLabel(), tag.getLabel());
							}
						);

						if (o !== null) {
							mergedList.add(o);
						} else {
							newOnes.add(o);
						}
					}
				);

				this.addList(
					newOnes,
					(outcome) => {
						outcome.forEach(e => mergedList.add(e));

						if (callback !== null) {
							callback(mergedList);
						}
					}
				);
			}
		);
	}

	//endregion Public Methods
	
	//endregion Methods
}
