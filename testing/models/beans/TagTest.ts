/// <reference path="../../test_dependencies.ts" />

class TagTest extends UnitTestClass {
	private _tag : Tag;

	setUp() : void {
		this._tag = new Tag();
	}

	tearDown() : void {
		this._tag = null;
	}

	TagIdTest() : void {
		// Arrange
		var value : string, outcome : string;

		value = 'foo';

		// Act
		this._tag.setId(value);
		outcome = this._tag.getId();

		// Assert
		this.areIdentical(value, outcome);
	}

	TagLabelTest() : void {
		// Arrange
		var label : string = 'A label';

		// Act
		this._tag.setLabel(label);

		// Assert
		this.areIdentical(label, this._tag.getLabel());
	}

	TagToListTest() : void {
		// Arrange
		var id : string = '1';
		var label : string = 'foo';
		var outcome : IList<any>;

		this._tag.setId(id);
		this._tag.setLabel(label);

		// Act
		outcome = this._tag.toList();

		// Assert
		this.isTrue(TSObject.exists(outcome));
		this.areIdentical(2, outcome.getLength());
		this.areIdentical(id, outcome.getAt(0));
		this.areIdentical(label, outcome.getAt(1));
	}

	TagFromObjectTest() : void {
		// Arrange
		var source : any = {};
		var outcome : Tag;

		source.id = 'foo';
		source.label = 'bar';
	
		// Act
		outcome = Tag.fromObject(source);
	
		// Assert
		this.isTrue(TSObject.exists(outcome));
		this.areIdentical('foo', outcome.getId());
		this.areIdentical('bar', outcome.getLabel());
	}

	TagToJSONTest() : void {
		// Arrange
		var outcome : any;

		this._tag.setId('foo');
		this._tag.setLabel('bar');
	
		// Act
		outcome = this._tag.toJSON();
	
		// Assert
		this.isTrue(TSObject.exists(outcome));
		this.areIdentical('foo', outcome.id);
		this.areIdentical('bar', outcome.label);
	}

	TagHydrateTest() : void {
		// Arrange
		var source : Tag;

		source = new Tag();
		source.setId('foo');
		source.setLabel('bar');
	
		// Act
		source.hydrate(this._tag);
	
		// Assert
		this.areIdentical(source.getId(), this._tag.getId());
		this.areIdentical(source.getLabel(), this._tag.getLabel());
	}
}

UnitTestClass.handle(new TagTest());
