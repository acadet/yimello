/// <reference path="../../../test_dependencies.ts" />

class DataAccessObjectTest extends UnitTestClass {

	DataAccessObjectConstructorTest() : void {
		// Arrange
		var dao : DataAccessObject;
		var aro : IActiveRecordObject;

		aro = new Mocks.DAO.ActiveRecordObject();
	
		// Act
		dao = new DataAccessObject(aro);
	
		// Assert
		this.isTrue(TSObject.exists(dao));
		this.areIdentical(aro, dao.getARO());
	}

	DataAccessObjectGetAROTest() : void {
		// Arrange
		var dao : DataAccessObject;
		var aro : IActiveRecordObject, outcome : IActiveRecordObject;

		aro = new Mocks.DAO.ActiveRecordObject();
		dao = new DataAccessObject(aro);
	
		// Act
		outcome = dao.getARO();
	
		// Assert
		this.areIdentical(aro, outcome);
	}
}

UnitTestClass.handle(new DataAccessObjectTest());
