/// <reference path="../../test_dependencies.ts" />

class DataAccessObjectTest extends UnitTestClass {
	private _dao : DataAccessObject;
	private _delay : number;
	private static _dbName : string = 'yimello-test';

	constructor() {
	    super();

	    this._delay = 0;
	}

	setUp() : void {
		this._dao = new DataAccessObject(DataAccessObjectTest._dbName);
	}

	tearDown() : void {
		this._dao = null;
		this._delay += 1000;
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

				dao = new DataAccessObject(DataAccessObjectTest._dbName);

				f = (b) => {
					// Assert
					this.isTrue(b);
				};

				//Act
				dao.initialize(f);
			},
			this._delay
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

				dao = new DataAccessObject(DataAccessObjectTest._dbName);

				g = (b) => {
					// Assert
					this.isTrue(b);
				};

				f = (b) => {
					this.isTrue(b);
					dao.initialize(g);
				};

				// Act
				dao.initialize(f);
			},
			this._delay
		);
	}
}

UnitTestClass.handle(new DataAccessObjectTest());
