/// <reference path="../../../dependencies.ts" />

class MenuSubMenu extends SubMenu {
	//region Fields
	
	private _dragFileArea : DragFileArea;

	//endregion Fields
	
	//region Constructors
	
	constructor(overlay : DOMElement, owner : ISubMenuOwner) {
		super(overlay.findSingle('.js-menu-pannel'), owner);

		this._dragFileArea = new DragFileArea();

		this
			.getTarget()
			.findSingle('.js-tour-trigger')
			.on(
				DOMElementEvents.Click,
				(e) => {
					NodeWindow.moveTo('tour.html');
				}
			);
		this
			.getTarget()
			.findSingle('.js-close-trigger')
			.on(
				DOMElementEvents.Click,
				(e) => {
					NodeWindow.close();
				}
			);

		this
			.getTarget()
			.findSingle('.js-import-browser')
			.on(
				DOMElementEvents.Click,
				(e) => {
					this._dragFileArea.show(
						() => {
							this.hide();
							this.getOwner().hide();
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
	
	//endregion Public Methods
	
	//endregion Methods
}
