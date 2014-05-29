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
					ActiveRecordHelper.executeErrorHandler
				);
			},
			ActiveRecordHelper.transactionErrorHandler
		);
	}

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

				for (var i = 0; i < data.getLength(); i++) {
					if (i === 0) {
						marks.append('? = ?');
					} else {
						marks.append(', ? = ?');
					}
				}

				data.forEach((k, v) => {
					args.add(k);
					args.add(v);
				});

				args.insertAt(0, table);
				args.add(selector.getFirst());
				args.add(selector.getSecond());

				tx.execute(
					'UPDATE INTO ? SET ' + marks.toString() + ' WHERE ? = ?',
					args.toArray(),
					(tx, outcome) => {
						if (callback !== null) {
							callback(true);
						}
					},
					ActiveRecordHelper.executeErrorHandler
				);
			},
			ActiveRecordHelper.transactionErrorHandler
		);
	}

	static couple(table : string, pairs : IList<Pair<any, any>>, callback : Action<boolean> = null) : void {
		
		if (!TSObject.exists(pairs)) {
			Log.error(new ActiveRecordException('couple(): Provided pairs are undefined'));
			if (callback !== null) {
				callback(false);
			}
			return;
		}
		
		ActiveRecordObject._init();
		ActiveRecordObject._currentDB.transaction(
			(tx) => {
				for(var i = 0; i < pairs.getLength(); i++) {
					var p : Pair<any, any> = pairs.getAt(i);
					var args : IList<any> = new ArrayList<any>();

					args.add(table);
					args.add(p.getFirst());
					args.add(p.getSecond());

					tx.execute(
						'INSERT INTO ? VALUES (?, ?)',
						args.toArray(),
						(tx, outcome) => {
							if (callback !== null) {
								callback(true);
							}
						},
						ActiveRecordHelper.executeErrorHandler
					);
				}
			},
			ActiveRecordHelper.transactionErrorHandler
		);
	}

	//endregion Public Methods
	
	//endregion Methods
}
