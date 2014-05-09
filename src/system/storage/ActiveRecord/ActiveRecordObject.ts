/// <reference path="../../../dependencies.ts" />

class ActiveRecordObject extends TSObject {
	//region Fields
	
	private static _currentDB : SQLDatabase;
	private static _currentConfig : ActiveRecordConfig;

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private static _init() : void {
		if (ActiveRecordObject._currentDB !== null) {
			ActiveRecordObject._currentDB =
			SQLDatabase.open(
				ActiveRecordObject._currentConfig.getDatabaseName(),
				ActiveRecordObject._currentConfig.getDatabaseVersion(),
				ActiveRecordObject._currentConfig.getDatabaseName(),
				ActiveRecordObject._currentConfig.getDatabaseSize()
			);
		}
	}

	//endregion Private Methods
	
	//region Public Methods
	
	static init(config : ActiveRecordConfig) : void {
		ActiveRecordObject._currentConfig = config;
	}

	static get<T>(table : string, callback : Action<IList<T>>, converter : Func<any, T> = null) : void {
		ActiveRecordObject._init();
		ActiveRecordObject._currentDB.transaction(
			(tx) => {
				tx.execute(
					'SELECT * FROM ?',
					[table],
					(tx, outcome) => {
						callback(ActiveRecordHelper.getListFromSQLResultSet<T>(outcome, converter));
					},
					ActiveRecordHelper.executeErrorHandler
				);
			},
			ActiveRecordHelper.transactionErrorHandler
		);
	}

	//endregion Public Methods
	
	//endregion Methods
}
