/// <reference path="../../../../dependencies.ts" />

class DragFileArea {
	//region Fields
	
	private _area : DOMElement;

	//endregion Fields
	
	//region Constructors
	
	constructor() {
		this._area = DOMTree.findSingle('.js-drag-area');

		this._area.on(
			DOMElementEvents.DragOver,
			(e) => {
				e.preventDefault();
			}
		);

		this._area.on(
			DOMElementEvents.DragEnd,
			(e) => {
				e.preventDefault();
			}
		);

		this._area.on(
			DOMElementEvents.Drop,
			(e) => {
				e.preventDefault();
				PresenterMediator
					.getBookmarkBusiness()
					.importFromBrowser(
						e.getOriginalEvent().dataTransfer,
						(success) => {
							this.hide();
						}
					);
			}
		);
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	//endregion Private Methods
	
	//region Public Methods
	
	show() : void {
		this._area.setCss({
			display : 'block',
			zIndex : 999
		});

		this._area.animate(
			{
				top : 0
			},
			500
		);
	}

	hide() : void {
		this._area.animate(
			{
				top : '-100%'
			},
			500,
			(e) => {
				this._area.setCss({
					display : 'none',
					zIndex : 0
				});
			}
		);
	}

	//endregion Public Methods
	
	//endregion Methods
}
