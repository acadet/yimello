/// <reference path="../../../test_dependencies.ts" />

class BookmarkBusinessTest extends UnitTestClass {
	private _dao : Mocks.DAO.BookmarkDAO;
	private _business : BookmarkBusiness;

	private _setUp() : void {
		this._dao = new Mocks.DAO.BookmarkDAO();
		this._business = new BookmarkBusiness(this._dao);
	}

	private _tearDown() : void {
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
		this.isTrue(TSObject.exists(outcome));
	}

	//region EngineBookmark

	BookmarkBusinessEngineBookmarkTest() : void {
		// Arrange
		var b : Bookmark;

		this._setUp();
	
		b = new Bookmark();
		b
			.setId('  <foo ')
			.setTitle(' >>foo  ')
			.setURL(' http://google.fr"  ')
			.setDescription(' <<barbar ');

		// Act
		this._business.engineBookmark(b);
	
		// Assert
		this.isTrue(TSObject.exists(b));
		this.areIdentical('&lt;foo', b.getId());
		this.areIdentical('&gt;&gt;foo', b.getTitle());
		this.areIdentical('http://google.fr&quot;', b.getURL());
		this.areIdentical('&lt;&lt;barbar', b.getDescription());

		this._tearDown();
	}

	BookmarkBusinessEngineBookmarkNoTitleTest() : void {
		// Arrange
		var b : Bookmark;

		this._setUp();
		b = new Bookmark().setURL('>>foo  ');
	
		// Act
		this._business.engineBookmark(b);
	
		// Assert
		this.areIdentical('&gt;&gt;foo', b.getTitle());

		this._tearDown();
	}

	BookmarkBusinessEngineBookmarkEmptyTitleTest() : void {
		// Arrange
		var b : Bookmark;

		this._setUp();
		b = new Bookmark().setURL('>>foo  ').setTitle('');
	
		// Act
		this._business.engineBookmark(b);
	
		// Assert
		this.areIdentical('&gt;&gt;foo', b.getTitle());

		this._tearDown();
	}

	BookmarkBusinessEngineBookmarkNoDescriptionTest() : void {
		// Arrange
		var b : Bookmark;

		this._setUp();

		b = new Bookmark();
	
		// Act
		this._business.engineBookmark(b);
	
		// Assert
		this.areIdentical('', b.getDescription());

		this._tearDown();
	}

	//endregion EngineBookmark

	BookmarkBusinessAddTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b : Bookmark;

				this._setUp();

				b = new Bookmark();
				b.setTitle('> foo ').setURL('http://google.fr');
				this._dao.setAddOutcome(b);

				// Act
				this._business.add(
					b,
					(outcome) => {
						// Assert
						this.areIdentical(1, this._dao.addTimes());
						this.areIdentical(b, this._dao.addArgs()[0]);
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(b, outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	BookmarkBusinessAddBadURLTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b : Bookmark;

				this._setUp();

				b = new Bookmark();
				b.setTitle('> foo ').setURL('foo');
				this._dao.setAddOutcome(b);

				// Act
				this._business.add(
					b,
					(outcome) => { this.fail(); },
					(error) => {
						this.isTrue(TSObject.exists(error));
						this.areIdentical(0, this._dao.addTimes());
						
						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	BookmarkBusinessCreateFromURLTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				this._setUp();

				this._dao.setAddOutcome(new Bookmark());

				// Act
				this._business.createFromURL(
					'http://google.fr',
					(outcome) => {
						// Assert
						this.areIdentical(1, this._dao.addTimes());
						this.isTrue(TSObject.exists(this._dao.addArgs()[0]));
						this.areIdentical('http://google.fr', this._dao.addArgs()[0].getURL());
						this.areNotIdentical('', this._dao.addArgs()[0].getTitle());

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	BookmarkBusinessUpdateTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b : Bookmark;

				this._setUp();

				b = new Bookmark().setURL('http://google.us').setTitle(' foo  ');

				this._dao.setUpdateOutcome(b);

				// Act
				this._business.update(
					b,
					(outcome) => {
						// Assert
						this.areIdentical(1, this._dao.updateTimes());
						this.areIdentical(b, this._dao.updateArgs()[0]);
						this.areIdentical('http://google.us', b.getURL());
						this.areIdentical('foo', b.getTitle());
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(b, outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	BookmarkBusinessUpdateBadURLTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b : Bookmark;

				this._setUp();

				b = new Bookmark().setURL('  bar  ').setTitle(' foo  ');

				// Act
				this._business.update(
					b,
					(outcome) => {
						this.fail();
					},
					(error) => {
						// Assert
						this.isTrue(TSObject.exists(error));
						this.areIdentical(0, this._dao.updateTimes());

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	BookmarkBusinessDeleteTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b : Bookmark;

				this._setUp();

				b = new Bookmark().setId('foo');
				this._dao.setDeleteOutcome(true);

				// Act
				this._business.delete(
					b,
					() => {
						// Assert
						this.areIdentical(1, this._dao.deleteTimes());
						this.areIdentical(b, this._dao.deleteArgs()[0]);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	BookmarkBusinessFindTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b : Bookmark;

				this._setUp();

				b = new Bookmark().setId('foo');
				this._dao.setFindOutcome(b);

				// Act
				this._business.find(
					'foo',
					(outcome) => {
						// Assert
						this.areIdentical(1, this._dao.findTimes());
						this.areIdentical('foo', this._dao.findArgs()[0]);
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(b, outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	BookmarkBusinessSortByViewsDescThenByTitleAscTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var l : IList<Bookmark>;

				this._setUp();

				l = new ArrayList<Bookmark>();
				l.add(new Bookmark().setId('foo'));
				l.add(new Bookmark().setId('bar'));
				this._dao.setSortByViewsDescThenByTitleAscOutcome(l);

				// Act
				this._business.sortByViewsDescThenByTitleAsc(
					(outcome) => {
						// Assert
						this.areIdentical(1, this._dao.sortByViewsDescThenByTitleAscTimes());
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(l, outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}
}

UnitTestClass.handle(new BookmarkBusinessTest());
