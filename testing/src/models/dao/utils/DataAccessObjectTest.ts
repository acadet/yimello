/// <reference path="../../../references.ts" />

class DataAccessObjectTest extends UnitTestClass {

	DataAccessObjectConstructorTest() : void {
		// Arrange
		var dao : DataAccessObject;
		var aro : IActiveRecordObject;

		aro = new Mocks.DAO.ActiveRecordObject();
	
		// Act
		dao = new DataAccessObject(aro);
	
		// Assert
		Assert.isNotNull(dao);
		Assert.areEqual(aro, dao.getARO());
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
		Assert.areEqual(aro, outcome);
	}
}
