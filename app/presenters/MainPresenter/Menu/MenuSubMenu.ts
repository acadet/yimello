/// <reference path="../../../dependencies.ts" />

class MenuSubMenu extends SubMenu {
	//region Fields
	
	//endregion Fields
	
	//region Constructors
	
	constructor(overlay : DOMElement, owner : ISubMenuOwner) {
		super(overlay.findSingle('.js-menu-pannel'), owner);

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
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	//endregion Public Methods
	
	//endregion Methods
}
