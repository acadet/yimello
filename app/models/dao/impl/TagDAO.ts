/// <reference path="../../dependencies.ts" />

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

		callback = (TSObject.exists(callback)) ? callback : ((tg) => { return; });

		id = Guid.newGuid();

		data = new ArrayList<any>();
		data.add(id);
		data.add(this.getLabel());

		outcome = new Tag();
		tag.hydrate(outcome);
		outcome.setId(id);

		f = (success) => {
			if (success) {
				callback(t);
			} else {
				callback(null);
			}
		};

		this.getARO().insert(DAOTables.Tags, data, f);
	}

	update(tag : Tag, callback? : Action<Tag>) : void {
		var dict : IDictionary<string, any>;
		var selector : Pair<string, any>;

		callback = (TSObject.exists(callback)) ? callback : ((tg) => { return; });

		if (!TSObject.exists(tag.getId()) || tag.getId() === '') {
			Log.error(new DAOException('Unable to update: no id was specified'));
			callback(null);
			return;
		}

		dict = new Dictionary<string, any>();
		dict.add('label', tag.getLabel());

		selector = new Pair<string, any>('id', tag.getId());

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
		callback = (TSObject.exists(callback)) ? callback : ((s) => { return; });

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
				tag.get,
				(success1) => {
					this
						.getARO()
						.delete(
							DAOTables.Tags,
							new Pair<string, any>('id', tag.getId()),
							(success2) => {
								callback(success1 && success2);
							}
						);
				}
			);
		// this
		// 	.getARO()
		// 	.executeSQL(
		// 		'DELETE FROM ' + DAOTables.TagBookmark + ' WHERE tag_id = "' + id + '"',
		// 		(outcome) => {
		// 			this
		// 				.getARO()
		// 				.delete(
		// 					DAOTables.Tags,
		// 					new Pair<string, any>('id', tag.getId()),
		// 					(success) => {
		// 						callback(success);
		// 					}
		// 				);
		// 		}
		// 	);
	}

	get(callback : Action<IList<Tag>>) : void {
		ActiveRecordObject.get<TagDAO>(DAOTables.Tags, callback, Tag.fromObject);
	}

	find(id : string, callback : Action<Tag>) : void {
		this
			.getARO()
			.find(
				DAOTables.Tags,
				new Pair<string, any>('id', id),
				callback,
				Tag.fromObject
			);
	}

	findByLabel(label : string, callback : Action<Tag>) : void {
		this
			.getARO()
			.find(
				DAOTables.Tags,
				new Pair<string, any>('label', label),
				callback,
				TagDAO.fromObject
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
