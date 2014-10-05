/// <reference path="../../../test_dependencies.ts" />

class TagBookmarkBusinessTest extends UnitTestClass {
	private _tagDAO : Mocks.DAO.TagDAO;
	private _bookmarkDAO : Mocks.DAO.BookmarkDAO;
	private _tagBookmarkDAO : Mocks.DAO.TagBookmarkDAO;
	private _tagBusiness : Mocks.Business.TagBusiness;
	private _bookmarkBusiness : Mocks.Business.BookmarkBusiness;
	private _args : TagBookmarkBusinessArgs;
	private _business : TagBookmarkBusiness;

	private _setUp() : void {
		this._tagDAO = new Mocks.DAO.TagDAO();
		this._bookmarkDAO = new Mocks.DAO.BookmarkDAO();
		this._tagBookmarkDAO = new Mocks.DAO.TagBookmarkDAO();
		this._tagBusiness = new Mocks.Business.TagBusiness();
		this._bookmarkBusiness = new Mocks.Business.BookmarkBusiness();

		this._args = new TagBookmarkBusinessArgs();
		this._args
			.setTagDAO(this._tagDAO)
			.setBookmarkDAO(this._bookmarkDAO)
			.setTagBookmarkDAO(this._tagBookmarkDAO)
			.setTagBusiness(this._tagBusiness)
			.setBookmarkBusiness(this._bookmarkBusiness);

		this._business = new TagBookmarkBusiness(this._args);
	}

	private _tearDown() : void {
		this._tagDAO = null;
		this._bookmarkDAO = null;
		this._tagBookmarkDAO = null;
		this._tagBusiness = null;
		this._bookmarkBusiness = null;
		this._args = null;
		this._business = null;
	}

	TagBookmarkBusinessConstructorTest() : void {
		// Arrange
		var args : TagBookmarkBusinessArgs;
		var outcome : TagBookmarkBusiness;

		args = new TagBookmarkBusinessArgs();
	
		// Act
		outcome = new TagBookmarkBusiness(args);
	
		// Assert
		this.isTrue(TSObject.exists(outcome));
	}

	TagBookmarkBusinessSortTagsByLabelAscForBookmarkTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var l : IList<Tag>;
				var b : Bookmark;

				this._setUp();

				b = new Bookmark().setId('foobar');
				l = new ArrayList<Tag>();
				l.add(new Tag().setId('foo'));
				l.add(new Tag().setId('bar'));

				this._tagBookmarkDAO.setSortTagsByLabelAscForBookmarkOutcome(l);

				// Act
				this._business.sortTagsByLabelAscForBookmark(
					b,
					(outcome) => {
						// Assert
						this.areIdentical(1, this._tagBookmarkDAO.sortTagsByLabelAscForBookmarkTimes());
						this.areIdentical(b, this._tagBookmarkDAO.sortTagsByLabelAscForBookmarkArgs()[0]);

						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(l, outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBookmarkBusinessBindTagsTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b : Bookmark;
				var tags : IList<Tag>;

				this._setUp();

				b = new Bookmark().setId('foo');
				tags = new ArrayList<Tag>();
				tags.add(new Tag().setId('bar'));
				tags.add(new Tag().setId('foobar'));

				this._tagBookmarkDAO.setAddMultipleTagsRelationsOutcome(true);

				// Act
				this._business.bindTags(
					b,
					tags,
					() => {
						// Assert
						this.areIdentical(1, this._tagBookmarkDAO.addMultipleTagRelationsTimes());
						this.areIdentical(b, this._tagBookmarkDAO.addMultipleTagRelationsArgs()[0]);
						this.areIdentical(tags, this._tagBookmarkDAO.addMultipleTagRelationsArgs()[1]);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBookmarkBusinessUpdateTagBindingTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var b : Bookmark;
				var tags : IList<Tag>;

				this._setUp();

				b = new Bookmark().setId('foo');
				tags = new ArrayList<Tag>();
				tags.add(new Tag().setId('bar'));
				tags.add(new Tag().setId('foobar'));

				this._tagBookmarkDAO.setUpdateBookmarkRelationsOutcome(true);

				// Act
				this._business.updateTagBinding(
					b,
					tags,
					() => {
						// Assert
						this.areIdentical(1, this._tagBookmarkDAO.updateBookmarkRelationsTimes());
						this.areIdentical(b, this._tagBookmarkDAO.updateBookmarkRelationsArgs()[0]);
						this.areIdentical(tags, this._tagBookmarkDAO.updateBookmarkRelationsArgs()[1]);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBookmarkBusinessSortBookmarksByTitleAscForTagTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var t : Tag;
				var l : IList<Bookmark>;

				this._setUp();

				t = new Tag().setId('foo');
				l = new ArrayList<Bookmark>();
				l.add(new Bookmark().setId('bar'));
				l.add(new Bookmark().setId('foobar'));

				this._tagBookmarkDAO.setSortBookmarksByTitleAscForTagOutcome(l);

				// Act
				this._business.sortBookmarksByTitleAscForTag(
					t,
					(outcome) => {
						// Assert
						this.areIdentical(1, this._tagBookmarkDAO.sortBookmarksByTitleAscForTagTimes());
						this.areIdentical(t, this._tagBookmarkDAO.sortBookmarksByTitleAscForTagArgs()[0]);
						this.areIdentical(l, outcome);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBookmarkBusinessSearchTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var list : IList<Pair<Bookmark, IList<Tag>>>;
				var t1 : Tag, t2 : Tag;
				var b1 : Bookmark, b2 : Bookmark;
				var tags1 : IList<Tag>, tags2 : IList<Tag>;

				this._setUp();

				b1 = new Bookmark().setTitle('foo').setDescription('foobar');
				b2 = new Bookmark().setTitle('bar').setURL('foo');
				t1 = new Tag().setLabel('foobarbar');
				t2 = new Tag().setLabel('barbar');

				list = new ArrayList<Pair<Bookmark, IList<Tag>>>();
				tags1 = new ArrayList<Tag>();
				tags1.add(t1);
				tags2 = new ArrayList<Tag>();
				tags2.add(t2);
				list.add(new Pair<Bookmark, IList<Tag>>(b1, tags1));
				list.add(new Pair<Bookmark, IList<Tag>>(b2, tags2));

				this._tagBookmarkDAO.setSortBookmarksByTitleAscWithBoundTagsByLabelAscOutcome(list);

				// Act
				this._business.search(
					'foo hello',
					(outcome) => {
						// Assert
						this.areIdentical(1, this._tagBookmarkDAO.sortBookmarksByTitleAscWithBoundTagsByLabelAscTimes());
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(2, outcome.getLength());
						this.areIdentical('foo', outcome.getAt(0).getTitle());
						this.areIdentical(1, outcome.getAt(0).getScore());
						this.areIdentical('bar', outcome.getAt(1).getTitle());
						this.areIdentical(2 / 7, outcome.getAt(1).getScore());

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}
}

UnitTestClass.handle(new TagBookmarkBusinessTest());
