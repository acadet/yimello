/// <reference path="../../dependencies.ts" />

class DataAccessObject extends TSObject {
	//region Fields
	
	private _id : string;

	//endregion Fields
	
	//region Constructors
	
	constructor() {
		super();

		var config : ActiveRecordConfig =
		new ActiveRecordConfig(
			'yimello'
		);

		ActiveRecordObject.init(config);
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	getId() : string {
		return this._id;
	}

	setId(id : string) : DataAccessObject {
		this._id = id;
		return this;
	}

	//endregion Public Methods
	
	//endregion Methods
}
