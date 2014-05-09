/// <reference path="../../dependencies.ts" />

class TagDAO extends DataAccessObject {
	//region Fields
	
	private _label : string;

	private static TABLE : string = 'tag';

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

	static get(callback : Action<IList<TagDAO>>) : void {
		ActiveRecordObject.get<TagDAO>(TagDAO.TABLE, callback, TagDAO._fromObject);
	}

	//endregion Public Methods
	
	//endregion Methods
}
