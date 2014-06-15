/// <reference path="../../../dependencies.ts" />

class ActiveRecordHelper extends TSObject {

	static transactionErrorHandler(e : SQLError) : void {
		Log.error(new ActiveRecordException(e.getMessage()));
	}

	static executeErrorHandler(tx : SQLTransaction, e : SQLError) : boolean {
		Log.error(new ActiveRecordException(e.getMessage()));

		return false;
	}

	/**
	 * Builds a list from sql set using
	 * specified converter
	 */
	static getListFromSQLResultSet<T>(set : SQLResultSet, converter : Func<any, T> = null) : IList<T> {
		var s : SQLRowSet;
		var outcome : IList<T>;

		outcome = new ArrayList<T>();

		if (!TSObject.exists(set)) {
			Log.warn('Unable to build a list: no data were returned');
			return outcome;
		}

		s = set.getRows();

		for (var i = 0; i < s.getLength(); i++) {
			if (converter !== null) {
				outcome.add(converter(s.item(i)));
			} else {
				outcome.add(s.item(i));
			}
		}

		return outcome;
	}
}
