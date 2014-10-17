/// <reference path="../../../references.ts" />

class BookmarkBusinessTest extends UnitTestClass {
	private _dao : Mocks.DAO.BookmarkDAO;
	private _business : BookmarkBusiness;

	setUp() : void {
		this._dao = new Mocks.DAO.BookmarkDAO();
		this._business = new BookmarkBusiness(this._dao);
	}

	tearDown() : void {
		this._dao = null;
		this._business = null;
	}

	BookmarkBusinessConstructorTest() : void {
		// Arrange
		var dao : IBookmarkDAO;
		var outcome : BookmarkBusiness;

		dao = new Mocks.DAO.BookmarkDAO();
	
		// Act
		outcome = new BookmarkBusiness(dao);
	
		// Assert
		Assert.isNotNull(outcome);
	}

	//region EngineBookmark

	BookmarkBusinessEngineBookmarkTest() : void {
		// Arrange
		var b : Bookmark;
	
		b = new Bookmark();
		b
			.setId('  <foo ')
			.setTitle(' >>foo  ')
			.setURL(' http://google.fr"  ')
			.setDescription(' <<barbar ');

		// Act
		this._business.engineBookmark(b);
	
		// Assert
		Assert.isNotNull(b);
		Assert.areEqual('&lt;foo', b.getId());
		Assert.areEqual('&gt;&gt;foo', b.getTitle());
		Assert.areEqual('http://google.fr&quot;', b.getURL());
		Assert.areEqual('&lt;&lt;barbar', b.getDescription());
	}

	BookmarkBusinessEngineBookmarkNoTitleTest() : void {
		// Arrange
		var b : Bookmark;

		b = new Bookmark().setURL('>>foo  ');
	
		// Act
		this._business.engineBookmark(b);
	
		// Assert
		Assert.areEqual('&gt;&gt;foo', b.getTitle());
	}

	BookmarkBusinessEngineBookmarkEmptyTitleTest() : void {
		// Arrange
		var b : Bookmark;
		b = new Bookmark().setURL('>>foo  ').setTitle('');
	
		// Act
		this._business.engineBookmark(b);
	
		// Assert
		Assert.areEqual('&gt;&gt;foo', b.getTitle());
	}

	BookmarkBusinessEngineBookmarkNoDescriptionTest() : void {
		// Arrange
		var b : Bookmark;

		b = new Bookmark();
	
		// Act
		this._business.engineBookmark(b);
	
		// Assert
		Assert.areEqual('', b.getDescription());
	}

	//endregion EngineBookmark

	BookmarkBusinessAddAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var b : Bookmark;

		b = new Bookmark();
		b.setTitle('> foo ').setURL('http://google.fr');
		this._dao.setAddOutcome(b);

		// Act
		this._business.add(
			b,
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._dao.addTimes());
				Assert.areEqual(b, this._dao.addArgs()[0]);
				Assert.isNotNull(outcome);
				Assert.areEqual(b, outcome);

				obs.success();
			}
		);
	}

	BookmarkBusinessAddBadURLAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var b : Bookmark;

		b = new Bookmark();
		b.setTitle('> foo ').setURL('foo');
		this._dao.setAddOutcome(b);

		// Act
		this._business.add(
			b,
			(outcome) => { obs.fail(); },
			(error) => {
				Assert.isNotNull(error);
				Assert.areEqual(0, this._dao.addTimes());
				
				obs.success();
			}
		);
	}

	BookmarkBusinessCreateFromURLAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		this._dao.setAddOutcome(new Bookmark());

		// Act
		this._business.createFromURL(
			'http://google.fr',
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._dao.addTimes());
				Assert.isNotNull(this._dao.addArgs()[0]);
				Assert.areEqual('http://google.fr', this._dao.addArgs()[0].getURL());
				Assert.areNotEqual('', this._dao.addArgs()[0].getTitle());

				obs.success();
			}
		);
	}

	BookmarkBusinessUpdateAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var b : Bookmark;

		b = new Bookmark().setURL('http://google.us').setTitle(' foo  ');

		this._dao.setUpdateOutcome(b);

		// Act
		this._business.update(
			b,
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._dao.updateTimes());
				Assert.areEqual(b, this._dao.updateArgs()[0]);
				Assert.areEqual('http://google.us', b.getURL());
				Assert.areEqual('foo', b.getTitle());
				Assert.isNotNull(outcome);
				Assert.areEqual(b, outcome);

				obs.success();
			}
		);
	}

	BookmarkBusinessUpdateBadURLAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var b : Bookmark;

		b = new Bookmark().setURL('  bar  ').setTitle(' foo  ');

		// Act
		this._business.update(
			b,
			(outcome) => {
				obs.fail();
			},
			(error) => {
				// Assert
				Assert.isNotNull(error);
				Assert.areEqual(0, this._dao.updateTimes());

				obs.success();
			}
		);
	}

	BookmarkBusinessDeleteAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var b : Bookmark;

		b = new Bookmark().setId('foo');
		this._dao.setDeleteOutcome(true);

		// Act
		this._business.delete(
			b,
			() => {
				// Assert
				Assert.areEqual(1, this._dao.deleteTimes());
				Assert.areEqual(b, this._dao.deleteArgs()[0]);

				obs.success();
			}
		);
	}

	BookmarkBusinessFindAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var b : Bookmark;

		b = new Bookmark().setId('foo');
		this._dao.setFindOutcome(b);

		// Act
		this._business.find(
			'foo',
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._dao.findTimes());
				Assert.areEqual('foo', this._dao.findArgs()[0]);
				Assert.isNotNull(outcome);
				Assert.areEqual(b, outcome);

				obs.success();
			}
		);
	}

	BookmarkBusinessSortByViewsDescThenByTitleAscAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var l : IList<Bookmark>;

		l = new ArrayList<Bookmark>();
		l.add(new Bookmark().setId('foo'));
		l.add(new Bookmark().setId('bar'));
		this._dao.setSortByViewsDescThenByTitleAscOutcome(l);

		// Act
		this._business.sortByViewsDescThenByTitleAsc(
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._dao.sortByViewsDescThenByTitleAscTimes());
				Assert.isNotNull(outcome);
				Assert.areEqual(l, outcome);

				obs.success();
			}
		);
	}
}
