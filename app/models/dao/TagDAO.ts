/// <reference path="../../dependencies.ts" />

/**
 * A tag entity
 */
class TagDAO extends DataAccessObject {
	//region Fields
	
	/**
	 * Label of tag
	 */
	private _label : string;

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	//endregion Private Methods
	
	//region Public Methods
	
	/**
	 * Returns label
	 * @return {string} [description]
	 */
	getLabel() : string {
		return this._label;
	}

	/**
	 * Sets label
	 * @param  {string} l [description]
	 * @return {TagDAO}   [description]
	 */
	setLabel(l : string) : TagDAO {
		this._label = l;
		return this;
	}

	/**
	 * Transforms current tag as a list of data.
	 * Data are sorted to match organization of DB
	 * @return {IList<any>} [description]
	 */
	toList() : IList<any> {
		var l : IList<any> = new ArrayList<any>();

		l.add(this.getId());
		l.add(this.getLabel());

		return l;
	}

	/**
	 * Fills a tag entity from a DB object
	 * @param  {any}    obj Object built by DB
	 * @return {TagDAO}     [description]
	 */
	static fromObject(obj : any) : TagDAO {
		var t : TagDAO = new TagDAO();
		t.setId(obj.id);
		t.setLabel(obj.label);

		return t;
	}

	/**
	 * Adds a new tag into DB
	 * @param {Action<TagDAO> = null} callback Callback with new built tag. Id is filled
	 */
	add(callback : Action<TagDAO> = null) : void {
		var data : IList<any> = new ArrayList<any>();
		var id : string = Guid.newGuid();

		data.add(id);
		data.add(this.getLabel());

		this.initialize(
			(success) => {
				var f : Action<boolean>;
				var t : TagDAO;

				t = new TagDAO();
				t.setId(id);
				t.setLabel(this.getLabel());

				f = (success) => {
					if (success) {
						callback(t);
					} else {
						callback(null);
					}
				};

				ActiveRecordObject.insert(DAOTables.Tags, data, f);
			}
		);
	}

	/**
	 * Gets all tags from DB
	 * @param {Action<IList<TagDAO>>} callback Callback with tag list
	 */
	static get(callback : Action<IList<TagDAO>>) : void {
		DataAccessObject.initialize(
			(success) => {
				ActiveRecordObject.get<TagDAO>(DAOTables.Tags, callback, TagDAO.fromObject);
			}
		);
	}

	static find(id : string, callback : Action<TagDAO>) : void {
		DataAccessObject.initialize(
			(success) => {
				ActiveRecordObject.find(
					DAOTables.Tags,
					new Pair<string, any>('id', id),
					callback,
					TagDAO.fromObject
				);
			}
		);
	}

	/**
	 * Deletes tag from DB
	 * @param {Action<boolean> = null} callback Callback with succeed arg
	 */
	delete(callback : Action<boolean> = null) : void {
		if (!TSObject.exists(this.getId()) || this.getId() === '') {
			Log.error(new DAOException('Failed to delete: an id must be provided'));
			if (callback !== null) {
				callback(false);
			}
			return;
		}

		this.initialize(
			(success) => {
				ActiveRecordObject.delete(
					DAOTables.Tags,
					new Pair<string, any>('id', this.getId()),
					(success) => {
						if (callback !== null) {
							callback(success);
						}
					}
				);
			}
		);
	}

	/**
	 * Sorts all tags by label asc
	 * @param {Action<IList<TagDAO>>} callback Callback with sorted tag list
	 */
	static sortByLabelAsc(callback : Action<IList<TagDAO>>): void {
		var request : StringBuffer;

		request = new StringBuffer('SELECT * FROM ' + DAOTables.Tags + ' ');
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

