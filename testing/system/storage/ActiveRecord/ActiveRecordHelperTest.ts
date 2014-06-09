/// <reference path="../../../test_dependencies.ts" />

/**
 * Wraps mocks for ActiveRecordHelper testing
 */
module ActiveRecordHelperTestMocks {
	/**
	 * A mock for SQLRowSet objects
	 */
	export class SetMock {
		private _content : Array<any>;
		length : number;

		constructor() {
			this._content = new Array<any>();
			this.length = 0;
		}

		addItem(item : any) : void {
			this._content.push(item);
			this.length++;
		}

		item(i : number) : any {
			return this._content[i];
		}
	}

	/**
	 * A mock for SQLResultSet
	 */
	export class ResultSetMock {
		rows : any;
	}
}

/**
 * Test class for ActiveRecordHelper
 */
class ActiveRecordHelperTest extends UnitTestClass {

	setUp() : void {

	}

	tearDown() : void {

	}

	/**
	 * Tests GetListFromSQLResultSet method with a converter
	 */
	ActiveRecordHelperGetListFromSQLResultSetWithConverterTest() : void {
		// Arrange
		var set : ActiveRecordHelperTestMocks.SetMock;
		var resultSet : ActiveRecordHelperTestMocks.ResultSetMock;
		var sqlSet : SQLResultSet;
		var outcome : IList<number>;
		var converter : Func<any, number>;

		// Used converter
		converter = (e) => {
			if (e < 0) {
				return -e;
			} else {
				return e;
			}
		};

		// Mocked set
		set = new ActiveRecordHelperTestMocks.SetMock();
		set.addItem(-3);
		set.addItem(5);
		set.addItem(-2);
		set.addItem(0);

		resultSet = new ActiveRecordHelperTestMocks.ResultSetMock();
		resultSet.rows = set;

		sqlSet = new SQLResultSet(resultSet);

		// Act
		outcome = ActiveRecordHelper.getListFromSQLResultSet(sqlSet, converter);

		// Assert
		this.areIdentical(3, outcome.getAt(0));
		this.areIdentical(5, outcome.getAt(1));
		this.areIdentical(2, outcome.getAt(2));
		this.areIdentical(0, outcome.getAt(3));
	}

	/**
	 * Tests GetListFromSQLResultSet method without a converter
	 */
	ActiveRecordHelperGetListFromSQLResultSetWithoutConverterTest() : void {
		// Arrange
		var set : ActiveRecordHelperTestMocks.SetMock;
		var resultSet : ActiveRecordHelperTestMocks.ResultSetMock;
		var sqlSet : SQLResultSet;
		var outcome : IList<any>;

		// Mocked set
		set = new ActiveRecordHelperTestMocks.SetMock();
		set.addItem(-3);
		set.addItem(5);
		set.addItem(-2);
		set.addItem(0);

		resultSet = new ActiveRecordHelperTestMocks.ResultSetMock();
		resultSet.rows = set;

		sqlSet  = new SQLResultSet(resultSet);

		// Act
		outcome = ActiveRecordHelper.getListFromSQLResultSet(sqlSet);

		// Assert
		this.areIdentical(-3, outcome.getAt(0));
		this.areIdentical(5, outcome.getAt(1));
		this.areIdentical(-2, outcome.getAt(2));
		this.areIdentical(0, outcome.getAt(3));
	}
}

UnitTestClass.handle(new ActiveRecordHelperTest());
