/// <reference path="../../test_dependencies.ts" />

class BookmarkDAOTest extends UnitTestClass {
	private _dao : BookmarkDAO;
	private _delay : number;
	private static _dbName : string = 'yimello-test';

	constructor() {
		super();

		this._delay = 0;
	}

	setUp() : void {
		this._dao = new BookmarkDAO(BookmarkDAOTest._dbName);
	}

	tearDown() : void {
		this._dao = null;
		this._delay += 500;
	}

	BookmarkDAOURLTest() : void {
		// Arrange
		var url : string = 'http://google.fr';

		// Act
		this._dao.setURL(url);

		// Assert
		this.areIdentical(url, this._dao.getURL());
	}

	BookmarkDAOTitleTest() : void {
		// Arrange
		var title : string = 'Google';

		// Act
		this._dao.setTitle(title);

		// Assert
		this.areIdentical(title, this._dao.getTitle());
	}

	BookmarkDAODescriptionTest() : void {
		// Arrange
		var description : StringBuffer;

		description = new StringBuffer('What about a short description?\n');
		description.append('It could be cool to test if everything is saved :)');

		// Act
		this._dao.setDescription(description.toString());

		// Assert
		this.areIdentical(description.toString(), this._dao.getDescription());
	}

	BookmarkDAOAddTest() : void {
		var timer : Timer;

		timer = new Timer(
			(o) => {
				// Arrange
				var bookmark : BookmarkDAO;

				bookmark = new BookmarkDAO(BookmarkDAOTest._dbName);
				bookmark.setId('foo');
				bookmark.setURL('An url');
				bookmark.setTitle('A title');
				bookmark.setDescription('A description');

				// Act
				bookmark.add(
					(outcome) => {
						// Assert
						this.isTrue(TSObject.exists(outcome));

						this.areNotIdentical(bookmark.getId(), outcome.getId());
						this.areIdentical(bookmark.getURL(), outcome.getURL());
						this.areIdentical(bookmark.getTitle(), outcome.getTitle());
						this.areIdentical(bookmark.getDescription(), outcome.getDescription());

						ActiveRecordObject.delete(
							DAOTables.Bookmarks,
							new Pair<string, any>('id', outcome.getId())
						);
					}
				);
			},
			this._delay
		);
	}

	BookmarkDAODeleteTest() : void {
		var timer : Timer;

		timer = new Timer(
			(o) => {
				// Arrange
				var bookmark : BookmarkDAO;
				var l : IList<any>;

				bookmark = new BookmarkDAO(BookmarkDAOTest._dbName);
				bookmark.setId('1');
				bookmark.setTitle('Chan Chan');
				bookmark.setURL('http://twitter.com');

				l = new ArrayList<any>();
				l.add(bookmark.getId());
				l.add(bookmark.getURL());
				l.add(bookmark.getTitle());
				l.add(bookmark.getDescription());

				ActiveRecordObject.insert(
					DAOTables.Bookmarks,
					l,
					(b) => {
						// Act
						bookmark.delete(
							(outcome) => {
								// Assert
								this.isTrue(outcome);
							}
						);
					}
				);
			},
			this._delay
		);
	}
}

UnitTestClass.handle(new BookmarkDAOTest());
