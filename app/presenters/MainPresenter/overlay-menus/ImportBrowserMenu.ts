/// <reference path="../../../dependencies.ts" />

class ImportBrowserMenu extends OverlayMenu {
	//region Fields

	private _spinner : DOMElement;
	private _listener : IImportBrowserMenuListener;
	private _notifier : INotifier;
	
	//endregion Fields
	
	//region Constructors

	constructor(listener : IImportBrowserMenuListener, notifier : INotifier) {
		super(DOMTree.findSingle('.js-import-browser-menu-wrapper'));

		this._listener = listener;
		this._notifier = notifier;

		this._setUp();
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _showSpinner() : void {
		this._spinner.setCss({ display : 'block'});
	}

	private _hideSpinner() : void {
		this._spinner.setCss({ display : 'none'});
	}

	private _setUp() : void {
		var menu : DOMElement;

		menu = DOMTree.findSingle('.js-import-browser-menu');
		this._spinner = menu.findSingle('.js-spinner');

		menu
			.findSingle('.js-import-browser-cancel')
			.on(
				DOMElementEvents.Click,
				(args) => {
					this._hideSpinner();
					super.hide();
				}
			);

		menu.on(
			DOMElementEvents.DragOver,
			(args) => {
				// Prevent to allow drop event
				args.preventDefault();
			}
		);

		menu.on(
			DOMElementEvents.DragEnd,
			(args) => {
				// Prevent to allow drop event
				args.preventDefault();
			}
		);

		menu.on(
			DOMElementEvents.Drop,
			(args) => {
				args.preventDefault();
				this._showSpinner();
				this._notifier.inform(PresenterMessages.DINGO);

				BusinessFactory.buildTagBookmark(
					(business) => {
						business.importFromBrowser(
							args.getOriginalEvent().dataTransfer,
							() => {
								this._hideSpinner();
								this._listener.onImportFromBrowser();
								super.hide();
							},
							(msg) => {
								this._hideSpinner();
								this._notifier.alert(msg);
							}
						);
					}
				);
			}
		);

		DOMTree
			.findSingle('.js-import-browser-trigger')
			.on(
				DOMElementEvents.Click,
				(args) => {
					super.show();
				}
			);
	}
	
	//endregion Private Methods
	
	//region Public Methods
	
	//endregion Public Methods
	
	//endregion Methods
}
