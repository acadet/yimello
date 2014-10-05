/// <reference path="../../../dependencies.ts" />

class ExportBrowserMenu extends OverlayMenu {
	//region Fields

	private _notifier : INotifier;
	
	//endregion Fields
	
	//region Constructors

	constructor(notifier : INotifier) {
		super(DOMTree.findSingle('.js-export-browser-menu-wrapper'));

		this._notifier = notifier;

		this._setUp();
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _setUp() : void {
		var menu : DOMElement, output : DOMElement;

		menu = DOMTree.findSingle('.js-export-browser-menu');
		output = menu.findSingle('textarea');

		DOMTree
			.findSingle('.js-export-browser-trigger')
			.on(
				DOMElementEvents.Click,
				(args) => {
					output.setText('');
					this._notifier.inform(PresenterMessages.ERMINE);
					super.show();

					BusinessFactory.buildTagBookmark(
						(business) => {
							business.exportToBrowser(
								(outcome) => {
									output.setText(outcome);
									output.toJQuery().select();
									this._notifier.inform(PresenterMessages.DONE);
								},
								(error) => this._notifier.alert(error)
							);
						}
					);
				}
			);

		menu
			.findSingle('.js-export-browser-confirm')
			.on(DOMElementEvents.Click, (args) => super.hide());
	}
	
	//endregion Private Methods
	
	//region Public Methods
	
	//endregion Public Methods
	
	//endregion Methods
}
