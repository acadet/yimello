/// <reference path="../../dependencies.ts" />

class DataAccessObject {
	//region Fields

	private _aro : IActiveRecordObject;
	
	//endregion Fields
	
	//region Constructors

	constructor(aro : IActiveRecordObject) {
		this._aro = aro;
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	public getARO() : IActiveRecordObject {
		return this._aro;
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
