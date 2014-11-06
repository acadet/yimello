/// <reference path="../../../references.ts" />

class TagBookmarkDAOTest extends UnitTestClass {
	private _aro : Mocks.DAO.ActiveRecordObject;
	private _dao : TagBookmarkDAO;

	setUp() : void {
		this._aro = new Mocks.DAO.ActiveRecordObject();
		this._dao = new TagBookmarkDAO(this._aro);
	}

	tearDown() : void {
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
		Assert.isNotNull(dao);
		Assert.areEqual(aro, dao.getARO());
	}

	TagBookmarkAddRelationAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var tag : Tag;
		var bk : Bookmark;

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
				Assert.isTrue(success);
				Assert.areEqual(1, this._aro.insertTimes());
				Assert.areEqual(DAOTables.TagBookmark, this._aro.insertArgs()[0]);
				Assert.areEqual('foo', this._aro.insertArgs()[1].getAt(0));
				Assert.areEqual('bar', this._aro.insertArgs()[1].getAt(1));

				obs.success();
			}
		);
	}

	TagBookmarkDAOAddMultipleRelationsAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var bk : Bookmark;
		var tags : IList<Tag>;
		var t1 : Tag, t2 : Tag;

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
				Assert.isTrue(success);
				Assert.areEqual(2, this._aro.insertTimes());

				obs.success();
			}
		);
	}

	TagBookmarkDAOUpdateBookmarkRelationsAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var bk : Bookmark;
		var t1 : Tag, t2 : Tag;
		var tags : IList<Tag>;

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
				Assert.isTrue(success);

				// Check delete request
				Assert.areEqual(1, this._aro.deleteTimes());
				Assert.areEqual(DAOTables.TagBookmark, this._aro.deleteArgs()[0]);
				Assert.areEqual('bookmark_id', this._aro.deleteArgs()[1].getKey());
				Assert.areEqual('foo', this._aro.deleteArgs()[1].getValue());

				// Check insert requests
				Assert.areEqual(2, this._aro.insertTimes());

				obs.success();
			}
		);
	}

	TagBookmarkDAORemoveBookmarkRelationsAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var bk : Bookmark;

		bk = new Bookmark();
		bk.setId('foo');

		this._aro.setDeleteOutcome(true);

		// Act
		this._dao.removeBookmarkRelations(
			bk,
			(success) => {
				// Assert
				Assert.isTrue(success);

				// Check delete request
				Assert.areEqual(1, this._aro.deleteTimes());
				Assert.areEqual(DAOTables.TagBookmark, this._aro.deleteArgs()[0]);
				Assert.areEqual('bookmark_id', this._aro.deleteArgs()[1].getKey());
				Assert.areEqual('foo', this._aro.deleteArgs()[1].getValue());

				obs.success();
			}
		);
	}

	TagBookmarkDAORemoveTagRelationsAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var tag : Tag;

		tag = new Tag();
		tag.setId('foo');

		this._aro.setDeleteOutcome(true);

		// Act
		this._dao.removeTagRelations(
			tag,
			(success) => {
				// Assert
				Assert.isTrue(success);

				// Check delete request
				Assert.areEqual(1, this._aro.deleteTimes());
				Assert.areEqual(DAOTables.TagBookmark, this._aro.deleteArgs()[0]);
				Assert.areEqual('tag_id', this._aro.deleteArgs()[1].getKey());
				Assert.areEqual('foo', this._aro.deleteArgs()[1].getValue());

				obs.success();
			}
		);
	}

	TagBookmarkDAOGetRawRelationsAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var data : IList<any>;

		data = new ArrayList<any>();
		data.add({ bookmark_id: 'foo', tag_id: 'bar'});
		this._aro.setGetOutcome(data);

		// Act
		this._dao.getRaw(
			(outcome) => {
				// Assert
				Assert.areEqual(1, this._aro.getTimes());
				Assert.areEqual(DAOTables.TagBookmark, this._aro.getArgs()[0]);
				Assert.isNotNull(outcome);
				Assert.areEqual(1, outcome.getLength());
				Assert.areEqual('foo', outcome.getAt(0).bookmark_id);
				Assert.areEqual('bar', outcome.getAt(0).tag_id);

				obs.success();
			}
		);
	}

	TagBookmarkDAOSortTagsByLabelAscForBookmarkAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var bk : Bookmark;
		var t1 : any, t2 : any;
		var request : StringBuffer;

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
				Assert.areEqual(1, this._aro.executeSQLTimes());
				Assert.areEqual(request.toString(), this._aro.executeSQLArgs()[0]);
				Assert.isNotNull(outcome);
				Assert.areEqual(2, outcome.getLength());
				Assert.areEqual('bar', outcome.getAt(0).getId());
				Assert.areEqual('foobar', outcome.getAt(0).getLabel());
				Assert.areEqual('barbar', outcome.getAt(1).getId());
				Assert.areEqual('foobarbar', outcome.getAt(1).getLabel());

				obs.success();
			}
		);
	}

	TagBookmarkDAOSortBookmarksByTitleAcForTagAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var t : Tag;
		var b1 : any, b2 : any;
		var request : StringBuffer;

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
				Assert.areEqual(1, this._aro.executeSQLTimes());
				Assert.areEqual(request.toString(), this._aro.executeSQLArgs()[0]);
				Assert.isNotNull(outcome);
				Assert.areEqual(2, outcome.getLength());

				Assert.areEqual('1', outcome.getAt(0).getId());
				Assert.areEqual('google.uk', outcome.getAt(0).getURL());
				Assert.areEqual('foo', outcome.getAt(0).getTitle());
				Assert.areEqual('Wonderful', outcome.getAt(0).getDescription());
				Assert.areEqual(45, outcome.getAt(0).getViews());

				Assert.areEqual('2', outcome.getAt(1).getId());
				Assert.areEqual('google.fr', outcome.getAt(1).getURL());
				Assert.areEqual('bar', outcome.getAt(1).getTitle());
				Assert.areEqual('Marvelous', outcome.getAt(1).getDescription());
				Assert.areEqual(89, outcome.getAt(1).getViews());

				obs.success();
			}
		);
	}

	TagBookmarkDAOSortBookmarksByTitleAscWithBoundTagsByLabelAscAsyncTest(obs : IOscarObserver) : void {
		// Arrange
		var o1 : any, o2 : any, o3 : any, o4 : any;
		var request : StringBuffer;

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
				Assert.areEqual(1, this._aro.executeSQLTimes());
				Assert.areEqual(request.toString(), this._aro.executeSQLArgs()[0]);

				Assert.isNotNull(outcome);
				Assert.areEqual(2, outcome.getLength());

				Assert.areEqual('1', outcome.getAt(0).getKey().getId());
				Assert.areEqual('foo', outcome.getAt(0).getKey().getTitle());
				Assert.areEqual('google.fr', outcome.getAt(0).getKey().getURL());
				Assert.areEqual('Amazing!', outcome.getAt(0).getKey().getDescription());
				Assert.areEqual(56, outcome.getAt(0).getKey().getViews());

				Assert.areEqual(2, outcome.getAt(0).getValue().getLength());
				Assert.areEqual('34', outcome.getAt(0).getValue().getAt(0).getId());
				Assert.areEqual('bar', outcome.getAt(0).getValue().getAt(0).getLabel());
				Assert.areEqual('45', outcome.getAt(0).getValue().getAt(1).getId());
				Assert.areEqual('barbar', outcome.getAt(0).getValue().getAt(1).getLabel());

				Assert.areEqual('2', outcome.getAt(1).getKey().getId());
				Assert.areEqual('foobar', outcome.getAt(1).getKey().getTitle());
				Assert.areEqual('google.uk', outcome.getAt(1).getKey().getURL());
				Assert.areEqual('Formidable!', outcome.getAt(1).getKey().getDescription());
				Assert.areEqual(789, outcome.getAt(1).getKey().getViews());

				Assert.areEqual(1, outcome.getAt(1).getValue().getLength());
				Assert.areEqual('35', outcome.getAt(1).getValue().getAt(0).getId());
				Assert.areEqual('foobarbar', outcome.getAt(1).getValue().getAt(0).getLabel());

				obs.success();
			}
		);
	}
}
