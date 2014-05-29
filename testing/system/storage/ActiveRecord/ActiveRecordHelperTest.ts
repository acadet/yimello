/// <reference path="../../../test_dependencies.ts" />

class ActiveRecordHelperTest extends UnitTestClass {
	myMethodTest() : void {
		this.areIdentical(true, false);
	}
}

UnitTestClass.handle(new ActiveRecordHelperTest());
