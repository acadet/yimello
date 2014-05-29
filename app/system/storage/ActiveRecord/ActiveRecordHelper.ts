/// <reference path="../../../dependencies.ts" />

class ActiveRecordHelper extends TSObject {

	static transactionErrorHandler(e : SQLError) : void {
		Log.error(new ActiveRecordException(e.getMessage()));
	}

	static executeErrorHandler(tx : SQLTransaction, e : SQLError) : boolean {
		Log.error(new ActiveRecordException(e.getMessage()));
		return true;
	}

	static getListFromSQLResultSet<T>(set : SQLResultSet, converter : Func<any, T> = null) : IList<T> {
		var s : SQLRowSet = set.getRows();
		var outcome : IList<T> = new ArrayList<T>();

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
