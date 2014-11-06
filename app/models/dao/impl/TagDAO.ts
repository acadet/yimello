/// <reference path="../../../dependencies.ts" />

/**
 * An implementation of ITagDAO
 */
class TagDAO extends DataAccessObject implements ITagDAO {
	//region Fields

	private _tagBkDAO : ITagBookmarkDAO;
	
	//endregion Fields
	
	//region Constructors

	constructor(aro : IActiveRecordObject, tagBookmarkDAO : ITagBookmarkDAO) {
	    super(aro);

	    this._tagBkDAO = tagBookmarkDAO;
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	add(tag : Tag, callback? : Action<Tag>) : void {
		var outcome : Tag;
		var f : Action<boolean>;
		var data : IList<any>;
		var id : string;

		callback = ActionHelper.getValueOrDefault(callback);

		id = Guid.newGuid();

		data = new ArrayList<any>();
		data.add(id);
		data.add(tag.getLabel());

		outcome = new Tag();
		tag.hydrate(outcome);
		outcome.setId(id);

		f = (success) => {
			if (success) {
				callback(outcome);
			} else {
				callback(null);
			}
		};

		this.getARO().insert(DAOTables.Tags, data, f);
	}

	addRaw(tag : Tag, callback? : Action<boolean>) : void {
		var data : IList<any>;

		callback = ActionHelper.getValueOrDefault(callback);

		data = new ArrayList<any>();
		data.add(tag.getId());
		data.add(tag.getLabel());

		this
			.getARO()
			.insert(
				DAOTables.Tags,
				data,
				callback
			);
	}

	update(tag : Tag, callback? : Action<Tag>) : void {
		var dict : IDictionary<string, any>;
		var selector : KeyValuePair<string, any>;

		callback = ActionHelper.getValueOrDefault(callback);

		if (!TSObject.exists(tag.getId()) || tag.getId() === '') {
			Log.error(new DAOException('Unable to update: no id was specified'));
			callback(null);
			return;
		}

		dict = new Dictionary<string, any>();
		dict.add('label', tag.getLabel());

		selector = new KeyValuePair<string, any>('id', tag.getId());

		this
			.getARO()
			.update(
				DAOTables.Tags,
				selector,
				dict,
				(success) => {
					if (success) {
						callback(tag);
					} else {
						Log.error(new DAOException('An error occured when updating bookmark'));
						callback(tag);
					}
				}
			);
	}

	delete(tag : Tag, callback? : Action<boolean>) : void {
		callback = ActionHelper.getValueOrDefault(callback);

		if (!TSObject.exists(tag.getId()) || tag.getId() === '') {
			Log.error(new DAOException('Failed to delete: an id must be provided'));
			callback(false);
			return;
		}

		// Foreign key constraints do not work with webSQL
		// Then, remove deps
		this
			._tagBkDAO
			.removeTagRelations(
				tag,
				(success1) => {
					this
						.getARO()
						.delete(
							DAOTables.Tags,
							new KeyValuePair<string, any>('id', tag.getId()),
							(success2) => {
								callback(success1 && success2);
							}
						);
				}
			);
	}

	get(callback : Action<IList<Tag>>) : void {
		this.getARO().get<Tag>(DAOTables.Tags, callback, Tag.fromObject);
	}

	find(id : string, callback : Action<Tag>) : void {
		this
			.getARO()
			.find(
				DAOTables.Tags,
				new KeyValuePair<string, any>('id', id),
				callback,
				Tag.fromObject
			);
	}

	findByLabel(label : string, callback : Action<Tag>) : void {
		this
			.getARO()
			.find(
				DAOTables.Tags,
				new KeyValuePair<string, any>('label', label),
				callback,
				Tag.fromObject
			);
	}

	sortByLabelAsc(callback : Action<IList<Tag>>) : void {
		var request : StringBuffer;

		request = new StringBuffer('SELECT * FROM ' + DAOTables.Tags + ' ');
		request.append('ORDER BY LOWER(label) ASC');

		this
			.getARO()
			.executeSQL(
				request.toString(),
				(outcome) => {
					callback(ActiveRecordHelper.getListFromSQLResultSet(outcome, Tag.fromObject));
				}
			);
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
