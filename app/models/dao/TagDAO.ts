/// <reference path="../../dependencies.ts" />

class TagDAO extends DataAccessObject {
	//region Fields
	
	private _label : string;

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private static _fromObject(obj : any) : TagDAO {
		var t : TagDAO = new TagDAO();
		t.setId(obj.id);
		t.setLabel(obj.label);

		return t;
	}

	//endregion Private Methods
	
	//region Public Methods
	
	getLabel() : string {
		return this._label;
	}

	setLabel(l : string) : TagDAO {
		this._label = l;
		return this;
	}

	toList() : IList<any> {
		var l : IList<any> = new ArrayList<any>();

		l.add(this.getId());
		l.add(this.getLabel());

		return l;
	}

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

	static get(callback : Action<IList<TagDAO>>) : void {
		DataAccessObject.initialize(
			(success) => {
				ActiveRecordObject.get<TagDAO>(DAOTables.Tags, callback, TagDAO._fromObject);
			}
		);
	}

	delete(callback : Action<boolean> = null) : void {
		this.initialize(
			(success) => {
				if (!TSObject.exists(this.getId())) {
					Log.error(new DAOException('Failed to delete: an id must be provided'));
					if (callback !== null) {
						callback(false);
					}

					return;
				}

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

	//endregion Public Methods
	
	//endregion Methods
}

