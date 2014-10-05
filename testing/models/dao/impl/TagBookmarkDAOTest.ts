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

	TagBookmarkDAOUpdateBookmarkRelationsTest() : void {
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

	TagBookmarkDAORemoveBookmarkRelationsTest() : void {
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

	TagBookmarkDAORemoveTagRelationsTest() : void {
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

	TagBookmarkDAOGetRawRelationsTest() : void {
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
						this.areIdentical('bar', outcome.getAt(0).tag_id);

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBookmarkDAOSortTagsByLabelAscForBookmarkTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var bk : Bookmark;
				var t1 : any, t2 : any;
				var request : StringBuffer;

				this._setUp();

				bk = new Bookmark();
				bk.setId('foo');

				request = new StringBuffer('SELECT * FROM ' + DAOTables.Tags + ' WHERE id IN (');
				request.append('SELECT tag_id FROM ' + DAOTables.TagBookmark + ' WHERE ');
				request.append('bookmark_id = "foo") ORDER BY LOWER(label) ASC');

				t1 = {
					id: 'bar',
					label: 'foobar'
				};
				t2 = {
					id: 'barbar',
					label: 'foobarbar'
				};
				this._aro.setExecuteSQLOutcome([t1, t2]);

				// Act
				this._dao.sortTagsByLabelAscForBookmark(
					bk,
					(outcome) => {
						// Assert
						this.areIdentical(1, this._aro.executeSQLTimes());
						this.areIdentical(request.toString(), this._aro.executeSQLArgs()[0]);
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(2, outcome.getLength());
						this.areIdentical('bar', outcome.getAt(0).getId());
						this.areIdentical('foobar', outcome.getAt(0).getLabel());
						this.areIdentical('barbar', outcome.getAt(1).getId());
						this.areIdentical('foobarbar', outcome.getAt(1).getLabel());

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBookmarkDAOSortBookmarksByTitleAcForTagTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var t : Tag;
				var b1 : any, b2 : any;
				var request : StringBuffer;

				this._setUp();

				t = new Tag();
				t.setId('foo');

				request = new StringBuffer('SELECT * FROM ' + DAOTables.Bookmarks + ' WHERE id IN (');
				request.append('SELECT bookmark_id FROM ' + DAOTables.TagBookmark + ' WHERE ');
				request.append('tag_id = "foo") ORDER BY LOWER(title) ASC');

				b1 = {
					id : '1',
					url : 'google.uk',
					title : 'foo',
					description : 'Wonderful',
					views : 45
				};
				b2 = {
					id : '2',
					url : 'google.fr',
					title : 'bar',
					description : 'Marvelous',
					views : 89
				};
				this._aro.setExecuteSQLOutcome([b1, b2]);

				// Act
				this._dao.sortBookmarksByTitleAscForTag(
					t,
					(outcome) => {
						// Assert
						this.areIdentical(1, this._aro.executeSQLTimes());
						this.areIdentical(request.toString(), this._aro.executeSQLArgs()[0]);
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(2, outcome.getLength());

						this.areIdentical('1', outcome.getAt(0).getId());
						this.areIdentical('google.uk', outcome.getAt(0).getURL());
						this.areIdentical('foo', outcome.getAt(0).getTitle());
						this.areIdentical('Wonderful', outcome.getAt(0).getDescription());
						this.areIdentical(45, outcome.getAt(0).getViews());

						this.areIdentical('2', outcome.getAt(1).getId());
						this.areIdentical('google.fr', outcome.getAt(1).getURL());
						this.areIdentical('bar', outcome.getAt(1).getTitle());
						this.areIdentical('Marvelous', outcome.getAt(1).getDescription());
						this.areIdentical(89, outcome.getAt(1).getViews());

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
		);
	}

	TagBookmarkDAOSortBookmarksByTitleAscWithBoundTagsByLabelAscTest() : void {
		UnitTestClass.queue(
			() => {
				// Arrange
				var o1 : any, o2 : any, o3 : any, o4 : any;
				var request : StringBuffer;

				this._setUp();

				request = new StringBuffer('SELECT bk.id AS id, bk.url as url, bk.title AS title, bk.description AS description, ');
				request
					.append('bk.views AS views, outcome.tagId AS tagId, outcome.tagLabel AS tagLabel ')
					.append('FROM ' + DAOTables.Bookmarks + ' AS bk ')
					.append('LEFT JOIN (')
					.append('SELECT t.id AS tagId, t.label AS tagLabel, tbk.bookmark_id AS bkId FROM ')
					.append(DAOTables.Tags + ' AS t INNER JOIN ')
					.append(DAOTables.TagBookmark + ' AS tbk ON ')
					.append('t.id = tbk.tag_id) AS outcome ')
					.append('ON bk.id = outcome.bkId ')
					.append('ORDER BY LOWER(bk.title) ASC, LOWER(outcome.tagLabel) ASC');

				o1 = {
					id : '1',
					title : 'foo',
					url : 'google.fr',
					description : 'Amazing!',
					views : 56,
					tagId : '34',
					tagLabel : 'bar'
				};
				o2 = {
					id : '1',
					title : 'foo',
					url : 'google.fr',
					description : 'Amazing!',
					views : 56,
					tagId : '45',
					tagLabel : 'barbar'
				};
				o3 = {
					id : '2',
					title : 'foobar',
					url : 'google.uk',
					description : 'Formidable!',
					views : 789
				};
				o4 = {
					id : '2',
					title : 'foobar',
					url : 'google.uk',
					description : 'Formidable!',
					views : 789,
					tagId : '35',
					tagLabel : 'foobarbar'
				};
				this._aro.setExecuteSQLOutcome([o1, o2, o3, o4]);

				// Act
				this._dao.sortBookmarksByTitleAscWithBoundTagsByLabelAsc(
					(outcome) => {
						// Assert
						this.areIdentical(1, this._aro.executeSQLTimes());
						this.areIdentical(request.toString(), this._aro.executeSQLArgs()[0]);

						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(2, outcome.getLength());

						this.areIdentical('1', outcome.getAt(0).getFirst().getId());
						this.areIdentical('foo', outcome.getAt(0).getFirst().getTitle());
						this.areIdentical('google.fr', outcome.getAt(0).getFirst().getURL());
						this.areIdentical('Amazing!', outcome.getAt(0).getFirst().getDescription());
						this.areIdentical(56, outcome.getAt(0).getFirst().getViews());

						this.areIdentical(2, outcome.getAt(0).getSecond().getLength());
						this.areIdentical('34', outcome.getAt(0).getSecond().getAt(0).getId());
						this.areIdentical('bar', outcome.getAt(0).getSecond().getAt(0).getLabel());
						this.areIdentical('45', outcome.getAt(0).getSecond().getAt(1).getId());
						this.areIdentical('barbar', outcome.getAt(0).getSecond().getAt(1).getLabel());

						this.areIdentical('2', outcome.getAt(1).getFirst().getId());
						this.areIdentical('foobar', outcome.getAt(1).getFirst().getTitle());
						this.areIdentical('google.uk', outcome.getAt(1).getFirst().getURL());
						this.areIdentical('Formidable!', outcome.getAt(1).getFirst().getDescription());
						this.areIdentical(789, outcome.getAt(1).getFirst().getViews());

						this.areIdentical(1, outcome.getAt(1).getSecond().getLength());
						this.areIdentical('35', outcome.getAt(1).getSecond().getAt(0).getId());
						this.areIdentical('foobarbar', outcome.getAt(1).getSecond().getAt(0).getLabel());

						this._tearDown();
						UnitTestClass.done();
					}
				);
			}
 		);
	}
}

UnitTestClass.handle(new TagBookmarkDAOTest());
