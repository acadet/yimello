/// <reference path="../../../test_dependencies.ts" />

class BookmarkDAOTest extends UnitTestClass {
	private _aro : Mocks.DAO.ActiveRecordObject;
	private _dao : BookmarkDAO;

	setUp() : void {
		this._aro = new Mocks.DAO.ActiveRecordObject();
		this._dao = new BookmarkDAO(this._aro, null);
	}

	tearDown() : void {
		this._aro = null;
		this._dao = null;
	}
}

UnitTestClass.handle(new BookmarkDAOTest());

// class BookmarkDAOTest extends UnitTestClass {
// 	private _dao : BookmarkDAO;

// 	constructor() {
// 		super();

// 		DataAccessObject.setDatabaseName('yimello-test');
// 	}

// 	setUp() : void {
// 		this._dao = new BookmarkDAO();
// 	}

// 	tearDown() : void {
// 		this._dao = null;
// 	}

// 	BookmarkDAOAddTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var bookmark : BookmarkDAO;

// 				bookmark = new BookmarkDAO();
// 				bookmark.setId('foo');
// 				bookmark.setURL('An url');
// 				bookmark.setTitle('A title');
// 				bookmark.setDescription('A description');
// 				bookmark.setViews(50);

// 				// Act
// 				bookmark.add(
// 					(outcome) => {
// 						// Assert
// 						var result : BookmarkDAO = outcome;

// 						this.isTrue(TSObject.exists(outcome));

// 						this.areNotIdentical(bookmark.getId(), outcome.getId());
// 						this.areIdentical(bookmark.getURL(), outcome.getURL());
// 						this.areIdentical(bookmark.getTitle(), outcome.getTitle());
// 						this.areIdentical(bookmark.getDescription(), outcome.getDescription());
// 						this.areIdentical(bookmark.getViews(), outcome.getViews());

// 						ActiveRecordObject.get<BookmarkDAO>(
// 							DAOTables.Bookmarks,
// 							(outcome) => {
// 								this.isTrue(TSObject.exists(outcome));
// 								this.areIdentical(1, outcome.getLength());
// 								this.areIdentical(result.getId(), outcome.getAt(0).getId());

// 								DataAccessObject.clean((success) => UnitTestClass.done());
// 							},
// 							BookmarkDAO.fromObject
// 						);
// 					}
// 				);
// 			}
// 		);
// 	}

// 	BookmarkUpdateTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var b : BookmarkDAO;
// 				var id : string = '1';

// 				b = new BookmarkDAO();
// 				b.setId(id);
// 				b.setTitle('foo');
// 				DataAccessObject.initialize(
// 					(success) => {
// 						ActiveRecordObject.insert(
// 							DAOTables.Bookmarks,
// 							b.toList(),
// 							(success) => {
// 								b.setTitle('foobar');

// 								// Act
// 								b.update(
// 									(outcome) => {
// 										// Assert
// 										this.isTrue(TSObject.exists(outcome));
// 										this.areIdentical(b.getId(), outcome.getId());
// 										this.areIdentical(b.getTitle(), outcome.getTitle());

// 										ActiveRecordObject.get<BookmarkDAO>(
// 											DAOTables.Bookmarks,
// 											(outcome) => {
// 												this.areIdentical(1, outcome.getLength());
// 												this.areIdentical(b.getId(), outcome.getAt(0).getId());
// 												this.areIdentical(b.getTitle(), outcome.getAt(0).getTitle());

// 												DataAccessObject.clean((s) => UnitTestClass.done());
// 											},
// 											BookmarkDAO.fromObject
// 										);
// 									}
// 								);
// 							}
// 						);
// 					}
// 				);
// 			}
// 		);
// 	}

// 	BookmarkDAODeleteTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var bookmark : BookmarkDAO;

// 				bookmark = new BookmarkDAO();
// 				bookmark.setId('1');

// 				DataAccessObject.initialize(
// 					(success) => {
// 						ActiveRecordObject.insert(
// 							DAOTables.Bookmarks,
// 							bookmark.toList(),
// 							(b) => {
// 								// Act
// 								bookmark.delete(
// 									(outcome) => {
// 										// Assert
// 										this.isTrue(outcome);

// 										ActiveRecordObject.get<BookmarkDAO>(
// 											DAOTables.Bookmarks,
// 											(outcome) => {
// 												this.isTrue(TSObject.exists(outcome));
// 												this.areIdentical(0, outcome.getLength());

// 												DataAccessObject.clean((success) => UnitTestClass.done());
// 											},
// 											BookmarkDAO.fromObject
// 										);
// 									}
// 								);
// 							}
// 						);
// 					}
// 				);
// 			}
// 		);
// 	}

// 	BookmarkDaoGetTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var b1 : BookmarkDAO, b2 : BookmarkDAO;

// 				b1 = new BookmarkDAO();
// 				b1.setId('1');
// 				b1.setTitle('foo');
// 				b2 = new BookmarkDAO();
// 				b2.setId('2');
// 				b2.setTitle('foobar');

// 				DataAccessObject.initialize(
// 					(success) => {
// 						ActiveRecordObject.insert(
// 							DAOTables.Bookmarks,
// 							b1.toList(),
// 							(success) => {
// 								ActiveRecordObject.insert(
// 									DAOTables.Bookmarks,
// 									b2.toList(),
// 									(success) => {
// 										// Act
// 										BookmarkDAO.get(
// 											(outcome) => {
// 												// Assert
// 												this.isTrue(TSObject.exists(outcome));

// 												this.areIdentical(2, outcome.getLength());
// 												this.areIdentical(b1.getId(), outcome.getAt(0).getId());
// 												this.areIdentical(b1.getTitle(), outcome.getAt(0).getTitle());
// 												this.areIdentical(b2.getId(), outcome.getAt(1).getId());
// 												this.areIdentical(b2.getTitle(), outcome.getAt(1).getTitle());

// 												DataAccessObject.clean((success) => UnitTestClass.done());
// 											}
// 										);
// 									}
// 								);
// 							}
// 						);
// 					}
// 				);
// 			}
// 		);
// 	}

// 	BookmarkDaoFindTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var b1 : BookmarkDAO, b2 : BookmarkDAO;

// 				b1 = new BookmarkDAO();
// 				b1.setId('1');
// 				b1.setTitle('foo');
// 				b2 = new BookmarkDAO();
// 				b2.setId('2');
// 				b2.setTitle('foobar');

// 				DataAccessObject.initialize(
// 					(success) => {
// 						ActiveRecordObject.insert(
// 							DAOTables.Bookmarks,
// 							b1.toList(),
// 							(success) => {
// 								ActiveRecordObject.insert(
// 									DAOTables.Bookmarks,
// 									b2.toList(),
// 									(success) => {
// 										// Act
// 										BookmarkDAO.find(
// 											'1',
// 											(outcome) => {
// 												// Assert
// 												this.isTrue(TSObject.exists(outcome));
// 												this.areIdentical(b1.getId(), outcome.getId());
// 												this.areIdentical(b1.getTitle(), outcome.getTitle());

// 												DataAccessObject.clean((success) => UnitTestClass.done());
// 											}
// 										);
// 									}
// 								);
// 							}
// 						);
// 					}
// 				);
// 			}
// 		);
// 	}

// 	BookmarkDAOSortByViewsDescThenByTitleAscTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var b1 : BookmarkDAO, b2 : BookmarkDAO, b3 : BookmarkDAO;

// 				b1 = new BookmarkDAO();
// 				b1
// 					.setTitle('Joe Pesci')
// 					.setViews(50)
// 					.setId('1');
// 				b2 = new BookmarkDAO();
// 				b2
// 					.setTitle('Robert de Niro')
// 					.setViews(50)
// 					.setId('2');
// 				b3 = new BookmarkDAO();
// 				b3
// 					.setTitle('Al Pacino')
// 					.setViews(200)
// 					.setId('3');

// 				DataAccessObject.initialize(
// 					(success) => {
// 						ActiveRecordObject.insert(
// 							DAOTables.Bookmarks,
// 							b1.toList(),
// 							(success) => {
// 								ActiveRecordObject.insert(
// 									DAOTables.Bookmarks,
// 									b2.toList(),
// 									(success) => {
// 										ActiveRecordObject.insert(
// 											DAOTables.Bookmarks,
// 											b3.toList(),
// 											(success) => {
// 												// Act
// 												BookmarkDAO.sortByViewsDescThenByTitleAsc(
// 													(outcome) => {
// 														// Assert
// 														this.isTrue(TSObject.exists(outcome));

// 														this.areIdentical(3, outcome.getLength());
// 														this.areIdentical(b3.getTitle(), outcome.getAt(0).getTitle());
// 														this.areIdentical(b3.getViews(), outcome.getAt(0).getViews());
// 														this.areIdentical(b1.getTitle(), outcome.getAt(1).getTitle());
// 														this.areIdentical(b1.getViews(), outcome.getAt(1).getViews());
// 														this.areIdentical(b2.getTitle(), outcome.getAt(2).getTitle());
// 														this.areIdentical(b2.getViews(), outcome.getAt(2).getViews());

// 														DataAccessObject.clean((success) => UnitTestClass.done());
// 													}
// 												);
// 											}
// 										);
// 									}
// 								);
// 							}
// 						);
// 					}
// 				);
// 			}
// 		);
// 	}

// 	BookmarkDAOSortByTileAscTest() : void {
// 		UnitTestClass.queue(
// 			() => {
// 				// Arrange
// 				var b1 : BookmarkDAO, b2 : BookmarkDAO, b3 : BookmarkDAO;

// 				b1 = new BookmarkDAO();
// 				b1
// 					.setTitle('Joe Pesci')
// 					.setId('1');
// 				b2 = new BookmarkDAO();
// 				b2
// 					.setTitle('Robert de Niro')
// 					.setId('2');
// 				b3 = new BookmarkDAO();
// 				b3
// 					.setTitle('Al Pacino')
// 					.setId('3');

// 				DataAccessObject.initialize(
// 					(success) => {
// 						ActiveRecordObject.insert(
// 							DAOTables.Bookmarks,
// 							b1.toList(),
// 							(success) => {
// 								ActiveRecordObject.insert(
// 									DAOTables.Bookmarks,
// 									b2.toList(),
// 									(success) => {
// 										ActiveRecordObject.insert(
// 											DAOTables.Bookmarks,
// 											b3.toList(),
// 											(success) => {
// 												// Act
// 												BookmarkDAO.sortByViewsDescThenByTitleAsc(
// 													(outcome) => {
// 														// Assert
// 														this.isTrue(TSObject.exists(outcome));

// 														this.areIdentical(3, outcome.getLength());
// 														this.areIdentical(b3.getTitle(), outcome.getAt(0).getTitle());
// 														this.areIdentical(b1.getTitle(), outcome.getAt(1).getTitle());
// 														this.areIdentical(b2.getTitle(), outcome.getAt(2).getTitle());

// 														DataAccessObject.clean((success) => UnitTestClass.done());
// 													}
// 												);
// 											}
// 										);
// 									}
// 								);
// 							}
// 						);
// 					}
// 				);
// 			}
// 		);
// 	}
// }

// UnitTestClass.handle(new BookmarkDAOTest());
