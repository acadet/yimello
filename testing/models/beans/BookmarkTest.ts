/// <reference path="../../test_dependencies.ts" />

class BookmarkTest extends UnitTestClass {
	private _bookmark : Bookmark;

	setUp() : void {
		this._bookmark = new Bookmark();
	}

	tearDown() : void {
		this._bookmark = null;
	}

	BookmarkIdTest() : void {
		// Arrange
		var id : string = 'foo';
		var outcome : string;

		// Act
		this._bookmark.setId(id);
		outcome = this._bookmark.getId();

		// Arrange
		this.areIdentical(id, outcome);
	}

	BookmarkURLTest() : void {
		// Arrange
		var url : string = 'http://google.fr';

		// Act
		this._bookmark.setURL(url);

		// Assert
		this.areIdentical(url, this._bookmark.getURL());
	}

	BookmarkTitleTest() : void {
		// Arrange
		var title : string = 'Google';

		// Act
		this._bookmark.setTitle(title);

		// Assert
		this.areIdentical(title, this._bookmark.getTitle());
	}

	BookmarkDescriptionTest() : void {
		// Arrange
		var description : StringBuffer;

		description = new StringBuffer('What about a short description?\n');
		description.append('It could be cool to test if everything is saved :)');

		// Act
		this._bookmark.setDescription(description.toString());

		// Assert
		this.areIdentical(description.toString(), this._bookmark.getDescription());
	}

	BookmarkViewsTest() : void {
		// Arrange
		var value : number = 54;

		// Act
		this._bookmark.setViews(value);

		// Assert
		this.areIdentical(value, this._bookmark.getViews());
	}

	BookmarkToListTest() : void {
		// Arrange
		var id : string = '1';
		var url : string = 'foo';
		var title : string = 'foobar';
		var description : string = 'foobar powaa';
		var views : number = 30;
		var outcome : IList<any>;

		this._bookmark.setId(id);
		this._bookmark.setURL(url);
		this._bookmark.setTitle(title);
		this._bookmark.setDescription(description);
		this._bookmark.setViews(views);

		// Act
		outcome = this._bookmark.toList();

		// Assert
		this.isTrue(TSObject.exists(outcome));
		this.areIdentical(5, outcome.getLength());
		this.areIdentical(id, outcome.getAt(0));
		this.areIdentical(url, outcome.getAt(1));
		this.areIdentical(title, outcome.getAt(2));
		this.areIdentical(description, outcome.getAt(3));
		this.areIdentical(views, outcome.getAt(4));
	}

	BookmarkFromObjectTest() : void {
		// Arrange
		var o : any = {};
		var outcome : Bookmark;

		o.id = '5';
		o.url = 'foo';
		o.title = 'bar';
		o.description = 'foobar';
		o.views = 45;

		// Act
		outcome = Bookmark.fromObject(o);

		// Assert
		this.isTrue(TSObject.exists(outcome));
		this.areIdentical('5', outcome.getId());
		this.areIdentical('foo', outcome.getURL());
		this.areIdentical('bar', outcome.getTitle());
		this.areIdentical('foobar', outcome.getDescription());
		this.areIdentical(45, outcome.getViews());
	}

	BookmarkToJSONTest() : void {
		// Arrange
		var outcome : any;

		this._bookmark.setId('foo');
		this._bookmark.setURL('bar');
		this._bookmark.setTitle('barbar');
		this._bookmark.setDescription('foobar');
		this._bookmark.setViews(465);
	
		// Act
		outcome = this._bookmark.toJSON();
	
		// Assert
		this.isTrue(TSObject.exists(outcome));
		this.areIdentical('foo', outcome.id);
		this.areIdentical('bar', outcome.url);
		this.areIdentical('barbar', outcome.title);
		this.areIdentical('foobar', outcome.description);
		this.areIdentical(465, outcome.views);
	}

	BookmarkHydrateTest() : void {
		// Arrange
		var source : Bookmark;

		source = new Bookmark();
		source.setId('foo');
		source.setURL('foobar');
		source.setTitle('bar');
		source.setDescription('barbar');
		source.setViews(354);

		// Act
		source.hydrate(this._bookmark);

		// Assert
		this.areIdentical(source.getId(), this._bookmark.getId());
		this.areIdentical(source.getURL(), this._bookmark.getURL());
		this.areIdentical(source.getTitle(), this._bookmark.getTitle());
		this.areIdentical(source.getDescription(), this._bookmark.getDescription());
		this.areIdentical(source.getViews(), this._bookmark.getViews());
	}
}

UnitTestClass.handle(new BookmarkTest());
