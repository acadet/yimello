/// <reference path="../../dependencies.ts" />

class MainPresenter
	extends YimelloPresenter
	implements
		IBookmarkListListener,
		ITagListMenuListener,
	 	ISearchBarListener,
	 	IBookmarkFormMenuListener,
	 	IBookmarkDeletionMenuListener,
	 	ITagFormMenuListener,
	 	ITagDeletionMenuListener,
	 	IImportBrowserMenuListener,
	 	IImportBackupMenuListener {
	//region Fields

	private _searchBar : SearchBar;
	private _bookmarkList : BookmarkList;
	private _tagListMenu : TagListMenu;
	private _bookmarkFormMenu : BookmarkFormMenu;
	private _bookmarkDeletionMenu : BookmarkDeletionMenu;
	private _tagFormMenu : TagFormMenu;
	private _tagDeletionMenu : TagDeletionMenu;
	private _importBrowserMenu : ImportBrowserMenu;
	private _importBackupMenu : ImportBackupMenu;
	private _createBackupMenu : CreateBackupMenu;

	private _currentTag : DOMElement;
	
	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _setMenu() : void {
		var menuTrigger : DOMElement, menu : DOMElement, view : DOMElement;
		var hideMenu : Action0, showMenu : Action0, isMenuVisible : Action0;

		view = DOMTree.findSingle('.js-main-view');
		menu = DOMTree.findSingle('.js-menu');
		menuTrigger = DOMTree.findSingle('.js-menu-trigger');

		isMenuVisible = () => {
			return menu.hasClass('visible');
		};

		hideMenu = () => {
			if (isMenuVisible()) {
				menu.removeClass('visible');
				view.removeClass('background');
			}
		};

		showMenu = () => {
			if (!isMenuVisible()) {
				menu.addClass('visible');
				view.addClass('background');
			}
		};

		menuTrigger.on(
			DOMElementEvents.Click,
			(args) => {
				if (isMenuVisible()) {
					hideMenu();
				} else {
					showMenu();
				}
			}
		);

		DOMTree.getDocument().on(
			DOMElementEvents.KeyDown,
			(args) => {
				if (args.getWhich() === 27) {
					hideMenu();
				}
			}
		);

		menu
			.find('li')
			.forEach(
				(e) => {
					e.on(
						DOMElementEvents.Click,
						(args) => {
							hideMenu();
							if (e.hasClass('js-tour-trigger')) {
								NodeWindow.moveTo('tour.html');
							}
						}
					);
				}
			);
	}

	private _setCurrentTag(value : string) : void {
		this._currentTag.setText(value);
	}
	
	//endregion Private Methods
	
	//region Public Methods

	onStart() : void {
		super.onStart();

		this._setMenu();
		this._searchBar = new SearchBar(this);
		this._bookmarkList = new BookmarkList(this);
		this._tagListMenu = new TagListMenu(this);

		this._bookmarkFormMenu = new BookmarkFormMenu(this, super.getNotifier());
		this._bookmarkDeletionMenu = new BookmarkDeletionMenu(this, super.getNotifier());

		this._tagFormMenu = new TagFormMenu(this, super.getNotifier());
		this._tagDeletionMenu = new TagDeletionMenu(this, super.getNotifier());

		this._importBrowserMenu = new ImportBrowserMenu(this, super.getNotifier());

		this._importBackupMenu = new ImportBackupMenu(this, super.getNotifier());
		this._createBackupMenu = new CreateBackupMenu(super.getNotifier());

		this._currentTag = DOMTree.findSingle('.js-current-tag');

		this.onMostPopularSelection();
	}

	//region IBookmarkListListener

	onBookmarkUpdateRequest(id : string) : void {
		BusinessFactory.buildBookmark(
			(business) => {
				business.find(
					id,
					(outcome) => {
						this._bookmarkFormMenu.prepareUpdate(outcome);
					}
				);
			}
		);
	}

	onBookmarkDeletionRequest(id : string) : void {
		BusinessFactory.buildBookmark(
			(business) => {
				business.find(
					id,
					(outcome) => {
						this._bookmarkDeletionMenu.run(outcome);
					}
				);
			}
		);
	}

	//endregion IBookmarkListListener

	//region ITagListMenuSubscriber

	onMostPopularSelection() : void {
		this._searchBar.reset();
		this._bookmarkList.sortMostPopular();
		this._setCurrentTag('Most popular');
	}

	onTagSelection(t : Tag) : void {
		this._searchBar.reset();
		this._bookmarkList.sortForTag(t);
		this._setCurrentTag(t.getLabel());
	}

	onTagEditionRequest(id : string) : void {
		BusinessFactory.buildTag(
			(business) => {
				business.find(
					id,
					(outcome) => {
						this._tagFormMenu.prepareUpdate(outcome);
					}
				);
			}
		);
	}

	onTagDeletionRequest(id : string) : void {
		BusinessFactory.buildTag(
			(business) => {
				business.find(
					id,
					(outcome) => {
						this._tagDeletionMenu.run(outcome);
					}
				);
			}
		);
	}

	//endregion ITagListMenuSubscriber

	//region ISearchBarListener

	onSearchRequest(input : string) : void {
		this._bookmarkList.search(input);
		this._setCurrentTag('Search Results');
	}

	onSearchCancel() : void {
		this.onMostPopularSelection();
	}

	//endregion ISearchBarListener

	//region IBookmarkFormMenuListener

	onBookmarkAddition() : void {
		super.getNotifier().inform('Yes! A new buddy is joining us :)');
		this._bookmarkList.refresh();
	}

	onBookmarkUpdate() : void {
		super.getNotifier().inform('All your changes have been saved');
		this._bookmarkList.refresh();
	}

	//endregion IBookmarkFormMenuListener

	//region IBookmarkDeletionMenuListener

	onBookmarkDeletion() : void {
		super.getNotifier().inform('Bye bye old chap :(');
	}

	//endregion IBookmarkDeletionMenuListener

	//region ITagFormMenuListener

	onTagAddition() : void {
		super.getNotifier().inform('Welcome on board!');
	}

	onTagUpdate() : void {
		super.getNotifier().inform('Alright, everything was stored');
	}

	//endregion ITagFormMenuListener

	//region ITagDeletionMenuListener

	onTagDeletion() : void {
		super.getNotifier().inform('See you mate :(');
	}

	//endregion ITagDeletionMenuListener

	//region IImportBrowserMenuListener

	onImportFromBrowser() : void {
		super.getNotifier().inform('Done!');
		this._bookmarkList.refresh();
	}

	//enregion IImportBrowserMenuListener

	//region IImportBackupMenuListener

	onImportBackup() : void {
		super.getNotifier().inform('Done!');
		this._bookmarkList.refresh();
	}

	//enregion IImportBackupMenuListener
	
	//endregion Public Methods
	
	//endregion Methods
}
