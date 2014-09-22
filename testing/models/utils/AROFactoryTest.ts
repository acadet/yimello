/// <reference path="../../test_dependencies.ts" />

class AROFactoryTest extends UnitTestClass {
	private _config : ActiveRecordConfig;

	setUp() : void {
		this._config = new ActiveRecordConfig(
			'yimello-testing',
			'1.0',
			1024 * 1024
		);
	}

	tearDown() : void {
		this._config = null;
	}

	AROFactoryBuildTest() : void {
		// Arrange
		var outcome : IActiveRecordObject;
	
		// Act
		outcome = AROFactory.build(this._config);
	
		// Assert
		this.isTrue(TSObject.exists(outcome));
	}

	AROFactoryBuildTwiceTest() : void {
		// Arrange
		var out1 : IActiveRecordObject, out2 : IActiveRecordObject;
	
		// Act
		out1 = AROFactory.build(this._config);
		out2 = AROFactory.build(this._config);
	
		// Assert
		this.isTrue(TSObject.exists(out1));
		this.isTrue(TSObject.exists(out2));
		this.areIdentical(out1, out2);
	}
}

UnitTestClass.handle(new AROFactoryTest());
