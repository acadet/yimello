// /// <reference path="../../../../dependencies.ts" />

// enum DragFileAreaOperations {
// 	BrowserImport,
// 	BackupImport
// }

// class DragFileArea {
// 	//region Fields
	
// 	private _area : DOMElement;
// 	private _currentOperation : DragFileAreaOperations;

// 	//endregion Fields
	
// 	//region Constructors
	
// 	constructor() {
// 		this._area = DOMTree.findSingle('.js-drag-area');

// 		this._area.on(
// 			DOMElementEvents.DragOver,
// 			(e) => {
// 				e.preventDefault();
// 			}
// 		);

// 		this._area.on(
// 			DOMElementEvents.DragEnd,
// 			(e) => {
// 				e.preventDefault();
// 			}
// 		);

// 		this._area.on(
// 			DOMElementEvents.Drop,
// 			(e) => {
// 				e.preventDefault();

// 				// if (this._currentOperation === DragFileAreaOperations.BrowserImport) {
// 				// 	PresenterMediator
// 				// 		.getTagBookmarkBusiness()
// 				// 		.importFromBrowser(
// 				// 			e.getOriginalEvent().dataTransfer,
// 				// 			() => {
// 				// 				// TODO : error handling
// 				// 				NodeWindow.reload();
// 				// 			}
// 				// 		);
// 				// } else {
// 				// 	PresenterMediator
// 				// 		.getTagBookmarkBusiness()
// 				// 		.importBackup(
// 				// 			e.getOriginalEvent().dataTransfer,
// 				// 			() => {
// 				// 				// TODO : error handling
// 				// 				NodeWindow.reload();
// 				// 			}
// 				// 		);
// 				// }
// 			}
// 		);

// 		this._area.on(
// 			DOMElementEvents.Click,
// 			(e) => {
// 				this.hide();
// 			}
// 		);
// 	}

// 	//endregion Constructors
	
// 	//region Methods
	
// 	//region Private Methods

// 	private _show(callback : Action0 = null) : void {
// 		this._area.setCss({
// 			display : 'block',
// 			zIndex : 999
// 		});

// 		this._area.animate(
// 			{
// 				top : 0
// 			},
// 			800,
// 			(e) => {
// 				if (callback !== null) {
// 					callback();
// 				}
// 			}
// 		);
// 	}

// 	//endregion Private Methods
	
// 	//region Public Methods


// 	showForBrowserImport(callback : Action0 = null) : void {
// 		this._currentOperation = DragFileAreaOperations.BrowserImport;
// 		this._show();
// 	}

// 	showForBackupImport(callback : Action0 = null) : void {
// 		this._currentOperation = DragFileAreaOperations.BackupImport;
// 		this._show();
// 	}

// 	hide() : void {
// 		this._area.animate(
// 			{
// 				top : '-100%'
// 			},
// 			800,
// 			(e) => {
// 				this._area.setCss({
// 					display : 'none',
// 					zIndex : 0
// 				});
// 			}
// 		);
// 	}

// 	//endregion Public Methods
	
// 	//endregion Methods
// }
