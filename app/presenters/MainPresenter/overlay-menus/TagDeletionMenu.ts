/// <reference path="../../../dependencies.ts" />

class TagDeletionMenu extends OverlayMenu {
	//region Fields

	private _listener : ITagDeletionMenuListener;
	private _notifier : Notifier;
	private _current : Tag;
	
	//endregion Fields
	
	//region Constructors

	constructor(listener : ITagDeletionMenuListener, notifier : Notifier) {
		super(DOMTree.findSingle('.js-tag-deletion-menu-wrapper'));

		this._listener = listener;
		this._notifier = notifier;

		this._setUp();
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _setUp() : void {
		var menu : DOMElement;

		menu = DOMTree.findSingle('.js-tag-deletion-menu');

		menu
			.findSingle('.js-tag-deletion-confirm')
			.on(
				DOMElementEvents.Click,
				(args) => {
					BusinessFactory.buildTag(
						(business) => {
							business.delete(
								this._current,
								() => {
									this._listener.onTagDeletion();
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
			.findSingle('.js-tag-deletion-cancel')
			.on(
				DOMElementEvents.Click,
				(args) => {
					super.hide();
				}
			);
	}
	
	//endregion Private Methods
	
	//region Public Methods

	run(tag : Tag) : void {
		this._current = tag;
		super.show();
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
