/// <reference path="../../test_dependencies.ts" />

class DataAccessObjectTest extends UnitTestClass {
	private _dao : DataAccessObject;

	constructor() {
	    super();

	    DataAccessObject.setDatabaseName('yimello-test');
	}

	setUp() : void {
		this._dao = new DataAccessObject();
	}

	tearDown() : void {
		this._dao = null;
		UnitTestClass.increaseDelay();
	}

	DataAccessObjectIdTest() : void {
		// Arrange
		var id : string = 'myDAO';

		// Act
		this._dao.setId(id);

		// Assert
		this.areIdentical(id, this._dao.getId());
	}

	DataAccessObjectInitializeTest() : void {
		var timer : Timer;

		timer = new Timer(
			(o) => {
				// Arrange
				var f : Action<boolean>;
				var dao : DataAccessObject;

				dao = new DataAccessObject();

				f = (b) => {
					// Assert
					this.isTrue(b);
					DataAccessObject.clean();
				};

				//Act
				dao.initialize(f);
			},
			UnitTestClass.getDelay()
		);
	}

	DataAccessObjectInitializeTwiceTest() : void {
		var timer : Timer;

		timer = new Timer(
			(o) => {
				// Arrange
				var f : Action<boolean>;
				var g : Action<boolean>;
				var dao : DataAccessObject;

				dao = new DataAccessObject();

				g = (b) => {
					// Assert
					this.isTrue(b);
					DataAccessObject.clean();
				};

				f = (b) => {
					this.isTrue(b);
					dao.initialize(g);
				};

				// Act
				dao.initialize(f);
			},
			UnitTestClass.getDelay()
		);
	}
}

UnitTestClass.handle(new DataAccessObjectTest());
