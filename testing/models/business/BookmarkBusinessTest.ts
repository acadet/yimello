/// <reference path="../../test_dependencies.ts" />

class BookmarkBusinessTest extends UnitTestClass {
	private _business : BookmarkBusiness;

	constructor() {
		super();

		DataAccessObject.setDatabaseName('yimello-test');

		this._business = new BookmarkBusiness();
	}

	setUp() : void {
		
	}

	tearDown() : void {
		UnitTestClass.increaseDelay();
	}

	BookmarkBusinessCreateFromURLTest() : void {
		var timer : Timer;

		timer = new Timer(
			(o) => {
				// Arrange
				var url : string = 'http://google.fr';

				// Act
				this._business.createFromURL(
					url,
					(outcome) => {
						// Assert
						this.isTrue(TSObject.exists(outcome));
						this.areIdentical(url, outcome.getURL());
						this.areIdentical('Google', outcome.getTitle());

						DataAccessObject.clean();
					}
				);
			},
			UnitTestClass.getDelay()
		);
	}

	BookmarkBusinessBindTagsTest() : void {
		var timer : Timer;

		timer = new Timer(
			(o) => {
				// Arrange
				var bookmark : BookmarkDAO;
				var t1 : TagDAO, t2 : TagDAO;
				var tags : IList<TagDAO>;

				bookmark = new BookmarkDAO();
				bookmark.setId('1');
				t1 = new TagDAO();
				t1.setId('1');
				t2 = new TagDAO();
				t2.setId('2');
				tags = new ArrayList<TagDAO>();
				tags.add(t1);
				tags.add(t2);

				bookmark.add(
					(success) => {
						t1.add(
							(success) => {
								t2.add(
									(success) => {
										// Act
										this._business.bindTags(
											bookmark,
											tags,
											(success) => {
												// Assert
												this.isTrue(success);

												ActiveRecordObject.get(
													DAOTables.TagBookmark,
													(outcome) => {
														var r1 : any, r2 : any;
														this.isTrue(TSObject.exists(outcome));

														this.areIdentical(2, outcome.getLength());
														r1 = outcome.getAt(0);
														r2 = outcome.getAt(1);

														this.areIdentical(t1.getId(), r1.tag_id);
														this.areIdentical(bookmark.getId(), r1.bookmark_id);
														this.areIdentical(t2.getId(), r2.tag_id);
														this.areIdentical(bookmark.getId(), r2.bookmark_id);

														DataAccessObject.clean();
													}
												);
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

	BookmarkBusinessDeleteTest() : void {
		var timer : Timer;

		timer = new Timer(
			(o) => {
				var bookmark : BookmarkDAO;
				var data1 : IList<any>, data2 : IList<any>;

				bookmark = new BookmarkDAO();
				bookmark.setId('1');
				data1 = new ArrayList<any>();
				data1.add('1');
				data1.add(bookmark.getId());
				data2 = new ArrayList<any>();
				data2.add('2');
				data2.add(bookmark.getId());

				bookmark.add(
					(success) => {
						ActiveRecordObject.insert(
							DAOTables.TagBookmark,
							data1,
							(success) => {
								ActiveRecordObject.insert(
									DAOTables.TagBookmark,
									data2,
									(success) => {
										this._business.delete(
											bookmark,
											(success) => {
												this.isTrue(success);

												BookmarkDAO.get(
													(outcome) => {
														this.areIdentical(0, outcome.getLength());

														ActiveRecordObject.get(
															DAOTables.TagBookmark,
															(outcome) => {
																this.areIdentical(0, outcome.getLength());

																DataAccessObject.clean();
															}
														);
													}
												);
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

UnitTestClass.handle(new BookmarkBusinessTest());
