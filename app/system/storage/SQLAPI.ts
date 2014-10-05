/// <reference path="../../dependencies.ts" />

interface Window {
	openDatabase(name : string, version : string, displayName : string, size : number, callback : Action<any>) : any;
}

class SQLError {
	private _error : any;

	constructor(error : any) {
		this._error = error;
	}

	getCode() : number {
		return this._error.code;
	}

	getMessage() : string {
		return this._error.message;
	}
}

class SQLRowSet {
	private _rows : any;

	constructor(rowSet : any) {
		this._rows = rowSet;
	}

	getLength() : number {
		return this._rows.length;
	}

	item(i : number) : any {
		return this._rows.item(i);
	}
}

class SQLResultSet {
	private _set : any;

	constructor(set : any) {
		this._set = set;
	}

	getInsertId() : number {
		return this._set.insertId;
	}

	getRowsAffected() : number {
		return this._set.rowsAffected;
	}

	getRows() : SQLRowSet {
		return new SQLRowSet(this._set.rows);
	}
}

interface ISQLStatementCallback {
	(tx : SQLTransaction, outcome : SQLResultSet) : void;
}

interface ISQLStatementErrorCallback {
	(tx : SQLTransaction, error : SQLError) : boolean;
}

class SQLTransaction {
	private _tx : any;

	constructor(transaction : any) {
		this._tx = transaction;
	}

	execute(
		statement : string,
		arguments : Array<any>,
		success : ISQLStatementCallback,
		error : ISQLStatementErrorCallback) : void {

		this._tx.executeSql(
			statement,
			arguments,
			(o, results) => {
				success(new SQLTransaction(o), new SQLResultSet(results));
			},
			(tx, e) => {
				error(new SQLTransaction(tx), new SQLError(e));
			}
		);
	}
}

interface IDatabaseCallback {
	(database : SQLDatabase) : void;
}

interface ISQLTransactionCallback {
	(transaction : SQLTransaction) : void;
}

interface ISQLTransactionErrorCallback {
	(error : SQLError) : void;
}

interface ISQLDatabase {
	transaction(success : ISQLTransactionCallback, error? : ISQLTransactionErrorCallback) : void;
}

class SQLDatabase implements ISQLDatabase {
	private _db : any;

	constructor(dbObj : any) {
		this._db = dbObj;
	}

	static open(
		name : string,
		version : string,
		displayName : string,
		size : number,
		callback : IDatabaseCallback = null) : SQLDatabase {
		var db : any = window.openDatabase(
			name,
			version,
			displayName,
			size,
			(o) => {
				if (callback !== null) {
					callback(new SQLDatabase(o));
				}
			}
		);

		return new SQLDatabase(db);
	}

	transaction(success : ISQLTransactionCallback, error? : ISQLTransactionErrorCallback) : void {
		this._db.transaction(
			(o) => {
				success(new SQLTransaction(o));
			},
			(o) => {
				error(new SQLError(o));
			}
		);
	}
}
