/// <reference path="../../../references.ts" />

class BookmarkDAOTest extends UnitTestClass {
	private _tagBkDAO : Mocks.DAO.TagBookmarkDAO;
	private _aro : Mocks.DAO.ActiveRecordObject;
	private _dao : BookmarkDAO;

	setUp() : void {
		this._aro = new Mocks.DAO.ActiveRecordObject();
		this._tagBkDAO = new Mocks.DAO.TagBookmarkDAO();
		this._dao = new BookmarkDAO(this._aro, this._tagBkDAO);
	}

	tearDown() : void {
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
		Assert.isNotNull(outcome);
		Assert.areEqual(aro, outcome.getARO());
	}

	BookmarkDAOAddAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var b : Bookmark;

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
				Assert.areEqual(1, this._aro.insertTimes());
				Assert.areEqual(DAOTables.Bookmarks, this._aro.insertArgs()[0]);

				Assert.areEqual(5, this._aro.insertArgs()[1].getLength());
				Assert.areNotEqual('useless', this._aro.insertArgs()[1].getAt(0));
				Assert.areEqual('google.fr', this._aro.insertArgs()[1].getAt(1));
				Assert.areEqual('foo', this._aro.insertArgs()[1].getAt(2));
				Assert.areEqual('Amazing', this._aro.insertArgs()[1].getAt(3));
				Assert.areEqual(0, this._aro.insertArgs()[1].getAt(4));

				Assert.isNotNull(outcome);
				Assert.areNotEqual(b, outcome);

				obs.success();
			}
		);
	}

	BookmarkDAOAddRawAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var b : Bookmark;

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
				Assert.areEqual(1, this._aro.insertTimes());
				Assert.areEqual(DAOTables.Bookmarks, this._aro.insertArgs()[0]);

				Assert.areEqual(5, this._aro.insertArgs()[1].getLength());
				Assert.areEqual('10', this._aro.insertArgs()[1].getAt(0));
				Assert.areEqual('google.fr', this._aro.insertArgs()[1].getAt(1));
				Assert.areEqual('foo', this._aro.insertArgs()[1].getAt(2));
				Assert.areEqual('Amazing', this._aro.insertArgs()[1].getAt(3));
				Assert.areEqual(60000, this._aro.insertArgs()[1].getAt(4));

				Assert.isTrue(outcome);

				obs.success();
			}
		);
	}

	BookmarkDAOUpdateAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var b : Bookmark;

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
				Assert.areEqual(1, this._aro.updateTimes());
				Assert.areEqual(DAOTables.Bookmarks, this._aro.updateArgs()[0]);

				Assert.areEqual('id', this._aro.updateArgs()[1].getFirst());
				Assert.areEqual('bar', this._aro.updateArgs()[1].getSecond());

				Assert.areEqual(4, this._aro.updateArgs()[2].getLength());
				Assert.areEqual('google.fr', this._aro.updateArgs()[2].get('url'));
				Assert.areEqual('foo', this._aro.updateArgs()[2].get('title'));
				Assert.areEqual('Amazing', this._aro.updateArgs()[2].get('description'));
				Assert.areEqual(500, this._aro.updateArgs()[2].get('views'));

				Assert.isNotNull(outcome);
				Assert.areEqual(b, outcome);

				obs.success();
			}
		);
	}

	BookmarkDAODeleteAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var b : Bookmark;

		b = new Bookmark().setId('foo');

		this._tagBkDAO.setRemoveBookmarkRelationsOutcome(true);
		this._aro.setDeleteOutcome(true);

		// Act
		this._dao.delete(
			b,
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._tagBkDAO.removeBookmarkRelationsTimes());
				Assert.areEqual(b, this._tagBkDAO.removeBookmarkRelationsArgs()[0]);

				Assert.areEqual(1, this._aro.deleteTimes());
				Assert.areEqual(DAOTables.Bookmarks, this._aro.deleteArgs()[0]);
				Assert.areEqual('id', this._aro.deleteArgs()[1].getFirst());
				Assert.areEqual('foo', this._aro.deleteArgs()[1].getSecond());

				Assert.isTrue(outcome);

				obs.success();
			}
		);
	}

	BookmarkDAOGetAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var l : IList<Bookmark>;

		l = new ArrayList<Bookmark>();
		l.add(new Bookmark().setId('foo'));
		l.add(new Bookmark().setId('bar'));
		this._aro.setGetOutcome(l);

		// Act
		this._dao.get(
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._aro.getTimes());
				Assert.areEqual(DAOTables.Bookmarks, this._aro.getArgs()[0]);
				Assert.areEqual(Bookmark.fromObject, this._aro.getArgs()[2]);

				Assert.areEqual(l, outcome);

				obs.success();
			}
		);
	}

	BookmarkDAOFindAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var b : Bookmark;

		b = new Bookmark().setId('foo');
		this._aro.setFindOutcome(b);

		// Act
		this._dao.find(
			'foo',
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._aro.findTimes());
				Assert.areEqual(DAOTables.Bookmarks, this._aro.findArgs()[0]);
				Assert.areEqual('id', this._aro.findArgs()[1].getFirst());
				Assert.areEqual('foo', this._aro.findArgs()[1].getSecond());
				Assert.areEqual(Bookmark.fromObject, this._aro.findArgs()[3]);

				Assert.areEqual(b, outcome);

				obs.success();
			}
		);
	}

	BookmarkDAOSortByViewsDescThenByTitleAscAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var b1 : any, b2 : any;

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
				Assert.areEqual(1, this._aro.executeSQLTimes());
				Assert.areEqual(
					'SELECT * FROM ' + DAOTables.Bookmarks + ' ORDER BY views DESC, LOWER(title) ASC',
					this._aro.executeSQLArgs()[0]
				);

				Assert.isNotNull(outcome);
				Assert.areEqual(2, outcome.getLength());

				Assert.areEqual('345', outcome.getAt(0).getId());
				Assert.areEqual('foo', outcome.getAt(0).getTitle());
				Assert.areEqual('google.es', outcome.getAt(0).getURL());
				Assert.areEqual('Marvelous', outcome.getAt(0).getDescription());
				Assert.areEqual(56, outcome.getAt(0).getViews());

				Assert.areEqual('675', outcome.getAt(1).getId());
				Assert.areEqual('bar', outcome.getAt(1).getTitle());
				Assert.areEqual('google.de', outcome.getAt(1).getURL());
				Assert.areEqual('Fantastic', outcome.getAt(1).getDescription());
				Assert.areEqual(43, outcome.getAt(1).getViews());

				obs.success();
			}
		);
	}

	BookmarkDAOSortByTitleAscAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var b1 : any, b2 : any;

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
				Assert.areEqual(1, this._aro.executeSQLTimes());
				Assert.areEqual(
					'SELECT * FROM ' + DAOTables.Bookmarks + ' ORDER BY LOWER(title) ASC',
					this._aro.executeSQLArgs()[0]
				);

				Assert.isNotNull(outcome);
				Assert.areEqual(2, outcome.getLength());

				Assert.areEqual('345', outcome.getAt(0).getId());
				Assert.areEqual('foo', outcome.getAt(0).getTitle());
				Assert.areEqual('google.es', outcome.getAt(0).getURL());
				Assert.areEqual('Marvelous', outcome.getAt(0).getDescription());
				Assert.areEqual(56, outcome.getAt(0).getViews());

				Assert.areEqual('675', outcome.getAt(1).getId());
				Assert.areEqual('bar', outcome.getAt(1).getTitle());
				Assert.areEqual('google.de', outcome.getAt(1).getURL());
				Assert.areEqual('Fantastic', outcome.getAt(1).getDescription());
				Assert.areEqual(43, outcome.getAt(1).getViews());

				obs.success();
			}
		);
	}
}
