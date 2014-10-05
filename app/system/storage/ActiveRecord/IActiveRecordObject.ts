/// <reference path="../../../dependencies.ts" />

/**
 * An ARO. Interacts with a SQL DAL
 */
interface IActiveRecordObject {
	/**
	 * Execute a raw sql request
	 * @param request  SQL request to run
	 * @param callback Optional callback to run with raw data
	 */
	executeSQL(request : string, callback? : Action<any>) : void;

	/**
	 * Gets all entries from specified tables.
	 * @param table Targeted table
	 * @param callback Called with outcome
	 * @param converter Optional converter to apply to each raw enrty
	 */
	get<T>(table : string, callback : Action<IList<T>>, converter? : Func<any, T>) : void;

	/**
	 * Finds entry using provided selector
	 * @param table Targeted table
	 * @param selector Key/Value to match
	 * @param callback Called with outcome
	 * @param converter Optional convert to apply to raw data
	 */
	find<T>(
		table : string,
		selector : Pair<string, any>,
		callback : Action<T>,
		converter? : Func<any, T>) : void;

	/**
	 * Executes an insert request with a single object
	 * @param table Targeted table
	 * @param data List of raw data, ordered by column
	 * @param callback Optional callback to call with a success bool
	 */
	insert(table : string, data : IList<any>, callback? : Action<boolean>) : void;

	/**
	 * Updates entry from DB using provided selector
	 * @param table Targeted table
	 * @param selector Key/Value to match
	 * @param data Keys/Values to update
	 * @param callback Optional callback to call with a success bool
	 */
	update(
		table : string,
		selector : Pair<string, any>,
		data : IDictionary<string, any>,
		callback? : Action<boolean>) : void;

	/**
	 * Deletes an entry from DB
	 * @param table Targeted table
	 * @param selector Key/Value to match
	 * @param callback Optional callback to call with a success bool
	 */
	delete(table : string, selector : Pair<string, any>, callback? : Action<boolean>) : void;
}
