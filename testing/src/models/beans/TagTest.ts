/// <reference path="../../references.ts" />

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
		Assert.areEqual(value, outcome);
	}

	TagLabelTest() : void {
		// Arrange
		var label : string = 'A label';

		// Act
		this._tag.setLabel(label);

		// Assert
		Assert.areEqual(label, this._tag.getLabel());
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
		Assert.isNotNull(outcome);
		Assert.areEqual(2, outcome.getLength());
		Assert.areEqual(id, outcome.getAt(0));
		Assert.areEqual(label, outcome.getAt(1));
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
		Assert.isNotNull(outcome);
		Assert.areEqual('foo', outcome.getId());
		Assert.areEqual('bar', outcome.getLabel());
	}

	TagToJSONTest() : void {
		// Arrange
		var outcome : any;

		this._tag.setId('foo');
		this._tag.setLabel('bar');
	
		// Act
		outcome = this._tag.toJSON();
	
		// Assert
		Assert.isNotNull(outcome);
		Assert.areEqual('foo', outcome.id);
		Assert.areEqual('bar', outcome.label);
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
		Assert.areEqual(source.getId(), this._tag.getId());
		Assert.areEqual(source.getLabel(), this._tag.getLabel());
	}
}
