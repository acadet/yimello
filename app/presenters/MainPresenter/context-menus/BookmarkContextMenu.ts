/// <reference path="../../../dependencies.ts" />

class BookmarkContextMenu extends ContextMenu {
	//region Fields

	private _listener : IBookmarkContextMenuListener;
	private _id : string;
	
	//endregion Fields
	
	//region Constructors

	constructor(listener : IBookmarkContextMenuListener) {
		super(DOMTree.findSingle('.js-bookmark-context-menu'));

		this._listener = listener;

		DOMTree
			.findSingle('.js-bookmark-context-menu-edit')
			.on(
				DOMElementEvents.Click,
				(args) => {
					this._listener.requestEdition(this._id);
					super.hide();
				}
			);

		DOMTree
			.findSingle('.js-bookmark-context-menu-remove')
			.on(
				DOMElementEvents.Click,
				(args) => {
					this._listener.requestDeletion(this._id);
					super.hide();
				}
			);
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	show(id : string, top : number, left : number) : void {
		this._id = id;
		super._show(top, left);
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
