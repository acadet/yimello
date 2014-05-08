/// <reference path="../../../dependencies.ts" />

class ActiveRecordHelper extends TSObject {

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
