/// <reference path="../test_dependencies.ts" />

module Mocks {
	export module ARO {
		export class SQLRowSet {
			private _content : Array<any>;

			length : number;

			constructor() {
				this._content = new Array<any>();
				this.length = 0;
			}

			item(i : number) : any {
				return this._content[i];
			}

			push(o : any) : Mocks.ARO.SQLRowSet {
				this._content.push(o);
				this.length++;
				return this;
			}
		}

		export class SQLSet {
			rows : any;
		}

		export class Transaction {
			private _successOutcome : any;
			private _errorOutcome : any;
			private _mustFail : boolean;
			private _statement : string;
			private _arguments : Array<any>;

			constructor() {
				this._mustFail = false;
			}

			executeSql(
				statement : string,
				arguments : Array<any>,
				success : any,
				error : any) : void {

				this._statement = statement;
				this._arguments = arguments;

				if (this._mustFail) {
					error(this, this._errorOutcome);
				} else {
					success(this, this._successOutcome);
				}
			}

			getStatement() : string {
				return this._statement;
			}

			getArguments() : Array<any> {
				return this._arguments;
			}

			setSuccessOutcome(obj : Mocks.ARO.SQLRowSet) : Mocks.ARO.Transaction {
				var set : Mocks.ARO.SQLSet;

				set = new Mocks.ARO.SQLSet();
				set.rows = obj;
				this._successOutcome = set;

				return this;
			}

			setErrorOutcome(obj : Mocks.ARO.SQLRowSet) : Mocks.ARO.Transaction {
				var set : Mocks.ARO.SQLSet;

				set = new Mocks.ARO.SQLSet();
				set.rows = obj;
				this._errorOutcome = set;

				return this;
			}

			mustFail() : Mocks.ARO.Transaction {
				this._mustFail = true;
				return this;
			}
		}

		export class Database implements ISQLDatabase {
			private _transaction : Mocks.ARO.Transaction;

			transaction(success : ISQLTransactionCallback, error? : ISQLTransactionErrorCallback) : void {
				success(new SQLTransaction(this._transaction));
			}

			setTransaction(transaction : Mocks.ARO.Transaction) : void {
				this._transaction = transaction;
			}
		}
	}
}
