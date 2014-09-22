/// <reference path="../../../test_dependencies.ts" />

class TagBookmarkBusinessArgsTest extends UnitTestClass {
	private _args : TagBookmarkBusinessArgs;

	setUp() : void {
		this._args = new TagBookmarkBusinessArgs();
	}

	tearDown() : void {
		this._args = null;
	}

	TagBookmarkBusinessArgsTagDAOTest() : void {
		// Arrange
		var value : ITagDAO, outcome : ITagDAO;

		value = new Mocks.DAO.TagDAO();
	
		// Act
		this._args.setTagDAO(value);
		outcome = this._args.getTagDAO();
	
		// Assert
		this.areIdentical(value, outcome);
	}

	TagBookmarkBusinessArgsBookmarkDAOTest() : void {
		// Arrange
		var value : IBookmarkDAO, outcome : IBookmarkDAO;
	
		value = new Mocks.DAO.BookmarkDAO();

		// Act
		this._args.setBookmarkDAO(value);
		outcome = this._args.getBookmarkDAO();
	
		// Assert
		this.areIdentical(value, outcome);
	}

	TagBookmarkBusinessArgsTagBookmarkDAOTest() : void {
		// Arrange
		var value : ITagBookmarkDAO, outcome : ITagBookmarkDAO;

		value = new Mocks.DAO.TagBookmarkDAO();
	
		// Act
		this._args.setTagBookmarkDAO(value);
		outcome = this._args.getTagBookmarkDAO();
	
		// Assert
		this.areIdentical(value, outcome);
	}

	TagBookmarkBusinessArgsTagBusinessTest() : void {
		// Arrange
		var value : IInternalTagBusiness, outcome : IInternalTagBusiness;
	
		value = new Mocks.Business.TagBusiness();

		// Act
		this._args.setTagBusiness(value);
		outcome = this._args.getTagBusiness();
	
		// Assert
		this.areIdentical(value, outcome);
	}

	TagBookmarkBusinessArgsBookmarkBusinessTest() : void {
		// Arrange
		var value : IInternalBookmarkBusiness, outcome : IInternalBookmarkBusiness;
	
		value = new Mocks.Business.BookmarkBusiness();

		// Act
		this._args.setBookmarkBusiness(value);
		outcome = this._args.getBookmarkBusiness();
	
		// Assert
		this.areIdentical(value, outcome);
	}
}

UnitTestClass.handle(new TagBookmarkBusinessArgsTest());
