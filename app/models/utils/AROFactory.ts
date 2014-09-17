/// <reference path="../../dependencies.ts" />

class AROFactory {
	//region Fields

	private static _aro : IActiveRecordObject;
	
	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	public build(config : ActiveRecordConfig) : IActiveRecordObject {
		if (!TSObject.exists(AROFactory._aro)) {
			var db : ISQLDatabase;

			db = SQLDatabase.open(
				config.getDatabaseName(),
				config.getDatabaseVersion(),
				config.getDatabaseName(),
				config.getDatabaseSize()
			);

			AROFactory._aro = new ActiveRecordObject(db);
		}

		return ActiveRecordObject._aro;
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
