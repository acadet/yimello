/// <reference path="../../test_dependencies.ts" />

class TagDAOTest extends UnitTestClass {
	private _dao : TagDAO;
	private static _dbName : string = 'yiemllo-test';

	setUp() : void {
		this._dao = new TagDAO(TagDAOTest._dbName);
	}

	tearDown() : void {
		this._dao = null;
	}

	TagDAOLabelTest() : void {
		// Arrange
		var label : string = 'A label';

		// Act
		this._dao.setLabel(label);

		// Assert
		this.areIdentical(label, this._dao.getLabel());
	}
}

UnitTestClass.handle(new TagDAOTest());
