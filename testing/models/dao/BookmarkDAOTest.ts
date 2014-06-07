/// <reference path="../../test_dependencies.ts" />

class BookmarkDAOTest extends UnitTestClass {
	private _dao : BookmarkDAO;

	constructor() {
		super();

		DataAccessObject.setDatabaseName('yimello-test');
	}

	setUp() : void {
		this._dao = new BookmarkDAO();
	}

	tearDown() : void {
		this._dao = null;
		UnitTestClass.increaseDelay();
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

	BookmarkDAOToListTest() : void {
		// Arrange
		var id : string = '1';
		var url : string = 'foo';
		var title : string = 'foobar';
		var description : string = 'foobar powaa';
		var b : BookmarkDAO = new BookmarkDAO();
		var outcome : IList<any>;

		b.setId(id);
		b.setURL(url);
		b.setTitle(title);
		b.setDescription(description);

		// Act
		outcome = b.toList();

		// Assert
		this.isTrue(TSObject.exists(outcome));
		this.areIdentical(4, outcome.getLength());
		this.areIdentical(id, outcome.getAt(0));
		this.areIdentical(url, outcome.getAt(1));
		this.areIdentical(title, outcome.getAt(2));
		this.areIdentical(description, outcome.getAt(3));
	}

	BookmarkDAOAddTest() : void {
		var timer : Timer;

		timer = new Timer(
			(o) => {
				// Arrange
				var bookmark : BookmarkDAO;

				bookmark = new BookmarkDAO();
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

						DataAccessObject.clean();
					}
				);
			},
			UnitTestClass.getDelay()
		);
	}

	BookmarkDAODeleteTest() : void {
		var timer : Timer;

		timer = new Timer(
			(o) => {
				// Arrange
				var bookmark : BookmarkDAO;

				bookmark = new BookmarkDAO();
				bookmark.setId('1');

				DataAccessObject.initialize(
					(success) => {
						ActiveRecordObject.insert(
							DAOTables.Bookmarks,
							bookmark.toList(),
							(b) => {
								// Act
								bookmark.delete(
									(outcome) => {
										// Assert
										this.isTrue(outcome);

										DataAccessObject.clean();
									}
								);
							}
						);
					}
				);
			},
			UnitTestClass.getDelay()
		);
	}

	BookmarkDaoGetTest() : void {
		var timer : Timer;

		timer = new Timer(
			(o) => {
				var b1 : BookmarkDAO, b2 : BookmarkDAO;

				b1 = new BookmarkDAO();
				b1.setId('1');
				b1.setTitle('foo');
				b2 = new BookmarkDAO();
				b2.setId('2');
				b2.setTitle('foobar');

				DataAccessObject.initialize(
					(success) => {
						ActiveRecordObject.insert(
							DAOTables.Bookmarks,
							b1.toList(),
							(success) => {
								ActiveRecordObject.insert(
									DAOTables.Bookmarks,
									b2.toList(),
									(success) => {
										BookmarkDAO.get(
											(outcome) => {
												this.isTrue(TSObject.exists(outcome));

												this.areIdentical(2, outcome.getLength());
												this.areIdentical(b1.getId(), outcome.getAt(0).getId());
												this.areIdentical(b1.getTitle(), outcome.getAt(0).getTitle());
												this.areIdentical(b2.getId(), outcome.getAt(1).getId());
												this.areIdentical(b2.getTitle(), outcome.getAt(1).getTitle());

												DataAccessObject.clean();
											}
										);
									}
								);
							}
						);
					}
				);
			},
			UnitTestClass.getDelay()
		);
	}
}

UnitTestClass.handle(new BookmarkDAOTest());
