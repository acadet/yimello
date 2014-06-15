/// <reference path="../../../dependencies.ts" />

/**
 * Matches ARO pattern. Provides shortcut for
 * SQL requests
 */
class ActiveRecordObject extends TSObject {
	//region Fields
	
	/**
	 * Current DB
	 */
	private static _currentDB : SQLDatabase;

	/**
	 * Current configuration
	 */
	private static _currentConfig : ActiveRecordConfig;

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	/**
	 * Called by intern methods to enable an endpoint with DB
	 */
	private static _init() : void {
		if (!TSObject.exists(ActiveRecordObject._currentDB)) {
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
	
	/**
	 * Initializes ARO with provided configuration
	 * @param {ActiveRecordConfig} config [description]
	 */
	static init(config : ActiveRecordConfig) : void {
		ActiveRecordObject._currentConfig = config;
	}

	/**
	 * Execute a raw sql request
	 */
	static executeSQL(request : string, callback : Action<any> = null) : void {
		ActiveRecordObject._init();
		ActiveRecordObject._currentDB.transaction(
			(tx) => {
				tx.execute(
					request,
					[],
					(tx, outcome) => {
						if (callback !== null) {
							callback(outcome);
						}
					},
					(tx, e) => {
						ActiveRecordHelper.executeErrorHandler(tx, e);
						if (callback !== null) {
							callback(null);
						}
						return false;
					}
				);
			}
		);
	}

	/**
	 * Gets all entries from specified tables.
	 * Returns a list of items built with given 
	 * converter
	 */
	static get<T>(table : string, callback : Action<IList<T>>, converter : Func<any, T> = null) : void {
		ActiveRecordObject._init();
		ActiveRecordObject._currentDB.transaction(
			(tx) => {
				tx.execute(
					'SELECT * FROM ' + table,
					[],
					(tx, outcome) => {
						callback(ActiveRecordHelper.getListFromSQLResultSet<T>(outcome, converter));
					},
					(tx, e) => {
						ActiveRecordHelper.executeErrorHandler(tx, e);
						callback(null);

						return false;
					}
				);
			},
			ActiveRecordHelper.transactionErrorHandler
		);
	}

	static find<T>(
		table : string,
		selector : Pair<string, any>,
		callback : Action<T>,
		converter : Func<any, T> = null) : void {
		
		ActiveRecordObject._init();
		ActiveRecordObject._currentDB.transaction(
			(tx) => {
				var request : StringBuffer;

				request = new StringBuffer('SELECT * FROM ' + table);
				request.append(' WHERE ' + selector.getFirst());
				request.append(' = "' + selector.getSecond() + '"');

				tx.execute(
					request.toString(),
					[],
					(tx, outcome) => {
						var s : SQLRowSet;

						if (!TSObject.exists(outcome)) {
							Log.error(new ActiveRecordException('An error has occurend when seeking data into DB'));
							callback(null);
							return;
						}

						s = outcome.getRows();

						if (s.getLength() < 1) {
							callback(null);
							return;
						}

						if (converter !== null) {
							callback(converter(s.item(0)));
						} else {
							callback(s.item(0));
						}
					},
					(tx, e) => {
						ActiveRecordHelper.executeErrorHandler(tx, e);
						callback(null);

						return false;
					}
				);
			},
			ActiveRecordHelper.transactionErrorHandler
		);
	}

	/**
	 * Execute an insert request with a single object
	 */
	static insert(table : string, data : IList<any>, callback : Action<boolean> = null) : void {

		if (!TSObject.exists(data)) {
			Log.error(new ActiveRecordException('insert(): Provided data are undefined'));
			if (callback !== null) {
				callback(false);
			}
			return;
		}

		ActiveRecordObject._init();
		ActiveRecordObject._currentDB.transaction(
			(tx) => {
				var s : StringBuffer = new StringBuffer();
				s.append('(');

				for (var i = 0; i < data.getLength(); i++) {
					if (i === 0) {
						s.append('?');
					} else {
						s.append(', ?');
					}
				}

				s.append(')');

				tx.execute(
					'INSERT INTO ' + table + ' VALUES ' + s.toString(),
					data.toArray(),
					(tx, outcome) => {
						if (callback !== null) {
							callback(true);
						}
					},
					(tx, error) => {
						ActiveRecordHelper.executeErrorHandler(tx, error);
						if (callback !== null) {
							callback(false);
						}
						return false;
					}
				);
			},
			ActiveRecordHelper.transactionErrorHandler
		);
	}

	/**
	 * Updates entry from DB using provided selector
	 */
	static update(
		table : string,
		selector : Pair<string, any>,
		data : IDictionary<string, any>,
		callback : Action<boolean> = null) : void {

		if (!TSObject.exists(data)) {
			Log.error(new ActiveRecordException('update(): Provided data are undefined'));
			if (callback !== null) {
				callback(false);
			}
			return;
		}

		ActiveRecordObject._init();
		ActiveRecordObject._currentDB.transaction(
			(tx) => {
				var args : IList<any>;
				var marks : StringBuffer = new StringBuffer();
				var i : number = 0;

				args = new ArrayList<any>();

				data.forEach((k, v) => {
					if (i !== 0) {
						marks.append(', ');
					}

					// Keys are used for request
					marks.append(k + ' = ?');
					// Values are used as prepared data
					args.add(v);
					i++;
				});

				args.add(selector.getSecond());

				tx.execute(
					'UPDATE ' + table + ' SET ' + marks.toString() + ' WHERE ' + selector.getFirst() + ' = ?',
					args.toArray(),
					(tx, outcome) => {
						if (callback !== null) {
							callback(true);
						}
					},
					(tx, error) => {
						ActiveRecordHelper.executeErrorHandler(tx, error);
						if (callback !== null) {
							callback(false);
						}
						return false;
					}
				);
			},
			ActiveRecordHelper.transactionErrorHandler
		);
	}

	/**
	 * Deletes an entry from DB
	 */
	static delete(table : string, selector : Pair<string, any>, callback : Action<boolean> = null) : void {
		ActiveRecordObject._init();

		ActiveRecordObject._currentDB.transaction(
			(tx) => {
				var request : StringBuffer;

				request = new StringBuffer('DELETE FROM ' + table);
				request.append(' WHERE ' + selector.getFirst());
				request.append(' = ?');

				tx.execute(
					request.toString(),
					[selector.getSecond()],
					(tx, outcome) => {
						if (callback !== null) {
							callback(true);
						}
					},
					(tx, error) => {
						ActiveRecordHelper.executeErrorHandler(tx, error);

						if (callback !== null) {
							callback(false);
						}

						return false;
					}
				);
			},
			ActiveRecordHelper.transactionErrorHandler
		);
	}

	// static couple(table : string, pairs : IList<Pair<any, any>>, callback : Action<boolean> = null) : void {
	// 	if (!TSObject.exists(pairs)) {
	// 		Log.error(new ActiveRecordException('Provided pairs are undefined'));
	// 		if (callback !== null) {
	// 			callback(false);
	// 		}
	// 		return;
	// 	}
		
	// 	ActiveRecordObject._init();
	// 	ActiveRecordObject._currentDB.transaction(
	// 		(tx) => {
	// 			for(var i = 0; i < pairs.getLength(); i++) {
	// 				var p : Pair<any, any> = pairs.getAt(i);
	// 				var args : IList<any> = new ArrayList<any>();

	// 				args.add(table);
	// 				args.add(p.getFirst());
	// 				args.add(p.getSecond());

	// 				tx.execute(
	// 					'INSERT INTO ? VALUES (?, ?)',
	// 					args.toArray(),
	// 					(tx, outcome) => {
	// 						if (callback !== null) {
	// 							callback(true);
	// 						}
	// 					},
	// 					ActiveRecordHelper.executeErrorHandler
	// 				);
	// 			}
	// 		},
	// 		ActiveRecordHelper.transactionErrorHandler
	// 	);
	// }

	//endregion Public Methods
	
	//endregion Methods
}
