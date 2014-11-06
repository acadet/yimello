/// <reference path="../../../dependencies.ts" />

/**
 * Matches ARO pattern. Provides shortcut for
 * SQL requests
 */
class ActiveRecordObject implements IActiveRecordObject {
	//region Fields

	private _database : ISQLDatabase;
	
	//endregion Fields
	
	//region Constructors

	constructor(database : ISQLDatabase) {
		this._database = database;
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	executeSQL(request : string, callback? : Action<any>) : void {
		callback = ActionHelper.getValueOrDefault(callback);

		this._database.transaction(
			(tx) => {
				tx.execute(
					request,
					[],
					(tx, outcome) => {
						callback(outcome);
					},
					(tx, e) => {
						ActiveRecordHelper.executeErrorHandler(tx, e);
						callback(null);
						return false;
					}
				);
			}
		);
	}

	get<T>(table : string, callback : Action<IList<T>>, converter? : Func<any, T>) : void {
		this._database.transaction(
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

	find<T>(
		table : string,
		selector : KeyValuePair<string, any>,
		callback : Action<T>,
		converter? : Func<any, T>) : void {
	
		this._database.transaction(
			(tx) => {
				var data : Array<any>;

				data = new Array<any>();
				data.push(selector.getValue());

				tx.execute(
					'SELECT * FROM ' + table + ' WHERE LOWER(' + selector.getKey() + ') = LOWER(?)',
					data,
					(tx, outcome) => {
						var s : SQLRowSet;

						if (!TSObject.exists(outcome)) {
							Log.error(new ActiveRecordException('An error has occurend when seeking data into DB'));
							callback(null);
							return;
						}

						s = outcome.getRows();

						if (s.getLength() < 1) {
							// No entry
							callback(null);
							return;
						}

						if (TSObject.exists(converter)) {
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

	insert(table : string, data : IList<any>, callback? : Action<boolean>) : void {
		callback = ActionHelper.getValueOrDefault(callback);

		if (!TSObject.exists(data)) {
			Log.error(new ActiveRecordException('insert(): Provided data are undefined'));
			callback(false);
			return;
		}

		this._database.transaction(
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
						callback(true);
					},
					(tx, error) => {
						ActiveRecordHelper.executeErrorHandler(tx, error);
						callback(false);
						return false;
					}
				);
			},
			ActiveRecordHelper.transactionErrorHandler
		);
	}
	
	update(
		table : string,
		selector : KeyValuePair<string, any>,
		data : IDictionary<string, any>,
		callback? : Action<boolean>) : void {

		callback = ActionHelper.getValueOrDefault(callback);

		if (!TSObject.exists(data)) {
			Log.error(new ActiveRecordException('update(): Provided data are undefined'));
			callback(false);
			return;
		}

		this._database.transaction(
			(tx) => {
				var args : IList<any>;
				var marks : StringBuffer = new StringBuffer();
				var i : number = 0;

				args = new ArrayList<any>();

				data.forEach(
					(pair) => {
						if (i !== 0) {
							marks.append(', ');
						}

						// Keys are used for request
						marks.append(pair.getKey() + ' = ?');
						// Values are used as prepared data
						args.add(pair.getValue());
						i++;
					}
				);

				args.add(selector.getValue());

				tx.execute(
					'UPDATE ' + table + ' SET ' + marks.toString() + ' WHERE ' + selector.getKey() + ' = ?',
					args.toArray(),
					(tx, outcome) => {
						callback(true);
					},
					(tx, error) => {
						ActiveRecordHelper.executeErrorHandler(tx, error);
						callback(false);
						return false;
					}
				);
			},
			ActiveRecordHelper.transactionErrorHandler
		);
	}

	delete(table : string, selector : KeyValuePair<string, any>, callback? : Action<boolean>) : void {
		callback = ActionHelper.getValueOrDefault(callback);

		this._database.transaction(
			(tx) => {
				var request : StringBuffer;

				request = new StringBuffer('DELETE FROM ' + table);
				request.append(' WHERE ' + selector.getKey());
				request.append(' = ?');

				tx.execute(
					request.toString(),
					[selector.getValue()],
					(tx, outcome) => {
						callback(true);
					},
					(tx, error) => {
						ActiveRecordHelper.executeErrorHandler(tx, error);
						callback(false);
						return false;
					}
				);
			},
			ActiveRecordHelper.transactionErrorHandler
		);
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
