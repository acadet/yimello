/// <reference path="../../../dependencies.ts" />

class BookmarkDeletionMenu extends OverlayMenu {
	//region Fields

	private _listener : IBookmarkDeletionMenuListener;
	private _notifier : Notifier;
	private _current : Bookmark;
	
	//endregion Fields
	
	//region Constructors

	constructor(listener : IBookmarkDeletionMenuListener, notifier : Notifier) {
		super(DOMTree.findSingle('.js-bookmark-deletion-menu-wrapper'));

		this._listener = listener;
		this._notifier = notifier;

		this._setUp();
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _setUp() : void {
		var menu : DOMElement;

		menu = DOMTree.findSingle('.js-bookmark-deletion-menu');

		menu
			.findSingle('.js-bookmark-deletion-confirm')
			.on(
				DOMElementEvents.Click,
				(args) => {
					BusinessFactory.buildBookmark(
						(business) => {
							business.delete(
								this._current,
								() => {
									this._listener.onBookmarkDeletion();
									super.hide();
								},
								(msg) => {
									this._notifier.alert(msg);
								}
							);
						}
					);
				}
			);

		menu
			.findSingle('.js-bookmark-deletion-cancel')
			.on(
				DOMElementEvents.Click,
				(args) => {
					super.hide();
				}
			);
	}
	
	//endregion Private Methods
	
	//region Public Methods

	run(bookmark : Bookmark) : void {
		this._current = bookmark;
		super.show();
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
