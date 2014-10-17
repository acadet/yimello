/// <reference path="../../references.ts" />

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
		Assert.areEqual(id, outcome);
	}

	BookmarkURLTest() : void {
		// Arrange
		var url : string = 'http://google.fr';

		// Act
		this._bookmark.setURL(url);

		// Assert
		Assert.areEqual(url, this._bookmark.getURL());
	}

	BookmarkTitleTest() : void {
		// Arrange
		var title : string = 'Google';

		// Act
		this._bookmark.setTitle(title);

		// Assert
		Assert.areEqual(title, this._bookmark.getTitle());
	}

	BookmarkDescriptionTest() : void {
		// Arrange
		var description : StringBuffer;

		description = new StringBuffer('What about a short description?\n');
		description.append('It could be cool to test if everything is saved :)');

		// Act
		this._bookmark.setDescription(description.toString());

		// Assert
		Assert.areEqual(description.toString(), this._bookmark.getDescription());
	}

	BookmarkViewsTest() : void {
		// Arrange
		var value : number = 54;

		// Act
		this._bookmark.setViews(value);

		// Assert
		Assert.areEqual(value, this._bookmark.getViews());
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
		Assert.isNotNull(outcome);
		Assert.areEqual(5, outcome.getLength());
		Assert.areEqual(id, outcome.getAt(0));
		Assert.areEqual(url, outcome.getAt(1));
		Assert.areEqual(title, outcome.getAt(2));
		Assert.areEqual(description, outcome.getAt(3));
		Assert.areEqual(views, outcome.getAt(4));
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
		Assert.isNotNull(outcome);
		Assert.areEqual('5', outcome.getId());
		Assert.areEqual('foo', outcome.getURL());
		Assert.areEqual('bar', outcome.getTitle());
		Assert.areEqual('foobar', outcome.getDescription());
		Assert.areEqual(45, outcome.getViews());
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
		Assert.isNotNull(outcome);
		Assert.areEqual('foo', outcome.id);
		Assert.areEqual('bar', outcome.url);
		Assert.areEqual('barbar', outcome.title);
		Assert.areEqual('foobar', outcome.description);
		Assert.areEqual(465, outcome.views);
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
		Assert.areEqual(source.getId(), this._bookmark.getId());
		Assert.areEqual(source.getURL(), this._bookmark.getURL());
		Assert.areEqual(source.getTitle(), this._bookmark.getTitle());
		Assert.areEqual(source.getDescription(), this._bookmark.getDescription());
		Assert.areEqual(source.getViews(), this._bookmark.getViews());
	}
}
