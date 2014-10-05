/// <reference path="../../../test_dependencies.ts" />

class BookmarkDAOTest extends UnitTestClass {
	private _tagBkDAO : Mocks.DAO.TagBookmarkDAO;
	private _aro : Mocks.DAO.ActiveRecordObject;
	private _dao : BookmarkDAO;

	private _setUp() : void {
		this._aro = new Mocks.DAO.ActiveRecordObject();
		this._tagBkDAO = new Mocks.DAO.TagBookmarkDAO();
		this._dao = new BookmarkDAO(this._aro, this._tagBkDAO);
	}

	private _tearDown() : void {
		this._aro = null;
		this._tagBkDAO = null;
		this._dao = null;
	}

	BookmarkDAOConstructorTest() : void {
		// Arrange
		var tagBKDAO : ITagBookmarkDAO;
		var aro : IActiveRecordObject;
		var outcome : BookmarkDAO;

		tagBKDAO = new Mocks.DAO.TagBookmarkDAO();
		aro = new Mocks.DAO.ActiveRecordObject();
	
		// Act
		outcome = new BookmarkDAO(aro, tagBKDAO);
	
		// Assert
		this.isTrue(TSObject.exists(outcome));
		this.areIdentical(aro, outcome.getARO());
	}

	BookmarkDAOAddTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b : Bookmark;

				this._setUp();

				b =
					new Bookmark()
					.setId('useless')
					.setTitle('foo')
					.setURL('google.fr')
					.setDescription('Amazing')
					.setViews(60000);

				this._aro.setInsertOutcome(true);

				// Act
				this._dao.add(
					b,
					(outcome) => {
						// Assert
						this.areIdentical(1, this._aro.insertTimes());
						this.areIdentical(DAOTables.Bookmarks, this._aro.insertArgs()[0]);

						this.areIdentical(5, this._aro.insertArgs()[1].getLength());
						this.areNotIdentical('useless', this._aro.insertArgs()[1].getAt(0));
						this.areIdentical('google.fr', this._aro.insertArgs()[1].getAt(1));
						this.areIdentical('foo', this._aro.insertArgs()[1].getAt(2));
						this.areIdentical('Amazing', this._aro.insertArgs()[1].getAt(3));
						this.areIdentical(0, this._aro.insertArgs()[1].getAt(4));

						this.isTrue(TSObject.exists(outcome));
						this.areNotIdentical(b, outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	BookmarkDAOAddRawTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b : Bookmark;

				this._setUp();

				b =
					new Bookmark()
					.setId('10')
					.setTitle('foo')
					.setURL('google.fr')
					.setDescription('Amazing')
					.setViews(60000);

				this._aro.setInsertOutcome(true);

				// Act
				this._dao.addRaw(
					b,
					(outcome) => {
						// Assert
						this.areIdentical(1, this._aro.insertTimes());
						this.areIdentical(DAOTables.Bookmarks, this._aro.insertArgs()[0]);

						this.areIdentical(5, this._aro.insertArgs()[1].getLength());
						this.areIdentical('10', this._aro.insertArgs()[1].getAt(0));
						this.areIdentical('google.fr', this._aro.insertArgs()[1].getAt(1));
						this.areIdentical('foo', this._aro.insertArgs()[1].getAt(2));
						this.areIdentical('Amazing', this._aro.insertArgs()[1].getAt(3));
						this.areIdentical(60000, this._aro.insertArgs()[1].getAt(4));

						this.isTrue(outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	BookmarkDAOUpdateTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b : Bookmark;

				this._setUp();

				b =
					new Bookmark()
					.setId('bar')
					.setTitle('foo')
					.setURL('google.fr')
					.setDescription('Amazing')
					.setViews(500);

				this._aro.setUpdateOutcome(true);

				// Act
				this._dao.update(
					b,
					(outcome) => {
						// Assert
						this.areIdentical(1, this._aro.updateTimes());
						this.areIdentical(DAOTables.Bookmarks, this._aro.updateArgs()[0]);

						this.areIdentical('id', this._aro.updateArgs()[1].getFirst());
						this.areIdentical('bar', this._aro.updateArgs()[1].getSecond());

						this.areIdentical(4, this._aro.updateArgs()[2].getLength());
						this.areIdentical('google.fr', this._aro.updateArgs()[2].get('url'));
						this.areIdentical('foo', this._aro.updateArgs()[2].get('title'));
						this.areIdentical('Amazing', this._aro.updateArgs()[2].get('description'));
						this.areIdentical(500, this._aro.updateArgs()[2].get('views'));

						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(b, outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	BookmarkDAODeleteTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b : Bookmark;

				this._setUp();

				b = new Bookmark().setId('foo');

				this._tagBkDAO.setRemoveBookmarkRelationsOutcome(true);
				this._aro.setDeleteOutcome(true);

				// Act
				this._dao.delete(
					b,
					(outcome) => {
						// Assert
						this.areIdentical(1, this._tagBkDAO.removeBookmarkRelationsTimes());
						this.areIdentical(b, this._tagBkDAO.removeBookmarkRelationsArgs()[0]);

						this.areIdentical(1, this._aro.deleteTimes());
						this.areIdentical(DAOTables.Bookmarks, this._aro.deleteArgs()[0]);
						this.areIdentical('id', this._aro.deleteArgs()[1].getFirst());
						this.areIdentical('foo', this._aro.deleteArgs()[1].getSecond());

						this.isTrue(outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	BookmarkDAOGetTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var l : IList<Bookmark>;

				this._setUp();

				l = new ArrayList<Bookmark>();
				l.add(new Bookmark().setId('foo'));
				l.add(new Bookmark().setId('bar'));
				this._aro.setGetOutcome(l);

				// Act
				this._dao.get(
					(outcome) => {
						// Assert
						this.areIdentical(1, this._aro.getTimes());
						this.areIdentical(DAOTables.Bookmarks, this._aro.getArgs()[0]);
						this.areIdentical(Bookmark.fromObject, this._aro.getArgs()[2]);

						this.areIdentical(l, outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	BookmarkDAOFindTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b : Bookmark;

				this._setUp();

				b = new Bookmark().setId('foo');
				this._aro.setFindOutcome(b);

				// Act
				this._dao.find(
					'foo',
					(outcome) => {
						// Assert
						this.areIdentical(1, this._aro.findTimes());
						this.areIdentical(DAOTables.Bookmarks, this._aro.findArgs()[0]);
						this.areIdentical('id', this._aro.findArgs()[1].getFirst());
						this.areIdentical('foo', this._aro.findArgs()[1].getSecond());
						this.areIdentical(Bookmark.fromObject, this._aro.findArgs()[3]);

						this.areIdentical(b, outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	BookmarkDAOSortByViewsDescThenByTitleAscTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b1 : any, b2 : any;

				this._setUp();

				b1 = {
					id : '345',
					title : 'foo',
					url : 'google.es',
					description : 'Marvelous',
					views : 56
				};
				b2 = {
					id : '675',
					title : 'bar',
					url : 'google.de',
					description : 'Fantastic',
					views : 43
				};
				this._aro.setExecuteSQLOutcome([b1, b2]);

				// Act
				this._dao.sortByViewsDescThenByTitleAsc(
					(outcome) => {
						// Assert
						this.areIdentical(1, this._aro.executeSQLTimes());
						this.areIdentical(
							'SELECT * FROM ' + DAOTables.Bookmarks + ' ORDER BY views DESC, LOWER(title) ASC',
							this._aro.executeSQLArgs()[0]
						);

						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(2, outcome.getLength());

						this.areIdentical('345', outcome.getAt(0).getId());
						this.areIdentical('foo', outcome.getAt(0).getTitle());
						this.areIdentical('google.es', outcome.getAt(0).getURL());
						this.areIdentical('Marvelous', outcome.getAt(0).getDescription());
						this.areIdentical(56, outcome.getAt(0).getViews());

						this.areIdentical('675', outcome.getAt(1).getId());
						this.areIdentical('bar', outcome.getAt(1).getTitle());
						this.areIdentical('google.de', outcome.getAt(1).getURL());
						this.areIdentical('Fantastic', outcome.getAt(1).getDescription());
						this.areIdentical(43, outcome.getAt(1).getViews());

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	BookmarkDAOSortByTitleAscTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b1 : any, b2 : any;

				this._setUp();

				b1 = {
					id : '345',
					title : 'foo',
					url : 'google.es',
					description : 'Marvelous',
					views : 56
				};
				b2 = {
					id : '675',
					title : 'bar',
					url : 'google.de',
					description : 'Fantastic',
					views : 43
				};
				this._aro.setExecuteSQLOutcome([b1, b2]);

				// Act
				this._dao.sortByTitleAsc(
					(outcome) => {
						// Assert
						this.areIdentical(1, this._aro.executeSQLTimes());
						this.areIdentical(
							'SELECT * FROM ' + DAOTables.Bookmarks + ' ORDER BY LOWER(title) ASC',
							this._aro.executeSQLArgs()[0]
						);

						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(2, outcome.getLength());

						this.areIdentical('345', outcome.getAt(0).getId());
						this.areIdentical('foo', outcome.getAt(0).getTitle());
						this.areIdentical('google.es', outcome.getAt(0).getURL());
						this.areIdentical('Marvelous', outcome.getAt(0).getDescription());
						this.areIdentical(56, outcome.getAt(0).getViews());

						this.areIdentical('675', outcome.getAt(1).getId());
						this.areIdentical('bar', outcome.getAt(1).getTitle());
						this.areIdentical('google.de', outcome.getAt(1).getURL());
						this.areIdentical('Fantastic', outcome.getAt(1).getDescription());
						this.areIdentical(43, outcome.getAt(1).getViews());

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}
}

UnitTestClass.handle(new BookmarkDAOTest());
