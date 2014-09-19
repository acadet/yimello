/// <reference path="../test_dependencies.ts" />

module Mocks {
	export module DAO {
		export class ActiveRecordObject implements IActiveRecordObject {
			private _executeSQLOutcome : any;
			private _getOutcome : IList<any>;
			private _findOutcome : any;
			private _insertOutcome : boolean;
			private _updateOutcome : boolean;
			private _deleteOutcome : boolean;

			private _executeSQLTimes : number;
			private _getTimes : number;
			private _findTimes : number;
			private _insertTimes : number;
			private _updateTimes : number;
			private _deleteTimes : number;

			private _executeSQLArgs : Array<any>;
			private _getArgs : Array<any>;
			private _findArgs : Array<any>;
			private _insertArgs : Array<any>;
			private _updateArgs : Array<any>;
			private _deleteArgs : Array<any>;

			constructor() {
				this._executeSQLTimes = 0;
				this._getTimes = 0;
				this._findTimes = 0;
				this._insertTimes = 0;
				this._updateTimes = 0;
				this._deleteTimes = 0;
			}

			//region IActiveRecordObject

			executeSQL(request : string, callback? : Action<any>) : void {
				this._executeSQLTimes++;
				this._executeSQLArgs = [request, callback];
				if (TSObject.exists(callback)) {
					callback(this._executeSQLOutcome);
				}
			}

			get<T>(table : string, callback : Action<IList<T>>, converter? : Func<any, T>) : void {
				this._getTimes++;
				this._getArgs = [table, callback, converter];
				callback(this._getOutcome);
			}

			find<T>(
				table : string,
				selector : Pair<string, any>,
				callback : Action<T>,
				converter? : Func<any, T>) : void {

				this._findTimes++;
				this._findArgs = [table, selector, callback, converter];
				callback(this._findOutcome);
			}

			insert(table : string, data : IList<any>, callback? : Action<boolean>) : void {
				this._insertTimes++;
				this._insertArgs = [table, data, callback];
				if (TSObject.exists(callback)) {
					callback(this._insertOutcome);
				}
			}

			update(
				table : string,
				selector : Pair<string, any>,
				data : IDictionary<string, any>,
				callback? : Action<boolean>) : void {

				
				this._updateTimes++;
				this._updateArgs = [table, selector, data, callback];
				if (TSObject.exists(callback)) {
					callback(this._updateOutcome);
				}
			}

			delete(table : string, selector : Pair<string, any>, callback? : Action<boolean>) : void {
				this._deleteTimes++;
				this._deleteArgs = [table, selector, callback];
				if (TSObject.exists(callback)) {
					callback(this._deleteOutcome);
				}
			}

			//endregion IActiveRecordObject

			setExecuteSQLOutcome(value : any) : Mocks.DAO.ActiveRecordObject {
				this._executeSQLOutcome = value;
				return this;
			}

			setGetOutcome(value : IList<any>) : Mocks.DAO.ActiveRecordObject {
				this._getOutcome = value;
				return this;
			}

			setFindOutcome(value : any) : Mocks.DAO.ActiveRecordObject {
				this._findOutcome = value;
				return this;
			}

			setInsertOutcome(value : boolean) : Mocks.DAO.ActiveRecordObject {
				this._insertOutcome = value;
				return this;
			}

			setUpdateOutcome(value : boolean) : Mocks.DAO.ActiveRecordObject {
				this._updateOutcome = value;
				return this;
			}

			setDeleteOutcome(value : boolean) : Mocks.DAO.ActiveRecordObject {
				this._deleteOutcome = value;
				return this;
			}

			executeSQLTimes() : number {
				return this._executeSQLTimes;
			}

			getTimes() : number {
				return this._getTimes;
			}

			findTimes() : number {
				return this._findTimes;
			}

			insertTimes() : number {
				return this._insertTimes;
			}

			updateTimes() : number {
				return this._updateTimes;
			}

			deleteTimes() : number {
				return this._deleteTimes;
			}

			executeSQLArgs() : Array<any> {
				return this._executeSQLArgs;
			}

			getArgs() : Array<any> {
				return this._getArgs;
			}

			findArgs() : Array<any> {
				return this._findArgs;
			}

			insertArgs() : Array<any> {
				return this._insertArgs;
			}

			updateArs() : Array<any> {
				return this._updateArgs;
			}

			deleteArgs() : Array<any> {
				return this._deleteArgs;
			}
		}
	}
}
