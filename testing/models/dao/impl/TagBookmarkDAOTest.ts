/// <reference path="../../../test_dependencies.ts" />

class TagBookmarkDAOTest extends UnitTestClass {
	private _aro : Mocks.DAO.ActiveRecordObject;
	private _dao : TagBookmarkDAO;

	private _setUp() : void {
		this._aro = new Mocks.DAO.ActiveRecordObject();
		this._dao = new TagBookmarkDAO(this._aro);
	}

	private _tearDown() : void {
		this._aro = null;
		this._dao = null;
	}

	TagBookmarkDAOConstructorTest() : void {
		// Arrange
		var aro : IActiveRecordObject;
		var dao : TagBookmarkDAO;

		aro = new Mocks.DAO.ActiveRecordObject();
	
		// Act
		dao = new TagBookmarkDAO(aro);
	
		// Assert
		this.isTrue(TSObject.exists(dao));
		this.areIdentical(aro, dao.getARO());
	}

	TagBookmarkAddRelationTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var tag : Tag;
				var bk : Bookmark;

				this._setUp();

				this._aro.setInsertOutcome(true);

				tag = new Tag();
				tag.setId('foo');
				bk = new Bookmark();
				bk.setId('bar');
			
				// Act
				this._dao.addRelation(
					tag,
					bk,
					(success) => {
						// Assert
						this.isTrue(success);
						this.areIdentical(1, this._aro.insertTimes());
						this.areIdentical(DAOTables.TagBookmark, this._aro.insertArgs()[0]);
						this.areIdentical('foo', this._aro.insertArgs()[1].getAt(0));
						this.areIdentical('bar', this._aro.insertArgs()[1].getAt(1));

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBookmarkDAOAddMultipleRelationsTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var bk : Bookmark;
				var tags : IList<Tag>;
				var t1 : Tag, t2 : Tag;

				this._setUp();

				bk = new Bookmark();
				bk.setId('foo');

				t1 = new Tag();
				t1.setId('bar');
				t2 = new Tag();
				t2.setId('foobar');
				tags = new ArrayList<Tag>();
				tags.add(t1);
				tags.add(t2);

				this._aro.setInsertOutcome(true);

				// Act
				this._dao.addMultipleTagRelations(
					bk,
					tags,
					(success) => {
						// Assert
						this.isTrue(success);
						this.areIdentical(2, this._aro.insertTimes());

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBookmarkDAOUpdateBookmarkRelations() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var bk : Bookmark;
				var t1 : Tag, t2 : Tag;
				var tags : IList<Tag>;

				this._setUp();

				bk = new Bookmark();
				bk.setId('foo');

				t1 = new Tag();
				t1.setId('bar');
				t2 = new Tag();
				t2.setId('foobar');
				tags = new ArrayList<Tag>();
				tags.add(t1);
				tags.add(t2);

				this._aro.setDeleteOutcome(true);
				this._aro.setInsertOutcome(true);

				// Act
				this._dao.updateBookmarkRelations(
					bk,
					tags,
					(success) => {
						// Assert
						this.isTrue(success);

						// Check delete request
						this.areIdentical(1, this._aro.deleteTimes());
						this.areIdentical(DAOTables.TagBookmark, this._aro.deleteArgs()[0]);
						this.areIdentical('bookmark_id', this._aro.deleteArgs()[1].getFirst());
						this.areIdentical('foo', this._aro.deleteArgs()[1].getSecond());

						// Check insert requests
						this.areIdentical(2, this._aro.insertTimes());

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBookmarkDAORemoveBookmarkRelations() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var bk : Bookmark;

				this._setUp();

				bk = new Bookmark();
				bk.setId('foo');

				this._aro.setDeleteOutcome(true);

				// Act
				this._dao.removeBookmarkRelations(
					bk,
					(success) => {
						// Assert
						this.isTrue(success);

						// Check delete request
						this.areIdentical(1, this._aro.deleteTimes());
						this.areIdentical(DAOTables.TagBookmark, this._aro.deleteArgs()[0]);
						this.areIdentical('bookmark_id', this._aro.deleteArgs()[1].getFirst());
						this.areIdentical('foo', this._aro.deleteArgs()[1].getSecond());

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBookmarkDAORemoveTagRelations() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var tag : Tag;

				this._setUp();

				tag = new Tag();
				tag.setId('foo');

				this._aro.setDeleteOutcome(true);

				// Act
				this._dao.removeTagRelations(
					tag,
					(success) => {
						// Assert
						this.isTrue(success);

						// Check delete request
						this.areIdentical(1, this._aro.deleteTimes());
						this.areIdentical(DAOTables.TagBookmark, this._aro.deleteArgs()[0]);
						this.areIdentical('tag_id', this._aro.deleteArgs()[1].getFirst());
						this.areIdentical('foo', this._aro.deleteArgs()[1].getSecond());

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBookmarkDAOGetRawRelations() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var data : IList<any>;
				this._setUp();

				data = new ArrayList<any>();
				data.add({ bookmark_id: 'foo', tag_id: 'bar'});
				this._aro.setGetOutcome(data);

				// Act
				this._dao.getRaw(
					(outcome) => {
						// Assert
						this.areIdentical(1, this._aro.getTimes());
						this.areIdentical(DAOTables.TagBookmark, this._aro.getArgs()[0]);
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(1, outcome.getLength());
						this.areIdentical('foo', outcome.getAt(0).bookmark_id);
						this.areIdentical('bar', outcome.getAt(1).tag_id);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}
}

UnitTestClass.handle(new TagBookmarkDAOTest());
